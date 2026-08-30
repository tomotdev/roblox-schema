import _default from "../core/default";
import { BaseSchema } from ".";
import { DataTypes, ParseResult } from "../types";

class DataTypeSchema<T extends keyof DataTypes> extends BaseSchema<DataTypes[T]> {
	safeParse(value: any): ParseResult {
		return this.internalParse(_default, "dataType", this.t, value);
	}

	constructor(private t: T) {
		super();
	}
}

export { DataTypeSchema };
