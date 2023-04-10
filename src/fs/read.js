import { readFile } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const file = "fileToRead.txt";
    const fileLocation = path.resolve(__dirname, "files", file);

    readFile(fileLocation, 'utf-8', (err, data) => {
        if (err && err.code === "ENOENT") {
            throw new Error("FS operation failed");
        }
        console.log(data);
    });
};

await read();