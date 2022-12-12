# Example

## Repositories


Index: 1

Name: Lissy93

URL: https://github.com/ntsd/Lissy93

Star: 0

Description: 🥳 Hello World!

<hr />

Index: 2

Name: sui-move-example

URL: https://github.com/ntsd/sui-move-example

Star: 0

Description: 

<hr />

Index: 3

Name: guess-number-evm

URL: https://github.com/ntsd/guess-number-evm

Star: 0

Description: A guess number game on EVM

<hr />

Index: 4

Name: liquidjs-action

URL: https://github.com/ntsd/liquidjs-action

Star: 2

Description: Github Action to render LiquidJS

<hr />

Index: 5

Name: homebrew-cross-clipboard

URL: https://github.com/ntsd/homebrew-cross-clipboard

Star: 0

Description: 

<hr />


## Contributed Repositories

Index: 1

Name: hacktoberfest-museum

URL: https://github.com/creatorsgarten/hacktoberfest-museum

Star: 19

Description: Gallery of awesome Hacktoberfest projects made in Thailand. Part of the Hacktoberfest Thailand 2022 event.

Contributions:

 - docs: add cross clipboard


<hr />
Index: 2

Name: react-useless

URL: https://github.com/narze/react-useless

Star: 46

Description: Monorepo for react hooks, mostly useless btw

Contributions:

 - refactor: use google and use thanos
 - feat: add useTiktok
 - feat: add use thanos
 - feat: add use map
 - feat: add useGoogle


<hr />
Index: 3

Name: awesome-salim-quotes

URL: https://github.com/narze/awesome-salim-quotes

Star: 73

Description: "ผมไม่ใช่สลิ่มนะ แต่..."

Contributions:

 - feat: add 2 salim quotes


<hr />
Index: 4

Name: Mercenaries-Farm-bot

URL: https://github.com/Efemache/Mercenaries-Farm-bot

Star: 29

Description: Bot for Hearthstone mercenaries mode

Contributions:

 - Feat/gen tmp img
 - Feat/better target friend
 - Fix/new resolution
 - new: add notification hook
 - new: add notification hook


<hr />
Index: 5

Name: NostalgiaForInfinity

URL: https://github.com/ntsd/NostalgiaForInfinity

Star: 0

Description: Trading strategy for the Freqtrade crypto bot

Contributions:

 - Merge upstream
 - Merge conflict fix
 - Fetch upstream
 - Merge from upstream
 - Merge conflict


<hr />


```graphQL
query {
            user(login: "ntsd") {
              name
              repositories(first: 10, orderBy: {field:STARGAZERS, direction: DESC}) {
                nodes {
                  name
                  url
                  stargazerCount
                }
              }
              contributionsCollection {
                pullRequestContributionsByRepository(maxRepositories: 100, excludeFirst:true) {
                  repository {
                    name
                    url
                    stargazerCount
                    isPrivate
                  }
                  contributions(first: 10) {
                    nodes {
                      occurredAt
                      pullRequest {
                        title
                        url
                      }
                    }
                  }
                }
                pullRequestContributions(first: 5){
                  nodes{
                   pullRequest {
                     title
                      repository {
                        name
                        url
                      }
                   }
                  }
                }
                totalRepositoriesWithContributedPullRequests
                totalRepositoriesWithContributedCommits
              }
            }
          }
```
