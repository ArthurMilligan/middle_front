import {Block} from "../../core";

export class Loading extends Block {
	protected render(): string {
		return (`
            <div>Загрузка...</div>
        `);
	}
}
