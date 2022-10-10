Title: My Git Work Flow
Date: 2017-05-13 08:00
Tags: git
Category: Tech 
Slug: my-git-work-flow
Summary: Here's the git flow I use while working on our latest iOS app [Mirror Mirror](https://linkqlo.com/mirror)

Here's the git flow I use while working on our latest iOS app [Mirror Mirror](https://linkqlo.com/mirror):

Identify the current branch

```
git branch
  MVP
  master
* yennefer
```

`yennefer` (wink to The Witcher 3) is the branch that both PL and I will commit to for the next release. I can just make changes on this branch directly, then `git add` => `git commit` => `git push`, which usually works just fine. 

However sometimes doing this might get me caught in an awkward situation, especially when I'm making a significant set of sweeping changes that touch many different files, variables and callbacks that take some time to finish. Many things could happen before I can push. I might not get to a point where I can git push yet, and the next best thing is `git reset --hard`, which would be terrible.

So I would create a new branch off `yennefer` instead, git commit every incremental change to this new branch, merge this branch with `yennefer` when everything is ready, then git push from `yennefer` to the remote.

```
git checkout -b change-touchable
Switched to a new branch 'change-touchable'

git branch
  MVP
* change-touchable
  master
  yennefer
```

Commit every incremental change with `git add .` and `git commit`, but no `git push` just yet. So all these changes are only saved locally in this local branch. This local branch `change-touchable` will only exist on this local machine. If something happens to the machine or Internet connection, I can still `git checkout` to any particular commit in this new branch without losing any work.

When done with all the changes, switch back to branch `yennefer`:

```
git checkout yennefer
```

From branch `yennefer`, merge the newly created branch `change-touchable`, which now contains all the new commits:

```
git merge change-touchable
```

Push to the remote (still on `yennefer`):

```
git push
```

After all is said and done, delete branch `change-touchable` as it's no longer needed

```
git branch -D change-touchable
```

This is a much more elegant and fail-proof method than just committing every change to `yennefer` as it happens. 

## Frequent Uses

To display the remote destination that the local git repo points to

```
git remote show origin
```

To show uncommitted changes in Git

```
git diff
```