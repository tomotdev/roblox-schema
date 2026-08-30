import _literal from "../core/literal";
import { BaseSchema } from ".";
import { ParseResult } from "../types";

class LiteralSchema<const T extends unknown[]> extends BaseSchema<T[number]> {
	safeParse(value: any): ParseResult {
		return this.internalParse(_literal, undefined, this.values, value);
	}

	constructor(private values: T) {
		super();
	}
}

export { LiteralSchema };
