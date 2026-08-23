import _literal from "../core/literal";
import { BaseSchema } from ".";

class LiteralSchema<const T extends unknown[]> extends BaseSchema<T[number]> {
    private values: T;

    override parse(value: any): value is T[number] {
        return _literal(undefined, this.values, value);
    }

    constructor(values: T) {
        super()
        this.values = values;
    }
}

export { LiteralSchema };

/**
 * static literal<const T extends unknown[]>(values: T): Schema<T[number]> {
		return new Schema("literal", values);
	}
 */