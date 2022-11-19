import { authAPI } from "../api/auth";
import { updateAPI } from "../api/update";
import { Dispatch } from "../core";
import { apiHasError, transformUser } from "../helpers";
import { logout } from "./auth";

interface IUpdateUserInfoPayload{
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
	avatar:FileList;
}

interface IUpdateUserPasswordPayload{
    oldPassword:string;
    newPassword:string;
}

export const updateUserInfo = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: IUpdateUserInfoPayload,
) => {
	dispatch({ isLoading: true });
	let response;
	response = await updateAPI.userInfo(action);
	console.log(action?.avatar)
	if(action?.avatar.length){
		const formData = new FormData();
		formData.append("avatar", action.avatar[0]);
		response = await updateAPI.avatar(formData);
	}

	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason });
		return;
	}

	const responseUser:any = await authAPI.me();
	
	dispatch({ isLoading: false, loginFormError: null });

	console.log(response);
	if (apiHasError(response)) {
		dispatch(logout);
		return;
	}

	dispatch({ user: transformUser(responseUser.response) });

	window.router.go("/profile");
};

export const updateUserPassword = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: IUpdateUserPasswordPayload,
) => {
	dispatch({ isLoading: true });
	const response = await updateAPI.password(action);

	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason });
		return;
	}

	const responseUser:any = await authAPI.me();
	
	dispatch({ isLoading: false, loginFormError: null });

	console.log(response);
	if (apiHasError(response)) {
		dispatch(logout);
		return;
	}

	dispatch({ user: transformUser(responseUser.response) });

	window.router.go("/profile");
};