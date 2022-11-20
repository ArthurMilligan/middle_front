import { baseUrl } from "./constant";

const METHODS = {
	GET: "GET",
	PUT: "PUT",
	POST: "POST",
	DELETE: "DELETE",
};

const queryStringify = (data: { [index: string]: string|number }) => {
	const arr = Object.entries(data);
	return arr.reduce(
		(sum, [key, val], index) => `${sum}${key}=${val}${index < arr.length - 1 ? "&" : ""}`, "?",
	);
};

class HTTPTransport {
	baseUrl = baseUrl;
	get(url: string, options: {
		data?: { [index: string]: string|number },
		timeout?: number,
		headers?: { [index: string]: string }
	} = {}) {
		let newUrl = this.baseUrl + url;
		if (options.data) {
			newUrl += queryStringify(options.data);
		}
		return this.request(
			newUrl,
			{ ...options, method: METHODS.GET },
		);
	}

	put(url: string, options: {
		data?: { [index: string]: string|number|number[] }|FormData,
		timeout?: number,
		headers?: { [index: string]: string }
	} = {}) {
		return this.request(
			this.baseUrl + url,
			{ ...options, method: METHODS.PUT },
		);
	}

	post(url: string, options: {
		data?: { [index: string]: string },
		timeout?: number,
		headers?: { [index: string]: string }
	} = {}) {
		return this.request(
			this.baseUrl + url,
			{ ...options, method: METHODS.POST },
		);
	}

	delete(url: string, options: {
		data?: { [index: string]: string|number|number[] },
		timeout?: number,
		headers?: { [index: string]: string }
	} = {}) {
		return this.request(
			this.baseUrl + url,
			{ ...options, method: METHODS.DELETE },
		);
	}
	request(url: string, options: {
		method: string,
		data?: { [index: string]: string|number|number[]}|FormData ,
		timeout?: number,
		headers?: { [index: string]: string }
	}) {
		const {
			method,
			data,
			headers = {},
			timeout = 5000,
		} = options;
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);
			xhr.withCredentials = true;
			Object.entries(headers).forEach((v) => xhr.setRequestHeader(...v));

			xhr.onload = () => {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else if (data instanceof FormData) {
				xhr.send(data);
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	}
}

export default new HTTPTransport();
