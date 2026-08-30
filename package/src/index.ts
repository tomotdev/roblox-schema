import { BaseSchema } from "./schemas";
import { ArraySchema } from "./schemas/array";
import { BooleanSchema } from "./schemas/boolean";
import { DataTypeSchema } from "./schemas/dataType";
import { InstanceSchema } from "./schemas/instance";
import { LiteralSchema } from "./schemas/literal";
import { NumberSchema } from "./schemas/number";
import { ObjectSchema, StrictObjectSchema } from "./schemas/object";
import { OptionalSchema } from "./schemas/optional";
import { StringSchema } from "./schemas/string";
import { UnionSchema } from "./schemas/union";
import { DataTypes, Infer } from "./types";

/**
 * Main class allowing validation.
 *
 * Example usage:
 * ```ts
 * import { Schema } from "@rbxts/roblox-schema";
 *
 * const userSchema = Schema.object({
 *     id: Schema.number(),
 *     username: Schema.string(),
 *     ...
 * });
 *
 * const valid = userSchema.parse(...); // Any value to validate
 *
 * if(valid) print("User is valid")
 * else print("User invalid");
 * ```
 */
abstract class Schema {
	/**
	 * Validates value if it is a number.
	 */
	static number(): NumberSchema {
		return new NumberSchema();
	}

	/**
	 * Validates value if it is a string.
	 */
	static string(): StringSchema {
		return new StringSchema();
	}

	/**
	 * Validates value if it is a boolean.
	 */
	static boolean(): BooleanSchema {
		return new BooleanSchema();
	}

	/**
	 * Validates value if it is an instance of the provided DataType (such as `Vector3`, `CFrame`, `UDim2` ...)
	 */
	static dataType<K extends keyof DataTypes>(t: K): DataTypeSchema<K> {
		return new DataTypeSchema(t);
	}

	/**
	 * Validates value if it is an instance of the provided class.
	 */
	static instance<K extends keyof Instances>(className: K): InstanceSchema<K> {
		return new InstanceSchema(className);
	}

	/**
	 * Validates the value only if it is an array of the provided type.
	 * @example
	 * ```ts
	 * const schema = Schema.array(Schema.number());
	 *
	 * schema.parse([ 1, 2, 3 ]); // true
	 * schema.parse([ "a", "b", "c" ]); // false
	 * ```
	 */
	static array<T>(schema: BaseSchema<T>): ArraySchema<T> {
		return new ArraySchema(schema);
	}

	/**
	 * Same method as `Schema.strictObject()`, but will allow extra properties that are not defined in the provided schema.
	 */
	static object<T extends Record<string, BaseSchema>>(obj: T): ObjectSchema<T & Record<string, any>> {
		return new ObjectSchema(obj);
	}

	/**
     * Validates the value only if it is an object following the provided schema.
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
	static strictObject<T extends Record<string, BaseSchema>>(obj: T): StrictObjectSchema<T> {
		return new StrictObjectSchema(obj);
	}

	/**
	 * Validates value if it is included in the provided allowed values.
	 */
	static literal<const T extends unknown[]>(values: T): LiteralSchema<T> {
		return new LiteralSchema(values);
	}

	/**
	 * Validates value if it matches at least one of the provided schemas
	 */
	static union<S extends readonly BaseSchema[]>(...schemas: S): UnionSchema<S> {
		return new UnionSchema(schemas);
	}

	/**
	 * Value parsed can either be `undefined` or of the provided schema type
     * 
     * Same result with `BaseSchema`'s `optional()` method :
     * ```
    import { Schema } from "@rbxts/roblox-schema";

    Schema.optional(Schema.string());
    // =
    Schema.string().optional();
     * ```
	 */
	static optional<T>(schema: BaseSchema<T>): OptionalSchema<T> {
		return new OptionalSchema(schema);
	}

    /**
     * Shorthand for `Schema.dataType("Vector3")`
     */
    static vector3(): DataTypeSchema<"Vector3"> {
        return this.dataType("Vector3");
    }

    /**
     * Shorthand for `Schema.dataType("Vector2")`
     */
    static vector2(): DataTypeSchema<"Vector2"> {
        return this.dataType("Vector2");
    }

    /**
     * Shorthand for `Schema.dataType("CFrame")`
     */
    static cframe(): DataTypeSchema<"CFrame"> {
        return this.dataType("CFrame");
    }

    /**
     * Shorthand for `Schema.dataType("UDim")`
     */
    static udim(): DataTypeSchema<"UDim"> {
        return this.dataType("UDim");
    }

    /**
     * Shorthand for `Schema.dataType("Vector3")`
     */
    static udim2(): DataTypeSchema<"UDim2"> {
        return this.dataType("UDim2");
    }

    /**
     * Shorthand for `Schema.dataType("Color3")`
     */
    static color3(): DataTypeSchema<"Color3"> {
        return this.dataType("Color3")
    }
}

export { Schema, Infer };
