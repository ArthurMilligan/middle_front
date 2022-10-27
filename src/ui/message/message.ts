import {Block} from '../../core';

type IMessageProps = {
	messageText: string;
	messageTime: string;
};
export class Message extends Block {
	constructor({messageText, messageTime}: IMessageProps) {
		super({messageText, messageTime});
	}

	render() {
		return (`
            <div class = 'message'>
                <div class = 'message__container'>
                    <span class = 'message__text'>{{messageText}}</span>
                    <span class = 'message__date'>{{messageTime}}</span>
                </div>
            </div>
            `);
	}
}
