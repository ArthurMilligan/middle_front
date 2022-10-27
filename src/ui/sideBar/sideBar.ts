import {Block} from '../../core';
const url = require('../../../public/img/vectorBack.png');

export class SideBar extends Block {
	render() {
		return (`
        <nav class="sideBar">
            <a class="sideBar__chatLink" href="./index.html">
                <img class="sideBar__img" src="${url}" alt="">
            </a>
        </nav>
        `);
	}
}
