import { SchemaInputMap } from "../types";

export default function (t: keyof SchemaInputMap, schema: SchemaInputMap[keyof SchemaInputMap], value: any): boolean {
	let referenceType: keyof CheckableTypes;

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
			return false;
	}

	const temp = typeIs(value, referenceType);

	return temp;
}
