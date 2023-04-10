import { access, constants, copyFile, mkdir, readdir } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    // Write your code here 
    const sourceFold = "files";
    const destFold = "files_copy";

    const sourceFoldLocation = path.resolve(__dirname, sourceFold);
    const destFoldLocation = path.resolve(__dirname, destFold);

    access(sourceFoldLocation, constants.F_OK, (err) => {
        if (err) {
            throw new Error("FS Operation failed");
        }

        mkdir(destFoldLocation, (err) => {
            if (err && err.code === "EEXIST") {
                throw new Error("FS Operation failed");
            }

            readdir(sourceFoldLocation, (err, files) => {
                if (err && err.code === "ENOENT") {
                    throw new Error("FS Operation failed");
                }

                files.forEach(file => {
                    copyFile(path.resolve(__dirname, sourceFold, file), path.resolve(__dirname, destFold, file), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                })
            })
        })
    })
};

await copy();
