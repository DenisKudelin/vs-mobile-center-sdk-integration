import { GitHub } from "./github";

export function forSourceHost(host: string): GitHub {
    const token = require("fs").readFileSync("D:\\githubTestToken.txt", "utf8").split(" ");
    switch (host) {
        case "github": return new GitHub(token);
        default: throw new Error(`There's no repo manager for "${host}"`);
    }
}