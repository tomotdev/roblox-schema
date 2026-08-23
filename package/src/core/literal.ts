import { SchemaInputMap } from "../types";

export default function(_: any, schema: SchemaInputMap[keyof SchemaInputMap], value: any): boolean {
    return (schema as readonly defined[]).includes(value);
}