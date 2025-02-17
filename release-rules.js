import {types, resolveTypeMeta} from "./types.js";

const makeRule = (type, {scope, release}) => ({
	type,
	release,
	// Add scope if defined
	// - Avoid adding the key when undefined to prevent commit-analyzer from thinking a scope is required
	...(scope ? {scope} : undefined),
});

export default Object.keys(types).flatMap(type => {
	const ruleMeta = resolveTypeMeta(type);
	if (Array.isArray(ruleMeta)) {
		return ruleMeta.map(typeVariant => makeRule(type, typeVariant));
	} else {
		return makeRule(type, ruleMeta);
	}
});
