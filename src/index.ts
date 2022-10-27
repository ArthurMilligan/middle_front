import {ProfileAvatar} from './ui/profileAvatar/profileAvatar';
import {SideBar} from './ui/sideBar/sideBar';
import {Signin} from './pages/signin/signin';
import {Input} from './ui/input/input';
import {Button} from './ui/button/Button';
import {Login} from './pages/login/login';
import {Message} from './ui/message/message';
import {UserMessage} from './ui/userMessage/userMessage';
import {MessageHeader} from './ui/messageHeader/messageHeader';
import {MessageForm} from './ui/messageForm/messageForm';
import {Messages} from './components/messages/messages';
import {Start} from './components/start/start';
import {MessagePage} from './pages/messagePage/messagePage';
import ErrorBanner from './ui/ErrorBanner';
// Require("babel-core/register");

import {renderDOM, registerComponent, Block} from './core';
import {data} from './data/data';
import Chat from './ui/chat';
import {Search} from './ui/search/search';
import Error500 from './pages/500';
import Error404 from './pages/404';
import Profile from './pages/profile';
import ProfileSettings from './pages/profileSettings';
import ProfilePassword from './pages/profilePassword';

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

document.addEventListener('DOMContentLoaded', () => {
	let App;
	const path = window.location.pathname;
	console.log(path);
	switch (path) {
		case '/':
			App = new MessagePage(data);
			break;
		case '/index.html':
			App = new MessagePage(data);
			break;
		case '/login.html':
			App = new Login();
			break;
		case '/signin.html':
			App = new Signin();
			break;
		case '/profileSettings.html':
			App = new ProfileSettings();
			break;
		case '/profilePassword.html':
			App = new ProfilePassword();
			break;
		case '/profile.html':
			App = new Profile();
			break;
		case '/500.html':
			App = new Error500();
			break;
		case '/404.html':
			App = new Error404();
			break;
		default:
			App = new Error404();
			break;
	}

	renderDOM(App);
});
