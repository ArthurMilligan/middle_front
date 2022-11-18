
import { authAPI, UserDTO } from "../api/auth";
import type {Dispatch} from "../core";
import { apiHasError, transformUser } from "../helpers";

export async function initApp(dispatch: Dispatch<AppState>) {
	// Ручкая задержка для демонстрации загрузочного экрана
	await new Promise(r => setTimeout(r, 700));

	try {
		console.log("some api");
		const response:any = await authAPI.me();
		console.log(response);

		if (apiHasError(response)) {
			return;
		}
		console.log(response.response);
		dispatch({user: transformUser(response.response)});
	} catch (err: unknown) {
		console.error(err);
	} finally {
		dispatch({appIsInited: true});
	}
}
