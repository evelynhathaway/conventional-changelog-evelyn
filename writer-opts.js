"use strict";

const fs = require("fs");
const {resolve} = require("path");
const compareFunc = require("compare-func");
const Q = require("q");
const {types} = require("./types");


const readFile = Q.denodeify(fs.readFile);

module.exports = Q.all([
	readFile(resolve(__dirname, "./templates/template.hbs"), "utf-8"),
	readFile(resolve(__dirname, "./templates/header.hbs"), "utf-8"),
	readFile(resolve(__dirname, "./templates/commit.hbs"), "utf-8"),
])
	.spread((template, header, commit) => {
		const writerOpts = getWriterOpts();

		writerOpts.mainTemplate = template;
		writerOpts.headerPartial = header;
		writerOpts.commitPartial = commit;

		return writerOpts;
	});

const titlesInOrder = Object.values(types).map((type) => {
	if (typeof type === "string") return "";
	if (Array.isArray(type)) return type[0].title;
	return type.title;
});
function getWriterOpts () {
	return {
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
					commit.subject = commit.subject.replace(/#(\d+)/g, (_, issue) => {
						issues.push(issue);
						return `[#${issue}](${url}${issue})`;
					});
				}
				if (context.host) {
					// User URLs
					commit.subject = commit.subject.replace(/\B@([\da-z](?:-?[\d/a-z]){0,38})/g, (_, username) => {
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
		commitGroupsSort: ({title: titleA}, {title: titleB}) => {
			if (titlesInOrder.indexOf(titleA) > titlesInOrder.indexOf(titleB)) {
				return 1;
			} else {
				return -1;
			}
		},
		commitsSort: ["scope", "subject"],
		noteGroupsSort: "title",
		notesSort: compareFunc,
	};
}
