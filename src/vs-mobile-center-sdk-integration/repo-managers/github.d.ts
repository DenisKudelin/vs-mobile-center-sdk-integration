interface IGitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name?: any;
    company?: any;
    blog?: any;
    location?: any;
    email?: any;
    hireable?: any;
    bio?: any;
    public_repos?: number;
    public_gists?: number;
    followers?: number;
    following?: number;
    created_at?: Date;
    updated_at?: Date;
}

interface IGitHubPermissions {
    admin: boolean;
    push: boolean;
    pull: boolean;
}

interface IGitHubOrganization {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

interface IGitHubRepository {
    id: number;
    name: string;
    full_name: string;
    owner: IGitHubUser;
    private: boolean;
    html_url: string;
    description?: any;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: Date;
    updated_at: Date;
    pushed_at: Date;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage?: any;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language?: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url?: any;
    open_issues_count: number;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    permissions?: IGitHubPermissions;
    parent?: IGitHubRepository;
    source?: IGitHubRepository;
    network_count?: number;
    subscribers_count?: number;
    topics?: string[];
    allow_rebase_merge?: boolean;
    allow_squash_merge?: boolean;
    allow_merge_commit?: boolean;
    organization?: IGitHubOrganization;
}

interface IGitHubPullRequest {
    id: number;
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    number: number;
    state: string;
    title: string;
    body: string;
    assignee: IGitHubUser;
    milestone: IGitHubMilestone;
    locked: boolean;
    created_at: Date;
    updated_at: Date;
    closed_at: Date;
    merged_at: Date;
    head: IGitHubCommit;
    base: IGitHubCommit;
    _links: IGitHubLinks;
    user: IGitHubUser;
    merge_commit_sha: string;
    merged: boolean;
    mergeable: boolean;
    merged_by: IGitHubUser;
    comments: number;
    commits: number;
    additions: number;
    deletions: number;
    changed_files: number;
    maintainer_can_modify: boolean;
}

interface IGitHubCommit {
    label: string;
    ref: string;
    sha: string;
    user: IGitHubUser;
    repo: IGitHubRepository;
}

interface IGitHubMilestone {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    number: number;
    state: string;
    title: string;
    description: string;
    creator: IGitHubUser;
    open_issues: number;
    closed_issues: number;
    created_at: Date;
    updated_at: Date;
    closed_at: Date;
    due_on: Date;
}

interface IGitHubLinks {
    self: IGitHubLink;
    html: IGitHubLink;
    issue: IGitHubLink;
    comments: IGitHubLink;
    review_comments: IGitHubLink;
    review_comment: IGitHubLink;
    commits: IGitHubLink;
    statuses: IGitHubLink;
}

interface IGitHubLink {
    href: string;
}