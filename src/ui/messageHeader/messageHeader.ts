import {Block} from '../../core';

type IMessageHeaderProps = {
	name: string;
	avatar: string;
};

export class MessageHeader extends Block {
	constructor({name, avatar}: IMessageHeaderProps) {
		super({name, avatar});
	}

	// Добавить аватар в пропс
	render() {
		return (`
        <header class = 'messageHeader'>
            <div class = 'messageHeader__userData'>
                <div class = 'messageHeader__avatarContainer'>
                    <img class = 'messageHeader__avatar' src="{{avatar}}" alt="">
                </div>
                <span class = 'messageHeader__name'>{{name}}</span>
            </div>
            <div class= = 'messageHeader__options'>...</div>
        </header>
        `);
	}
}
