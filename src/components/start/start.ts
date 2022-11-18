import {Block, CoreRouter} from "../../core";
import { withRouter } from "../../helpers";

interface IStartProps{
    router?: CoreRouter;
}
class Start extends Block {
	static componentName = "Start";
	constructor({router}:IStartProps) {
		super({router});
		this.setProps({
			to404:()=>{this.props.router.go("/404");},
			to500:()=>{this.props.router.go("/500");}
		});
	}
	protected render() {
		return (`
            <div class="home">
                <div class="home__container">
                <h1 class="home__header">Выберите чат чтобы отправить сообщение</h1>
                {{{Link linkText='Ошибка 404' onClick=to404}}}
                {{{Link linkText='Ошибка 500' onClick=to500}}}
                </div>
            </div>
        `);
	}
}

export default withRouter(Start);

