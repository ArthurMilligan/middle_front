import { messagesAPI } from "../api/messages";
import { transformMessage } from "../helpers/transformMessages";
type Message = {
    chat_id: number;
    file: null|string;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
    content: string;
    id: number;
  };

class WS{
	private sockets: {
        [key: number]: WebSocket;
      } = {};
	public async connect(chatId: number) {
		try{
			const state = window.store.getState();
			const user = state.user;
			if (!user) {
				return;
			}
			const response:any  = await messagesAPI.messagesToken(chatId);
			const token =  JSON.parse(response.response).token;
			console.log(response.response);
			const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${token}`);
			this.sockets[chatId] = socket;
			socket.addEventListener("open", (event) => {
				console.log(this.getlastMessages(chatId));
			});
			socket.addEventListener("message", (event) => {
				console.log(event);
				this.get(event.data, chatId);
			});
		}catch(err){
			console.log(err);
		}
		
	}

	private async get(data: string, chat_id: number) {
		try{
			const state = window.store.getState();
			const user = state?.user;
			const messages = state?.messages;
			const result: Message = await JSON.parse(data);
			if (result.type === "message") {
				console.log(result);
				// this.store.dispatch(addNewMessages(chat_id, [result]));
				window.store.dispatch({messages:messages.concat(transformMessage([result], user?.id))});
			}
			if (Array.isArray(result)) {
				console.log(result);
				window.store.dispatch({messages:transformMessage(result, user?.id).reverse()});
			}
		}catch(err){
			console.log(err);
		}
		
	}

	public send(chatId:number, message: string) {
		try{
			if (!message) {
				return;
			}
			if (!chatId) {
				return;
			}
			this.sockets[chatId].send(JSON.stringify({
				content: message,
				type: "message",
			}));
		}catch(err){
			console.log(err);
		}
		
	}

	public async getlastMessages(chatId: number, offset = 0) {
		try{
			this.sockets[chatId].send(JSON.stringify({
				content: offset,
				type: "get old",
			}));
		}catch(err){
			console.log(err);
		}
	}    
  
}
export default new WS();
