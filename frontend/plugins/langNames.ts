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
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("langNamesPrint", langNamesPrint);
});
