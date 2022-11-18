import type {CoreRouter} from "./CoreRouter";

export class PathRouter implements CoreRouter {
	private routes: Record<string, () => void> = {};
	private isStarted = false;

	use(hash: string, callback: () => void) {
		this.routes[hash] = callback;
		return this;
	}

	go(pathname: string) {
		window.history.pushState({}, "", pathname);
		this.onRouteChange(pathname);
	}

	back() {
		window.history.back();
	}

	forward() {
		window.history.forward();
	}

	start() {
		if (!this.isStarted) {
			this.isStarted = true;

			window.onpopstate = (event: PopStateEvent) => {
				// eslint-disable-next-line no-useless-call
				this.onRouteChange.call(this);
			};

			this.onRouteChange();
		}
	}

	private onRouteChange(pathname: string = window.location.pathname) {
		const found = Object.entries(this.routes).some(([routeHash, callback]) => {
			// console.log(routeHash, pathname);
			if (routeHash === pathname) {
				callback();
				return true;
			}

			return false;
		});

		if (!found && this.routes["*"]) {
			this.routes["*"]();
		}
	}
}
