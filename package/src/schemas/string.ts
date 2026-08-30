import _constraints from "../core/constraints";
import { BaseSchema } from ".";
import { ParseResult, SchemaInputMap } from "../types";
import _default from "../core/default";

class StringSchema extends BaseSchema<string> {
	/**
	 * Defines the minimum string length.
	 * @param strict Whether to include the provided value in the range
	 */
	min(min: number, strict?: boolean): this {
		this.constraints.push({
			error: "String length must be greater than " + min,
			test: (value: string) => (strict ? value.size() > min : value.size() >= min),
		});

		return this;
	}

	/**
	 * Defines the maximum string length.
	 * @param strict Whether to include the provided value in the range
	 */
	max(max: number, strict?: boolean): this {
		this.constraints.push({
			error: "String length must be less than " + max,
			test: (value: string) => (strict ? value.size() < max : value.size() <= max),
		});

		return this;
	}

	/**
	 * Defines the exact length the string should be.
	 *
	 * Same as :
	 * ```typescript
	 * Schema.string().min(length).max(length)
	 * ```
	 */
	length(len: number): this {
		this.constraints.push({
			error: "String length must be equal to " + len,
			test: (value: string) => value.size() === len,
		});

		return this;
	}

	safeParse(value: unknown): ParseResult {
		return this.internalParse(_default, "string", undefined, value);
	}

	constructor() {
		super();
	}
}

export { StringSchema };
