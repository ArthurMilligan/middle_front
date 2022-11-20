import {Block} from "../../core";
type IErrorBannerProps = {
	error: string;
};
export class ErrorBanner extends Block {
	static componentName = "ErrorBanner";
	constructor({error}: IErrorBannerProps) {
		super({error});
	}

	protected render(): string {
		return (`
            <div class ='errorMessage'>{{#if error}}{{error}}{{/if}}</div>
        `);
	}
}
