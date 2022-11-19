import { Block } from "../../core";
import ws from "../../services/ws";

type IMessage = {
    isOwn: boolean;
    userId: string|number;
    messageText: string;
    messageTime: string;
};
type IMessagesProps = {
    id: string;
    avatar: string;
    name: string;
    messages: IMessage[];
    isActive: boolean;
    setIsActive:(isActive:boolean)=>void;

};

class Messages extends Block {
	static componentName = "Messages";
	constructor({  avatar, name, isActive,setIsActive, messages, id }: IMessagesProps) {
		super({ avatar, name, isActive,setIsActive, messages, id });
		this.setProps({
			onSubmit: (e: SubmitEvent) => {
				e.preventDefault();
				const text = (e?.srcElement as any)[0]?.value;
				ws.send(+id, text);
				return false;
			},
		});
	}

	protected render(): string {
		return (`
        <div class="messagePage">
            {{{MessageHeader
                avatar=avatar
                name=name
                isActive=isActive
                setIsActive=setIsActive
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
                        userId = userId
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
export default Messages;