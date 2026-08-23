import _array from "../core/array";
import _constraints from "../core/constraints";
import { BaseSchema } from ".";

class ArraySchema<T> extends BaseSchema<T[]> {
	private schema: BaseSchema;

	/**
	 * Defines the minimum array length.
	 * @param strict Whether to include the provided value in the range
	 */
	min(min: number, strict?: boolean): this {
		this.constraints.push((value: unknown[]) => (strict ? value.size() > min : value.size() >= min));

		return this;
	}

	/**
	 * Defines the maximum array length.
	 * @param strict Whether to include the provided value in the range
	 */
	max(max: number, strict?: boolean): this {
		this.constraints.push((value: unknown[]) => (strict ? value.size() < max : value.size() <= max));

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
		this.constraints.push((value: unknown[]) => value.size() === len);

		return this;
	}

	override parse(value: any): value is T[] {
		return _array(undefined, this.schema, value) && _constraints(undefined, this.constraints, value);
	}

	constructor(schema: BaseSchema) {
		super();
		this.schema = schema;
	}
}

export { ArraySchema };
