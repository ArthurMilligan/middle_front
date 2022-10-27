import {Block} from '../../core';

type ISearchProps = {
	onChange: () => Record<string, unknown>;
	value: string;
};
export class Search extends Block {
	constructor({onChange, value}: ISearchProps) {
		super({value, events: {change: onChange}});
	}

	render() {
		return (`
        <div class="search">
            <input id="search" class = 'search__input' type="search" value="{{value}}" placeholder="Search..."/>
        </div>
        `);
	}
}
