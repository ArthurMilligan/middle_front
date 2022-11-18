import { messagesAPI } from "./../../api/messages";
import { userAPI } from "./../../api/user";
import { Block, Store } from "../../core";
import { withStore } from "../../helpers";
interface IPopUpProps{
    activeAdd: "add"|"delete";
    chatId:number;
    store?: Store<AppState>;
}
class PopUp extends Block {
	constructor({activeAdd, chatId, store}: IPopUpProps) {
		super({activeAdd, chatId, store});
	}

	protected getStateFromProps() {
		this.state = {
			onAdd:async ()=>{
				const login = {
					login: (this.refs.popup.getContent() as HTMLInputElement).value,
				};
				const id= await userAPI.search(login);
				console.log(id, (id as any)[0]);
				const data={
					users:[JSON.parse((id as any).response)[0].id],
					chatId:this.props.chatId,
				};
				const response = await userAPI.addUser(data);
				console.log(response);
				this.props.store.dispatch({activePopup:null});
			},
			onDelete:async ()=>{
				const login = {
					login: (this.refs.popup.getContent() as HTMLInputElement).value,
				};
				const id= await userAPI.search(login);
				console.log(JSON.parse((id as any).response)[0].id);
				const data={
					users:[JSON.parse((id as any).response)[0].id],
					chatId:this.props.chatId,
				};
				const response = await userAPI.deleteUser(data);
				console.log(response);
				this.props.store.dispatch({activePopup:null});
                
			},
			onCreate:async()=>{
				const title = {
					title: (this.refs.popup.getContent() as HTMLInputElement).value,
				};
				const response = await messagesAPI.newChat(title);
				console.log(response);
				this.props.store.dispatch({activePopup:null});
			}
		};
	}
	protected render(): string {
		const isAdd = this.props.activeAdd === "add";
		const isDelete = this.props.activeAdd === "delete";
		const isCreate = this.props.activeAdd === "create";
		console.log(this.props.chatId, this.props.activeAdd );
		return (`
        <div class="popup__background">
            <div class="popup">
                <span></span>
                <form class='popup__form'>
                    <div class="popup__container">
                                <span class="popup__fieldName">Логин</span>
                                {{{
                                    Input
                                    ref='popup'
                                    type='text'
                                    value=''
                                    name='popup'
                                    className='popup__field'
                                }}}
                    </div>
                    {{#if ${isAdd}}}
                        {{{Button className="popup__button" buttonText="Добавить" buttonName="add" onClick=onAdd}}}
                    {{/if}}
                    {{#if ${isDelete}}}
                        {{{Button className="popup__button" buttonText="Удалить" buttonName="delete" onClick=onDelete}}}
                    {{/if}}
                    {{#if ${isCreate}}}
                        {{{Button className="popup__button" buttonText="Создать" buttonName="delete" onClick=onCreate}}}
                    {{/if}}
                        
                    
                    
                </form>
            </div>
        </div>
        `);
	}
}
export default withStore(PopUp);