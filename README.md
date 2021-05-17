<div align="center">

<img alt="Conventional Changelog Evelyn icon" width="128" height="128" align="center" src=".github/icon.png"/>

# Conventional Changelog Evelyn

**Conventional Changelog and Semantic Release presets for my projects**

[![npm version](https://badgen.net/npm/v/conventional-changelog-evelyn?icon=npm)](https://www.npmjs.com/package/conventional-changelog-evelyn)
[![check status](https://badgen.net/github/checks/evelynhathaway/conventional-changelog-evelyn/main?icon=github)](https://github.com/evelynhathaway/conventional-changelog-evelyn/actions)
[![license: MIT](https://badgen.net/badge/license/MIT/blue)](/LICENSE)

</div>

## Description

Looking for a Semantic Release and Conventional Changelog configuration that allows for permissive types and scopes to generate nice changelog files with emoji?

Based off of the ESLint commit convention, I threw in extra types so you can load up your git client and type just about anything valid.

## Example Commits

- `Chore: Did a thing that is not user-facing`
- `New: Added a feature`
- `Update: Iterated on a feature`
- `Breaking: Changed the default behavior`

## Example Changelog

[View CHANGELOG.md](./CHANGELOG.md) to see all of the emojis and sorting of commits in action!

## Installation

```bash
# Install all of the things
npm install --save-dev @commitlint/prompt @semantic-release/changelog @semantic-release/git commitlint husky semantic-release conventional-changelog-evelyn
```

## Usage

### Husky

To enforce the commit convention locally using Husky v6, add the following hook.

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

### Package

To set up commitlint, commitizen, and semantic-release, add the following to your `package.json` file.

```json
{
  "commitlint": {
    "extends": "./node_modules/conventional-changelog-evelyn/commitlint.config.js"
  },
  "config": {
    "commitizen": {
      "path": "@commitlint/prompt"
    }
  },
  "release": {
    "extends": "conventional-changelog-evelyn/release.config.js"
  }
}
```

## License

Copyright Evelyn Hathaway, [MIT License](/LICENSE)
