import { BaseSchema } from "./schemas";

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

export type SchemaInputMap = {
	number: undefined;
	string: undefined;
	boolean: undefined;
	instance: keyof Instances;
	dataType: keyof DataTypes;
	array: BaseSchema;
	object: Record<string, BaseSchema>;
	strictObject: Record<string, BaseSchema>;
	optional: BaseSchema;
	literal: any[];
	union: readonly BaseSchema[];
};

// type ErrorCode = "invalid_type" | "constraint_error"

// interface Error {
//     expected: keyof SchemaInputMap;
//     code: ErrorCode;
//     path: [];
//     message: string;
// }

export type Infer<S extends BaseSchema> = S extends BaseSchema<infer T> ? T : never;

export type Constraint = (value: any) => boolean;

export interface BoolFromStringData {
	truthy: string[];
	falsy: string[];
}
