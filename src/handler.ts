import { getUsername } from "./get_username.js";
import { getRepositories } from "./get_repositories.js";
import { getContributed } from "./get_contributed.js";
import { Liquid } from "liquidjs";
import * as fs from "fs";

export async function handler(cfg: Config) {
  const user = await getUsername(cfg.token);

  const repositories = await getRepositories({
    token: cfg.token,
    user,
    limit: cfg.limit,
    orderBy: cfg.repositoriesOrderBy,
  });

  const contributed = await getContributed({
    token: cfg.token,
    user,
    limit: cfg.limit,
    orderBy: cfg.contributedOrderBy,
  });

  fs.readFile(cfg.templateFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const engine = new Liquid();
    const tpl = engine.parse(data);
    engine.render(tpl, { repositories, contributed }).then((result) => {
      try {
        fs.writeFileSync(cfg.renderFile, result);
        console.log("render successful");
      } catch (err) {
        console.error(err);
      }
    });
  });
}
