import {Block} from '../../core';

type IUser = {
	name: string;
	lastMessage: string;
	lastMessageTime: string;
	avatar: string;
	chatUnread: number;
};
type IMessage = {
	isOwn: boolean;
	messageText: string;
	messageTime: string;
};
type IChatData = {
	id: number;
	avatar: string;
	name: string;
	messages: IMessage[];
};
type IMessengerProps = {
	users: IUser[];
	messages: IChatData[];
};
export class MessagePage extends Block {
	constructor({users, messages}: IMessengerProps) {
		super({users, messages});
		this.setProps({
			onChange: () => {
				const userName = (this.refs.search.getContent().firstElementChild as HTMLInputElement).value;
				const nextValue = {value: (this.refs.search.getContent().firstElementChild as HTMLInputElement).value};
				const nextProps = {
					usersSearch: this.props.users.filter((i: IUser) => ~i.name.toLocaleLowerCase().indexOf(userName.toLocaleLowerCase())),
				};
				this.setState(nextValue);
				this.setProps(nextProps);
			},
			onClick: (e: MouseEvent) => {
				const elem = e.currentTarget as HTMLTextAreaElement;
				const nextProps = {currentUser: this.props.messages.find((i: any) => `${i.id}` === elem.id)};
				e.preventDefault();
				this.setProps(nextProps);
				this.setState({isChoiced: true});
			},
		});
	}

	componentDidMount() {
		this.setProps({usersSearch: this.props.users});
		this.setState({value: ''});
		this.setState({isChoiced: false});
	}

	protected render(): string {
		const {value, isChoiced} = this.state;
		return (`
        <div class='body'>
        <nav class='bar'>
            <a class = 'bar__profileUrl' href="./profile.html">Профиль ></a>
            {{{Search onChange=onChange ref='search' value='${value}'}}}
            <div class='chatList'>
            {{#each usersSearch}}
            {{{Chat
                id=id
                onClick=../onClick
                name=name
                lastMessageTime=lastMessageTime 
                chatUnread=chatUnread
                avatar=avatar
            }}}
            
            {{/each}}
            </div>
        </nav>
        <main> 
            {{#if ${isChoiced}}}
            {{{Messages
                avatar=currentUser.avatar
                name=currentUser.name
                messages=currentUser.messages
            }}}
            {{else}}
            {{{ Start }}}
            {{/if}}
        </main>
        </div>
        `);
	}
}
