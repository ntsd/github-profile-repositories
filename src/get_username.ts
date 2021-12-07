import fetch from "node-fetch";
import { GITHUB_GRAPHQL_URL } from "./const";

async function queryUsername(token): Promise<any> {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const body = {
    query: `query { 
        viewer { 
          login
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

export async function getUsername(token: string): Promise<string> {
  const username = await queryUsername(token);
  return username.data.viewer.login;
}
