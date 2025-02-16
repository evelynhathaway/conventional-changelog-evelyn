export const parser = {
	headerPattern: /^(?<type>\w*)(?:\((?<scope>.*)\))?: (?<subject>.*)$/,
	headerCorrespondence: [
		"type",
		"scope",
		"subject",
	],
};
