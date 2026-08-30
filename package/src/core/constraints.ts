import { Constraint, Error, ParseResult } from "../types";

export default function (_: any, constraints: Constraint[], value: any): ParseResult {
	const errors: Error[] = [];

	constraints.forEach(({ test, error: err }) => {
		const valid = test(value);

		if (!valid) {
			errors.push({
				expected: "",
				received: tostring(value),
				code: "constraint_error",
				path: [],
				message: err,
			});
		}
	});

	return {
        success: errors.size() === 0,
        errors
    };
}
