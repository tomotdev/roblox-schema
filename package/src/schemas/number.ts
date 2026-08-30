import _constraints from "../core/constraints";
import { BaseSchema } from ".";
import { ParseResult } from "../types";
import _default from "../core/default";

class NumberSchema extends BaseSchema<number> {
	/**
	 * Defines the minimum value for the number.
	 * @param strict Whether to include the provided value in the range
	 */
	min(min: number, strict?: boolean): this {
		this.constraints.push({
			error: "Number must be greater than " + min,
			test: (value: number) => (strict ? value > min : value >= min),
		});

		return this;
	}

	/**
	 * Defines the maximum value for the number.
	 * @param strict Whether to include the provided value in the range
	 */
	max(max: number, strict?: boolean): this {
		this.constraints.push({
			error: "Number must be less than " + max,
			test: (value: number) => (strict ? value < max : value <= max),
		});

		return this;
	}

	/**
	 * Provided number must be positive to be parsed (0 included).
	 */
	positive(): this {
		this.constraints.push({ error: "Number is not positive", test: (value: number) => value >= 0 });

		return this;
	}

	/**
	 * Provided number must be negative to be parsed (0 excluded).
	 */
	negative(): this {
		this.constraints.push({ error: "Number is not negative", test: (value: number) => value < 0 });

		return this;
	}

	/**
	 * Provided number must be a multiple of `num` to be parsed.
	 */
	multipleOf(num: number): this {
		this.constraints.push({
			error: "Number is not a multiple of " + num,
			test: (value: number) => value % num === 0,
		});

		return this;
	}

	/**
	 * Provided number must be an integer to be parsed.
	 */
	int(): this {
		this.constraints.push({
			error: "Number must be an integer",
			test: (value: number) => value % 1 === 0,
		});

		return this;
	}

	safeParse(value: unknown): ParseResult {
		return this.internalParse(_default, "number", undefined, value);
	}

	constructor() {
		super();
	}
}

export { NumberSchema };
