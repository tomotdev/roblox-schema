import _object from "../core/object";
import _strictObject from "../core/strictObject";
import { BaseSchema } from ".";
import { Infer, ParseResult } from "../types";

type StrictObjectHelper<T extends Record<string, BaseSchema<any>>> = {
	[K in keyof T as undefined extends Infer<T[K]> ? K : never]?: Infer<T[K]>;
} & {
	[K in keyof T as undefined extends Infer<T[K]> ? never : K]: Infer<T[K]>;
};

type ObjectHelper<T extends Record<string, BaseSchema<any>>> = StrictObjectHelper<T> & Record<string, any>;

class ObjectSchema<T extends Record<string, BaseSchema>> extends BaseSchema<ObjectHelper<T>> {
	safeParse(value: any): ParseResult {
		return this.internalParse(_object, undefined, this.obj, value);
	}

	constructor(private obj: T) {
		super();
	}
}

class StrictObjectSchema<T extends Record<string, BaseSchema>> extends BaseSchema<StrictObjectHelper<T>> {
	safeParse(value: any): ParseResult {
		return this.internalParse(_strictObject, undefined, this.obj, value);
	}

	constructor(private obj: T) {
		super();
	}
}

export { ObjectSchema, StrictObjectSchema };
