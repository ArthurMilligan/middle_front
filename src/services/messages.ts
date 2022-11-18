import { transformChats } from "./../helpers/transformChats";
import { messagesAPI } from "../api/messages";
import { Dispatch } from "../core";
import { apiHasError } from "../helpers";

interface IGetChatsPayload{
    offset: number;
    limit:number;
    title:string;
}

export const getChats = async (
	dispatch: Dispatch<AppState>,
	state: AppState,
	action: IGetChatsPayload,
) => {
	dispatch({ isLoading: true });

	const response:any = await messagesAPI.chats(action);

	if (apiHasError(response)) {
		dispatch({ isLoading: false, loginFormError: response.reason });
		return;
	}
	
	dispatch({ isLoading: false, loginFormError: null });

	dispatch({ users: transformChats(response.response)});
};

