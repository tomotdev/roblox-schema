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
class NumberSchema extends BaseSchema<number> {
	/**
	 * Defines the minimum value for the number.
     * @param strict Whether to include the provided value in the range
	 */
	min(min: number, strict?: boolean): this {
		this.constraints.push((value: number) => (strict ? value > min : value >= min));

		return this;
	}

	/**
	 * Defines the maximum value for the number.
     * @param strict Whether to include the provided value in the range
	 */
	max(max: number, strict?: boolean): this {
		this.constraints.push((value: number) => (strict ? value < max : value <= max));

		return this;
	}

    positive(): this {
        this.constraints.push((value: number) => value >= 0);

        return this;
    }

    negative(): this {
        this.constraints.push((value: number) => value < 0);

        return this;
    }

    /**
     * Forces the parsed value to be a multiple of the provided number.
     */
    multipleOf(num: number): this {
        this.constraints.push((value: number) => value % num === 0);

        return this;
    }

    int(): this {
        this.constraints.push((value: number) => value % 1 === 0);
        
        return this;
    }

	/**
	 * Validates a value according the restrictions provided by the Schema.
	 * @returns A boolean indicating if the value is valid
	 */
	override parse(value: unknown): value is number {
		return _default("number", undefined, value) && _constraints("number", this.constraints, value);
	}

	constructor() {
		super();
	}
}

export { NumberSchema };
