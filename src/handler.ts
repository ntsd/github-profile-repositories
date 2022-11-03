import { getUsername } from "./get_username";
import { getRepositories } from "./get_repositories";
import { getContributed } from "./get_contributed";
import { Liquid } from "liquidjs";
import * as fs from "fs";

export async function handler(cfg: Config): Promise<void> {
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

  return new Promise((resolve, reject) => {
    fs.readFile(cfg.templateFile, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const engine = new Liquid();
      const tpl = engine.parse(data);
      engine.render(tpl, { repositories, contributed }).then((result) => {
        try {
          fs.writeFileSync(cfg.renderFile, result);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  });
}
