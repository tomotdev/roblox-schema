import { Constraint } from "../types";
import { OptionalSchema } from "./optional";

abstract class BaseSchema<T = any> {
	protected constraints: Constraint[] = [];

	/**
	 * Value parsed can either be `undefined` or of the provided type
	 */
	optional(): OptionalSchema<T> {
		return new OptionalSchema(this);
	}

    parse(value: any): value is T {
        return true;
    }

	constructor() {}
}

export { BaseSchema };
