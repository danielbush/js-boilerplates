# js-boilerplates

## What

A system for managing templates for node and browser-based apps. It's more of
an example of how you can manage various related project types using git.
Node and the js eco-system just happen to be a particularly fertile area for
exploring different setups and technologies and combinations of these.

Note: create-react-app is great for setting up react apps.
Next.js is great for setting up server-rendered react apps.
Express has express-generator.
So why have an additional boilerplate library?

- To play with new tooling or understand it better
- If you want to customise CRA you have to eject and mess around
- You may have a bespoke next.js setup based on express not next.js
- You may have additional setups that work on top of CRA or next.js
- You aren't using CRA or next.js and there are no established boilerplates for your chosen stack

## Adding boilerplate

### Starting a project using a boilerplate

Suppose we start a new js or ts project.

If you want to keep the boilerplate history in your project:

```sh
    git init # set up empty project
    git remote add boilerplate url-for-your-boilerplate
    git fetch boilerplate
    git reset --hard boilerplate/your/branch
    echo "tag-or-commit" >.boilerplate
    # Commit...
```

If you don't want to see the boilerplate history in your project:

```sh
    git init # set up empty project
    git remote add boilerplate url-for-your-boilerplate
    git fetch boilerplate
    git merge --squash --allow-unrelated-histories boilerplate/your/branch
    echo "tag-or-commit" >.boilerplate
    # Commit...
```

### Adding a boilerplate on an existing project

Add `boilerplate` as a remote to your project and `fetch` it:

```sh
    git add remote boilerplate ...
    git fetch boilerplate
```

Now you can merge and fix conflicts:

```sh
    git merge --allow-unrelated-histories boilerplate/your/branch
```

If you don't want to merge in large boilerplate history into your project,
you could do a squash merge:

```sh
    git merge --squash --allow-unrelated-histories boilerplate/your/branch
```

Add the commit or tag for the boilerplate:

```sh
    echo "tag-or-commit" >.boilerplate
```

## Updating the boilerplate for a downstream project

**TODO: this is a work in progress - the instructions below may not work as intended.**

We suppose `origin` is your project's origin and `boilerplate` is the origin
for a boilerplate like this project.

Suppose our code is based on some boilerplate branch with tag `my-boilerplate-v1.2.3`.
Suppose we want to update to `my-boilerplate-v2.1.0`.

We need to record the tag ie `my-boilerplate-v1.2.3` of the current
boilerplate somewhere eg in package.json or in a file eg `.boilerplate`.
Then update it to the new tag as part of the boilerplate update process.

NOTE: we can merge a boilerplate branch or boilerplate tag. In some of the
examples below where we use boilerplate tags a boilerplate branch could be
used instead.

### Simple merge (long running boilerplate branches)

In this example, the boilerplate history is in our project's history because we
branched on a long-running boilerplate branch. This is the simplest way, but it
does mean the boilerplate history is in our project history.

```sh
    git fetch --tags boilerplate  # my-boilerplate-v1.2.3 is already in our history
    git merge my-boilerplate-v2.1.0 # merge LATEST
```

### General approach

We might want to avoid having boilerplate history making our project's git
history even more complicated. This approach should also work for downstreams
that use a patch branch boilerplate. We use `--squash` to hide the history.

```sh
    git checkout -b update
    git checkout -b tmp
    # We get `my-boilerplate-v1.2.3` from `.boilerplate`, then:
    git merge --allow-unrelated-histories -s ours my-boilerplate-v1.2.3 # this brings CURRENT boilerplate history (back) in
    git merge my-boilerplate-v2.1.0 # now merge LATEST boilerplate in
    git checkout update
    git merge --squash tmp # hoping this removes all boilerplate history at this point
    echo "my-boilerplate-v2.1.0" >.boilerplate
    # Create p/r...
```

TODO: not tested yet!

Git's rerere might make it easier to resolve repeated conflicts:

```sh
    git config --local rerere.enabled true
```

### Update using a patch

Possibly another way:

```sh
    git checkout -b update
    # We get `my-boilerplate-v1.2.3` from `.boilerplate`, then:
    git diff -p my-boilerplate-v1.2.3..my-boilerplate-v2.1.0 >/tmp/patch
    # TODO: not sure how well patching handles conflicts or if we can use --3way in this case:
    git apply --3way /tmp/patch # conflict markers - not sure we can do this
    git apply --reject /tmp/patch # create .rej files
    echo "my-boilerplate-v2.1.0" >.boilerplate
    # ...then commit and create p/r
```

TODO: definitely not tested yet!

## Boilerplate Maintenance

Note this `master` branch is practically empty.
To use or modify the templates you need to checkout one of the other branches.

### Long-running branches

The current branch topology for long running branches (for this particular project here) is:

```
node/master
node/ts/master
node/babel/master
```

`node/master` is a base template for vanilla node projects.

`node/babel/master` is based on `node/master` and tries to represent a canonical babel setup.
`node/ts/master` similarly tries to represent a ts setup.

GJest is used for testing.

Periodically we might change or improve `node/master` and when we do, we'll
merge the latest version into `node/ts/master` and `node/babel/master`.

```sh
    git checkout node/ts/master
    git merge node/master
```

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

Assuming you keep the patch to a **single commit**, you can use something like this:

```sh
  git tag last node/ts/patch/express # in case you get lost
  git rebase --onto node/ts/master node/ts/patch/express~ node/ts/patch/express
  # Reoslve conflicts
  git rebase --continue
  git tag -d last
```

It may also be possible to apply more than 1 patch to a project eg graphql and next.js might be patches to your express boilerplate.

I'm not sure patch branches offer a lot for the effort required to maintain them.
The main attraction for me is that all the changes are enapsulated in a single commit and it's easy to see that.
Git topology remains simple because we have only a few long running branches and a bunch of patches on top of them.
However, if we update the patch commit, we then have to do some extra work to update any downstream implementations.

### Review

We can use github compare links or draft p/rs to review changes.
Example:

- <https://github.com/danielbush/js-boilerplates/compare/node/ts/master...node/ts/patch/express>

NOTE: Github p/rs don't always update esp if forced merges are done.

- <https://github.com/danielbush/js-boilerplates/pull/1/files>
- <https://github.com/danielbush/js-boilerplates/pull/2/files>
- <https://github.com/danielbush/js-boilerplates/pull/3/files>

### Viewing boilerplate lineage in git

Arranging branch names in a directory/tree structure works really well in git.
They will usually list in order:

    git branch --remotes

Get a graph

    git log --remotes --branches --graph --oneline

Get a condensed graph of your topology

    git log --remotes --branches --graph --oneline --simplify-by-decoration

Filter on the graph for all your master branches:

    git log --remotes --branches --graph --oneline --simplify-by-decoration \
    --decorate-refs='*master*'

Exclude `boilerplate/node/foo`

    git log --remotes --branches --graph --oneline --simplify-by-decoration ^boilerplate/node/foo
