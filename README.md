# @rbxts/roblox-schema

Runtime schema validation for roblox-ts.

## 📦 Installation
At this moment the package can only be installed using NPM :

```
$ npm install @rbxts/roblox-schema
```

## 💡 Example usage

```typescript
import { Schema } from "@rbxts/roblox-schema";

const parser = Schema.object({
	id: Schema.number(),
	name: Schema.string(),
	age: Schema.optional(Schema.number())
});

parser.parse({
	id: 0,
	name: "Jack",
}); // true - All required keys are provided and values are correct

parser.parse({
	name: "Tom",
	age: 26,
}); // false - Missing "id"
```

## ⭐ Features

- Primitive types (number, string, ...)
- Objects/Arrays (tables)
- Roblox Instances
- Roblox data types (Vector3, CFrame, ...)
- Optional values
- Type inference for parsed values
- Type creation from schema

## 📖 Documentation [WIP]

- ### Type inference
`roblox-schema` provides type inference for values that are parsed. Here's an example :

```typescript
import { Schema } from "@rbxts/roblox-schema";

const personSchema = Schema.object({
    name: Schema.string(),
    age: Schema.number()
});

const fetchedPerson = ... // Some non-typed data you fetched

if(personSchema.parse(fetchedPerson)) {
    print(fetchedPerson.name) // Typescript now knows property 'name' exists on the value
}
```

- ### Type creation from schema
`roblox-schema` provides an utility type named `Infer` that you can use to create a custom type based on a schema :
```typescript
import { Schema, Infer } from "@rbxts/roblox-schema";

const schema = Schema.array(Schema.number());

// The two following types are the same
type SchemaType = Infer<typeof schema>;
type SchemaType = number[];
```
This allows you to use the schema as centralized type to avoid multiple declarations of the same type.

## 🔄️ Change log

See [CHANGELOG.md](https://github.com/tomotdev/roblox-schema/blob/main/CHANGELOG.md).

## 📜 License
This project is licensed under the MIT license (see [LICENSE.md](https://github.com/tomotdev/roblox-schema/blob/main/LICENSE.md) for details).