const validator = (validatorClass: string, value: string): string => {
	let error = '';
	switch (validatorClass) {
		case 'login':
			if (~value.search(/[^a-zA-Z0-9\-\_]| /) || value.length < 3 || value.length > 20 || !~value.search(/[a-zA-Z]/)) {
				error = 'Некорректный логин';
			}

			break;
		case 'newPassword':
		case 'password':
			if (!~value.search(/[A-ZА-Я]/) || !~value.search(/[0-9]/) || value.length > 40 || value.length < 8) {
				error = 'Некорректный пароль';
			}

			break;
		case 'second_name':
		case 'first_name':
			if (~value.search(/[^A-Za-zА-Яа-я\-]/) || value.search(/[A-ZА-Я]/) !== 0) {
				error = 'Некорректные данные';
			}

			break;
		case 'email':
			if (~value.search(/[А-Яа-я]/) || !~value.search(/@\w+\.\w+/)) {
				error = 'Некорректная почта';
			}

			break;
		case 'phone':
			if ((~value.search(/[^0-9]/) && ~value.search(/[^0-9]/)) || value.length < 10 || value.length > 15) {
				error = 'Некорректный номер';
			}

			break;
		case 'message':
			if (value.replace(' ', '').length === 0) {
				error = 'Введите сообщение';
			}

			break;
	}

	return error;
};

export default validator;
