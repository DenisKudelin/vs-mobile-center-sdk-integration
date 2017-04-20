 /*   public async authenticate(login: string, password: string) {
    const loginResponse = await this.request("GET", "login");
    const authenticity_token = /<input\s+?name="authenticity_token".+?value="(.+?)"\s*\/>/.exec(loginResponse.body)[1];
    const sessionResponse = await this.request("POST", "session", {
        commit: "Sign in",
        utf8: "✓",
        authenticity_token: authenticity_token,
        login: login,
        password: password
    });
}

    private request(method: "POST" | "GET", path: string, form ?: any) {
    return new Promise<any>((resolve, reject) => {
        Reqest(`https://github.com/${path}`, {
            method: method,
            headers: {
                "User-Agent": "vs-mobile-center-app"
            },
            form: form
        }, (error, response, body) => {
            if (error) {
                return reject(error);
            }

            resolve(response);
        });
    });
}*/