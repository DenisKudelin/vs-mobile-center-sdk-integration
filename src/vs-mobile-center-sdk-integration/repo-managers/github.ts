/// <reference path="./github.d.ts" />
import * as Reqest from "request";
import * as FS from "fs";
import * as btoa from "btoa";

export class GitHub {
    /*
    private userName: string;
    private password: string;

    constructor(userName: string, password: string) {
        this.userName = userName;
        this.password = password;
    }*/

    private token: string;
    private login: string;

    constructor(token: string) {
        this.token = token;
    }

    private async getLogin() {
        if (!this.login) {
            const response = await this.request("GET", "user");
            const user = JSON.parse(response.body) as IGitHubUser;
            if (!user.login) {
                throw new Error(response.body);
            }

            this.login = user.login;
        }

        return this.login;
    }

    public async createFork(owner: string, repo: string) {
        const response = await this.request("POST", `repos/${owner}/${repo}/forks`);
        const repository = JSON.parse(response.body) as IGitHubRepository;
        if (!repository.id) {
            throw new Error(response.body);
        }

        return repository.clone_url;
    }

    public async createPullRequest(owner: string, repo: string, title: string, description: string, branchName: string) {
        const response = await this.request("POST", `repos/${owner}/${repo}/pulls`, {
            title: title,
            head: `${await this.getLogin()}:${branchName}`,
            base: branchName,
            body: description
        });
        const pullRequest = JSON.parse(response.body) as IGitHubPullRequest;
        if (!pullRequest.number) {
            throw new Error(response.body);
        }

        return pullRequest.number;
    }

    public async getRepo(owner: string, repo: string) {
        const response = await this.request("GET", `repos/${owner}/${repo}`);
        const repository = JSON.parse(response.body) as IGitHubRepository;
        if (!repository.id) {
            throw new Error(response.body);
        }

        return repository.clone_url;
    }

    public async closePullRequest(owner: string, repo: string, num: number) {
        const response = await this.request("PATCH", `repos/${owner}/${repo}/pulls/${num}`, {
            state: "closed"
        });
        const repository = JSON.parse(response.body) as IGitHubPullRequest;
        if (!repository.number) {
            throw new Error(response.body);
        }
    }

    public async deleteRepo(repo: string) {
        const response = await this.request("DELETE", `repos/${await this.getLogin()}/${repo}`);
        if (response.statusCode !== 204) {
            throw new Error(response.body);
        }
    }

    public async getUrlWithCredentials(url: string) {
        const login = await this.getLogin();
        const match = /(https?:\/\/).*?([a-z]+\.\w+?\/.+)/.exec(url);
        return `${match[1]}${login}:${this.token}@${match[2]}`;
    }

    private request(method: "POST" | "GET" | "PATCH" | "DELETE", path: string, body?: any) {
        return new Promise<any>((resolve, reject) => {
            Reqest(`https://api.github.com/${path}`, {
                method: method,
                headers: {
                    "User-Agent": "vs-mobile-center-app",
                    //"Authorization": `basic ${btoa(`${this.userName}:${this.password}`)}`,
                    "Authorization": `token ${this.token}`,
                    "Content-Type": "application/json"
                },
                body: body && JSON.stringify(body)
            }, (error, response, body) => {
                if (error) {
                    return reject(error);
                }

                resolve(response);
            });
        });
    }
}