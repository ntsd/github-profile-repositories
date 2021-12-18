import fetch from "node-fetch";
import { GITHUB_GRAPHQL_URL } from "./const.js";

async function queryUsername(token): Promise<GithubResponse> {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const body = {
    query: `query { 
        viewer { 
          login
          createdAt
        }
      }`,
  };
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await response.json();
  return data as GithubResponse;
}

export async function getUsername(token: string): Promise<User> {
  const username = await queryUsername(token);
  return username.data.viewer;
}
