# js-boilerplates

## What

A system for managing templates for node and browser-based apps. It's more of
an example of how you can manage various related project types using git.
Node and the js eco-system just happen to be a particularly fertile area for
exploring different setups and technologies and combinations of these.

## How

Note this `master` branch is practically empty.
To use or modify the templates you need to checkout one of the other branches.

The current branch topology looks like this:

```
node/master
node/ts/master
node/babel/master
```

In this example configuration, `node/master` is our base template for vanilla
node projects.

A branch like `node/babel/master` is long-running branch. It's based on
`node/master`. `node/ts/master` is a template for vanilla typescript
projects; it extends `node/master`.

Periodically we might change or improve `node/master` and when we do, we'll
merge the latest version into `node/ts/master` and `node/babel/master`.

    git checkout node/ts/master
    git merge node/master

### Patch branches

There are some additional branches which I'll refer to as "patch" branches - these are branches that apply a single commit to another branch:

```
node/ts/patch/express
node/babel/patch/react
node/babel/patch/react-emotion
```

`node/babel/patch/react` "patches" `node/babel/master`.
`node/babel/patch/react-emotion` "patches" `node/babel/patch/react`.

If I update `node/babel/master`, I will need to recreate `node/babel/patch/react` and `node/babel/patch/react-emotion`.
I may tag `node/babel/patch/react` before and after recreating it. This keeps
a history of previous patch branches and allows for better boilerplate
updates.

Recreating patch branches requires reasonable git knowledge: you may want to use rebase, cherry-pick etc.

I'm not sure patch branches offer a lot for the effort required to maintain them.
The main attaction for me is that all the changes are enapsulated in a single commit.
Git topology remains simple because we have only a few long running branches and a bunch of patches on top of them.

### Review

We can use github draft p/rs to review the changes between branches and their derivative branches:

- <https://github.com/danielbush/js-boilerplates/pull/1/files>
- <https://github.com/danielbush/js-boilerplates/pull/2/files>
- <https://github.com/danielbush/js-boilerplates/pull/3/files>

### Example

If we want to investigate a typescript-only react setup (no babel), we could
put it under `node/ts/react/master`. This is not necessarily a great or
recommended thing to do, just for sake of demonstrating how we use git.

Similarly `node/babel/master` is "node + babel" and could be the basis for
things we use babel with eg react, webpack etc.

## Adding boilerpate

### Adding a boilerplate on an existing project

Add `boilerplate` as a remote to your project and `fetch` it:

    git add remote boilerplate ...
    git fetch boilerplate

Now you can merge and fix conflicts:

    git merge --allow-unrelated-histories boilerplate/your/branch

If you don't want to merge in large boilerplate history into your project,
you could do a squash merge:

    git merge --squash --allow-unrelated-histories boilerplate/your/branch

### Starting a project using a boilerplate

Suppose we start a new js or ts project.

We can either do an update like above. Or we can clone the boilerplate to
avoid having to use --allow-unrelated-histories. Then rename origin to
boilerplate and set up our own master branch and origin.

## Updating boilerpate

**TODO: this is a work in progress - the instructions below may not work as intended.**

We suppose `origin` is your project's origin and `boilerplate` is the origin
for a boilerplate like this project.

Suppose our code is based on some boilerplate branch with tag `my-boilerpate-v1.2.3`.
Suppose we want to update to `my-boilerpate-v2.1.0`.

We need to record the tag ie `my-boilerpate-v1.2.3` of the current
boilerplate somewhere eg in package.json or in a file eg `.boilerplate`.
Then update it to the new tag as part of the boilerplate update process.

NOTE: we can merge a boilerplate branch or boilerplate tag. In some of the
examples below where we use boilerplate tags a boilerplate branch could be
used instead.

### Simple/naive merge

    git fetch --tags boilerplate
    git merge my-boilerplate-v2.1.0

TODO: how well does this work with patch branches given any two contiguous
patch versions are not direct descendents of eachother?

### Merge and try to avoid boilerplate history

We might want to avoid having boilerplate history making our project's git history even more complicated.

#### Naive squash merging

    git fetch --tags boilerplate
    git merge --squash my-boilerpate-v2.1.0

You may need to add `--allow-unrelated-histories` if you never actually merge
the boilerplate history into your project (but only ever squash merge for
instance).

You're likely to experience resolving the same conflicts especially with
squash merges. Git's rerere might be able to make this easier:
`git config --local rerere.enabled true`.

#### Squash merging

```sh
    git checkout -b update
    git checkout -b tmp
    git merge -s ours my-boilerpate-v1.2.3 # this brings boilerplate history in
    git merge --squash my-boilerplate-v2.1.0
    git checkout update
    git merge --squash tmp # hoping this removes all boilerplate history at this point
    # then commit and create p/r...
```

TODO: at this point would `update` have the required changes without any boilerplate history included?

### Patch updates

    git checkout -b update
    git diff -p my-boilerpate-v1.2.3..my-boilerplate-v2.1.0 >/tmp/patch

TODO: I'm not sure how well patching handles conflicts or if we can use --3way in this case:

    git apply --3way /tmp/patch # conflict markers
    git apply --reject /tmp/patch # create .rej files

    # then commit and create p/r

## Viewing boilerplate structure

Arranging branch names in a directory/tree structure works really well in git.
They will usually list in order:

    git branch

Get a graph

    git log --remotes --branches --graph --oneline

Get a condensed graph of your topology

    git log --remotes --branches --graph --oneline --simplify-by-decoration

Filter on the graph for all your master branches:

    git log --remotes --branches --graph --oneline --simplify-by-decoration \
    --decorate-refs='*master*'

Exclude `boilerplate/node/foo`

    git log --remotes --branches --graph --oneline --simplify-by-decoration ^boilerplate/node/foo
