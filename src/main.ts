import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  const token = core.getInput("github-token", { required: true });
}

run();
