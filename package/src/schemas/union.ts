import _instance from "../core/instance";
import { BaseSchema } from ".";
import { ParseResult } from "../types";

type Union<S extends readonly BaseSchema[]> = S[number] extends BaseSchema<infer T> ? T : never;

class UnionSchema<S extends readonly BaseSchema[]> extends BaseSchema<Union<S>> {
	safeParse(value: any): ParseResult {
		for (let i = 0; i < this.schemas.size(); i++) {
			const result = this.schemas[i].safeParse(value);

			if (result.success) {
				return {
					success: true,
					errors: [],
				};
			}
		}

		return {
			success: false,
			errors: [
				{
					expected: "",
					received: value,
					code: "invalid_type",
					path: [],
					message: "Invalid input: input was not validated by any schema in the union.",
				},
			],
		};
	}

	constructor(private schemas: S) {
		super();
	}
}

export { UnionSchema };
