import fetch from "node-fetch";
import { GITHUB_GRAPHQL_URL } from "./const";

interface Repository {
  name: string;
  url: string;
  stargazerCount: number;
  description?: string;
}

async function queryRepositories(token, username): Promise<any> {
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

export async function getRepositories(
  token: string,
  username: string
): Promise<Repository[]> {
  const query = await queryRepositories(token, username);
  return query.data.user.repositories.nodes;
}
