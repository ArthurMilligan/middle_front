import {Block} from "../../core";

export class Error404 extends Block {
	render() {
		return (`
            <main>
                <h1 class="errorNumber">404</h1>
                <h2 class="errorStatus">Не туда попали</h2>
                <a href="/messenger" class="errorLink">Назад к чатам</a>
            </main>
        `);
	}
}
