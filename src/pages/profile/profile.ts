import {Block, CoreRouter} from "../../core";
import { withRouter, withStore } from "../../helpers";
import { logout } from "../../services/auth";


interface IProfileProps{
    router?: CoreRouter;
    login?: string;
    first_name?: string;
    second_name?: string;
    display_name?: string;
    avatar?: string;
    phone?: string;
    email?: string;
}

class Profile extends Block {
	static componentName = "Profile";
	constructor(props: IProfileProps) {
		super(props);
		this.setProps({
			toProfileSetting:()=>{
				this.props.router.go("/profile-settings");
			},
			toProfilePassword:()=>{
				this.props.router.go("/profile-password");
			},
			login: this.props.store?.getState().user.login,
			first_name: this.props.store?.getState().user.firstName,
			second_name: this.props.store?.getState().user.secondName,
			display_name: this.props.store?.getState().user.displayName,
			avatar: this.props.store?.getState().user.avatar,
			phone: this.props.store?.getState().user.phone,
			email: this.props.store?.getState().user.email,
			onClick:()=>{
				this.props.store.dispatch(logout);
			}
		});
	}
	protected render(): string {
		const {login, first_name, second_name, display_name, avatar, phone, email} = this.props;
		return (`
        <main>
            {{{SideBar}}}
            <div class='profile'>
                {{{ProfileAvatar avatar='${avatar}'}}}
                <span class="profile__name">${first_name}</span>
                <div class="profile__wrapper">
                    <span class="profile__property">Почта</span>
                    <span class="profile__value">${email}</span>
                </div>
                <div class="profile__wrapper">
                    <span class="profile__property">Логин</span>
                    <span class="profile__value">${login}</span>
                </div>
                <div class="profile__wrapper">
                    <span class="profile__property">Имя</span>
                    <span class="profile__value">${first_name}</span>
                </div>
                <div class="profile__wrapper">
                    <span class="profile__property">Фамилия</span>
                    <span class="profile__value">${second_name}</span>
                </div>
                <div class="profile__wrapper">
                    <span class="profile__property">Имя в чате</span>
                    <span class="profile__value">${display_name||""}</span>
                </div>
                <div class="profile__wrapper">
                    <span class="profile__property">Телелфон</span>
                    <span class="profile__value">${phone}</span>
                </div>
                <div class="profile__settings">
                    {{{Link className='profile__settingLink' linkText='Изменить данные' onClick=toProfileSetting}}}
                    {{{Link className='profile__settingLink' linkText='Изменить пароль' onClick=toProfilePassword}}}
                    {{{Button buttonText="Выйти" buttonName="exit" onClick=onClick}}}
                </div>
            </div>
        </main>
        `);
	}
}

export default withRouter(withStore(Profile));
