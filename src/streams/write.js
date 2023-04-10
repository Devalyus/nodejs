import fs from 'fs';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
    // Write your code here 
    const writeStream = fs.createWriteStream(path.resolve(__dirname, "files", "fileToWrite.txt"));
    process.stdin.on('data', data => {
        writeStream.write(data.toString());
    });
};

await write();