# @rbxts/roblox-schema

Runtime schema validation for roblox-ts, inspired by Zod.

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

- No dependencies
- Primitive types (number, string, ...)
- Objects/Arrays (tables)
- Roblox Instances
- Roblox data types (Vector3, CFrame, ...)
- Optional values
- Typed parsed values
- Type creation from schema

## 📖 Documentation

You can find full documentation [here](https://docs.tomot.fr/roblox-schema/docs/).

## 🔄️ Change log

See [CHANGELOG.md](https://github.com/tomotdev/roblox-schema/blob/main/CHANGELOG.md).

## 📜 License
This project is licensed under the MIT license (see [LICENSE.md](https://github.com/tomotdev/roblox-schema/blob/main/LICENSE.md) for details).