/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from "./constant";
import HTTPTransport from "./httpRequest";

describe("HTTPTransport", () => {

	const fakeXHR = HTTPTransport;
	
	const data = {
		data:{test: "test"}
	};
	beforeEach(() => {
		fakeXHR.request = (jest as any).fn((url: string, options: {
            method: string,
            data?: { [index: string]: string|number|number[]}|FormData ,
            timeout?: number,
            headers?: { [index: string]: string }
        })=>{return {url, options};});
	});
	afterEach(() => {
		(fakeXHR.request as any).mockReset();
	});

	it("should send post request", () => {
		fakeXHR.post("/testpost", data);
		const mock = (fakeXHR.request as any).mock;
		expect(mock.calls.length).toEqual(1);
		expect(mock.results[0].value.options.method).toEqual("POST");
		expect(mock.results[0].value.options.data).toEqual(data.data);
		expect(mock.results[0].value.url).toEqual(baseUrl+"/testpost");
	});

	it("should send get request", () => {
		fakeXHR.get("/testget");
		const mock = (fakeXHR.request as any).mock;
		expect(mock.calls.length).toEqual(1);
		expect(mock.results[0].value.options.method).toEqual("GET");
		expect(mock.results[0].value.url).toEqual(baseUrl+"/testget");
	});


	it("should send put request", () => {
		fakeXHR.put("/testput", data);
		const mock = (fakeXHR.request as any).mock;
		expect(mock.calls.length).toEqual(1);
		expect(mock.results[0].value.options.method).toEqual("PUT");
		expect(mock.results[0].value.options.data).toEqual(data.data);
		expect(mock.results[0].value.url).toEqual(baseUrl+"/testput");
	});

	it("should send delete request", () => {
		fakeXHR.delete("/testdelete", data);
		const mock = (fakeXHR.request as any).mock;
		expect(mock.calls.length).toEqual(1);
		expect(mock.results[0].value.options.method).toEqual("DELETE");
		expect(mock.results[0].value.options.data).toEqual(data.data);
		expect(mock.results[0].value.url).toEqual(baseUrl+"/testdelete");
	});
});
