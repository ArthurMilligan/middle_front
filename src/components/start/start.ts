import {Block} from '../../core';

export class Start extends Block {
	protected render() {
		return (`
            <div class="home">
                <div class="home__container">
                <h1 class="home__header">Выберите чат чтобы отправить сообщение</h1>
                <a href="./404.html">Ошибка 404</a>
                <a href="./500.html">Ошибка 500</a>
                </div>
            </div>
        `);
	}
}
