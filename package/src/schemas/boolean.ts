import _constraints from "../core/constraints";
import { BaseSchema } from ".";
import _default from "../core/default";
import { BoolFromStringData, ParseResult } from "../types";

class BooleanSchema extends BaseSchema<boolean> {
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

	safeParse(value: unknown): ParseResult {
		if (this.isBoolFromStringAllowed && typeIs(value, "string")) {
			if (this.boolFromStringData.truthy.includes(value)) return { success: true, errors: [] };
			if (this.boolFromStringData.falsy.includes(value)) return { success: true, errors: [] };
		}

		return this.internalParse(_default, "boolean", undefined, value);
	}

	constructor() {
		super();
	}
}

export { BooleanSchema };
