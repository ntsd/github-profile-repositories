# Github Profile Repositories

Name: `github-profile-repositories`

Automatically create repositories list for your Github Profile.

## Template file

This action required a template file which it's required input `template-file`. The template file will render by [LiquidJS](https://liquidjs.com/).
You can find the example template file [here](https://github.com/ntsd/github-profile-repositories/blob/master/example/TEMPLATE.md).
The template file will render to required input `render-file`.

### Template Parameters

repositories

```GraphQL
repositories [
  {
    name
    url
    stargazerCount
    isPrivate
    description
  }
]
```

contributed

```GraphQL
contributed [
  {
    name
    url
    stargazerCount
    isPrivate
    description
    owner {
      login
    }
    contributions [
      {
        occurredAt
        pullRequest {
          title
          url
        }
      }
    ]
  }
]
```

## Inputs

`github-token` - This action required Github Token which it's required input. The token will use to query owner repositories and contributions repositories to the [Github GraphQL API](https://docs.github.com/en/graphql). `required`.

`template-file` - The file template to render. `required`.

`render-file` - The rendered out put file. `required`.

`limit` - The limit number of repositories will render, max 25. `Default 10`.

`repositories-order-by` - The method to sort the repositories list. Support (STARGAZERS|CREATED_AT|UPDATED_AT|PUSHED_AT|NAME). `Default STARGAZERS`.

`contributed-order-by` - The method to sort the contributed repositories list. Support (STARGAZERS|OCCURRED_AT). `Default STARGAZERS`.

## Examples

### Simple

```yml
name: Generate Github Profile
on: push

jobs:
  github-profile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Github Profile Repositories
        uses: ntsd/github-profile-repositories@master
        with:
          github-token: "${{ secrets.MY_GITHUB_TOKEN }}"
          template-file: "./TEMPLATE.md"
          render-file: "./README.md"
      - name: Commit files
        run: |
          git config --local user.email "ntsd@users.noreply.github.com"
          git config --local user.name "ntsd"
          git commit -am "docs: auto update README.md"
          git push
```

### Full configs

```yml
name: Generate Github Profile
on: push

jobs:
  github-profile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Github Profile Repositories
        uses: ntsd/github-profile-repositories@master
        with:
          github-token: "${{ secrets.MY_GITHUB_TOKEN }}"
          template-file: "./TEMPLATE.md"
          render-file: "./README.md"
          limit: 20
          repositories-order-by: "UPDATED_AT"
          contributed-order-by: "OCCURRED_AT"
      - name: Commit files
        run: |
          git config --local user.email "ntsd@users.noreply.github.com"
          git config --local user.name "ntsd"
          git commit -am "docs: auto update README.md"
          git push
```

## Resources

<https://docs.github.com/en/graphql/overview/explorer>

<https://docs.github.com/en/graphql/reference/objects#contributionscollection>
