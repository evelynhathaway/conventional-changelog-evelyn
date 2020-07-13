"use strict";

const {types} = require("./types");


module.exports = (
	Object.keys(types)
		.reduce(
			(accumulator, type) => {
				const originalType = type;
				while (typeof type === "string") {
					type = types[type];
				}

				accumulator.push({type: originalType, release: type.release});

				return accumulator;
			},
			[],
		)
);
