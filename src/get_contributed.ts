import fetch from "node-fetch";
import { GITHUB_GRAPHQL_URL } from "./const";

async function queryContributed(token, username) {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const body = {
    query: `query {
            user(login: "${username}") {
              contributionsCollection {
                pullRequestContributionsByRepository(maxRepositories: 100, excludeFirst:true) {
                  repository {
                    name
                    url
                    stargazerCount
                    isPrivate
                  }
                  contributions(first: 10) {
                    nodes {
                      url
                      pullRequest {
                        title
                        repository {
                          name
                          url
                        }
                        createdAt
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
  const data = await response.json();
  return data;
}

export async function getContributed(token: string, username: string) {
  const contributed = queryContributed(token, username);
}
