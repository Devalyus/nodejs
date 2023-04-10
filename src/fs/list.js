import { readdir } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
    // Write your code here 
    const folderName = "files";
    const folderNameLocation = path.resolve(__dirname, folderName);

    readdir(folderNameLocation, (err, files) => {
        if (err && err.code === "ENOENT") {
            throw new Error("FS operation failed");
        }

        let filesInString = '';
        files.forEach((file, index) => {
            filesInString += index + 1 + ". " + file + "\n";
        });

        console.log(filesInString);
    });

};

await list();