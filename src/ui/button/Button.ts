// Import Block from '../../core/Block';
import Block from "../../core/Block";

type ButtonProps = {
	buttonName: string;
	buttonText: string;
	className?: string;
	onClick: () => void;
};

export class Button extends Block {
	constructor({buttonName, buttonText,className, onClick}: ButtonProps) {
		super({buttonName, buttonText,className, events: {click: onClick}});
	}

	protected render(): string {
		return (`<button class='Button {{className}}' type='button' name='{{buttonName}}'>{{buttonText}}</button>`);
	}
}
