import {Block} from '../../core';
const url = require('../../../public/img/avatar.jpg');

export class ProfileAvatar extends Block {
	render() {
		// Добавить аватар в пропсы
		return (`
            <div class='profileAvatar'>
                <img class='profileAvatar__img' src='${url}' alt=''>
            </div>
        `);
	}
}
