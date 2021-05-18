"use strict";

const {types} = require("./types");


const makeRule = (type, {scope, release}) => {
	const result = {
		type,
		release,
	};
	if (scope) result.scope = scope;
	return result;
};

module.exports = (
	Object.keys(types)
		.reduce(
			(accumulator, type) => {
				const originalType = type;
				while (typeof type === "string") {
					type = types[type];
				}

				if (Array.isArray(type)) {
					for (const typeVariant of type) {
						accumulator.push(makeRule(originalType, typeVariant));
					}
				} else {
					accumulator.push(makeRule(originalType, type));
				}

				return accumulator;
			},
			[],
		)
);
