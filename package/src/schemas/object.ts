import _object from "../core/object";
import _strictObject from "../core/strictObject";
import { BaseSchema } from ".";
import { Infer } from "../types";

class ObjectSchema<T extends Record<string, BaseSchema>, P = { [K in keyof T]: Infer<T[K]> }> extends BaseSchema<P> {
    private obj: T;

    override parse(value: any): value is P {
        return _object(undefined, this.obj, value);
    }

    constructor(obj: T) {
        super()
        this.obj = obj;
    }
}

class StrictObjectSchema<T extends Record<string, BaseSchema>, P = { [K in keyof T]: Infer<T[K]> }> extends BaseSchema<P> {
    private obj: T;

    override parse(value: any): value is P {
        return _strictObject(undefined, this.obj, value);
    }

    constructor(obj: T) {
        super()
        this.obj = obj;
    }
}

export { ObjectSchema, StrictObjectSchema };