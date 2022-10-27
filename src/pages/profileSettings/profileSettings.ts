import {Block} from '../../core';
import validator from '../../helpers/validator';

export class ProfileSettings extends Block {
	protected getStateFromProps() {
		this.state = {
			values: {
				login: '',
				email: '',
				first_name: '',
				second_name: '',
				phone: '',
				avatar: '',
				display_name: '',
			},
			errors: {
				login: '',
				email: '',
				first_name: '',
				second_name: '',
				phone: '',
				avatar: '',
				display_name: '',
			},
			onSave: () => {
				const signinData = {
					login: (this.refs.login.getContent() as HTMLInputElement).value,
					email: (this.refs.email.getContent() as HTMLInputElement).value,
					first_name: (this.refs.first_name.getContent() as HTMLInputElement).value,
					second_name: (this.refs.second_name.getContent() as HTMLInputElement).value,
					phone: (this.refs.phone.getContent() as HTMLInputElement).value,
					avatar: (this.refs.avatar.getContent() as HTMLInputElement).value,
					display_name: (this.refs.display_name.getContent() as HTMLInputElement).value,

				};

				const nextState = {
					...this.state,
					errors: {
						login: validator('login', signinData.login),
						email: validator('email', signinData.email),
						first_name: validator('first_name', signinData.first_name),
						second_name: validator('second_name', signinData.second_name),
						phone: validator('phone', signinData.phone),
						avatar: '',
						display_name: '',

					},
					values: {...signinData},
				};

				this.setState(nextState);

				console.log('action/save', signinData);
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
				this.refs[inputName + 'Error'].setProps({error: ''});
			},
		};
	}

	protected render(): string {
		const {errors, values} = this.state;

		return (`
        <main>
            {{{SideBar}}}
            <div class='profileSettings'>
            <form class='profileSettings__form'>
                {{{ProfileAvatar}}}
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
