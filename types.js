"use strict"

module.exports.types = {
	/*
		MAJOR
	*/
	// Breaking changes
	"Breaking": {release: "major", title: "💥 Breaking"},
	"Major": "Breaking",
	/*
		Minor
	*/
	// Features
	"Feature": {release: "minor", title: "✨ Feature"},
	"New": "Feature",
	// Improvements
	"Improvement": {release: "minor", title: "⚡ Improvement"},
	"Update": "Improvement",
	/*
		patch
	*/
	// Documentation
	"Docs": {release: "minor", title: "📄 Documentation"},
	"Readme": "Docs",
	// Bug fixes
	"Fix": {release: "minor", title: "🐛 Fix"},
	// Internal
	"Internal": {release: "minor", title: "🧹 Internal"},
	"Refactor": "Internal",
	"Cleaup": "Internal",
	"Performance": "Internal",
	// Packages & Dependencies
	"Package": {release: "minor", title: "📦 Package"},
	"Upgrade": "Package",
	/*
		No release
	*/
	// Building & Configuration
	"Config": {release: false, title: "🔧 Configuration"},
	"CI": "Config",
	"Build": "Config",
	"Lint": "Config",
	// Tests
	"Test": {release: false, title: "✅ Tests"},
	// Other
	"WIP": {release: false, title: "🚧 Work-In-Progress"},
	"Chore": {release: false, title: "Other"},
	"Release": {release: false, title: "Other"},
	"Other": {release: false, title: "Other"},
};
// TODO
module.exports.notes = {
	"no-release": {release: false},
	"release": {release: true},
	"discard": {discard: true},
};
