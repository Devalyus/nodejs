require("dotenv").config();
const cluster = require("cluster");
const http = require("http");
const numCPUs = 4;
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
    console.dir(worker.worker.id);

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
  // Code for worker processes
  const { validate } = require("uuid");
  const { validateData } = require("./utils/validateData");
  const { errors, httpMethods } = require("./constants/constants");
  const { Database } = require("./db");
  const port = process.env.PORT || 3000;
  const db = new Database();
  console.log(`Worker ${process.pid} started.`);
  process.on("message", (msg) => {
    console.log(msg);
    db.setData(msg.data);
  });
  const server = http.createServer((req, res) => {
    process.on("uncaughtException", (err) => {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          message: ErrorMessages.unexpected_error,
        })
      );
    });
    res.setHeader("Content-Type", "application/json");
    if (req.url === "/api/users" && req.method === httpMethods.GET) {
      const data = JSON.stringify(db.getUsers());
      res.statusCode = 200;
      res.end(data);
    } else if (
      req.url?.startsWith("/api/users/") &&
      req.method === httpMethods.GET
    ) {
      const id = req.url?.substring(11);
      if (!validate(id)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: errors.invalid_uuid }));
        return;
      }
      const data = db.getUser(id);
      if (!data) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: errors.user_not_exist }));
        return;
      }
      res.statusCode = 200;
      res.end(JSON.stringify(data));
    } else if (req.url === "/api/users" && req.method === httpMethods.POST) {
      let body = "";
      req.on("data", (chuck) => {
        body += chuck.toString();
      });
      req.on("end", () => {
        try {
          const parsed_body = JSON.parse(body);
          validateData(parsed_body);
          const record = db.createUser(parsed_body);
          res.statusCode = 201;
          res.end(JSON.stringify(record));
        } catch (err) {
          res.statusCode = 400;
          res.end(
            JSON.stringify({
              message: err.message,
            })
          );
        }
      });
    } else if (
      req.url?.startsWith("/api/users/") &&
      req.method === httpMethods.PUT
    ) {
      const id = req.url?.substring(11);
      if (!validate(id)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: errors.invalid_uuid }));
        return;
      }
      let body = "";
      req.on("data", (chuck) => {
        body += chuck.toString();
      });
      req.on("end", () => {
        try {
          const parsed_body = JSON.parse(body);
          validateData(parsed_body);
          const record = db.updateUser(id, parsed_body);
          res.statusCode = 200;
          res.end(JSON.stringify(record));
        } catch (err) {
          if (err instanceof Error) {
            if (err.message === errors.missing_properties) {
              res.statusCode = 400;
              res.end(JSON.stringify({ message: errors.missing_properties }));
            } else {
              res.statusCode = 404;
              res.end(
                JSON.stringify({
                  message: errors.user_not_exist,
                })
              );
            }
          }
        }
      });
    } else if (
      req.url?.startsWith("/api/users/") &&
      req.method === httpMethods.DELETE
    ) {
      const id = req.url?.substring(11);
      if (!validate(id)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: errors.invalid_uuid }));
        return;
      }
      try {
        db.deleteUser(id);
        res.statusCode = 204;
        res.end();
      } catch (err) {
        if (err instanceof Error) {
          res.statusCode = 404;
          res.end(JSON.stringify({ message: err.message }));
        }
      }
    } else {
      res.statusCode = 404;
      res.end({ message: "404 Not Found" });
    }
  });
  server.listen(port, () => {
    console.log(`The server is running in port ${port}`);
  });
}
