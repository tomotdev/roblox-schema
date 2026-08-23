import { Constraint } from "../types";

export default function (_: any, constraints: Constraint[], value: any): boolean {
	let valid = false;

	constraints.forEach((constraint) => {
		if (!valid) return;
		valid = constraint(value);
	});

	return valid;
}
