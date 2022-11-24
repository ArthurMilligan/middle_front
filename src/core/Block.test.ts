import { renderBlock } from "../tests/renderUtils";
import Block from "./Block";

describe("Block", () => {
	it("should create html element with tag span and props {test:'test'}", () => {
		class TestBlock extends Block{
			constructor(props:any){
				super(props);
			}
			render(){
				return "<span></span>";
			}
		}
		const block = new TestBlock({test:"test"});
		expect(block.element).toBeInstanceOf(HTMLSpanElement);
		expect(block.props).toEqual({test:"test"});
	});
	it("should change innerHTML after change props", () => {
		class Comp extends Block {
			constructor() {
				super();
				this.setProps({ test: "test" });
			}

			render() {
                
				return "<div>{{test}}</div>";
			}
		}
		const block = new Comp();
		expect(block._element?.innerHTML).toEqual("test");
		block.setProps({ test: "cool" });
		expect(block._element?.innerHTML).toEqual("cool");
	});
});
