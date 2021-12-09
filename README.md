# Github Profile Repositories

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
                      url
                      pullRequest {
                        title
                        repository {
                          name
                          url
                        }
                        createdAt
                      }
                    }
                  }
                }
                # pullRequestContributions(first: 5){
                #   nodes{
                #     pullRequest {
                #       title
                #       repository {
                #         name
                #         url
                #       }
                #     }
                #   }
                # }
                totalRepositoriesWithContributedPullRequests
                totalRepositoriesWithContributedCommits
              }
            }
          }
```

<https://stackoverflow.com/a/59042992/5768508>

<https://docs.github.com/en/graphql/overview/explorer>

<https://docs.github.com/en/graphql/reference/objects#contributionscollection>
