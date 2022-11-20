/* eslint-disable indent */
import { Block, Store } from "../../core";
import { withStore } from "../../helpers";
import { baseUrl } from "../../helpers/constant";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const url = require("../../../public/img/avatar.jpg");

type IMessageHeaderProps = {
    name: string;
    avatar: string;
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
    store?: Store<AppState>;
};


class MessageHeader extends Block {
    componentName = "MessageHeader";
	constructor({  name, avatar, isActive, setIsActive,store }: IMessageHeaderProps) {
		super({ name, avatar, isActive, setIsActive,store });
		this.setProps({
            handleClickOpen: (e:Event)=>{
                e.stopPropagation();
                this.props.setIsActive(true);
                const body = document.getElementsByClassName("body")[0];
                body?.addEventListener("click", this.handleClickClose);
            },
            handleAdd:(e:Event)=>{
                e.stopPropagation();
                this.props.setIsActive(false);
                this.props.store.dispatch({activePopup:"add"});
            },
            handleDelete:(e:Event)=>{
                e.stopPropagation();
                this.props.setIsActive(false);
                this.props.store.dispatch({activePopup:"delete"});
            },
            handleCreate:(e:Event)=>{
                e.stopPropagation();
                this.props.setIsActive(false);
                this.props.store.dispatch({activePopup:"create"});
            },
            handleChatDelete:(e:Event)=>{
                e.stopPropagation();
                this.props.setIsActive(false);
                this.props.store.dispatch({activePopup:"deleteChat"});
            },
		});
		
	}
	
	handleClickClose=()=>{
		this.props.setIsActive(false);
        const body = document.getElementsByClassName("body")[0];
        body?.removeEventListener("click", this.handleClickClose);
	};
    
    componentDidMount(){
        const el = document.getElementsByClassName("messageHeader__options")[0];
        el?.addEventListener("click", this.props.handleClickOpen);
		const add = document.getElementsByClassName("messageHeader__add")[0];
        add?.addEventListener("click", this.props.handleAdd);
        const deleteUser = document.getElementsByClassName("messageHeader__remove")[0];
        deleteUser?.addEventListener("click", this.props.handleDelete);
        const create = document.getElementsByClassName("messageHeader__create")[0];
        create?.addEventListener("click", this.props.handleCreate);
        const deleteChat = document.getElementsByClassName("messageHeader__deleteChat")[0];
        deleteChat?.addEventListener("click", this.props.handleChatDelete);
    }
	componentWillUnmount(): void {
		const el = document.getElementsByClassName("messageHeader__options")[0];
		el?.removeEventListener("click", this.state.handleClickOpen);
        const add = document.getElementsByClassName("messageHeader__add")[0];
        add?.removeEventListener("click", this.props.handleAdd);
        const deleteUser = document.getElementsByClassName("messageHeader__remove")[0];
        deleteUser?.removeEventListener("click", this.props.handleDelete);
		const create = document.getElementsByClassName("messageHeader__create")[0];
        create?.removeEventListener("click", this.props.handleCreate);
        const deleteChat = document.getElementsByClassName("messageHeader__deleteChat")[0];
        deleteChat?.removeEventListener("click", this.props.handleChatDelete);
	}
    
	// Добавить аватар в пропс
	render() {
		const { avatar } = this.props;
		const {isActive} = this.props;
		const avatarUrl = baseUrl + "resources/" + avatar?.replaceAll("/", "%2F");
		return (`
        <header class = 'messageHeader'>
            <div class = 'messageHeader__userData'>
                <div class = 'messageHeader__avatarContainer'>
                    <img class = 'messageHeader__avatar' src='${avatar ? avatarUrl : url}' alt="">
                </div>
                <span class = 'messageHeader__name'>{{name}}</span>
            </div>
            <div class= 'messageHeader__options'>...</div>
            {{#if ${isActive}}}
            <div class= 'messageHeader__menu'>
                <span class='messageHeader__menuItem messageHeader__add' >Добавить пользователя</span>
                <span class='messageHeader__menuItem messageHeader__remove' >Удалить пользователя</span>
                <span class='messageHeader__menuItem messageHeader__create' >Создать чат</span>
                <span class='messageHeader__menuItem messageHeader__deleteChat' >Удалить чат</span>
            </div>
            {{/if}}
        </header>
        `);
	}
}
export default withStore(MessageHeader) ;
