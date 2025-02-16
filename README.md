<div align="center">

<img alt="Conventional Changelog Evelyn icon" width="128" height="128" align="center" src=".github/icon.png"/>

# Conventional Changelog Evelyn

**Conventional Changelog and Semantic Release presets for my projects**

[![npm version](https://badgen.net/npm/v/conventional-changelog-evelyn?icon=npm)](https://www.npmjs.com/package/conventional-changelog-evelyn)
[![check status](https://badgen.net/github/checks/evelynhathaway/conventional-changelog-evelyn/main?icon=github)](https://github.com/evelynhathaway/conventional-changelog-evelyn/actions)
[![license: MIT](https://badgen.net/badge/license/MIT/blue)](/LICENSE)

</div>

## Description

Looking for a Semantic Release and Conventional Changelog configuration that allows for permissive types and scopes to
generate nice changelog files with emoji?

This commit convention is based off of the ESLint commit convention with other types I found helpful or commonly used to
ease the pain of remembering specific types that contributors use to a specific convention may have.

### Example Commits

- `Chore: Did a thing that is not user-facing`
- `Fix: Fixed a bug`
- `New: Added a feature`
- `Update: Iterated on a feature`
- `Breaking: Changed the default behavior`

### Example Changelog

[View CHANGELOG.md](./CHANGELOG.md) to see all of the emojis and sorting of commits in action!

## How to Write a Descriptive Commit Message

Git commits messages are broken into the following pieces `Type(scope): Subject` or `Type: Subject` where:

- **`Type` is the category of change** you are making
    - See valid options in [**Commit Types and Their Release Rules**](#commit-types-and-their-release-rules)
    - **Case sensitive (title case)**
    - If multiple types could apply, either make your commits more focused on a specific change, or pick the type that
      best encapsulates the entire commit with the highest version bump
- `(scope)` is an optional declaration of the area of your project that your commit effects
    - Only affects the release rules for production dependencies (see `Package:` and `Upgrade:` types)
    - Other than production dependencies, **you or your project may decide how to to use this**. As an example, you can use
      the kebab-case workspace name in a monorepo.
- **`Subject` is a descriptive message** that helps you and your teammates understand **what you changed and why**
    - **Preferably starting with a capital letter** to make scanning through git logs easier. Proper nouns with official
      lowercase capitalization like `npm` are an exception.
    - No limit to the character length is imposed by this convention
    - Consider omitting information about trivial related changes that are required to perform the primary change in the
      commit
    - Consider placing the most important information at the beginning of the subject

<details><summary><strong>Example Walkthrough</strong></summary>

Imagine you maintain the `is-number` package, you have this assortment of bunch of uncommitted changes on your machine:

1. A new function `isNotNumber()`
2. A `devDependency` upgrade required for exporting `isNotNumber()`
3. A correction for a typo in the JSDoc comment for `isNumber()`
4. A fix that makes sure for `isNumber(NaN)` returns `false`

It would be best to break this out into multiple commits for readability and history, especially since you can make a
pull request and release for the new feature separate from the unrelated, potentially breaking change and typo. These
would be some excellent individual commit messages:

1. `New: Add negated isNotNumber() function`
2. `Upgrade(dev): Update rollup to support exporting multiple functions`
3. `Docs: Fix typo in JSDoc comment`
4. `Fix: NaN is not a number` if your project deems this fix a regression, `Breaking: NaN is not a number` otherwise

If we imagine the fix is not a regression, and we can't easily separate these changes into separate commits, which is
the unfortunately the reality of some major implementation discoveries and refactors; we can use one commit focused on
the most important information:

> Breaking: NaN is not a number, add isNotNumber()

- Uses `Breaking:` because of the breaking change in the bug fix (highest applicable release rule)
- Puts the breaking change subject first (since it had the highest release rule)
- Omits the rollup upgrade information since it was an internal required change to export multiple functions. Maybe
  instead add a comment on the pull request explaining why you needed to do it instead.
- Omits the trivial typo information. This may be confusing to see in git blame, but at least it's not causing mental
  overload when reading the git log.

</details>

---

## Commit Types and Their Release Rules

### `MAJOR` Version Bump

#### 💥 Breaking

Use when your commit includes a breaking change for users of your project. This may include narrowing the range of
supported `Node.js` or `peerDependency` versions as well. Upgrading non-peer dependencies to their next major version
may not necessitate a breaking change if that breaking change from the dependency only affected your project and not
consumers of your project.

- `Breaking:` (preferred)
- `Major:`

### `Minor` Version Bump

#### ✨ Feature

Use when adding a new feature to your project.

If the new feature may change the behavior of your project unexpectedly for some users, consider `Breaking` to release a
major bump instead.

- `Feature:`
- `Feat:`
- `New:`

#### ⚡ Improvement

Use when improving features that already exist in your project.

If the improvement may change the behavior of your project unexpectedly for some users, consider `Breaking` to release a
major bump instead.

- `Improvement:`
- `Improve:`
- `Update:`

### `patch` Version Bump

#### 📄 Documentation

Use when updating documentation including JSDoc comments, the readme, the wiki, or when adding examples.

- `Documentation:`
- `Docs:`
- `Readme:`

#### 🐛 Fix

Use when fixing any type of bug.

If the fix is a breaking change that isn't a regression hotfix, consider `Breaking` to release a major bump instead.

- `Fix:`

#### ♿ Accessibility

Optionally use when applying accessibility-specific bug fixes to call out this fix in the changelog.

- `Accessibility:`
- `Access:`
- `A11y:`

#### 🔥 Performance

Optionally use when applying performance-specific bug fixes and tuning to call out this fix in the changelog.

- `Performance:`
- `Perf:`

#### 📦 Package

Use when updating production `dependencies` to release any fixes they may have to your users.

- `Package(user):`
- `Package(*-user):` (wildcard)
- `Package(prod):`
- `Package(*-prod):` (wildcard)
- `Upgrade(user):`
- `Upgrade(*-user):` (wildcard)
- `Upgrade(prod):`
- `Upgrade(*-prod):` (wildcard)

### No Release

#### 📦 Package

Use when updating unspecified dependencies or `devDependencies` to prevent releasing when bumping the minium packages
your project only uses internally.

If the upgrade *may* affect your project's behavior (e.g. updating your build tool), consider `Fix` to release a patch
bump instead so if it breaks your project unexpectedly, you can fix it while it's fresh on your mind.

- `Package:`
- `Package(dev):`
- `Package(*-dev):` (wildcard)
- `Upgrade:`
- `Upgrade(dev):`
- `Upgrade(*-dev):` (wildcard)

#### 🔧 Configuration

Use when you're tinkering with the CI, linter (or trivial errors from the linter), build step, or other project
configuration.

If the config change *may* affect your project's behavior (e.g. building with a different tool), consider `Fix` to
release a patch bump instead so if it breaks your project unexpectedly, you can fix it while it's fresh on your mind.

- `Config:`
- `CI:`
- `Build:`
- `Lint:`

#### ✅ Tests

Use when adding or modifying tests.

If you are changing the released version of your package or application behavior to make a test pass, consider `Fix` to
release a patch bump instead so your users can use the improved behavior.

- `Test:`
- `Tests:`

#### 🧹 Internal

Use when you're making some other change that will not affect the released version of your package or application.

If the refactor or internal change *may* affect your project's behavior, consider `Fix` to release a patch bump instead
so if it breaks your project unexpectedly, you can fix it while it's fresh on your mind.

- `Internal:`
- `Refactor:`
- `Cleanup:`
- `Chore:`

#### 🚧 Work-In-Progress

Use when expecting to squash your commits, in over your head with changes in git, or [in case of fire (joke)](https://github.com/louim/in-case-of-fire#readme).

- `WIP:`

#### Other

These typically should not be used as the other types provide many options for expressing the changes, or at very least
simply expressing the desired version bump with `Breaking`, `Update`, `Fix`, and `Chore`.

- `Release:` (used by semantic release)
- `Other:`

---

## Installation

```bash
# Install all of the things
npm install --save-dev @semantic-release/changelog @semantic-release/git commitlint husky semantic-release conventional-changelog-evelyn
```

## Usage

### Enforcing Usage of the Commit Convention with `commitlint`

To set up `commitlint`, add the following to your `package.json` file.

**`package.json`** (snippet)

```json
{
  "...": "...",
  "commitlint": {
    "extends": "./node_modules/conventional-changelog-evelyn/commitlint.config.js"
  }
}
```

And make sure `commitlint` is run when committing using a git hook via Husky.

```bash
npm install --save-dev husky
npx husky init
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
```

Now, using `git commit` in the CLI or GUI will automatically check your commit message against the commit convention. If
you have trouble, make sure you have a valid git hook setup, especially on Windows where some git clients need to be
told where Git Bash is installed.

[Complete `commitlint` local setup instructions](https://commitlint.js.org/guides/local-setup.html)

### Automatic npm Releases and Changelogs with `semantic-release`

To set up `semantic-release`, add the following to your `package.json` file.

**`package.json`** (snippet)

```json
{
  "...": "...",
  "release": {
    "extends": "conventional-changelog-evelyn/release.config.js"
  }
}
```

You may use this GitHub Actions configuration to have GitHub release automatically in CI.

```yml
name: nodejs
on: push
jobs:
  release:
    needs: testing
    runs-on: ubuntu-latest
    env:
      CI: true
    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js 22.x
      uses: actions/setup-node@v4
      with:
        node-version: 22.x
    - name: Install Dependencies
      run: npm ci
    - name: Release
      run: npx semantic-release
      env:
        GH_TOKEN: ${{ secrets.GH_TOKEN }}
        NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

To make sure semantic-release can release, it needs an [npm API token as a secret named
`NPM_TOKEN`](https://semantic-release.gitbook.io/semantic-release/usage/ci-configuration#authentication-for-plugins) and
a [GitHub personal access token named
`GH_TOKEN`](https://semantic-release.gitbook.io/semantic-release/usage/ci-configuration#push-access-to-the-remote-repository)
which has [permission to write to repo contents, issues, and pull requests](https://github.com/semantic-release/github/blob/master/README.md#github-authentication).

When on a maintenance branch (e.g. `2.x.x`) or the `main`, `master`, `beta`, or `alpha` branches and there are new
commits that should trigger a release; this will automatically:

- Increment the `package.json` version (whether to bump `MAJOR`, `Minor`, or `patch` is chosen based on commits)
- Generate or update the `CHANGELOG.md` file with the release notes
- `npm publish` the new version
- Add a git tag and GitHub release with the release notes
- Leave comments on referenced GitHub issues and pull requests in the project
- Commit the latest `package.json` version and latest `CHANGELOG.md` to the git repository

When on `main` or `master`, a new release is made that becomes your latest version on npm.

When on `beta` or `alpha`, a new release is made with prerelease status on npm and GitHub releases, and the version is
suffixed with `-beta.x` or `-alpha.x` respectfully, where `x` is the number of prereleases made on that unreleased version.

When on a maintenance branch, it will release only new versions compatible with that branch name. E.g. `2.1.0` can be
bumped to `2.1.1` by adding a commit that has the `Fix:` type in the message on the `2.x.x` branch even if the latest
version on npm is `3.0.0`.

## License

Copyright Evelyn Hathaway, [MIT License](/LICENSE)
