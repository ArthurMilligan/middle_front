import {Block} from '../../core';

export class Error500 extends Block {
	render() {
		return (`
            <main>
                <h1 class="errorNumber">500</h1>
                <h2 class="errorStatus">Мы уже фиксим</h2>
                <a href="./index.html" class="errorLink">Назад к чатам</a>
            </main>
        `);
	}
}
