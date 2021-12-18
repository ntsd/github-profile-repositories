# Github Profile Repositories

Name: `github-profile-repositories`

Automatically create repositories list for your Github Profile.

## Template file

This action required a template file which it's required input `template-file`. The template file will render by [LiquidJS](https://liquidjs.com/).
You can find the example template file [here](https://github.com/ntsd/github-profile-repositories/blob/master/example/TEMPLATE.md).
The template file will render to required input `render-file`.

## Github Token

This action required Github Token which it's required input `github-token`. The token will use to query owner repositories and contributions repositories to the [Github GraphQL API](https://docs.github.com/en/graphql).

## Example

```yml
name: Generate Github Profile
on: [push, pull_request]

jobs:
  github-profile:
    runs-on: ubuntu-latest
    steps:
      - name: Github Profile Repositories
        uses: ntsd/github-profile-repositories
        with:
          github-token: "${{ secrets.MY_GITHUB_TOKEN }}"
          template-file: "TEMPLATE.md"
          render-file: "README.md"
      - name: Commit files
        run: |
          git commit -m "docs: auto update README.md" -a
      - name: Push changes
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.MY_GITHUB_TOKEN }}
```

## Resources

<https://docs.github.com/en/graphql/overview/explorer>

<https://docs.github.com/en/graphql/reference/objects#contributionscollection>
