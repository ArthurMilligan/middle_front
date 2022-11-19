import { authAPI, UserDTO } from "../api/auth";
import type { Dispatch } from "../core";
import { transformUser, apiHasError } from "../helpers";

type LoginPayload = {
    login: string;
    password: string;
};
type SigninPayload={
	first_name: string,
	second_name: string,
	login: string,
	email: string,
	password: string,
	phone: string,
  }

export const login = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: LoginPayload,
) => {
	try{
		dispatch({ isLoading: true });

		const response = await authAPI.login(action);

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

		dispatch({ user: transformUser(responseUser.response)});

		window.router.go("/messenger");
	}catch(err){
		dispatch({ isLoading: false });
		console.log(err);
	}
};

export const signin = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: SigninPayload,
) => {
	try{
		dispatch({ isLoading: true });

		const response = await authAPI.signin(action);
		console.log(response);
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

		window.router.go("/messenger");
	}catch(err){
		dispatch({ isLoading: false });
		console.log(err);
	}
};

export const logout = async (dispatch: Dispatch<AppState>) => {
	try{
		dispatch({ isLoading: true });

		await authAPI.logout();

		dispatch({ isLoading: false, user: null });

		window.router.go("/");
	}catch(err){
		dispatch({ isLoading: false });
		console.log(err);
	}
};
