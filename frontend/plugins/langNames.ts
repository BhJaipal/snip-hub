export const langNamesPrint = (lang: string) => {
	let langs: Record<string, string> = {
		c: "C",
		cpp: "C++",
		php: "PHP",
		javascript: "JavaScript",
		typescript: "TYpeScript",
		xml: "XML/HTML",
		java: "Java",
		css: "CSS"
	};
	return langs[lang]
		? langs[lang]
		: lang.charAt(0).toUpperCase() + lang.slice(1);
};
export const icons = (lang: string) => {
	let langs: Record<string, string> = {
		actionscript: "vscode-icons:file-type-actionscript",
		ada: "vscode-icons:file-type-ada",
		armasm: "vscode-icons:file-type-assembly",
		asciidoc: "vscode-icons:file-type-asciidoc",
		bash: "vscode-icons:file-type-shell",
		batch: "vscode-icons:file-type-bat",
		c: "vscode-icons-file-type-c3",
		cmake: "vscode-icons:file-type-cmake",
		clojure: "vscode-icons:file-type-clojure",
		cpp: "vscode-icons-file-type-cpp",
		csharp: "vscode-icons-file-type-csharp",
		css: "vscode-icons-file-type-css",
		dart: "vscode-icons:file-type-dartlang",
		django: "vscode-icons:file-type-django",
		docker: "vscode-icons:file-type-docker",
		elixir: "vscode-icons:file-type-elixir",
		elm: "vscode-icons:file-type-elm",
		erlang: "vscode-icons:file-type-erlang",
		fortran: "vscode-icons:file-type-fortran",
		go: "vscode-icons:file-type-go",
		gradle: "vscode-icons:file-type-gradle",
		graphql: "vscode-icons-file-type-graphql",
		groovy: "vscode-icons:file-type-groovy",
		haml: "vscode-icons:file-type-haml",
		handlebars: "vscode-icons:file-type-handlebars",
		html: "vscode-icons-file-type-html",
		http: "vscode-icons-file-type-http",
		java: "vscode-icons:file-type-jar",
		javascript: "vscode-icons-file-type-js-official",
		json: "vscode-icons-file-type-json",
		julia: "vscode-icons:file-type-julia",
		kotlin: "vscode-icons:file-type-kotlin",
		less: "vscode-icons:file-type-less",
		lisp: "vscode-icons:file-type-lisp",
		lua: "vscode-icons:file-type-lua",
		markdown: "vscode-icons:file-type-markdown",
		makefile: "vscode-icons:file-type-gnu",
		nix: "vscode-icons:file-type-nix",
		perl: "vscode-icons:file-type-perl",
		php: "vscode-icons-file-type-php",
		python: "vscode-icons-file-type-python",
		r: "vscode-icons:file-type-r",
		ruby: "vscode-icons-file-type-ruby",
		rust: "vscode-icons-file-type-rust",
		scala: "vscode-icons:file-type-scala",
		scss: "vscode-icons-file-type-scss",
		sql: "vscode-icons:file-type-sql",
		stylus: "vscode-icons:file-type-stylus",
		swift: "vscode-icons:file-type-swift",
		toml: "vscode-icons:file-type-toml",
		typescript: "vscode-icons-file-type-typescript-official",
		vim: "vscode-icons:file-type-vim",
		xquery: "vscode-icons:file-type-xquery",
		yaml: "vscode-icons:file-type-yaml"
	};
	return (
		"i-" +
		(langs[lang]
			? langs[lang].replace(":", "-")
			: "vscode-icons-default-file")
	);
};
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("langNamesPrint", langNamesPrint);
	nuxtApp.provide("icons", icons);
});
