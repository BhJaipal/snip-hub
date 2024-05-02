interface pageModule {
	name: string;
	link: string;
	title?: string;
	description?: string;
}

let homeList: pageModule[] = [
	{
		name: "Highlight.js",
		link: "highlightjs.org",
		title: "highlight.js",
		description:
			"The Internet's favorite JavaScript syntax highlighter supporting Node.js and the web."
	},
	{
		name: "Vue",
		link: "vuejs.org",
		title: "Vue.js",
		description: "Vue.js - The Progressive JavaScript Framework"
	},
	{
		name: "TypeScript",
		link: "typescriptlang.org",
		title: "TypeScript: JavaScript With Syntax For Types.",
		description:
			"TypeScript extends JavaScript by adding types to the language."
	},
	{
		name: "TailwindCSS",
		link: "tailwindcss.com",
		title: "Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.",
		description:
			"Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without ever leaving your HTML."
	},
	{
		name: "Nuxt",
		link: "nuxt.com",
		title: "Nuxt: The Intuitive Vue Framework · Nuxt",
		description:
			"Nuxt is an open source framework that makes web development intuitive and powerful. Create performant and production-grade full-stack web apps and websites with confidence."
	},
	{
		name: "Nitro",
		link: "nitro.unjs.io",
		title: "Nitro - Next Generation Server Toolkit",
		description:
			"Create web servers with everything you need and deploy them wherever you prefer."
	}
];
// How to use Nitro server APIs in muxt project?
// server/api/file.ts
export default defineEventHandler(() => {
	return homeList; // your data here
});
