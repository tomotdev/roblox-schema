import { Schema } from ".";

const parser = Schema.object({ abc: Schema.string(), def: Schema.number() });

function fetch() {
	return new Promise((resolve) => {
		resolve({ abc: "sdsdsd", def: 4 });
	});
}

fetch().then((value) => {
	if (parser.parse(value)) {
        value.ad
	}
});
