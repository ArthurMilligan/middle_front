import { userAPI } from "./../../api/user";
import {Block} from "../../core";
import { formatDate } from "../../helpers/formateDate";

type IMessageProps = {
	messageText: string;
	messageTime: string;
	userId:number|string;
};
export class Message extends Block {
	static componentName = "Message";
	constructor({userId,messageText, messageTime}: IMessageProps) {
		super({userId, messageText, messageTime});
		this.setProps({name:"", getName:async (id:number|string)=>{
			try{
				if(!id){
					return "";
				}
				const response = await userAPI.searchById(id);
				const user = JSON.parse((response as any).response);
				return await user.first_name +" "+ user.second_name+": ";
			}catch(err){
				console.log(err);
			}
		}});
	}
	render() {
		const formattedDate = formatDate(this.props.messageTime);
		return (`
            <div class = 'message'>
                <div class = 'message__container'>
                    <span class = 'message__text'>{{messageText}}</span>
                    <span class = 'message__date'>${formattedDate}</span>
                </div>
            </div>
            `);
	}
}
