import { Worker } from "worker_threads";
import path, { dirname, resolve } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const performCalculations = async () => {
    // Write your code here
    const numbers = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    const results = [];

    const promises = numbers.map(n => {
        return new Promise((resolve, reject) => {
            const worker = new Worker(path.resolve(__dirname, "worker.js"), { workerData: n });
            worker.on('message', result => {
                if (result) {
                    resolve({
                        data: result,
                        status: 'resolved'
                    });
                } else {
                    reject({
                        data: null,
                        status: 'error'
                    });
                }
            });
        });
    });

    Promise.all(promises).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });

};

await performCalculations();