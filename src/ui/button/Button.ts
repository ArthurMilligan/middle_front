// Import Block from '../../core/Block';
import Block from '../../core/Block';

type ButtonProps = {
	buttonName: string;
	buttonText: string;
	onClick: () => void;
};

export class Button extends Block {
	constructor({buttonName, buttonText, onClick}: ButtonProps) {
		super({buttonName, buttonText, events: {click: onClick}});
	}

	protected render(): string {
		return (`<button class='Button' type='button' name='{{buttonName}}'>{{buttonText}}</button>`);
	}
}
