"use strict";

module.exports = {
	headerPattern: /^(\w*)(?:\((.*)\))?: (.*)$/,
	headerCorrespondence: [
		"type",
		"scope",
		"subject",
	],
	revertPattern: /^Revert:\s([\S\s]*?)\s*This reverts commit (\w*)\./,
	revertCorrespondence: ["header", "hash"],
};

// TODO [>=1.3.0] notes
