import HTTPTransport from "../helpers/httpRequest";

export interface ISearchRequestData{
    login: string;
}
export interface IaddUserRequestData{
    users:number[];
    chatId:number;
}


export const userAPI = {
	search: (data: ISearchRequestData) =>
		HTTPTransport.post("user/search", { data: { ...data }, headers: {"content-type":"application/json", "accept":"application/json"}}),
	addUser:(data: IaddUserRequestData) =>
		HTTPTransport.put("chats/users", { data: { ...data }, headers: {"content-type":"application/json", "accept":"application/json"}}),
	deleteUser:(data: IaddUserRequestData) =>
		HTTPTransport.delete("chats/users", { data: { ...data }, headers: {"content-type":"application/json", "accept":"application/json"}}), 
	searchById:(id:number|string) =>
		HTTPTransport.get(`user/${id}`,{headers: {"accept":"application/json"}}),    
};
