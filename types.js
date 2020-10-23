"use strict";

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
	"Docs": {release: "patch", title: "📄 Documentation"},
	"Readme": "Docs",
	// Bug fixes
	"Fix": {release: "patch", title: "🐛 Fix"},
	// Internal
	"Internal": {release: "patch", title: "🧹 Internal"},
	"Refactor": "Internal",
	"Cleanup": "Internal",
	"Performance": "Internal",
	// Packages & Dependencies
	"Package": {release: "patch", title: "📦 Package"},
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
