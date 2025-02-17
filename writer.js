import {readFile} from "node:fs/promises";
import {resolve} from "node:path";
import compareFunc from "compare-func";
import {types, resolvePrimaryTypeMeta} from "./types.js";

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
		const {message, type, scope, subject, references, hash} = commit;

		// Discard merge commits
		if (message.startsWith("Merge ")) return;

		// Resolve information for the given commit type, resolving aliases
		const resolvedType = resolvePrimaryTypeMeta(type);

		// Discard writing types with `discard` flag
		if (resolvedType?.discard) return;

		// Link references in the subject in markdown
		const repositoryUrl = context.repository
			? `${context.host}/${context.owner}/${context.repository}`
			: context.repoUrl;
		const referencesInSubject = [];
		const subjectWithLinkedReferences = (
			(subject ?? "")
				// Link issues
				.replaceAll(/#(?<issue>\d+)/g, (match, issue) => {
					referencesInSubject.push(issue);
					if (repositoryUrl) {
						return `[#${issue}](${repositoryUrl}/issues${issue})`;
					}
				})
				// Link users
				.replaceAll(/\B@(?<username>[\da-z](?:-?[\d/a-z]){0,38})/g, (match, username) => {
					if (username.includes("/")) {
						return `@${username}`;
					}
					return `[@${username}](${context.host}/${username})`;
				})
		);

		return {
			type,
			// If the scope is *, remove it as it's the entire project
			scope: scope === "*" ? "" : scope,
			// Add subject with linked references in markdown
			subject: subjectWithLinkedReferences,
			// Add title for writing, default to other
			title: resolvedType?.title ?? "Other",
			// Remove references that already appear in the subject
			references: references.filter(reference => !referencesInSubject.includes(reference.issue)),
			// Shorten hash
			hash: hash?.slice(0, 7),
		};
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
