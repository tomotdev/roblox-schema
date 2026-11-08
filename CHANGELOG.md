# Change Log

All notable changes to this project will be documented in this file.

More informations can be found [here](https://docs.tomot.fr/roblox-schema/).

<br>

## v1.1.3 · 08/11/2026
- Fixed `InstanceSchema` not correctly working with type inference (children not being displayed as "properties")
- Changed parsing system :
  - `BaseSchema.parse()` now throws errors if the provided value does not match the schema type
  - `BaseSchema.safeParse()` : same method as parse, but catches errors
- Added custom constraint system
- Added data types shorthands
- Updated [documentation](https://docs.tomot.fr/roblox-schema/)

## v1.1.2 · 23/08/2026
- Fixed every schema class not extending correctly from `BaseSchema`, breaking type inference

## v1.1.1 · 23/08/2026
- Fixed `BaseSchema`'s `optional()` method not working with type inference
- Added `OptionalSchema`, accessible through `Schema.optional()` static method

## v1.1.0 · 23/08/2026
- Added [documentation](https://docs.tomot.fr/roblox-schema/)
- Changed package structure to have seperate schema classes for each type
- Added `strictObject`, `union` and `literal` static methods

## v1.0.0 · 19/08/2026
Initial release