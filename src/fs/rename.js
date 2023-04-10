import { existsSync, rename as rn } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
    const wrongFile = 'wrongFilename.txt';
    const rightFile = 'properFilename.md';
    const wrongFileLocation = path.resolve(__dirname, "files", wrongFile);
    const rightFileLocation = path.resolve(__dirname, "files", rightFile);

    if (existsSync(rightFileLocation)) {
        throw new Error("FS Operation failed");
    }

    rn(wrongFileLocation, rightFileLocation, (err) => {
        if (err && err.code === "ENOENT") {
            throw new Error("FS Operation failed");
        }
        console.log(err);
    });
};

await rename();