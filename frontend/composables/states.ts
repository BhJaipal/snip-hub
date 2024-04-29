export default function useMyState() {
	return useState("counter", () => 0);
}
