interface User {
  login: string;
  createdAt: string;
}

interface Repository {
  name: string;
  url: string;
  stargazerCount: number;
  isPrivate: boolean;
  description?: string;
}

interface Contributed {
  name: string;
  url: string;
  stargazerCount: number;
  isPrivate: boolean;
  description?: string;
  contributions: {
    occurredAt: string;
    pullRequest: {
      url: string;
      title: string;
    };
  }[];
}

interface Config {
  token: string;
  templateFile: string;
  renderFile: string;
  limit: number;
  repositoriesOrderBy: string;
  contributedOrderBy: string;
}

interface GithubResponse {
  data: {
    user: {
      contributionsCollection;
      repositories;
    };
    viewer: User;
  };
}
