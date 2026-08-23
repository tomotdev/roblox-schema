import _constraints from "../core/constraints";
import { BaseSchema } from ".";
import { SchemaInputMap } from "../types";
import _default from "../core/default";

/**
 * Main class allowing validation
 *
 * Usage:
 * ```ts
 * import { Schema } from "@rbxts/roblox-schema";
 *
 * const userSchema = Schema.object({
 *     id: Schema.number(),
 *     username: Schema.string(),
 *     inventory: Schema.array(Schema.instance("Tool"))
 *     ...
 * });
 *
 * const valid = userSchema.parse(...); // Any value to validate
 *
 * if(valid) print("User is valid")
 * else print("User invalid");
 * ```
 */
class StringSchema extends BaseSchema {
	/**
	 * Defines the minimum string length.
     * @param strict Whether to include the provided value in the range
	 */
	min(min: number, strict?: boolean): this {
		this.constraints.push((value: string) => (strict ? value.size() > min : value.size() >= min));

		return this;
	}

	/**
	 * Defines the maximum string length.
     * @param strict Whether to include the provided value in the range
	 */
	max(max: number, strict?: boolean): this {
		this.constraints.push((value: string) => (strict ? value.size() < max : value.size() <= max));

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
		this.constraints.push((value: string) => value.size() === len);

		return this;
	}

	/**
	 * Validates a value according the restrictions provided by the Schema.
	 * @returns A boolean indicating if the value is valid
	 */
	override parse(value: unknown): value is string {
		if (this._optional && value === undefined) return true;

		return _default("string", undefined, value) && _constraints("string", this.constraints, value);
	}

	constructor() {
		super();
	}
}

export { StringSchema };
