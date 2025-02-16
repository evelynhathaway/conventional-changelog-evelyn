import {types} from "./types.js";

const makeRule = (type, {scope, release}) => ({
	type,
	release,
	scope,
});

export default Object.keys(types).flatMap(type => {
	let ruleMeta = types[type];
	while (typeof ruleMeta === "string") {
		ruleMeta = types[type];
	}

	if (Array.isArray(ruleMeta)) {
		return ruleMeta.map(typeVariant => makeRule(type, typeVariant));
	} else {
		return makeRule(type, ruleMeta);
	}
});
