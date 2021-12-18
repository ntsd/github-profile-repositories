import fetch from 'node-fetch'
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
                  isPrivate
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
  return data as GithubResponse;
}

export async function getRepositories(
  input: GetRepositoriesInput
): Promise<Repository[]> {
  const query = await queryRepositories(input);
  return query.data.user.repositories.nodes
    .filter((r) => !r.isPrivate)
    .slice(0, input.limit);
}
