import _instance from "../core/instance";
import { BaseSchema } from ".";

class OptionalSchema<T> extends BaseSchema {
	private schema: BaseSchema<T>;

	override parse(value: any): value is T | undefined {
		return value === undefined || this.schema.parse(value);
	}

	constructor(schema: BaseSchema<T>) {
		super();
		this.schema = schema;
	}
}

export { OptionalSchema };
