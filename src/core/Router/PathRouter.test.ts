/* eslint-disable @typescript-eslint/no-empty-function */
import {PathRouter} from "./PathRouter";

describe("Router", () => {
	const callback =()=>{};
	it("should registrate two Routes", () => {
		const  router  = new PathRouter();
		router
			.use("/test/",callback)
			.use("/test2/",callback);
		expect(Object.keys(router.routes).length).toEqual(2);
		expect(Object.keys(router.routes)[1]).toEqual("/test2/");
		expect(router.routes["/test/"]).toEqual(callback);
	});
	it("should go to path", () => {
		const  router  = new PathRouter();
		router
			.use("/", callback)
			.use("/test2/", callback)
			.start();
		router.go("/test2/");
		expect(window.location.pathname).toEqual("/test2/");
		expect(window.history.length).toEqual(2);
	});
	it("should call back method", () => {
		const router = new PathRouter();
		router.back = jest.fn(()=>{});

		router.back();
		expect(router.back.mock.calls.length).toEqual(1);
	});
	it("should call back forward", () => {
		const router = new PathRouter();
		router.forward = jest.fn(()=>{});
		router.forward();
		expect(router.forward.mock.calls.length).toEqual(1);
	});
});
