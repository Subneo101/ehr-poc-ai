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

## incase you want to uncommit a recent commit
To undo a recent commit, the command you use depends on whether you want to keep your code changes or completely erase them.
Here are your options using the terminal:
### Option 1: Undo the commit but KEEP your changes (Recommended)
This is the safest method. It undoes the commit action, but leaves your files modified exactly as they are right now so you can edit and recommit them.
```
git reset --soft HEAD~1
```

### Option 2: Undo the commit and ERASE all changes (Destroy)
Warning: This will completely delete the commit and permanently wipe out any code modifications you made in that commit. There is no undo for this.
```
git reset --hard HEAD~1
```

------------------------------
### If you already ran git push to GitHub:
If you already pushed that bad commit to the cloud, you will need to force-update GitHub after running one of the reset options above:
```
git push origin main --force
```
