import _instance from "../core/instance";
import { BaseSchema } from ".";
import { ParseResult, Properties, ChildrenMap, InstanceSchemaBase, Infer } from "../types";

type InstanceSchemaHelper<
	K extends keyof Instances,
	Props extends Properties<K>,
	Children extends readonly InstanceSchemaBase[],
	CMap = ChildrenMap<Children>,
> = Instances[K] & { [P in keyof Props]: Props[P] } & CMap & {
		FindFirstChild<N extends keyof CMap>(
			this: Instance,
			childName: N | string | number,
			recursive?: boolean,
		): typeof childName extends keyof CMap ? CMap[N] : Instance | undefined;
	};

class InstanceSchema<K extends keyof Instances, const Props extends Properties<K>, const Children extends readonly InstanceSchemaBase[]>
	extends BaseSchema<InstanceSchemaHelper<K, Props, Children>>
	implements InstanceSchemaBase<InstanceSchemaHelper<K, Props, Children>>
{
	readonly __instanceSchema = true;
	readonly name: string | undefined;
    readonly className;

	safeParse(value: any): ParseResult {
		return this.internalParse(
			_instance,
			undefined,
			{
				class: this.className,
				props: this.props,
				children: this.children,
			},
			value,
		);
	}

	constructor(
		private _className: K,
		private props?: Props,
		private children?: Children,
	) {
		super();
		this.name = props?.Name;
        this.className = this._className;
	}
}

export { InstanceSchema };
