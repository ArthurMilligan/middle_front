import {Block} from '../../core';
import validator from '../../helpers/validator';

export class ProfilePassword extends Block {
	protected getStateFromProps() {
		this.state = {
			values: {
				oldPassword: '',
				confirmPassword: '',
				newPassword: '',
			},
			errors: {
				oldPassword: '',
				confirmPassword: '',
				newPassword: '',
			},
			onSave: () => {
				const loginData = {
					oldPassword: (this.refs.oldPassword.getContent() as HTMLInputElement).value,
					confirmPassword: (this.refs.confirmPassword.getContent() as HTMLInputElement).value,
					newPassword: (this.refs.newPassword.getContent() as HTMLInputElement).value,
				};

				const nextState = {
					...this.state,
					errors: {
						oldPassword: '',
						confirmPassword: '',
						newPassword: validator('newPassword', loginData.newPassword),
					},
					values: {...loginData},
				};
				if (nextState.values.newPassword !== nextState.values.confirmPassword || nextState.values.confirmPassword === '') {
					nextState.errors.confirmPassword = 'Разные пароли';
				}

				this.setState(nextState);

				console.log('action/save', loginData);
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
					values: {...this.state.values, ...loginData},
				};
				if (inputName === 'confirmPassword' && nextState.values.newPassword !== nextState.values.confirmPassword) {
					nextState.errors.confirmPassword = 'Разные пароли';
				}

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
            <div class='profilePassword'>
                {{{ProfileAvatar}}}
                <form class='profilePassword__form'>
                    <div class='profilePassword__wrapper'>
                        <span class='profilePassword__property'>Старый пароль</span>
                        {{{
                            Input
                            ref = 'oldPassword'
                            type='password'
                            value='${values.oldPassword}'
                            onFocus=onFocus
                            onBlur=onBlur
                            name='oldPassword'
                            className='profilePassword__input'
                        }}}
                    </div>
                        {{{ErrorBanner ref='oldPasswordError' error='${errors.oldPassword}'}}}
                    <div class='profilePassword__wrapper'>
                        <span class='profilePassword__property'>Новый пароль</span>
                        {{{
                            Input
                            ref = 'newPassword'
                            type='password'
                            value='${values.newPassword}'
                            onFocus=onFocus
                            onBlur=onBlur
                            name='newPassword'
                            className='profilePassword__input'
                        }}}
                    </div>
                        {{{ErrorBanner ref='newPasswordError' error='${errors.newPassword}'}}}
                    <div class='profilePassword__wrapper'>
                        <span class='profilePassword__property'>Повторите новый пароль</span>
                        {{{
                            Input
                            ref = 'confirmPassword'
                            type='password'
                            value='${values.confirmPassword}'
                            onFocus=onFocus
                            onBlur=onBlur
                            name='confirmPassword'
                            className='profilePassword__input'
                        }}}
                    </div>
                        {{{ErrorBanner ref='confirmPasswordError' error='${errors.confirmPassword}'}}}
                    {{{Button buttonText="Сохранить" buttonName="save" onClick=onSave}}}
                </form>
            </div>
        </main>
        `);
	}
}
