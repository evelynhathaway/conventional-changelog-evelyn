"use strict"

module.exports = {
	headerPattern: /^(\w*)(?:\((.*)\))?: (.*)$/,
	headerCorrespondence: [
	"type",
	"scope",
	"subject",
	],
	revertPattern: /^Revert:\s([\s\S]*?)\s*This reverts commit (\w*)\./,
	revertCorrespondence: ["header", "hash"],
}

// TODO notes
