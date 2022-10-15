import {Block} from '../../core';

type IMessage = {
	isOwn: boolean;
	messageText: string;
	messageTime: string;
};
type IMessagesProps = {
	avatar: string;
	name: string;
	messages: IMessage[];
};

export class Messages extends Block {
	constructor({avatar, name, messages}: IMessagesProps) {
		super({avatar, name, messages});
		this.setProps({
			onSubmit: () => {
				console.log((this.refs.send.getContent().firstElementChild as HTMLInputElement).value);
			},
		});
	}

	protected render(): string {
		return (`
        <div class="messagePage">
            {{{MessageHeader
                avatar=avatar
                name=name
            }}}
            <div class='messagePage__messages'>
                {{#each messages}}
                    {{#if isOwn}}
                        {{{UserMessage
                            messageText=messageText
                            messageTime=messageTime
                        }}}
                    {{else}}
                    {{{Message
                        messageText=messageText
                        messageTime=messageTime
                    }}}
                    {{/if}}
                {{/each}}
            </div>
            {{{MessageForm
                onSubmit=onSubmit
            }}}
        </div>
        `);
	}
}
