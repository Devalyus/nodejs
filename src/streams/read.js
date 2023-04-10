import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    // Write your code here 
    const readableStream = fs.createReadStream(path.resolve(__dirname, "files", "fileToRead.txt"), { encoding: 'utf-8' });
    readableStream.on('data', (data) => {
        process.stdout.write(data);
    });

    readableStream.on('end', () => {
        console.log('\n\nFinished reading the file');
    });

    readableStream.on('error', (err) => {
        console.error(err);
    });
};

await read();