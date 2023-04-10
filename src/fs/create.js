import { open, writeFile } from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    // Write your code here
    const location = path.resolve(__dirname, "files", "fresh.txt");
    try {
        const file = await open(location, "wx");
        await writeFile(location, "I am fresh and young");
    } catch (err) {
        if (err.code === "EEXIST") {
            throw new Error("FS Operation failed")
        }
    }
};

await create();