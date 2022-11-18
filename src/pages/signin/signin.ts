import { CoreRouter } from "./../../core/Router/CoreRouter";
import Block from "../../core/Block";
import { withRouter, withStore } from "../../helpers";
import validator from "../../helpers/validator";
import { signin } from "../../services/auth";
interface ISigninProps{
    router?:CoreRouter
}
class Signin extends Block {
	static componentName = "Signin";
	constructor({router}:ISigninProps){
		super({router});
		this.setProps({
			toLogin:()=>{
				this.props.router.go("/");
			}
		});
	}
	protected getStateFromProps() {
		this.state = {
			values: {
				login: "",
				password: "",
				email: "",
				first_name: "",
				second_name: "",
				phone: "",
				confirmPassword: "",
			},
			errors: {
				login: "",
				password: "",
				email: "",
				first_name: "",
				second_name: "",
				phone: "",
				confirmPassword: "",
			},
			onRegister: () => {
				const signinData = {
					login: (this.refs.login.getContent() as HTMLInputElement).value,
					password: (this.refs.password.getContent() as HTMLInputElement).value,
					email: (this.refs.email.getContent() as HTMLInputElement).value,
					first_name: (this.refs.first_name.getContent() as HTMLInputElement).value,
					second_name: (this.refs.second_name.getContent() as HTMLInputElement).value,
					phone: (this.refs.phone.getContent() as HTMLInputElement).value,
					confirmPassword: (this.refs.confirmPassword.getContent() as HTMLInputElement).value,
				};

				const nextState = {
					...this.state,
					errors: {
						login: validator("login", signinData.login),
						password: validator("password", signinData.password),
						email: validator("email", signinData.email),
						first_name: validator("first_name", signinData.first_name),
						second_name: validator("second_name", signinData.second_name),
						phone: validator("phone", signinData.phone),
						confirmPassword: validator("confirmPassword", signinData.confirmPassword),
					},
					values: {...signinData},
				};
				if (nextState.values.password !== nextState.values.confirmPassword || nextState.values.confirmPassword === "") {
					nextState.errors.confirmPassword = "Разные пароли";
				}

				this.setState(nextState);

				if (!nextState.errors.login && !nextState.errors.password 
                    && !nextState.errors.email && !nextState.errors.first_name 
                    && !nextState.errors.second_name && !nextState.errors.phone 
                    && !nextState.errors.confirmPassword) {
					console.log(this.props.store);
					this.props.store.dispatch(signin, signinData);
				}
                

				console.log("action/registration", signinData);
			},
			onBlur: (e: FocusEvent) => {
				const inputName = (e.target as HTMLTextAreaElement).name;

				const signinData = {
					[inputName]: (this.refs[inputName].getContent() as HTMLInputElement).value,
				};

				const nextState = {
					...this.state,
					errors: {
						...this.state.errors,
						[inputName]: validator(inputName, signinData[inputName]),
					},
					values: {...this.state.values, ...signinData},
				};
				if (inputName === "confirmPassword" && nextState.values.password !== nextState.values.confirmPassword) {
					nextState.errors.confirmPassword = "Разные пароли";
				}

				this.setState(nextState);
			},
			onFocus: (e: FocusEvent) => {
				const inputName = (e.target as HTMLTextAreaElement).name;
				this.refs[inputName + "Error"].setProps({error: ""});
			},
		};
	}

	render() {
		const {errors, values} = this.state;
		return (`
        <main>
            <div class='signin'>
                <h2 class='signin__header'>Регистрация</h2>
                <form class='profileSettings__form'>
                    <div class="signin__container">
                        <span class="signin__fieldName">Почта</span>
                        {{{
                            Input
                            ref='email'
                            type='email'
                            value='${values.email}'
                            onFocus=onFocus
                            onBlur=onBlur
                            name='email'
                            className='signin__field'
                        }}}
                        {{{ErrorBanner ref='emailError' error='${errors.email}'}}}
                    </div>
                    <div class="signin__container">
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
                    <div class="signin__container">
                        <span class="signin__fieldName">Имя</span>
                        {{{
                            Input
                            ref='first_name'
                            type='text'
                            value='${values.first_name}'
                            onFocus=onFocus
                            onBlur=onBlur
                            name='first_name'
                            className='signin__field'
                        }}}
                        {{{ErrorBanner ref='first_nameError' error='${errors.first_name}'}}}
                    </div>
                    <div class="signin__container">
                        <span class="signin__fieldName">Фамилия</span>
                        {{{
                            Input
                            ref='second_name'
                            type='text'
                            value='${values.second_name}'
                            onFocus=onFocus
                            onBlur=onBlur
                            name='second_name'
                            className='signin__field'
                        }}}
                        {{{ErrorBanner ref='second_nameError' error='${errors.second_name}'}}}
                    </div>
                    <div class="signin__container">
                        <span class="signin__fieldName">Телефон</span>
                        {{{
                            Input
                            ref='phone'
                            type='text'
                            value='${values.phone}'
                            onFocus=onFocus
                            onBlur=onBlur
                            name='phone'
                            className='signin__field'
                        }}}
                        {{{ErrorBanner ref='phoneError' error='${errors.phone}'}}}
                    </div>
                    <div class="signin__container">
                        <span class="signin__fieldName">Пароль</span>
                        {{{
                            Input
                            ref='password'
                            type='password'
                            value='${values.password}'
                            onFocus=onFocus
                            onBlur=onBlur
                            name='password'
                            className='signin__field'
                        }}}
                        {{{ErrorBanner ref='passwordError' error='${errors.password}'}}}
                    </div>
                    <div class="signin__container">
                        <span class="signin__fieldName">Пароль (еще раз)</span>
                        {{{
                            Input
                            ref='confirmPassword'
                            type='password'
                            value='${values.confirmPassword}'
                            onFocus=onFocus
                            onBlur=onBlur
                            name='confirmPassword'
                            className='signin__field'
                        }}}
                        {{{ErrorBanner ref='confirmPasswordError' error='${errors.confirmPassword}'}}}
                    </div>
                    {{{Button buttonText="Зарегистрироваться" buttonName="Register" onClick=onRegister}}}
                </form>
                {{{Link className='signin__link' linkText='Войти' onClick=toLogin}}}
            </div>
        </main>
        `);
	}
}
export default withRouter(withStore(Signin));