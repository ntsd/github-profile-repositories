import { handler } from './handler';
require("dotenv").config();

async function run() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw Error("token not found");
  }
  handler(token);
}

run();
