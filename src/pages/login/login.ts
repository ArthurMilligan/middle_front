import { Block } from "../../core";
import { withStore } from "../../helpers";
import validator from "../../helpers/validator";
import { login } from "../../services/auth";

class Login extends Block {
	protected getStateFromProps() {
		this.state = {
			values: {
				login: "",
				password: "",
			},
			errors: {
				login: "",
				password: "",
			},
			onLogin: () => {
				const loginData = {
					login: (this.refs.login.getContent() as HTMLInputElement).value,
					password: (this.refs.password.getContent() as HTMLInputElement).value,
				};

				const nextState = {
					...this.state,
					errors: {
						login: validator("login", loginData.login),
						password: validator("password", loginData.password),
					},
					values: { ...loginData },
				};
				this.setState(nextState);
				if (!nextState.errors.login && !nextState.errors.password) {
					console.log(login,loginData);
					console.log(this.props.store);
					this.props.store.dispatch(login, loginData);
				}
			},
			onBlur: (e: FocusEvent) => {
				const inputName = (e.target as HTMLTextAreaElement).name;

				const loginData = {
					[inputName]: (this.refs[inputName].getContent() as HTMLInputElement).value,
				};

				const nextState = {
					...this.state,
					errors: {
						...this.state.errors,
						[inputName]: validator(inputName, loginData[inputName]),
					},
					values: { ...this.state.values, ...loginData },
				};
				this.setState(nextState);
			},
			onFocus: (e: FocusEvent) => {
				const inputName = (e.target as HTMLTextAreaElement).name;
				this.refs[inputName + "Error"].setProps({ error: "" });
			},
		};
	}

	protected render(): string {
		const { errors, values } = this.state;
		return (`
        <main>
            <div class='signin'>
                <h2 class='signin__header'>Вход</h2>
                <form class='profileSettings__form'>
                    <div class="signin__container" ref="login">
                        <span class="signin__fieldName">Логин</span>
                        {{{
                            Input
                            ref='login'
                            type='text'
                            value='${values.login}'
                            onFocus=onFocus
                            onBlur=onBlur
                            name='login'
                            className='signin__field'
                        }}}
                        {{{ErrorBanner ref='loginError' error='${errors.login}'}}}
                    </div>
                    <div class="signin__container" ref="password">
                        <span class="signin__fieldName">Пароль</span>
                        {{{
                            Input
                            ref = 'password'
                            type='password'
                            value='${values.password}'
                            onFocus=onFocus
                            onBlur=onBlur
                            name='password'
                            className='signin__field'
                        }}}
                        {{{ErrorBanner ref='passwordError' error='${errors.password}'}}}
                    </div>
                    {{{Button buttonText="Вход" buttonName="Enter" onClick=onLogin}}}
                </form>
                <a class='signin__link' href='./signin'>Нет аккаунта?</a>
            </div>
        </main>
        `);
	}
}
export default withStore(Login);
