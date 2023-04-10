import { spawn } from "child_process";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
    // Write your code here
    const child = spawn('node', [path.resolve(__dirname, "files", "script.js"), ...args]);

    // listen for input from stdin
    process.stdin.on('data', (data) => {
        // send input to the child process
        child.stdin.write(data);
    });

    // listen for data from the child process
    child.stdout.on('data', (data) => {
        // send data to the parent process stdout
        process.stdout.write(data);
    });

};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2', 'arg3']);
