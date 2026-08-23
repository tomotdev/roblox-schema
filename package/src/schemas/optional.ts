import _instance from "../core/instance";
import { BaseSchema } from ".";

class OptionalSchema<T> extends BaseSchema<T | undefined> {
	override parse(value: unknown): value is T | undefined {
		return value === undefined || this.schema.parse(value);
	}

	constructor(private schema: BaseSchema<T>) {
		super();
	}
}

export { OptionalSchema };
