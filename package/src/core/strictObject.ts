import { BaseSchema } from "../schemas";
import { SchemaInputMap } from "../types";

export default function (_: any, schema: SchemaInputMap[keyof SchemaInputMap], obj: any): boolean {
	const schemaParams = schema as Record<string, BaseSchema>;

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
