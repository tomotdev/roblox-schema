import { Error } from "../types";

export function formatErrorMessage(err: Error): Error {
	if (err.message === "") err.message = `Invalid input: expected ${err.expected}, received ${err.received}`;
	else err.message = err.message.gsub("{expected}", err.expected)[0].gsub("{received}", err.received)[0];

	return err;
}
