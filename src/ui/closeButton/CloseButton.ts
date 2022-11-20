// Import Block from '../../core/Block';
import Block from "../../core/Block";

type CloseButtonProps = {
	buttonName: string;
	className?: string;
	onClick: () => void;
};

export class CloseButton extends Block {
	static componentName = "CloseButton";
	constructor({buttonName,className, onClick}: CloseButtonProps) {
		super({buttonName,className, events: {click: onClick}});
	}

	protected render(): string {
		return (`<button class='{{className}}' type='button' name='{{buttonName}}'>x</button>`);
	}
}
