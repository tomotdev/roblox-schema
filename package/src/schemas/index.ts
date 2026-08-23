import { Constraint } from "../types";
import { OptionalSchema } from "./optional";

abstract class BaseSchema<T = any> {
	protected constraints: Constraint[] = [];

	/**
	 * Value parsed can either be `undefined` or of the provided type
	 */
	optional(): BaseSchema<T | undefined> {
		return new OptionalSchema(this);
	}

    abstract parse(value: any): value is T;

	constructor() {}
}

export { BaseSchema };
