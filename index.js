"use strict";

const Q = require("q");
const conventionalChangelog = require("./conventional-changelog");
const parserOpts = require("./parser-opts");
const writerOpts = require("./writer-opts");


module.exports = Q.all([conventionalChangelog, parserOpts, writerOpts])
	.spread((conventionalChangelog, parserOpts, writerOpts) => {
		return {conventionalChangelog, parserOpts, writerOpts};
	});
