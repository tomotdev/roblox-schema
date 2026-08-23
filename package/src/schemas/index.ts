import { Constraint } from "../types";

class BaseSchema<T = any> {
	protected _optional = false;
	protected constraints: Constraint[] = [];

	/**
	 * Value parsed can either be `undefined` or of the provided type
	 */
	optional(): this {
		this._optional = true;
		return this;
	}

    parse(value: any): value is T {
        return true;
    }

	constructor() {}
}

export { BaseSchema };
