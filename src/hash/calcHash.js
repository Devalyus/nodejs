import crypto from "crypto";
import { readFile } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
    // Write your code here 

    readFile(path.resolve(__dirname, "files", "fileToCalculateHashFor.txt"), (err, data) => {
        if (err) {
            throw new Error(err);
        }
        const hash = crypto.createHash('sha256').update(data).digest('hex');
        console.log(hash);
    }
    );
};

await calculateHash();