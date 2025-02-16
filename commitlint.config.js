import {types} from "./types.js";

export default {
	parserPreset: "conventional-changelog-evelyn",
	rules: {
		"subject-empty": [2, "never"],
		"subject-case": [1, "always", "start-case"],
		"scope-case": [2, "always", "kebab-case"],
		"type-empty": [2, "never"],
		"type-enum": [2, "always", Object.keys(types)],
	},
};
