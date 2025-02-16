import {parser} from "./parser.js";
import {writer} from "./writer.js";

export default function createPreset () {
	return {
		parser,
		writer,
	};
}
