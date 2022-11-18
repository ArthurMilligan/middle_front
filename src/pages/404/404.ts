import {Block, CoreRouter} from "../../core";
import { withRouter } from "../../helpers";

interface IError404Props{
    router?: CoreRouter;
}

class Error404 extends Block {
	static componentName = "Error404";
	constructor({router}:IError404Props){
		super({router});
		this.setProps({
			toMessenger:()=>{
				this.props.router.go("/messenger");
			}
		});
	}
	render() {
		return (`
            <main>
                <h1 class="errorNumber">404</h1>
                <h2 class="errorStatus">Не туда попали</h2>
                {{{Link linkText='Назад к чатам' onClick=toMessenger className='errorLink'}}}
            </main>
        `);
	}
}

export default withRouter(Error404);
