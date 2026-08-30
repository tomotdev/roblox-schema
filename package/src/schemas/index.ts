import { Constraint, Error, Parser, ParseResult, SchemaInputMap } from "../types";
import _constraints from "../core/constraints";

abstract class BaseSchema<T = any> {
	protected valid = true;
	protected errors: Error[] = [];
	protected errorPath: Array<string | number> = [];
	protected constraints: Constraint[] = [];
	private _optional = false;

	/**
	 * Value parsed can either be `undefined` or of the provided type.
	 */
	optional(): BaseSchema<T | undefined> {
		this._optional = true;
		return this;
	}

	/**
	 * Adds a custom constraint to the schema for a more precise parsing.
	 */
	addConstraint(constraint: Constraint): this {
		this.constraints.push(constraint);
		return this;
	}

	/**
	 * Similar to `parse()`, but will catch and return any error that occured while parsing.
	 */
	abstract safeParse(value: any): ParseResult;

	/**
	 * Returns whether the provided value matches the type defined by the current schema.
	 */
	parse(value: any): value is T {
		return this.safeParse(value).success;
	}

	protected static startParse(schema: BaseSchema<any>): void {
		schema.valid = true;
		schema.errorPath = [];
	}

	protected internalParse<T = undefined>(
		parser: Parser<T>,
		t: T,
		schema: SchemaInputMap[keyof SchemaInputMap],
		value: unknown,
	): ParseResult {
		if (this._optional && value === undefined) return { success: true, errors: [] };

		const result = parser(t, schema, value);
		const resultBis = result.success ? _constraints(t, this.constraints, value) : { success: false, errors: [] };

		return {
			success: result.success && resultBis.success,
			errors: [...result.errors, ...resultBis.errors],
		};
	}
}

export { BaseSchema };
