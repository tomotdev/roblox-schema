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

	let objKeyCount = 0;

	for (const [key, value] of pairs(obj)) {
		objKeyCount++;

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

		if (schemaParams[key] !== undefined) {
			const schema = schemaParams[key];
			const result = schema.safeParse(value);

			if (!result.success) {
				const localErrors = result.errors;

				localErrors.map((err) => ((err.path = [key, ...err.path]), err)).forEach((v) => errors.push(v));
			}
		} else {
			errors.push({
				expected: "undefined",
				received: "defined",
				code: "extra_key",
				path: [],
				message: "",
			});
		}
	}

	let schemaKeyCount = 0;

	for (const entry of pairs(schemaParams)) {
		schemaKeyCount++;
	}

	return {
		success: errors.size() === 0,
		errors,
	};
}
