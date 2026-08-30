import { BaseSchema } from "../schemas";
import { Error, ParseResult, SchemaInputMap } from "../types";

export default function (_: any, schema: SchemaInputMap[keyof SchemaInputMap], obj: any): ParseResult {
	const schemaParams = schema as Record<string, BaseSchema>;
	const errors: Error[] = [];

	if (!typeIs(obj, "table"))
		return {
			success: false,
			errors: [
				{
					expected: "object",
					received: typeOf(obj),
					code: "invalid_type",
					path: [],
					message: "",
				},
			],
		};

	for (const [key, value] of pairs(obj)) {
		if (!typeIs(key, "string")) {
			errors.push({
				expected: "string",
				received: typeOf(key),
				code: "invalid_key",
				path: [],
				message: "Invalid key type: expected {expected}, received {received}",
			});

			continue;
		}

		const schema = schemaParams[key];

		if (schema) {
			const result = schema.safeParse(value);

			if (!result.success) {
				const localErrors = result.errors;

				localErrors.map((err) => ((err.path = [key, ...err.path]), err)).forEach((e) => errors.push(e));
			}
		}
	}

	return {
		success: errors.size() === 0,
		errors,
	};
}
