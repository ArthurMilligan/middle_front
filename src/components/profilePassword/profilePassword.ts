import {Block} from "../../core";

export class ProfilePassword extends Block {
	protected render(): string {
		const {errors, values} = this.state;
		return (`
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
                        {{{ErrorBanner ref='oldPasswordError' error='${errors.oldPassword}'}}}
                    </div>
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
                        {{{ErrorBanner ref='newPasswordError' error='${errors.newPassword}'}}}
                    </div>
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
                        {{{ErrorBanner ref='confirmPasswordError' error='${errors.confirmPassword}'}}}
                    </div>
                    {{{Button buttonText="Сохранить" buttonName="save" onClick=onSave}}}
                </form>
            </div>
        `);
	}
}
