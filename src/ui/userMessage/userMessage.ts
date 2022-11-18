import {Block} from "../../core";
import { formatDate } from "../../helpers/formateDate";

type IUserMessageProps = {
	messageText: string;
	messageTime: string;
};

export class UserMessage extends Block {
	static componentName = "UserMessage";
	constructor({messageText, messageTime}: IUserMessageProps) {
		super({messageText, messageTime});
	}

	render() {
		const formattedDate = formatDate(this.props.messageTime);
		return (`
        <div class = 'userMessage'>
            <div class = 'userMessage__container'>
                <span class = 'userMessage__text'>{{messageText}}</span>
                <span class = 'userMessage__date'>${formattedDate}</span>
            </div>
        </div>
        `);
	}
}
