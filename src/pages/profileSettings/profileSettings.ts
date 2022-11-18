import { updateUserAvatar } from "./../../services/update";
import {Block} from "../../core";
import { withStore } from "../../helpers";
import validator from "../../helpers/validator";
import { updateUserInfo } from "../../services/update";
interface IProfileSettingsprops{
    avatar:string;
}

class ProfileSettings extends Block {
	static componentName = "ProfileSettings";
	constructor(props: IProfileSettingsprops) {
		super(props);
		this.setProps({
			avatar: this.props.store?.getState().user.avatar,
			login: this.props.store?.getState().user.login,
			email: this.props.store?.getState().user.email,
			first_name: this.props.store?.getState().user.firstName,
			second_name: this.props.store?.getState().user.secondName,
			phone: this.props.store?.getState().user.phone,
			display_name: this.props.store?.getState().user.displayName,           
		});
	}
	componentDidMount(){
		this.setState({...this.state, values:{
			login: this.props.login,
			email: this.props.email,
			first_name: this.props.first_name,
			second_name: this.props.second_name,
			phone: this.props.phone,
			avatar: "",
			display_name: this.props.display_name || "",
		}});
	}
	protected getStateFromProps() {
		console.log(this.props);
		this.state = {
			values: {
				login: "",
				email: "",
				first_name: "",
				second_name: "",
				phone: "",
				avatar: "",
				display_name: "",
			},
			errors: {
				login: "",
				email: "",
				first_name: "",
				second_name: "",
				phone: "",
				avatar: "",
				display_name: "",
			},
			onSave: () => {
				const signinData = {
					login: (this.refs.login.getContent() as HTMLInputElement).value,
					email: (this.refs.email.getContent() as HTMLInputElement).value,
					first_name: (this.refs.first_name.getContent() as HTMLInputElement).value,
					second_name: (this.refs.second_name.getContent() as HTMLInputElement).value,
					phone: (this.refs.phone.getContent() as HTMLInputElement).value,
					avatar: (this.refs.avatar.getContent() as HTMLInputElement).files,
					display_name: (this.refs.display_name.getContent() as HTMLInputElement).value,

				};

				const nextState = {
					...this.state,
					errors: {
						login: validator("login", signinData.login),
						email: validator("email", signinData.email),
						first_name: validator("first_name", signinData.first_name),
						second_name: validator("second_name", signinData.second_name),
						phone: validator("phone", signinData.phone),
						avatar: "",
						display_name: "",

					},
					values: {...signinData},
				};

				this.setState(nextState);
				if (!nextState.errors.login && !nextState.errors.email && !nextState.errors.first_name 
                    && !nextState.errors.second_name && !nextState.errors.phone && !nextState.errors.avatar && !nextState.errors.display_name) {
					console.log(this.props.store);
					this.props.store.dispatch(updateUserInfo, signinData);
					if(nextState.values.avatar){
						console.log(signinData.avatar);
						this.props.store.dispatch(updateUserAvatar, signinData.avatar);
					}
				}

				console.log("action/save", signinData);
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
				this.setState(nextState);
			},
			onFocus: (e: FocusEvent) => {
				const inputName = (e.target as HTMLTextAreaElement).name;
				this.refs[inputName + "Error"].setProps({error: ""});
			},
		};
	}

	protected render(): string {
		const {errors, values} = this.state;
		const {avatar} = this.props;
		return (`
        <main>
            {{{SideBar}}}
            <div class='profileSettings'>
            <form class='profileSettings__form'>
                {{{ProfileAvatar avatar='${avatar}'}}}
                <label class ='profileSettings__label'>
                    {{{
                        Input
                        ref = 'avatar'
                        type='file'
                        value='${values.avatar}'
                        onFocus=onFocus
                        onBlur=onBlur
                        name='avatar'
                        className='profileSettings__changeAvatar'
                    }}}
                    <span class='profileSettings__avatar'>Сменить аватар</span>
                </label>
                
                <div class='profileSettings__wrapper'>
                    <span class='profileSettings__property'>Почта</span>
                    {{{
                        Input
                        ref = 'email'
                        type='email'
                        value='${values.email}'
                        onFocus=onFocus
                        onBlur=onBlur
                        name='email'
                        className='profileSettings__input'
                    }}}
                </div>
                {{{ErrorBanner ref='emailError' error='${errors.email}'}}}
                <div class='profileSettings__wrapper'>
                    <span class='profileSettings__property'>Логин</span>
                    {{{
                        Input
                        ref = 'login'
                        type='text'
                        value='${values.login}'
                        onFocus=onFocus
                        onBlur=onBlur
                        name='login'
                        className='profileSettings__input'
                    }}}
                </div>
                    {{{ErrorBanner ref='loginError' error='${errors.login}'}}}
                <div class='profileSettings__wrapper'>
                    <span class='profileSettings__property'>Имя</span>
                    {{{
                        Input
                        ref = 'first_name'
                        type='text'
                        value='${values.first_name}'
                        onFocus=onFocus
                        onBlur=onBlur
                        name='first_name'
                        className='profileSettings__input'
                    }}}
                </div>
                    {{{ErrorBanner ref='first_nameError' error='${errors.first_name}'}}}
                <div class='profileSettings__wrapper'>
                    <span class='profileSettings__property'>Фамилия</span>
                    {{{
                        Input
                        ref = 'second_name'
                        type='text'
                        value='${values.second_name}'
                        onFocus=onFocus
                        onBlur=onBlur
                        name='second_name'
                        className='profileSettings__input'
                    }}}
                </div>
                    {{{ErrorBanner ref='second_nameError' error='${errors.second_name}'}}}
                <div class='profileSettings__wrapper'>
                    <span class='profileSettings__property'>Имя в чате</span>
                    {{{
                        Input
                        ref = 'display_name'
                        type='text'
                        value='${values.display_name}'
                        onFocus=onFocus
                        onBlur=onBlur
                        name='display_name'
                        className='profileSettings__input'
                    }}}
                </div>
                    {{{ErrorBanner ref='display_nameError' error='${errors.display_name}'}}}
                <div class='profileSettings__wrapper'>
                    <span class='profileSettings__property'>Телефон</span>
                    {{{
                        Input
                        ref = 'phone'
                        type='text'
                        value='${values.phone}'
                        onFocus=onFocus
                        onBlur=onBlur
                        name='phone'
                        className='profileSettings__input'
                    }}}
                </div>
                    {{{ErrorBanner ref='phoneError' error='${errors.phone}'}}}
                {{{Button buttonText="Сохранить" buttonName="save" onClick=onSave}}}
            </form>
        </div>
        </main>
        `);
	}
}
export default withStore(ProfileSettings);