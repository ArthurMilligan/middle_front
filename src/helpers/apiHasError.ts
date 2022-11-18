import { APIError } from "../api/auth";

export function hasError(response: any): response is APIError {
	console.log(response.response);
	return response && response.response && ~response.response.indexOf("reason");
}
