import {Block} from "../../core";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const url = require("../../../public/img/vectorBack.png");

export class SideBar extends Block {
	render() {
		return (`
        <nav class="sideBar">
            <a class="sideBar__chatLink" href="./messenger">
                <img class="sideBar__img" src="${url}" alt="">
            </a>
        </nav>
        `);
	}
}
