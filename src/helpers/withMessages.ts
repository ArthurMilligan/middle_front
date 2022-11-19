import { BlockClass } from "../core";
import isEqual from "./isEqual";

type WithMessagesrops = { messages?: IMessage[]};

export function withMessages<P extends WithMessagesrops>(WrappedBlock: BlockClass<P>) {
	// @ts-expect-error No base constructor has the specified
	return class extends WrappedBlock<P> {
		public static componentName = WrappedBlock.componentName || WrappedBlock.name;

		constructor(props: P) {
			super({ ...props, messages: window.store.getState().messages });
		}

		__onChangeMessageCallback = (prevState: AppState, nextState: AppState) => {
			if (!isEqual(prevState.messages||{},nextState.messages||{})) {
				// @ts-expect-error this is not typed
				this.setProps({ ...this.props, messages: nextState.messages });
			}
		};

		componentDidMount(props: P) {
			super.componentDidMount(props);
			window.store.on("changed", this.__onChangeMessageCallback);
		}

		componentWillUnmount() {
			super.componentWillUnmount();
			window.store.off("changed", this.__onChangeMessageCallback);
		}

	} as BlockClass<Omit<P, "messages">>;
}