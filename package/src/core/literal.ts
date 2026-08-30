import { Error, ParseResult, SchemaInputMap } from "../types";

export default function (_: any, schema: SchemaInputMap[keyof SchemaInputMap], value: any): ParseResult {
	const errors: Error[] = [];
	const values = schema as readonly defined[];

	if (!values.includes(value)) {
		errors.push({
			expected: values.map((v) => tostring(v)).join(", "),
			received: tostring(value),
			code: "invalid_type",
			path: [],
			message: "",
		});
	}

	return {
		success: errors.size() === 0,
		errors,
	};
}
