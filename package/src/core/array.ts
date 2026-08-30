import { BaseSchema } from "../schemas";
import { Error, ParseResult, SchemaInputMap } from "../types";

export default function (_: any, schema: SchemaInputMap[keyof SchemaInputMap], array: any): ParseResult {
	const errors: Error[] = [];

	if (!typeIs(array, "table")) {
		errors.push({
			expected: "array",
			received: typeOf(array),
			code: "invalid_type",
			path: [],
			message: "",
		});

		return {
			success: false,
			errors,
		};
	}

	for (const [index, item] of ipairs(array as readonly unknown[])) {
		const result = (schema as BaseSchema).safeParse(item);

		if (!result.success) {
			result.errors.forEach(({ expected, received, code, path, message }) => {
				errors.push({
					expected,
					received,
					code,
					message,
					path: [index, ...path],
				});
			});
		}
	}

	return {
		success: errors.size() === 0,
		errors,
	};
}
