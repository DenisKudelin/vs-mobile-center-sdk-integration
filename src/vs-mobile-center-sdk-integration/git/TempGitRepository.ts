import { spawn } from "child_process";
import * as FS from "fs";
import * as Path from "path";
import * as Mkdirp from "mkdirp";
import * as Rimraf from "rimraf";

export class TempGitRepository {
    static tempFolder: string = Path.join(__dirname, "../../../tempGitRepositories");
    private url: string;
    public directory: string;

    constructor(url: string, owner: string, repo: string) {
        this.url = url;
        this.directory = Path.join(
            TempGitRepository.tempFolder,
            /https?:\/\/.*?([a-z]+)\.\w+?\//.exec(url)[1],
            owner,
            repo
        );
    }

    public async clone(branchName: string = "master") {
        this.delete();
        await this.exec(["clone", "-b", branchName, "--single-branch", this.url, "./"]);
    }

    public async diffNameOnly() {
        const result = await this.exec(["diff", "--name-only"]);
        return result[0] ? result[0].split("\n"): [];
    }

    public async commit(message: string) {
        return await this.exec(["commit", "-m", message]);
    }

    public async addAll() {
        return await this.exec(["add", "-A"]);
    }

    public async pushTo(remote: string, branchName: string = "master") {
        return await this.exec(["push", remote, branchName]);
    }

    private exec(args: string[]): Promise<string[]> {
        if (!FS.existsSync(this.directory)) {
            Mkdirp.sync(this.directory);
        }

        return new Promise((resolve, reject) => {
            const childProcess = spawn("git", args, {
                cwd: this.directory
            });
            const stdout: string[] = [];
            childProcess.stdout.on("data", (data) => stdout.push(data.toString()));
            childProcess.stderr.on("data", (data) => stdout.push(data.toString()));
            childProcess.on("error", reject);
            childProcess.on("exit", () => resolve(stdout));
        });
    }

    public delete() {
        Rimraf.sync(this.directory);
    }
}