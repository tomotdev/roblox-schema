import _instance from "../core/instance";
import { BaseSchema } from ".";

type Union<S extends readonly BaseSchema[]> = S[number] extends BaseSchema<infer T> ? T : never

class UnionSchema<S extends readonly BaseSchema[]> extends BaseSchema<Union<S>> {
    private schemas: S;

    override parse(value: any): value is Union<S> {
        return this.schemas.some((schema) => schema.parse(value));
    }

    constructor(schemas: S) {
        super()
        this.schemas = schemas;
    }
}

export { UnionSchema };
