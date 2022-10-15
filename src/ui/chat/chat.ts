import {Block} from '../../core';

type IChatProps = {
	id: number;
	name: string;
	lastMessageTime: string;
	lastMessage: string;
	chatUnread: string;
	avatar: string;
	onClick: (e: MouseEvent) => Record<string, unknown>;
};

export class Chat extends Block {
	constructor({id, name, lastMessage, lastMessageTime, chatUnread, avatar, onClick}: IChatProps) {
		super({id, name, lastMessage, lastMessageTime, chatUnread, avatar, events: {click: onClick}});
	}

	protected render() {
		return (`
        <a id='{{id}}' href = ''>
            <div class='chat'>
                <div class='chat__avatarContainer'>
                    <img class='chat__avatar' src="{{avatar}}">
                </div>
                <div class='chat__dataContainer'>
                    <span class='chat__name'>{{name}}</span>
                    <span class='chat__lastMessage'>{{lastMessage}}</span>
                </div>
                <div class='chat__metaData'>
                    <span class='chat__lastMessageTime'>{{lastMessageTime}}</span>
                    <span class='chat__unread'>{{chatUnread}}</span>
                </div>
            </div>
        </a>`);
	}
}
