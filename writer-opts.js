"use strict"

const compareFunc = require("compare-func");
const Q = require("q");
const readFile = Q.denodeify(require("fs").readFile);
const resolve = require("path").resolve;
const {types} = require("./types");


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

const titlesInOrder = Object.values(types).map((type) => typeof type === "string" ? "" : type.title);
function getWriterOpts() {
	return {
		transform: (commit, context) => {
			// Resolve aliases
			if (typeof types[commit.type] === "string") commit.type = types[commit.type];

			// Skip writing discarded types
			if (types[commit.type] && types[commit.type].discard) return;

			// Mutate type, make it the title for writing, default to other
			commit.type = types[commit.type] && types[commit.type].title || "Other";

			const issues = []

			if (commit.scope === "*") {
				commit.scope = "";
			}

			if (typeof commit.hash === "string") {
				commit.hash = commit.hash.substring(0, 7);
			}

			if (typeof commit.subject === "string") {
				let url = context.repository
					? `${context.host}/${context.owner}/${context.repository}`
					: context.repoUrl;
				if (url) {
					url = `${url}/issues/`;
					// Issue URLs
					commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
						issues.push(issue);
						return `[#${issue}](${url}${issue})`;
					});
				}
				if (context.host) {
					// User URLs
					commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
						if (username.includes('/')) {
							return `@${username}`;
						}

						return `[@${username}](${context.host}/${username})`;
					});
				}
			}

			// remove references that already appear in the subject
			commit.references = commit.references.filter(reference => {
				if (issues.indexOf(reference.issue) === -1) {
					return true;
				}

				return false;
			});

			return commit;
		},
		groupBy: "type",
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
