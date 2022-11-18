import {Block} from "../../core";
import { baseUrl } from "../../helpers/constant";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const url = require("../../../public/img/avatar.jpg");

interface IProfileAvatarProps{
 avatar:string
}

export class ProfileAvatar extends Block {
	constructor(props: IProfileAvatarProps) {
		super(props);
	}
	render() {
		// Добавить аватар в пропсы
		const {avatar} = this.props;
		const avatarUrl = baseUrl + "resources/" + avatar?.replaceAll("/", "%2F");
		return (`
            <div class='profileAvatar'>
                <img class='profileAvatar__img' src='${avatar?avatarUrl:url}' alt=''>
            </div>
        `);
	}
}
