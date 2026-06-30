# Commands to rectify some syntax if required

## trailing version syntax error
Regex command:
a universal script that strips trailing @version syntax from any import inside your code files.

```regex
grep -rl '@[0-9]' src/ | xargs sed -i '' -E 's/([a-zA-Z0-9\/@-]+)@[0-9.]+/\1/g'
```

## github deploy change pages to deploy from actions instead of default branch

```
gh api --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/:owner/:repo/pages \
  -f "build_type=workflow"
```

then rerun via cli

```
gh run rerun
```