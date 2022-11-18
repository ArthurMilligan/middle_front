import { messagesDTO } from "./../api/messages";

export const transformMessage = (data:messagesDTO[], id: number): IMessage[] => {
	return data.map((i:messagesDTO)=>{
		return{
			isOwn: i.user_id===id,
			messageText: i.content,
			messageTime: i.time,
			userId: i.user_id,
		};
	});
};
