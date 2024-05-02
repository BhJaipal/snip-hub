// How to manage state in your nuxt project?
// composables/file.ts
// function that returns the state
// How to create state?
// Example: counter
export default function useMyState() {
	return useState("counter", () => 0);
}
