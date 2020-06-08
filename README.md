## What

A system for managing templates for node and browser-based apps. It's more of
an example of how you can manage various related project types using git.
Node and the js eco-system just happen to be a particularly fertile area for
exploring different setups and technologies and combinations of these.

## How

Note this `master` branch is practically empty.
To use or modify the templates you need to checkout one of the other branches.

Here's some example output for `git branch`:

```
node/babel/master
node/babel/react/master
node/babel/react/emotion/patch
node/master
node/ts/master
```

In this example configuration, `node/master` is our base template for vanilla
node projects.

`node/ts/master` is a template for vanilla typescript projects; it extends
`node/master` so the branch name lives under `node/`; periodically we might
change or improve `node/master` and when we do, we'll merge the latest version
into `node/ts/master` and `node/babel/master` (using the above example).

    git checkout node/ts/master
    git merge node/master

If we want to investigate a typescript-only react setup (no babel), we could
put it under `node/ts/react/master`. This is not necessarily a great or
recommended thing to do, just for sake of demonstrating how we use git.

Similarly `node/babel/master` is "node + babel" and could be the basis for
things we use babel with eg react, webpack etc.

Now consider `node/babel/react/emotion/patch`. This is not a master branch
but a "patch". We treat `node/babel/react/emotion/patch` as a smallish set of
commits that apply on top of `node/babel/react/master` that add emotion to
our react boilerplate. Whenever we update `node/babel/react/master` we rebase
our patch:

    git checkout node/babel/react/emotion/patch
    git rebase node/babel/react/master

Rebasing means you'll lose history as you make adjustments. But this is just
another way to explore different setups on top of an existing base
boilerplate instead of just merging.

### Using a template on an existing project

Add `boilerplate` as a remote to your project and `fetch` it:

    git add remote boilerplate ...
    git fetch boilerplate

Now you can merge and fix conflicts:

    git merge --allow-unrelated-histories boilerplate/your/branch

If you don't want to merge in large boilerplate history into your project,
you could do a squash merge:

    git merge --squash --allow-unrelated-histories boilerplate/your/branch`

### Using a template on a new project

Suppose we start a new js or ts project.

We can either do an update like above. Or we can clone the boilerplate to
avoid having to use --allow-unrelated-histories. Then rename origin to
boilerplate and set up our own master branch and origin.

### Upgrading your project when template has changed

To update a project with recent changes made to a boilerplate:

    git fetch boilerplate # origin is your project's remote
    git merge boilerplate/your/branch

Similarly if you're doing squash merges:

    git fetch boilerplate
    git merge --squash boilerplate/your/branch

You may need to add `--allow-unrelated-histories` if you never actually merge
the boilerplate history into your project (but only ever squash merge for
instance).

You're likely to experience resolving the same conflicts especially with
squash merges. Git's rerere might be able to make this easier:
`git config --local rerere.enabled true`.

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
