import HTTPTransport from "../helpers/httpRequest";

export interface IUpdateUserInfoRequestData{
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface IUpdateUserPasswordRequestData{
    oldPassword: string;
    newPassword: string;
}



export const updateAPI = {
	userInfo: (data: IUpdateUserInfoRequestData) =>
		HTTPTransport.put("user/profile", { data: { ...data }, headers: {"content-type":"application/json", "accept":"application/json"}}),
	password:(data:IUpdateUserPasswordRequestData)=>
		HTTPTransport.put("user/password", { data: { ...data }, headers: {"content-type":"application/json", "accept":"application/json"}}),
	avatar:(data:FormData)=>
		HTTPTransport.put("user/profile/avatar", { data: data }),
};
