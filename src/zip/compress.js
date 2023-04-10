import { createGzip } from "zlib";
import { pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const compress = async () => {
    // Write your code here 
    const gzip = createGzip();
    const source = createReadStream(path.resolve(__dirname, "files", "fileToCompress.txt"));
    const destination = createWriteStream(path.resolve(__dirname, "files", "archive.gz"));

    pipeline(source, gzip, destination, (err) => {
        if (err) {
            throw new Error(err);
        }
    });
};

await compress();