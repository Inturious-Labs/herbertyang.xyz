Title: How To Git Tag A Commit
Date: 2017-05-17 08:00
Tags: git
Category: Tech 
Slug: how-to-git-tag
Summary: Tagging helps to keep track of key versions of a codebase. During the last few frenzy days toward submission of a new app to iTunes Connect, I sometimes make 10~20 commits a day to clean up various small patches here and there. One month from now when memory becomes hazy, it's important to be able to identify exactly which version of the binary on the git server corresponds to the one that is currently available in App Store. I follow the below workflow to tag a particular commit.

Tagging helps to keep track of key versions of a codebase. During the last few frenzy days toward submission of a new app to iTunes Connect, I sometimes make 10~20 commits a day to clean up various small patches here and there. One month from now when memory becomes hazy, it's important to be able to identify exactly which version of the binary on the git server corresponds to the one that is currently available in App Store. I follow the below workflow to tag a particular commit.

List all the current tags

```
git tag
```

My naming convention for tags goes like, `v` + **Version Number** + `_` + **Build Number** + `.` + **YYYYMMDD**

```
v0.1.0_73.20170220
v0.1.0_75.20170220
v0.1.0_76.20170221
v0.1.0_77.20170223
```

For version number, I usually follow [Semantic Versioning](http://semver.org) with **MAJOR.MINOR.PATCH**. For an iOS app, a new use-case scenario or major change in UX flow would qualify for a major; new features added to the existing UX flow would be a minor; hot fixes every now and then would be a patch.

For submission to Apple's iTunes Connect, the build number for a binary has to be incrementally higher than the previous one, according to [Apple's Technical Note TN2420](https://developer.apple.com/library/content/technotes/tn2420/_index.html). 

List tags with a particular pattern

```
git tag -l '*2017022**'
v0.1.0_73.20170220
v0.1.0_75.20170220
v0.1.0_76.20170221
v0.1.0_77.20170223
```

Show details of a tag. Auto_complete doesn't work unfortunately for git tag.

```
git show v0.1.0_77.20170223
```

To tag the most recent commit, first take a look at the history of commits

```
git log --pretty=oneline

1600593a82240087461e175c298af7e2eb44e325 Update version and build number for US App Store release
089bd539528be7ee05d3a9119b8cb157e05b9380 Modify placeholder message for empty contest
ab2ba05084955415603c9c7bfc9a6b170c8e10a8 Add replenish view to home.js for vote button
5d4b1ffee76a94469a58d8a66adb07e714fa90ff Replace 5 with global var CONTEST_MIN_VOTE
```

Now, tag the commit. By git default `7` digits should be sufficient in most projects to uniquely identify a commit. `8~10` should be more than enough.

```
git tag -a v0.2.0_82.20170517 160059
```

This will open up the editor for a commit message, sort of. I usually do something like
> Testflight Build 82 for Version 0.2.0 for Staging

Save the message in vim editor and that'll complete the tagging locally.

Update the server with a push

```
git push origin --tags
```

To replace a tag (for typo, for example)

```
git tag -d wrongtag
git push origin :refs/tags/wrongtag
```