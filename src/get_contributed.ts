import fetch from "node-fetch";
import { GITHUB_GRAPHQL_URL } from "./const";

export interface GetContributedInput {
  token: string;
  user: User;
  limit: number;
  orderBy: string;
}

async function getContributedByYear(
  token: string,
  user: User,
  year: number
): Promise<GithubResponse> {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const body = {
    query: `query {
            user(login: "${user.login}") {
              contributionsCollection(from: "${year}-01-01T00:00:00", to: "${year}-12-31T23:59:59") {
                pullRequestContributionsByRepository(maxRepositories: 100, excludeFirst:true) {
                  repository {
                    name
                    url
                    stargazerCount
                    forkCount
                    isPrivate
                    description
                    createdAt
                    updatedAt
                    primaryLanguage {
                      name
                      color
                    }
                    owner {
                      login
                    }
                  }
                  contributions(first: 10) {
                    nodes {
                      occurredAt
                      pullRequest {
                        title
                        url
                        createdAt
                        updatedAt
                        closed
                        closedAt
                        merged
                        mergedAt
                      }
                    }
                  }
                }
              }
            }
          }`,
  };
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  return response.json() as Promise<GithubResponse>;
}

async function queryContributed(
  input: GetContributedInput
): Promise<Contributed[]> {
  const createdAt = new Date(input.user.createdAt);
  const nowDate = new Date();
  const startYear = createdAt.getFullYear();
  const endYear = nowDate.getFullYear();
  let contributedPromiseArray: Promise<GithubResponse>[] = [];
  for (let year = startYear; year <= endYear; year++) {
    contributedPromiseArray.push(
      getContributedByYear(input.token, input.user, year)
    );
  }
  return Promise.all(contributedPromiseArray).then((results) => {
    const contributionsRepoArrays = results.map(
      (response) =>
        response.data.user.contributionsCollection
          .pullRequestContributionsByRepository
    );
    return contributionsRepoArrays
      .flat(Infinity)
      .map((r) => {
        let repo = r.repository;
        repo.contributions = r.contributions.nodes;
        return repo;
      })
      .filter((r) => !r.isPrivate);
  });
}

export async function getContributed(
  input: GetContributedInput
): Promise<Contributed[]> {
  let contributed = await queryContributed(input);

  // remove duplicated
  contributed = contributed.filter(
    (value, index, self) => index === self.findIndex((t) => t.url === value.url)
  );

  switch (input.orderBy) {
    case "STARGAZERS":
      contributed = contributed.sort(
        (a, b) => b.stargazerCount - a.stargazerCount
      );
      break;
    case "OCCURRED_AT":
      contributed = contributed.sort(
        (a, b) =>
          new Date(b.contributes[0]?.occurredAt).getTime() -
          new Date(a.contributes[0]?.occurredAt).getTime()
      );
      break;
    default:
  }

  return contributed.slice(0, input.limit);
}
