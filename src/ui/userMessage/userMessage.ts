import {Block} from '../../core';

type IUserMessageProps = {
	messageText: string;
	messageTime: string;
};

export class UserMessage extends Block {
	constructor({messageText, messageTime}: IUserMessageProps) {
		super({messageText, messageTime});
	}

	render() {
		return (`
        <div class = 'userMessage'>
            <div class = 'userMessage__container'>
                <span class = 'userMessage__text'>{{messageText}}</span>
                <span class = 'userMessage__date'>{{messageTime}}</span>
            </div>
        </div>
        `);
	}
}
