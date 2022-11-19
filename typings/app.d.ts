declare global {
	interface Window {
        store:any;
		router:any;
    }
	export type Nullable<T> = T | undefined;

	export type Keys<T extends Record<string, unknown>> = keyof T;
	export type Values<T extends Record<string, unknown>> = T[Keys<T>];
	export type AppState = {
		appIsInited: boolean;
		isLoading: boolean;
		isLogined: boolean;
		screen: any;
		users: IUser[]|null|undefined;
		user: TUser|null;
		loginFormError: string | null;
		choicedChatId: number| null;
		messages: IMessage[]|null|undefined;
		activePopup: "add"|"delete"|"create"|"deleteChat"|null;
	};
	export type TUser = {
		id: number;
		login: string;
		firstName: string;
		secondName: string;
		displayName: string;
		avatar: string;
		phone: string;
		email: string;
	};
	export interface IUser {
		id:number;
		name: string;
		lastMessage: string;
		lastMessageTime: string;
		lastMessageUser:string;
		avatar: string;
		chatUnread: number;
	}
	export interface IMessage {
		isOwn: boolean;
		messageText: string;
		messageTime: string;
		userId: number;
	}
	export interface IChatData {
		id: number;
		avatar: string;
		name: string;
		messages: IMessage[];
	}
}

export { };
