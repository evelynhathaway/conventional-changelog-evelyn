import {readFile} from "node:fs/promises";
import {resolve} from "node:path";
import compareFunc from "compare-func";
import {types} from "./types.js";

const [template, header, commit] = await Promise.all([
	readFile(resolve(import.meta.dirname, "./templates/template.hbs"), "utf8"),
	readFile(resolve(import.meta.dirname, "./templates/header.hbs"), "utf8"),
	readFile(resolve(import.meta.dirname, "./templates/commit.hbs"), "utf8"),
]);

const titlesInOrder = Object.values(types).map((type) => {
	if (typeof type === "string") return "";
	if (Array.isArray(type)) return type[0].title;
	return type.title;
});

export const writer = {
	transform: (commit, context) => {
		let resolvedType = commit.type;
		// Resolve aliases
		while (typeof resolvedType === "string") {
			resolvedType = types[resolvedType];
		}
		if (Array.isArray(resolvedType)) [resolvedType] = resolvedType;

		// Discard merge commits
		if (commit.message.startsWith("Merge ")) return;
		// Skip writing discarded types
		if (resolvedType && resolvedType.discard) return;

		// Add title for writing, default to other
		commit.title = resolvedType ? resolvedType.title : "Other";

		const issues = [];

		if (commit.scope === "*") {
			commit.scope = "";
		}

		if (typeof commit.hash === "string") {
			commit.hash = commit.hash.slice(0, 7);
		}

		if (typeof commit.subject === "string") {
			let url = context.repository
				? `${context.host}/${context.owner}/${context.repository}`
				: context.repoUrl;
			if (url) {
				url = `${url}/issues/`;
				// Issue URLs
				commit.subject = commit.subject.replaceAll(/#(?<issue>\d+)/g, (match, issue) => {
					issues.push(issue);
					return `[#${issue}](${url}${issue})`;
				});
			}
			if (context.host) {
				// User URLs
				commit.subject = commit.subject.replaceAll(/\B@(?<username>[\da-z](?:-?[\d/a-z]){0,38})/g, (match, username) => {
					if (username.includes("/")) {
						return `@${username}`;
					}

					return `[@${username}](${context.host}/${username})`;
				});
			}
		}

		// Remove references that already appear in the subject
		commit.references = commit.references.filter(reference => {
			if (!issues.includes(reference.issue)) {
				return true;
			}

			return false;
		});

		return commit;
	},
	groupBy: "title",
	commitGroupsSort: ({title: titleA}, {title: titleB}) => (
		titlesInOrder.indexOf(titleA) > titlesInOrder.indexOf(titleB) ? 1 : -1
	),
	commitsSort: ["scope", "subject"],
	noteGroupsSort: "title",
	notesSort: compareFunc,
	mainTemplate: template,
	headerPartial: header,
	commitPartial: commit,
};
