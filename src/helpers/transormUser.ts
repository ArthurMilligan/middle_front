import { UserDTO } from "../api/auth";

export const transformUser = (data:string): TUser => {
	const parsedData:UserDTO = JSON.parse(data);
	return {
		id: parsedData.id,
		login: parsedData.login,
		firstName: parsedData.first_name,
		secondName: parsedData.second_name,
		displayName: parsedData.display_name,
		avatar: parsedData.avatar,
		phone: parsedData.phone,
		email: parsedData.email,
	};
};
