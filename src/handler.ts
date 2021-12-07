import { getUsername } from "./get_username";

export async function handler(token: string) {
  const username = await getUsername(token);
  console.log(username)
}
