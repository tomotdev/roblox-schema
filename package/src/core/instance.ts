import { Error, ParseResult, SchemaInputMap } from "../types";

export default function (_: any, sch: SchemaInputMap[keyof SchemaInputMap], instance: any): ParseResult {
	const errors: Error[] = [];
	const schema = sch as SchemaInputMap["instance"];

	if (!typeIs(instance, "Instance")) {
		errors.push({
			expected: "Instance",
			received: typeOf(instance),
			code: "invalid_type",
			path: [],
			message: "",
		});

		return {
			success: false,
			errors,
		};
	}

	if (!instance.IsA(schema.class)) {
		errors.push({
			expected: `Instance<${schema}>`,
			received: typeOf(instance),
			code: "invalid_type",
			path: [],
			message: "",
		});
	}

    if(schema.props) {}

	if (schema.children) {
		schema.children.forEach((child) => {
			let instanceChild: Instance | undefined;

			if ("name" in child) {
				instanceChild = instance.WaitForChild(child.name as string) as Instance | undefined;
			} else
				instanceChild = instance.FindFirstChildWhichIsA(child.className as keyof Instances) as
					Instance | undefined;

			const { success, errors } = child.safeParse(instanceChild);

			if (!success) error("Error(s) occured while parsing child: " + tostring(errors));
		});
	}

	return {
		success: errors.size() === 0,
		errors,
	};
}
