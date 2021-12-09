import { getUsername } from "./get_username";
import { getRepositories } from "./get_repositories";

interface Config {
  Token: string;
  TemplateFile: string;
}

export async function handler(token: string) {
  const username = await getUsername(token);
  console.log(username);
  const repositories = await getRepositories(token, username);
  console.log(repositories);
}
