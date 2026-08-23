import _instance from "../core/instance";
import { BaseSchema } from ".";

class UnionSchema<S extends readonly BaseSchema[]> extends BaseSchema {
    private schemas: S;

    override parse(value: any): value is (S[number] extends BaseSchema<infer T> ? T : never) {
        return this.schemas.some((schema) => schema.parse(value));
    }

    constructor(schemas: S) {
        super()
        this.schemas = schemas;
    }
}

export { UnionSchema };
