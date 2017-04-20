import { run } from "./SdkIntegration";
import * as FS from "fs";

/*var GitHubApi = require("github");

var github = new GitHubApi({
    // optional 
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub 
    pathPrefix: "/api/v3", // for some GHEs; none for GitHub 
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent 
    },
    Promise: require('bluebird'),
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects 
    timeout: 5000
});

github.authenticate({
    type: "oauth",
    token: FS.readFileSync("D:\\githubTestToken.txt", "utf8")
});

github.repos.fork({
    owner: "DenisKudelin",
    repo: "mobile-center-sdk-test",
}, () => {
    debugger;
})*/

run("github", "DenisKudelin", "Alarm", "master")
    .then(() => process.exit(), () => process.exit(1));

/*import * as FS from "fs";
import { runXcodeSDKIntegration, MobileCenterSDKModule } from "./SDKIntegration/XcodeSDKIntegrationSteps";

const errors: string[] = [];

const projectPath = getParameterValue("-p");// || "D:\\Projects\\mobile-center-sdk-test.git";
if (!projectPath) {
    errors.push('Please specify the path to the iOS project.');
}

const appSecret = getParameterValue("-s");// || "myAppSecret";
if (!appSecret) {
    errors.push('Please specify your App Secret key.');
}

let sdkModules: MobileCenterSDKModule;//= MobileCenterSDKModule.Analytics | MobileCenterSDKModule.Crashes | MobileCenterSDKModule.Distribute;
sdkModules |= getParameterIfDefined("--analytics", MobileCenterSDKModule.Analytics);
sdkModules |= getParameterIfDefined("--crashes", MobileCenterSDKModule.Crashes);
sdkModules |= getParameterIfDefined("--distribute", MobileCenterSDKModule.Distribute);

if (!sdkModules) {
    errors.push('Please specify sdk modules.');
}

function getParameterValue(name: string): string {
    const index = process.argv.indexOf(name);
    return (~index) ? process.argv[index + 1] : null;
}

function getParameterIfDefined(name: string, value: number): number {
    return (~process.argv.indexOf(name)) ? value : 0;
}

if (!errors.length) {
    runXcodeSDKIntegration(projectPath, appSecret, sdkModules).catch(x => console.error(x));
} else {
    errors.forEach(x => console.error(x));
}
*/