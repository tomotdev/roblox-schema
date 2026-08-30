import _array from "../core/array";
import _constraints from "../core/constraints";
import { BaseSchema } from ".";
import { ParseResult } from "../types";

class ArraySchema<T> extends BaseSchema<T[]> {
	/**
	 * Defines the minimum array length.
	 * @param strict Whether to include the provided value in the range
	 */
	min(min: number, strict?: boolean): this {
		this.constraints.push({
			error: "Array length must be greater than " + min,
			test: (value: unknown[]) => (strict ? value.size() > min : value.size() >= min),
		});

		return this;
	}

	/**
	 * Defines the maximum array length.
	 * @param strict Whether to include the provided value in the range
	 */
	max(max: number, strict?: boolean): this {
		this.constraints.push({
			error: "Array length must be less than " + max,
			test: (value: unknown[]) => (strict ? value.size() < max : value.size() <= max),
		});

		return this;
	}

	/**
	 * Defines the exact length the array should be.
	 *
	 * Same as :
	 * ```typescript
	 * Schema.array().min(length).max(length)
	 * ```
	 */
	length(len: number): this {
		this.constraints.push({
			error: "Array length must be equal to " + len,
			test: (value: unknown[]) => value.size() === len,
		});

		return this;
	}

	safeParse(value: any): ParseResult {
		return this.internalParse(_array, undefined, this.schema, value);
	}

	constructor(private schema: BaseSchema) {
		super();
	}
}

export { ArraySchema };
