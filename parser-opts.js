"use strict";

module.exports = {
	headerPattern: /^(\w*)(?:\((.*)\))?: (.*)$/,
	headerCorrespondence: [
		"type",
		"scope",
		"subject",
	],
};
