import { unlink } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
    // Write your code here 
    const fileToRemove = "fileToRemove.txt";
    const fileToRemoveLocation = path.resolve(__dirname, "files", fileToRemove);

    unlink(fileToRemoveLocation, (err) => {
        if (err && err.code === "ENOENT") {
            throw new Error("FS Operation failed");
        }
    });

};

await remove();