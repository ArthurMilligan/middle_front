import {Block, CoreRouter, Store} from "../../core";
import { withChats } from "../../helpers/withChats";
import { withMessages } from "../../helpers/withMessages";
import { withPopup } from "../../helpers/withPopup";
import { withRouter } from "../../helpers/withRouter";
import { withStore } from "../../helpers/withStore";
import { getChats } from "../../services/messages";
import ws from "../../services/ws";

type IMessengerProps = {
	activePopup?:"add"|"delete"|null;
	users?: IUser[];
	messages?: IMessage[];
	store?: Store<AppState>;
	router?: CoreRouter;
	onChange?:()=>void;
	onClick?:(e: MouseEvent)=>void;
	setIsActive?: (isActive:boolean)=>void;
	toProfile?:()=>void;
	usersSearch?:IUser[];
	currentUser?:IUser;
	choicedChatId?: number;

};
class MessagePage extends Block<IMessengerProps> {
	static componentName = "MessagePage";
	constructor(props: IMessengerProps) {
		
		super(props);
		this.props?.store?.dispatch(getChats, {limit: 10});
		this.setState({isActive:false});
		this.setProps({
			toProfile:()=>{
				this.props.router?.go("/profile");
			},
			onChange: () => {
				const userName = (this.refs.search.getContent().firstElementChild as HTMLInputElement).value;
				const nextValue = {value: (this.refs.search.getContent().firstElementChild as HTMLInputElement).value};
				const nextProps = {
					usersSearch: this.props.users?.filter((i: IUser) => ~i.name.toLocaleLowerCase().indexOf(userName.toLocaleLowerCase())),
				};
				this.setState(nextValue);
				this.setProps(nextProps);
			},
			setIsActive: (isActive:boolean)=>{this.setState({isActive:isActive});},
			onClick: (e: MouseEvent) => {
				const elem = e.currentTarget as HTMLTextAreaElement;
				this?.props?.store?.dispatch({choicedChatId:+elem.id});
				ws.connect(+elem.id);
				e.preventDefault();
				console.log(ws.getlastMessages(+elem.id));
				const nextProps = {currentUser: this.props.users?.find((i: any) => `${i.id}` === elem.id)};
				this.setState({currId: elem.id});
				e.preventDefault();
				this.setProps(nextProps);
				this.setState({isChoiced: true});
			},
		});
	}

	componentDidMount() {
		console.log("here");
		this.setProps({
			messages: this.props.store?.getState().messages || undefined,
			users: this.props.store?.getState().users || undefined,
			choicedChatId: this.props.store?.getState().choicedChatId|| undefined,
			activePopup: this.props.store?.getState().activePopup||null
		});
		this.setProps({usersSearch: this.props.store?.getState().users||undefined});
		this.setState({value: ""});
		this.setState({currId: 0});
		this.setState({isChoiced: false});
		
	}

	protected render(): string {
		const {value, isChoiced, isActive} = this.state;
		const {currId} = this.state;
		const activeAdd = this.props.activePopup;
		const choicedChatId = this.props.store?.getState().choicedChatId;
		return (`
        <div class='body'>
        <nav class='bar'>
			{{{Link className='bar__profileUrl' linkText='Профиль >' onClick=toProfile}}}
            {{{Search onChange=onChange ref='search' value='${value}'}}}
            <div class='chatList'>
            {{#each usersSearch}}
            {{{Chat
                id=id
                onClick=../onClick
                name=name
				lastMessage=lastMessage
				lastMessageUser=lastMessageUser
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
				id=${currId}
				isActive=${isActive}
				setIsActive=setIsActive
                avatar=currentUser.avatar
                name=currentUser.name
                messages=messages
            }}}
            {{else}}
            {{{ Start }}}
            {{/if}}
        </main>
		{{#if ${!!activeAdd}}}
		{{{PopUp activeAdd="${activeAdd}" chatId=${choicedChatId}}}}
		{{/if}}
        </div>
        `);
	}
}

export default  withPopup(withChats(withMessages(withRouter(withStore(MessagePage)))));


