# Example

## Repositories

{% for repo in repositories %}
Index: {{ forloop.index }}

Name: {{ repo.name }}

URL: {{ repo.url }}

Star: {{ repo.stargazerCount }}

Description: {{ repo.description }}

<hr />
{% endfor %}

## Contributed Repositories

{% for repo in contributed %}Index: {{ forloop.index }}

Name: {{ repo.name }}

URL: {{ repo.url }}

Star: {{ repo.stargazerCount }}

Description: {{ repo.description }}

Contributions:

{% for con in repo.contributions %} - {{ con.pullRequest.title }}
{% endfor %}

<hr />
{% endfor %}

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
