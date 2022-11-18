// Import Block from '../../core/Block';
import Block from "../../core/Block";

type LinkProps = {
	linkText: string;
	className?: string;
	onClick: () => void;
};

export class Link extends Block {
	static componentName = "Link";
	constructor({linkText,className, onClick}: LinkProps) {
		super({linkText,className, events: {click: onClick}});
	}

	protected render(): string {
		return ("<a href='' class='{{className}}'>{{linkText}}</a>");
	}
}
