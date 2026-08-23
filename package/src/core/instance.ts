import { SchemaInputMap } from "../types";

export default function (_: any, schema: SchemaInputMap[keyof SchemaInputMap], instance: any): boolean {
	if (!typeIs(instance, "Instance")) return false;

	return instance.ClassName === schema;
}
