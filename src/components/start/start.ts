import {Block} from "../../core";


class Start extends Block {
	static componentName = "Start";
	protected render() {
		return (`
            <div class="home">
                <div class="home__container">
                <h1 class="home__header">Выберите чат чтобы отправить сообщение</h1>
                </div>
            </div>
        `);
	}
}

export default Start;

