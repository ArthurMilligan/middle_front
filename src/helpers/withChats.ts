import { BlockClass } from "../core";
import isEqual from "./isEqual";

type WithChatsProps = { users?: IUser[]};

export function withChats<P extends WithChatsProps>(WrappedBlock: BlockClass<P>) {
	// @ts-expect-error No base constructor has the specified
	return class extends WrappedBlock<P> {
		public static componentName = WrappedBlock.componentName || WrappedBlock.name;

		constructor(props: P) {
			super({ ...props, users: window.store.getState().users, usersSearch: window.store.getState().users });
		}

		__onChangeChatCallback = (prevState: AppState, nextState: AppState) => {
			console.log(JSON.stringify(prevState.users) !== JSON.stringify(nextState.users));
            
			if (!isEqual(prevState.users||{},nextState.users||{})) {
				// @ts-expect-error this is not typed
				this.setProps({ ...this.props, users: nextState.users, usersSearch: nextState.users });
			}
		};

		componentDidMount(props: P) {
			super.componentDidMount(props);
			window.store.on("changed", this.__onChangeChatCallback);
		}

		componentWillUnmount() {
			super.componentWillUnmount();
			window.store.off("changed", this.__onChangeChatCallback);
		}

	} as BlockClass<Omit<P, "users">>;
}
