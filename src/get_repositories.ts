import fetch from "node-fetch";
import { GITHUB_GRAPHQL_URL } from "./const";

export interface GetRepositoriesInput {
  token: string;
  user: User;
  limit: number;
  orderBy: string;
}

async function queryRepositories(
  input: GetRepositoriesInput
): Promise<GithubResponse> {
  return new Promise<GithubResponse>((resolve, reject) => {
    const headers = {
      Authorization: `bearer ${input.token}`,
    };
    const body = {
      query: `query {
        user(login: "${input.user.login}") {
          repositories(first: ${input.limit * 2}, orderBy: {field: ${
        input.orderBy
      }, direction: DESC}) {
            nodes {
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
            }
          }
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

export async function getRepositories(
  input: GetRepositoriesInput
): Promise<Repository[]> {
  const query = await queryRepositories(input);
  return query.data.user.repositories.nodes
    .filter((r) => !r.isPrivate)
    .slice(0, input.limit);
}
