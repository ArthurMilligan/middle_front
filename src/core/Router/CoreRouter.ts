// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface CoreRouter {
	start(): void;

	use(path: string, callback: () => void): CoreRouter;

	go(path: string): void;

	back(): void;

	forward(): void;
}

