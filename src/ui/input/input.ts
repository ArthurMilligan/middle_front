import {Block} from "../../core";

type IInputProps = {
	value?: string;
	className?: string;
	type?: string;
	name?: string;
	onFocus?: (e: MouseEvent) => void;
	onBlur?: (e: MouseEvent) => void;
	placeholder?: string;
};

export class Input extends Block {
	constructor({value, className, type, name, onFocus, onBlur, placeholder}: IInputProps) {
		super({value, className, type, name, placeholder, events: {blur: onBlur, focus: onFocus}});
	}

	protected render(): string {
		return (`
            <input type='{{type}}' value='{{value}}' name='{{name}}' class='{{className}}' placeholder='{{placeholder}}'/>
        `);
	}
}
