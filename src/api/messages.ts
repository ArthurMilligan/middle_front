import HTTPTransport from "../helpers/httpRequest";

interface getChatsRequestData {
    offset: number;
    limit: number;
    title: string;
}

export interface chatDTO {
    id: number;
    title: string;
    avatar: string | null;
    unread_count: number;
    last_message: ILastMessage | null;
}
export interface messagesDTO {
    chat_id: number;
    file: null|string;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
    content: string;
    id: number;
}
interface ILastMessage {
    user: ILastMessageUser;
    time: string;
    content: string;
}
interface ILastMessageUser {
    first_name: string;
    second_name: string;
    avatar: string | null;
    email: string;
    login: string;
    phone: string;
}
interface INewChat{
    title:string;
}


export const messagesAPI = {
	chats: (data: getChatsRequestData) =>
		HTTPTransport.get("chats", { data: { ...data } }),
	messagesToken: (chatId: string | number) =>
		HTTPTransport.post(`chats/token/${chatId}/`),
	messages: (data: getChatsRequestData, chatId: string | number) =>
		HTTPTransport.get(`chats/${chatId}/`, { data: { ...data } }),
	newChat:(data: INewChat) =>
		HTTPTransport.post("chats", { data: { ...data }, headers: {"content-type":"application/json", "accept":"application/json"} }),
};
