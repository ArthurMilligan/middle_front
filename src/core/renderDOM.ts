import type Block from "./Block";

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function renderDOM(block: Block) {
	const root = document.querySelector("#app");

	root!.innerHTML = "";
	root!.appendChild(block.getContent());
}
