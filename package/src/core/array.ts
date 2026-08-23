import { BaseSchema } from "../schemas";
import { SchemaInputMap } from "../types";

export default function (_: any, schema: SchemaInputMap[keyof SchemaInputMap], array: any): boolean {
	if (!typeIs(array, "table")) return false;

	for (const [_, item] of pairs(array)) {
		if (!(schema as BaseSchema).parse(item)) return false;
	}

	return true;
}
