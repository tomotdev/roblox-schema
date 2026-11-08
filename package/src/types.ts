import { BaseSchema } from "./schemas";

/**
 * An interface containing every Roblox data type
 */
export interface DataTypes {
	Vector2: Vector2;
	Vector2int16: Vector2int16;
	Vector3: Vector3;
	Vector3int16: Vector3int16;
	CFrame: CFrame;
	Ray: Ray;
	Rect: Rect;
	Region3: Region3;
	Region3int16: Region3int16;
	UDim: UDim;
	UDim2: UDim2;
	Color3: Color3;
	BrickColor: BrickColor;
	ColorSequence: ColorSequence;
	NumberRange: NumberRange;
	NumberSequence: NumberSequence;
	PhysicalProperties: PhysicalProperties;
	Instance: Instance;
	Enum: Enum;
	EnumItem: EnumItem;
	Axes: Axes;
	Faces: Faces;
	TweenInfo: TweenInfo;
	DateTime: DateTime;
	Font: Font;
	Content: Content;
	PathWaypoint: PathWaypoint;
}

/**
 * Interface containing parameters for parsers depending on the schema type
 */
export type SchemaInputMap = {
	number: undefined;
	string: undefined;
	boolean: undefined;
	instance: {
		class: keyof Objects;
		props: Properties<keyof Instances> | undefined;
		children: (readonly InstanceSchemaBase[]) | undefined;
	};
	dataType: keyof DataTypes;
	array: BaseSchema;
	object: Record<string, BaseSchema>;
	strictObject: Record<string, BaseSchema>;
	optional: BaseSchema;
	literal: any[];
	union: readonly BaseSchema[];
};

export type ErrorCode = "invalid_type" | "extra_key" | "invalid_key" | "constraint_error";

export interface Error {
	expected: string;
	received: string;
	code: ErrorCode;
	/**
	 * Path to the value that failed to be parsed (if nested).
	 */
	path: Array<string | number>;
	message: string;
}

/**
 * The type of the `safeParse` method return value.
 */
export interface ParseResult {
	success: boolean;
	errors: Error[];
}

/**
 * Helper type used to extract a schema type.
 *
 * Example :
 * ```typescript
 * import { Schema, Infer } from "@rbxts/roblox-schema"
 *
 * const schema = Schema.object({
 *     id: Schema.number(),
 *     name: Schema.string()
 * });
 *
 * type User = Infer<typeof schema>;
 * // Same as :
 * type User = {
 *     id: number;
 *     name: string;
 * }
 * ```
 */
export type Infer<S extends BaseSchema> = S extends BaseSchema<infer T> ? T : never;

export interface Constraint {
	/**
	 * Message to show if the value does not meet the constraint requirements.
	 */
	error: string;

	/**
	 * Function defining if a value is valid.
	 *
	 * Example : min() constraint :
	 * ```typescript
	 * schema.addConstraint({
	 *   error: "Value must be greater than 5",
	 *   test: (value: number) => value > 5
	 * })
	 * ```
	 */
	test: (value: any) => boolean;
}

export interface BoolFromStringData {
	/**
	 * Values which will be parsed as `true`.
	 */
	truthy: string[];

	/**
	 * Values which will be parsed as `false`.
	 */
	falsy: string[];
}

export type Parser<T = undefined> = (t: T, schema: SchemaInputMap[keyof SchemaInputMap], value: any) => ParseResult;

export type Properties<K extends keyof Instances, T = Instances[K]> = { [P in keyof T]?: T[P] };

export interface InstanceSchemaBase<T = any> extends BaseSchema<T> {
    readonly __instanceSchema: true;
    className: keyof Instances;
}

export type ChildName<C> = C extends InstanceSchemaBase<infer T> ? (T extends { Name: infer N } ? N : never) : never;

export type ChildrenMap<Children extends readonly InstanceSchemaBase<any>[]> = {
	[C in Children[number] as ChildName<C>]: Infer<C>;
};
