import {Block, CoreRouter} from "../../core";
import { withRouter } from "../../helpers";

interface IError500Props{
    router?: CoreRouter;
}

class Error500 extends Block {
	static componentName = "Error500";
	constructor({router}:IError500Props){
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
                <h1 class="errorNumber">500</h1>
                <h2 class="errorStatus">Мы уже фиксим</h2>
                {{{Link onClick=toMessenger linkText='Назад к чатам' className='errorLink'}}}
            </main>
        `);
	}
}

export default withRouter(Error500);
