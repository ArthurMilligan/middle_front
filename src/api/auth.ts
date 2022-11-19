import HTTPTransport from "../helpers/httpRequest";

export type APIError = {
  reason: string;
};


export interface UserDTO {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
}

type LoginRequestData = {
  login: string;
  password: string;
};
type SigninRequestData = {
  first_name: string,
	second_name: string,
	login: string,
	email: string,
	password: string,
	phone: string,
};

export const authAPI = {
	login: (data: LoginRequestData) =>
		HTTPTransport.post("auth/signin", { data: { ...data }, headers: {"content-type":"application/json", "accept":"application/json"}}),

	signin: (data: SigninRequestData) =>
		HTTPTransport.post("auth/signup", { data: { ...data }, headers: {"content-type":"application/json"} }),

	me: () => HTTPTransport.get("auth/user"),

	logout: () => HTTPTransport.post("auth/logout"),
};
