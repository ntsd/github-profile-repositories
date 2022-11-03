import * as core from "@actions/core";
import { handler } from "./handler";

async function run() {
  const token = core.getInput("github-token", { required: true });
  const templateFile = core.getInput("template-file", { required: true });
  const renderFile = core.getInput("render-file", { required: true });
  const limit = parseInt(core.getInput("limit", { required: true }));

  const repositoriesOrderBy = core.getInput("repositories-order-by", {
    required: true,
  });
  const contributedOrderBy = core.getInput("contributed-order-by", {
    required: true,
  });

  handler({
    token,
    templateFile,
    renderFile,
    limit,
    repositoriesOrderBy,
    contributedOrderBy,
  })
    .then(() => {
      core.info(
        `render successful, template ${templateFile} output ${renderFile}`
      );
    })
    .catch((err) => {
      core.setFailed(err);
    });
}

run();
