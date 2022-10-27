import {Block} from '../../core';

export class ProfileData extends Block {
	protected render(): string {
		return (`
        <div class='profile'>
            {{{ProfileAvatar}}}
            <span class="profile__name">Иван</span>
            <div class="profile__wrapper">
                <span class="profile__property">Почта</span>
                <span class="profile__value">pochta@pochta.ru</span>
            </div>
            <div class="profile__wrapper">
                <span class="profile__property">Логин</span>
                <span class="profile__value">ivandestroyer</span>
            </div>
            <div class="profile__wrapper">
                <span class="profile__property">Имя</span>
                <span class="profile__value">Иван</span>
            </div>
            <div class="profile__wrapper">
                <span class="profile__property">Фамилия</span>
                <span class="profile__value">Иванов</span>
            </div>
            <div class="profile__wrapper">
                <span class="profile__property">Имя в чате</span>
                <span class="profile__value">Ванек</span>
            </div>
            <div class="profile__wrapper">
                <span class="profile__property">Телелфон</span>
                <span class="profile__value">+7 (909) 967 30 30</span>
            </div>
            <div class="profile__settings">
                <a href="./profileSettings.html" class="profile__settingLink">Изменить данные</a>
                <a href="./profilePassword.html" class="profile__settingLink">Изменить пароль</a>
                <a href="./login.html" class="profile__logoutLink">Выйти</a>
            </div>
            
        </div>
        `);
	}
}
