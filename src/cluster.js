require("dotenv").config();
const cluster = require("cluster");
const { availableParallelism } = require("os");
const http = require("http");
const numCPUs = availableParallelism();
const port = process.env.PORT || 3000;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running.`);
  const workers = [];
  // Create a load balancer server
  const loadBalancerServer = http.createServer((req, res) => {
    const worker = getNextWorker();
    const options = {
      hostname: worker.host,
      port: worker.port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };
    console.dir(worker.worker.id + ' worker has answered to this request');

    const proxy = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    req.pipe(proxy);
  });
  // Fork workers based on the number of CPUs
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork({ PORT: +port + i + 1 });
    workers.push({ worker, port: +port + i + 1 });
    worker.on("message", (msg) => {
      shareData(msg);
    });
  }

  function shareData(data) {
    workers.forEach((worker) => {
      worker.worker.send({ data: data });
    });
  }

  // Listen on a specific port for incoming requests
  loadBalancerServer.listen(port, () => {
    console.log("Load balancer server is running on port " + port);
  });

  // Keep track of workers and their indexes
  let workerIndex = 0;
  function getNextWorker() {
    const worker = workers[workerIndex];
    workerIndex = (workerIndex + 1) % workers.length;
    return worker;
  }
} else {
  console.log(`Worker ${process.pid} started.`);
  require("./index");
}
