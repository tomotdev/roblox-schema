import _default from "../core/default";
import { BaseSchema } from ".";
import { DataTypes } from "../types";

class DataTypeSchema<T extends keyof DataTypes> extends BaseSchema {
    private t: T;

    override parse(value: any): value is DataTypes[T] {
        return _default("dataType", this.t, value);
    }

    constructor(t: T) {
        super()
        this.t = t;
    }
}

export { DataTypeSchema };
