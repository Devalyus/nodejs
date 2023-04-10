import { createGunzip } from "zlib";
import { pipeline, PassThrough } from "stream";
import { createReadStream, createWriteStream } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const decompress = async () => {
    // Write your code here 
    const stream = new PassThrough();
    const gunzip = createGunzip();
    const source = createReadStream(path.resolve(__dirname, "files", "archive.gz"));
    const destination = createWriteStream(path.resolve(__dirname, "files", "fileToCompress.txt"));

    source.pipe(gunzip).pipe(stream).pipe(destination);
};

await decompress();