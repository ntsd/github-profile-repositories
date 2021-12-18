import { handler } from "./handler";
require("dotenv").config();

async function run() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw Error("token not found");
  }
  handler({
    token,
    templateFile: "./example/TEMPLATE.md",
    renderFile: "./example/RENDER.md",
    limit: 5,
    repositoriesOrderBy: "STARGAZERS",
    contributedOrderBy: "STARGAZERS",
  });
}

run();
