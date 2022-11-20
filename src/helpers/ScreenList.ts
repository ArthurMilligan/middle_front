import Login  from "./../pages/login/login";
import Profile from "./../pages/profile/profile";
import Signin from "./../pages/signin/signin";
import MessagePage from "../pages/messagePage/messagePage";
import Error500 from "../pages/500";
import Error404 from "../pages/404";
// Import Profile from '../pages/profile';
// import ProfileSettings from '../pages/profileSettings';
// import ProfilePassword from '../pages/profilePassword';
import type {BlockClass} from "../core";
import ProfileSettings from "../pages/profileSettings";
import ProfilePassword from "../pages/profilePassword";

export enum Screens {
	Messenger = "messenger",
	Error500 = "500",
	Error404 = "404",
	Signin = "Signin",
	Profile = "Profile",
	ProfilePassword = "ProfilePassword",
	ProfileSettings = "ProfileSettings",
	Login = ""
}

const map: Record<Screens, BlockClass<any>> = {
	[Screens.Messenger]: MessagePage,
	[Screens.Error500]: Error500,
	[Screens.Error404]: Error404,
	[Screens.Signin]:Signin,
	[Screens.Profile]:Profile,
	[Screens.ProfilePassword]:ProfilePassword,
	[Screens.ProfileSettings]:ProfileSettings,
	[Screens.Login]:Login,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => map[screen];
