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
