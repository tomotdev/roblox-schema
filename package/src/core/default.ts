import { Error, ParseResult, SchemaInputMap } from "../types";

export default function (
	t: keyof SchemaInputMap,
	schema: SchemaInputMap[keyof SchemaInputMap],
	value: any,
): ParseResult {
	let referenceType: keyof CheckableTypes;
	const errors: Error[] = [];

	switch (t) {
		case "number":
		case "string":
		case "boolean":
			referenceType = t;
			break;

		case "dataType":
			referenceType = schema as keyof CheckableTypes;
			break;

		default:
			return {
				success: false,
				errors: [
					{
						expected: "number | string | boolean | DataTypes[keyof DataTypes]",
						received: typeOf(value),
						code: "invalid_type",
						path: [],
						message: "",
					},
				],
			};
	}

	const temp = typeIs(value, referenceType);

	if (!temp)
		errors.push({
			expected: referenceType,
			received: typeOf(value),
			code: "invalid_type",
			path: [],
			message: "",
		});

	return {
		success: temp,
		errors,
	};
}
