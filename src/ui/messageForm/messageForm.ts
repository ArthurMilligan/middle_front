import {Block} from "../../core";
import validator from "../../helpers/validator";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const urlvector = require("../../../public/img/vector.png");

type IMessageFormProps = {
	onSubmit: () => Record<string, unknown>;
	onRegister?:()=>void;
};

export class MessageForm extends Block {
	constructor({onSubmit,onRegister}: IMessageFormProps) {
		super({events: {submit: onSubmit}});
	}

	protected getStateFromProps() {
		this.state = {
			values: {
				message: "",
			},
			errors: {
				message: "",
			},
			
			onBlur: (e: FocusEvent) => {
				const messageData = {
					message: (this.refs.message.getContent() as HTMLInputElement).value,
				};

				const nextState = {
					errors: {
						message: validator("message", messageData.message),
					},
					values: {...messageData},
				};
				this.setState(nextState);
			},
			onFocus: (e: FocusEvent) => {
				this.refs.messageError.setProps({error: ""});
			},
		};
	}

	render() {
		const {errors, values} = this.state;
		return (`
        <form class='messageForm'>
            {{{
                Input
                ref='message'
                type='text'
                value='${values.message}'
                onFocus=onFocus
                onBlur=onBlur
                name='message'
                className='messageForm__input'
            }}}
            {{{ErrorBanner ref='messageError' error='${errors.message}'}}}
            <button class='messageForm__button'>
                <img class='messageForm__img' src='${urlvector}'
                    alt='>'>
            </button>
        </form>
        `);
	}
}
