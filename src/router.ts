import type {Store, CoreRouter} from "./core";
import {renderDOM} from "./core";
import type {BlockClass} from "./core";
import {getScreenComponent, Screens} from "./helpers/ScreenList";

const routes = [
	{
		path: "/messenger",
		block: Screens.Messenger,
		shouldAuthorized: true,
	},
	{
		path: "/signin",
		block: Screens.Signin,
		shouldAuthorized: false,
	},
	{
		path: "/profile",
		block: Screens.Profile,
		shouldAuthorized: true,
	},
	{
		path: "/profile-password",
		block: Screens.ProfilePassword,
		shouldAuthorized: true,
	},
	{
		path: "/profile-settings",
		block: Screens.ProfileSettings,
		shouldAuthorized: true,
	},
	{
		path: "/",
		block: Screens.Login,
		shouldAuthorized: false,
	},
	{
		path: "/404",
		block: Screens.Error404,
		shouldAuthorized: false,
	},
	{
		path: "/500",
		block: Screens.Error500,
		shouldAuthorized: false,
	},
	{
		path: "*",
		block: Screens.Error404,
		shouldAuthorized: false,
	},
];

export function initRouter(router: CoreRouter, store: Store<AppState>) {
	routes.forEach(route => {
		router.use(route.path, () => {
			const isAuthorized = Boolean(store.getState().user);
			const currentScreen = Boolean(store.getState().screen);

			if(isAuthorized || !route.shouldAuthorized) {
				store.dispatch({screen: route.block});
				return;
			}

			if (!currentScreen) {
				store.dispatch({screen: Screens.Login});
			}
		});
	});

	/**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
	store.on("changed", (prevState, nextState) => {
		// console.log(prevState, nextState);
		if (!prevState.appIsInited && nextState.appIsInited) {
			router.start();
		}

		if (prevState.screen !== nextState.screen) {
			const Page = getScreenComponent(nextState.screen);
			renderDOM(new Page({}));
			document.title = `App / ${Page?.componentName ? Page.componentName : ""}`;
		}
	});
}
