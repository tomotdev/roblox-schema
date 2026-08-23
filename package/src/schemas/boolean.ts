import _constraints from "../core/constraints";
import { BaseSchema } from ".";
import _default from "../core/default";
import { BoolFromStringData } from "../types";



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
class BooleanSchema extends BaseSchema {
	private isBoolFromStringAllowed = false;
	private boolFromStringData: BoolFromStringData = {
		truthy: ["true", "1", "yes", "on", "y", "enabled"],
		falsy: ["false", "0", "no", "off", "n", "disabled"],
	};

    /**
     * Allows the parsed value to be one of the provided (or default) truthy/falsy values.
     */
	boolFromString(data?: BoolFromStringData): this {
		this.isBoolFromStringAllowed = true;
		if (data) this.boolFromStringData = data;
		return this;
	}

	/**
	 * Validates a value according the restrictions provided by the Schema.
	 * @returns A boolean indicating if the value is valid
	 */
	override parse(value: unknown): value is boolean {
        if(this.isBoolFromStringAllowed && typeIs(value, "string")) {
            if(this.boolFromStringData.truthy.includes(value)) return true;
            if(this.boolFromStringData.falsy.includes(value)) return true;
        }

		return _default("number", undefined, value);
	}

	constructor() {
		super();
	}
}

export { BooleanSchema };
