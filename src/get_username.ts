import fetch from "node-fetch";
import { GITHUB_GRAPHQL_URL } from "./const";

async function queryUsername(token): Promise<GithubResponse> {
  return new Promise<GithubResponse>((resolve, reject) => {
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
    fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.errors) {
          reject(json.errors[0].message);
          return;
        }
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getUsername(token: string): Promise<User> {
  const username = await queryUsername(token);
  return username.data.viewer;
}
