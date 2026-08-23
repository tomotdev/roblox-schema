import { BaseSchema } from "../schemas";
import { SchemaInputMap } from "../types";

export default function (_: any, schema: SchemaInputMap[keyof SchemaInputMap], obj: any): boolean {
	const schemaParams = schema as Record<string, BaseSchema>;

	if (!typeIs(obj, "table")) return false;

	for (const [key, value] of pairs(obj)) {
		if (!typeIs(key, "string")) return false;

		const schema = schemaParams[key];

		if (schema && !schema.parse(value)) return false;
	}

	return true;
}
