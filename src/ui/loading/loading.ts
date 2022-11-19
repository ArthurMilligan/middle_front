import {Block} from "../../core";

export class Loading extends Block {
	static componentName = "Loading";
	protected render(): string {
		return (`
            <div>Загрузка...</div>
        `);
	}
}
