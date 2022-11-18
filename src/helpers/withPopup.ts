import { BlockClass } from "../core";
import isEqual from "./isEqual";

type WithPopupProps = { activePopup: "add"|"delete"|null;};

export function withPopup<P extends WithPopupProps>(WrappedBlock: BlockClass<P>) {
	// @ts-expect-error No base constructor has the specified
	return class extends WrappedBlock<P> {
		public static componentName = WrappedBlock.componentName || WrappedBlock.name;

		constructor(props: P) {
			super({ ...props, activePopup: window.store.getState().activePopup });
		}

		__onChangePopupCallback = (prevState: AppState, nextState: AppState) => {
			if (prevState.activePopup !== nextState.activePopup) {
				// @ts-expect-error this is not typed
				this.setProps({ ...this.props, activePopup: nextState.activePopup });
			}
		};

		componentDidMount(props: P) {
			super.componentDidMount(props);
			window.store.on("changed", this.__onChangePopupCallback);
		}

		componentWillUnmount() {
			super.componentWillUnmount();
			window.store.off("changed", this.__onChangePopupCallback);
		}

	} as BlockClass<Omit<P, "popup">>;
}