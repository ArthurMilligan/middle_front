import {Block} from "../../core";
import { baseUrl } from "../../helpers/constant";
import { formatDate } from "../../helpers/formateDate";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const url = require("../../../public/img/avatar.jpg");

type IChatProps = {
	id: number;
	name: string;
    lastMessageUser: string;
	lastMessageTime: string;
	lastMessage: string;
	chatUnread: string;
	avatar: string;
	onClick: (e: MouseEvent) => Record<string, unknown>;
};

export class Chat extends Block {
	constructor({id, name, lastMessageUser, lastMessage, lastMessageTime, chatUnread, avatar, onClick}: IChatProps) {
		super({id, name, lastMessageUser, lastMessage, lastMessageTime, chatUnread, avatar, events: {click: onClick}});
	}

	protected render() {
		const {avatar, lastMessageTime, lastMessage, lastMessageUser} = this.props;
		const avatarUrl = baseUrl + "resources/" + avatar?.replaceAll("/", "%2F");
		const formattedLastMessage = lastMessage.length>14?lastMessage.substr(0, 14)+"...":lastMessage;
		const formattedLastMessageTime = formatDate(lastMessageTime);
		return (`
        <a id='{{id}}' href = 'messenger'>
            <div class='chat'>
                <div class='chat__avatarContainer'>
                    <img class='chat__avatar' src="${avatar?avatarUrl:url}">
                </div>
                <div class='chat__dataContainer'>
                    <span class='chat__name'>{{name}}</span>
                    <span class='chat__lastMessage'>${lastMessageUser?lastMessageUser+": ":""}${formattedLastMessage}</span>
                </div>
                <div class='chat__metaData'>
                    <span class='chat__lastMessageTime'>${formattedLastMessageTime}</span>
                    
                </div>
                {{#if chatUnread}}
                    <span class='chat__unread'>{{chatUnread}}</span>
                {{else}}
                    <span></span>
                {{/if}}
            </div>
        </a>`);
	}
}
