import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data/countries.json");

export async function getData() {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

export async function writeData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
