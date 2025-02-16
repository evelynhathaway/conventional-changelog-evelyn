/**
 * @type {import("semantic-release").GlobalConfig}
 */
export default {
	branches: [
		{
			name: "main",
			channel: false,
		},
		{
			name: "master",
			channel: false,
		},
		{
			name: "beta",
			channel: "beta",
			prerelease: "beta",
		},
		{
			name: "alpha",
			channel: "alpha",
			prerelease: "alpha",
		},
		"+([0-9])?(.{+([0-9]),x}).x",
	],
	plugins: [
		[
			"@semantic-release/commit-analyzer",
			{
				"config": "conventional-changelog-evelyn",
				"releaseRules": "conventional-changelog-evelyn/release-rules.js",
			},
		],
		[
			"@semantic-release/release-notes-generator",
			{
				"config": "conventional-changelog-evelyn",
			},
		],
		"@semantic-release/github",
		[
			"@semantic-release/changelog",
			{
				"changelogTitle": "# Changelog",
			},
		],
		"@semantic-release/npm",
		[
			"@semantic-release/git",
			{
				"assets": [
					"package.json",
					"package-lock.json",
					"CHANGELOG.md",
				],
				// eslint-disable-next-line no-template-curly-in-string
				"message": "Release: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
			},
		],
	],
};
