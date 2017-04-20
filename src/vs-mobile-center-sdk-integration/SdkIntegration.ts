import * as RepoManagers from "./repo-managers/index";
import { TempGitRepository } from "./git/TempGitRepository";
import * as FS from "fs";
import { runXcodeSDKIntegration, MobileCenterSDKModule } from "D:\\Projects\\vs-mobile-center-sdk-ios-test\\lib\\vs-mobile-center-sdk-ios-test\\SDKIntegration\\XcodeSDKIntegrationSteps";

export async function run(host: string = "github", owner: string, repo: string, branchName: string) {
    const repoManager = RepoManagers.forSourceHost(host);
    const repoUrl = await repoManager.getRepo(owner, repo);
    const gitRepo = new TempGitRepository(repoUrl, owner, repo);
    let pullRequestNumber: number;

    try {
        console.log("Clone the target repository");
        await gitRepo.clone(branchName);

        console.log("Integrate SDK");
        await runXcodeSDKIntegration(gitRepo.directory, "appTestToken", MobileCenterSDKModule.Analytics | MobileCenterSDKModule.Crashes | MobileCenterSDKModule.Distribute);
        const changedFiles = await gitRepo.diffNameOnly();
        if (!changedFiles.length) {
            return;
        }

        console.log("Stage changes");
        await gitRepo.addAll();

        console.log("Commit changes");
        await gitRepo.commit("VS mobile SDK integration");

        console.log("Create the fork");
        const forkRepoUrl = await repoManager.createFork(owner, repo);

        console.log("Push changes to the fork");
        const forkRepoUrlWithCredentials = await repoManager.getUrlWithCredentials(forkRepoUrl);
        const result = await gitRepo.pushTo(forkRepoUrlWithCredentials);
        if (!result[0].startsWith("To ")) {
            throw new Error(result.join("\n"));
        }

        console.log("Create the pull request");
        await repoManager.createPullRequest(owner, repo, "VS mobile SDK integration", "", branchName);
    } finally {
        console.log("Delete the repository");
        repoManager.deleteRepo(repo);

        console.log("Delete local files");
        gitRepo.delete();

        // For testing
        //repoManager.closePullRequest(owner, repo, pullRequestNumber);
    }

    console.log("Done!");
}