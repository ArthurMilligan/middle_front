import { chatDTO } from "./../api/messages";

export const transformChats = (data:string): IUser[] => {
	try{
		const parsedData:chatDTO[] = JSON.parse(data);
		return parsedData.map((i:chatDTO)=>{
			return{
				id: i.id,
				name: i.title,
				lastMessage: i?.last_message?.content||"",
				lastMessageTime: i?.last_message?.time||"",
				lastMessageUser: i?.last_message?.user?.first_name||"",
				avatar: i.avatar||"",
				chatUnread: i.unread_count,
			};
		});
	}catch(err){
		console.log(err);
		return [];
	}
	
};
