type Test = {
	[P in keyof Instances[keyof Instances]]?:
		Instances[keyof Instances][P];
};