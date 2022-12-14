import { CoreRouter } from "./../../core/Router/CoreRouter";
import {Block} from "../../core";
import { withRouter } from "../../helpers";
interface ISideBarProps{
    router:CoreRouter;
}
class SideBar extends Block {
	static componentName = "SideBar";
	constructor({router}:ISideBarProps){
		super({router});
		this.setProps({
			toMessenger:()=>{
				this.props.router.go("/messenger");
			}
		});
	}
	
	render() {
		return (`
        <nav class="sideBar">
        {{{Link className='sideBar__chatLink' linkText='' onClick=toMessenger }}}
        </nav>
        `);
	}
}

export default withRouter(SideBar);
