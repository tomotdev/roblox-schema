import _instance from "../core/instance";
import { BaseSchema } from ".";
import { ParseResult } from "../types";

class OptionalSchema<T> extends BaseSchema<T | undefined> {
	safeParse(value: unknown): ParseResult {
		if (value === undefined)
			return {
				success: true,
				errors: [],
			};

		return this.schema.safeParse(value);
	}

	constructor(private schema: BaseSchema<T>) {
		super();
	}
}

export { OptionalSchema };
