import { DataTypes } from "./types";

type SchemaInputMap = {
	number: undefined;
	string: undefined;
	boolean: undefined;
	instance: keyof Instances;
	dataType: keyof DataTypes;
	array: Schema<unknown>;
	object: Record<string, Schema<unknown>>;
	optional: Schema<unknown>;
};

type Infer<S extends Schema<unknown>> = S extends Schema<infer T> ? T : never;

/**
 * Main class allowing validation
 *
 * Usage:
 * ```ts
 * import { Schema } from "@rbxts/roblox-schema";
 *
 * const userSchema = Schema.object({
 *     id: Schema.number(),
 *     username: Schema.string(),
 *     inventory: Schema.array(Schema.instance("Tool"))
 *     ...
 * });
 *
 * const valid = userSchema.parse(...); // Any value to validate
 *
 * if(valid) print("User is valid")
 * else print("User invalid");
 * ```
 */
class Schema<T, K extends keyof SchemaInputMap = keyof SchemaInputMap> {
	type: keyof SchemaInputMap;
	schema: SchemaInputMap[K];

	/** Generates an automatic schema for type : `number` */
	static number(): Schema<number> {
		return new Schema("number", undefined);
	}

	/** Generates an automatic schema for type : `string` */
	static string(): Schema<string> {
		return new Schema("string", undefined);
	}

	/** Generates an automatic schema for type : `boolean` */
	static boolean(): Schema<boolean> {
		return new Schema("boolean", undefined);
	}

	/**
	 * Parsed value must be an instance of the provided class
	 */
	static instance(className: keyof Instances): Schema<Instance> {
		return new Schema("instance", className);
	}

	/**
	 * Only validates array which follow a provided type.
	 * @example
	 * ```ts
	 * const schema = Schema.array(Schema.number());
	 *
	 * schema.parse([ 1, 2, 3 ]); // true
	 * schema.parse([ "a", "b", "c" ]); // false
	 * ```
	 */
	static array<T>(schema: Schema<T>): Schema<T[]> {
		return new Schema("array", schema);
	}

	/**
     * Only validates objects that meet the provided requirements
	 * @example
	 * ```ts
	const schema = Schema.object({
        id: Schema.number(),
        name: Schema.string(),
        age: Schema.optional(Schema.number())
    });

	schema.parse({
        id: 0,
        name: "Jack"
    }); // true - All required keys are provided and values are correct
    
	schema.parse({
        name: "Tom",
        age: 26
    }); // false - Missing "id"
	 * ```
	 */
	static object<T extends Record<string, Schema<unknown>>>(obj: T): Schema<{ [K in keyof T]: Infer<T[K]> }> {
		return new Schema("object", obj);
	}

	/**
	 * Value parsed can either be `undefined` or of the provided type
	 */
	static optional<T>(schema: Schema<T>): Schema<T | undefined> {
		return new Schema("optional", schema);
	}

	/**
	 * Value parsed must be of the provided DataType (such as `Vector3`, `CFrame`, `UDim2` ...)
	 */
	static dataType<T extends keyof DataTypes>(dataType: T): Schema<DataTypes[T]> {
		return new Schema("dataType", dataType);
	}

	private defaultParser(value: unknown): boolean {
		let referenceType: keyof CheckableTypes;

		switch (this.type) {
			case "number":
			case "string":
			case "boolean":
				referenceType = this.type;
				break;

			case "dataType":
				referenceType = this.schema as keyof CheckableTypes;
				break;

			default:
				return false;
		}

		const temp = typeIs(value, referenceType);

		return temp;
	}

	private objectParser(obj: unknown): boolean {
		const schemaParams = this.schema as Record<string, Schema<"object">>;

		if (!typeIs(obj, "table")) return false;

		let objKeyCount = 0;

		for (const [key, value] of pairs(obj)) {
			objKeyCount++;

			if (!typeIs(key, "string")) return false;

			if (schemaParams[key] !== undefined) {
				const schema = schemaParams[key];

				if (!schema.parse(value)) return false;
			} else return false;
		}

		let schemaKeyCount = 0;

		for (const entry of pairs(schemaParams)) {
			schemaKeyCount++;
		}

		if (objKeyCount !== schemaKeyCount) return false;

		return true;
	}

	private arrayParser(obj: unknown): boolean {
		const schema = this.schema as Schema<unknown>;

		if (!typeIs(obj, "table")) return false;

		for (const [_, item] of pairs(obj)) {
			if (!schema.parse(item)) return false;
		}

		return true;
	}

	private instanceParser(instance: unknown): boolean {
		if (!typeIs(instance, "Instance")) return false;

		return instance.ClassName === this.schema;
	}

	/**
	 * Validates a value according the restrictions provided by the Schema.
	 * @returns A boolean indicating if the value is valid
	 */
	parse(value: unknown): value is T {
		switch (this.type) {
			case "number":
			case "string":
			case "boolean":
			case "dataType":
				return this.defaultParser(value);

			case "instance":
				return this.instanceParser(value);

			case "optional":
				return value === undefined || (this.schema as Schema<unknown>).parse(value);

			case "object":
				return this.objectParser(value);

			case "array":
				return this.arrayParser(value);

			default:
				return false;
		}
	}

	constructor(t: K, schema: SchemaInputMap[K]) {
		this.type = t;
		this.schema = schema;
	}
}

export { Schema, Infer };
