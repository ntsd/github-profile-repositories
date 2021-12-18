# Example

## Repositories


Index: 1

Name: freqtrade-configs

URL: https://github.com/ntsd/freqtrade-configs

Star: 19

Description: 

<hr />

Index: 2

Name: shopee-autobuy

URL: https://github.com/ntsd/shopee-autobuy

Star: 13

Description: 

<hr />

Index: 3

Name: dotfiles

URL: https://github.com/ntsd/dotfiles

Star: 3

Description: My Dotfiles

<hr />

Index: 4

Name: docker-templates

URL: https://github.com/ntsd/docker-templates

Star: 3

Description: My docker templates for make things easier to setup

<hr />

Index: 5

Name: alpha-interface

URL: https://github.com/ntsd/alpha-interface

Star: 2

Description: A Hackathon project created by Alpha Interface team for Agri-D Food Hack

<hr />

Index: 6

Name: my-solutions

URL: https://github.com/ntsd/my-solutions

Star: 2

Description: My problems solving and competitive programming solutions

<hr />

Index: 7

Name: auto-request-changes-action

URL: https://github.com/ntsd/auto-request-changes-action

Star: 1

Description: 👍 GitHub Action for automatically request changes GitHub pull requests

<hr />

Index: 8

Name: python-data-structures-algorithms

URL: https://github.com/ntsd/python-data-structures-algorithms

Star: 1

Description: Data structure and Algorithm templates for Python 

<hr />

Index: 9

Name: odoo-react-example

URL: https://github.com/ntsd/odoo-react-example

Star: 1

Description: 

<hr />

Index: 10

Name: Apache-Beam-Examples

URL: https://github.com/ntsd/Apache-Beam-Examples

Star: 1

Description: 

<hr />


## Contributed Repositories

Index: 1

Name: freqtrade

URL: https://github.com/freqtrade/freqtrade

Star: 14105

Description: Free, open source crypto trading bot

Contributions:

 - Add show Pairlists Whitelist on RFC and Telegram


<hr />
Index: 2

Name: Yosoro

URL: https://github.com/IceEnd/Yosoro

Star: 2595

Description: :shaved_ice:Beautiful Markdown NoteBook. 🏖

Contributions:

 - Update webpack version in package.json
 - Merge Medium Post


<hr />
Index: 3

Name: crontab-ui

URL: https://github.com/alseambusher/crontab-ui

Star: 1785

Description: Easy and safe way to manage your crontab file

Contributions:

 - Make right click paste work


<hr />
Index: 4

Name: carbon-charts

URL: https://github.com/carbon-design-system/carbon-charts

Star: 426

Description: :bar_chart: :chart_with_upwards_trend:⠀Robust dataviz framework implemented using D3 & typescript

Contributions:

 - feat(pie): add sortFunction option for pie chart
 - feat(pie): add sortFunction option for pie chart


<hr />
Index: 5

Name: spotify-github-profile

URL: https://github.com/kittinan/spotify-github-profile

Star: 389

Description: Show your Spotify playing on your Github profile

Contributions:

 - Add open in Spotify link option
 - Fix avoid to load image when cover_image is false
 - Add hidden cover image option


<hr />
Index: 6

Name: webring

URL: https://github.com/wonderfulsoftware/webring

Star: 99

Description: “วงแหวนเว็บ” แห่งนี้สร้างขึ้นเพื่อส่งเสริมให้ศิลปิน นักออกแบบ และนักพัฒนาชาวไทย สร้างเว็บไซต์ของตัวเองและแบ่งปันการเข้าชมซึ่งกันและกัน

Contributions:

 - fix: change ntsd.me to ntsd.dev
 - Add ntsd.me


<hr />
Index: 7

Name: Hacktoberfest-2020-FizzBuzz

URL: https://github.com/NullDev/Hacktoberfest-2020-FizzBuzz

Star: 68

Description: :jack_o_lantern: Submit creative/abstract FizzBuzz solutions in any language you want! 

Contributions:

 - Add fizzbuzz python golf by number of characters
 - Add fizzbuzz code-golf python
 - Rename fizzbuzz go concurrency
 - Add fizzbuzz go concurrency


<hr />
Index: 8

Name: git-garden

URL: https://github.com/heypoom/git-garden

Star: 37

Description: Visualizes your git commit history into a grid of trees. More green = more commits!

Contributions:

 - Add tile hover


<hr />
Index: 9

Name: coffee-to-code

URL: https://github.com/narze/coffee-to-code

Star: 30

Description: Developers converting coffee to code in many ways possible.

Contributions:

 - Add energy equal my code power 2


<hr />
Index: 10

Name: baht.js

URL: https://github.com/narze/baht.js

Star: 28

Description: Convert number to Thai Baht format, but faster [O(n)] & fully typed.

Contributions:

 - perf: replace array.form with for loop


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
