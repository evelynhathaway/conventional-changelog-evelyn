export const types = {
	/*
		Primary: MAJOR
	*/
	// Breaking changes
	"Breaking": {release: "major", title: "💥 Breaking"},
	"Major": "Breaking",
	/*
		Primary: Minor
	*/
	// Features
	"Feature": {release: "minor", title: "✨ Feature"},
	"Feat": "Feature",
	"New": "Feature",
	// Improvements
	"Improvement": {release: "minor", title: "⚡ Improvement"},
	"Improve": "Improvement",
	"Update": "Improvement",
	/*
		Primary: patch
	*/
	// Documentation
	"Documentation": {release: "patch", title: "📄 Documentation"},
	"Docs": "Documentation",
	"Readme": "Documentation",
	// Bug fixes
	"Fix": {release: "patch", title: "🐛 Fix"},
	// Accessability
	"Accessibility": {release: "patch", title: "♿ Accessibility"},
	"Access": "Accessibility",
	"A11y": "Accessibility",
	// Performance
	"Performance": {release: "patch", title: "🔥 Performance"},
	"Perf": "Performance",
	/*
		Primary: No release
	*/
	// Packages & Dependencies
	"Package": [
		{release: false, title: "📦 Package"},
		{scope: "user", release: "patch", title: "📦 Package"},
		{scope: "*-user", release: "patch", title: "📦 Package"},
		{scope: "prod", release: "patch", title: "📦 Package"},
		{scope: "*-prod", release: "patch", title: "📦 Package"},
		{scope: "dev", release: false, title: "📦 Package"},
		{scope: "*-dev", release: false, title: "📦 Package"},
	],
	"Upgrade": "Package",
	// Building & Configuration
	"Config": {release: false, title: "🔧 Configuration"},
	"CI": "Config",
	"Build": "Config",
	"Lint": "Config",
	// Tests
	"Test": {release: false, title: "✅ Tests"},
	"Tests": "Test",
	// Internal
	"Internal": {release: false, title: "🧹 Internal"},
	"Refactor": "Internal",
	"Cleanup": "Internal",
	"Chore": "Internal",
	// Other
	"WIP": {release: false, discard: true, title: "🚧 Work-In-Progress"},
	"Release": {release: false, discard: true, title: "Other"},
	"Other": {release: false, discard: true, title: "Other"},
};
