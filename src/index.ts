import { Loading } from "./ui/loading/loading";
import {ProfileAvatar} from "./ui/profileAvatar/profileAvatar";
import {SideBar} from "./ui/sideBar/sideBar";
import {Input} from "./ui/input/input";
import {Button} from "./ui/button/Button";
import {Message} from "./ui/message/message";
import {UserMessage} from "./ui/userMessage/userMessage";
import MessageHeader from "./ui/messageHeader/messageHeader";
import {MessageForm} from "./ui/messageForm/messageForm";
import Messages from "./components/messages/messages";
import {Start} from "./components/start/start";
import ErrorBanner from "./ui/ErrorBanner";
import Chat from "./ui/chat";
import {Search} from "./ui/search/search";
// Require("babel-core/register");

import {renderDOM, registerComponent, Block, Store, PathRouter} from "./core";
import {defaultState} from "./store";
import {initRouter} from "./router";
import {initApp} from "./services/initApp";
import PopUp from "./components/popUp";

registerComponent(Search);
registerComponent(Chat);
registerComponent(Start);
registerComponent(Messages);
registerComponent(MessageForm);
registerComponent(MessageHeader);
registerComponent(UserMessage);
registerComponent(Message);
registerComponent(Button);
registerComponent(Input);
registerComponent(ErrorBanner);
registerComponent(SideBar);
registerComponent(ProfileAvatar);
registerComponent(PopUp);

document.addEventListener("DOMContentLoaded", () => {
	// Let App;
	// const path = window.location.pathname;
	// console.log(path);
	// switch (path) {
	// 	case '/':
	// 		App = new MessagePage(data);
	// 		break;
	// 	case '/index.html':
	// 		App = new MessagePage(data);
	// 		break;
	// 	case '/login.html':
	// 		App = new Login();
	// 		break;
	// 	case '/signin.html':
	// 		App = new Signin();
	// 		break;
	// 	case '/profileSettings.html':
	// 		App = new ProfileSettings();
	// 		break;
	// 	case '/profilePassword.html':
	// 		App = new ProfilePassword();
	// 		break;
	// 	case '/profile.html':
	// 		App = new Profile();
	// 		break;
	// 	case '/500.html':
	// 		App = new Error500();
	// 		break;
	// 	case '/404.html':
	// 		App = new Error404();
	// 		break;
	// 	default:
	// 		App = new Error404();
	// 		break;
	// }
	const store = new Store<AppState>(defaultState);
	const router = new PathRouter();


	window.router = router;
	window.store = store;

	renderDOM(new Loading());
	store.on("changed", (prevState, nextState) => {
		if (process.env.DEBUG) {
			console.log(
				"%cstore updated",
				"background: #222; color: #bada55",
				nextState,
			);
		}
	});
	initRouter(router, store);


	store.dispatch(initApp);
});
