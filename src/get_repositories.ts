import fetch from "node-fetch";
import { GITHUB_GRAPHQL_URL } from "./const";

async function queryRepositories(token, username) {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const body = {
    query: `query {
            user(login: "${username}") {
              repositories(first: 10, orderBy: {field:STARGAZERS, direction: DESC}) {
                nodes {
                  name
                  url
                  stargazerCount
                  description
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

export async function getRepositories(token: string, username: string) {
  const repositories = queryRepositories(token, username);
}
