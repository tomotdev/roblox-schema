import _instance from "../core/instance";
import { BaseSchema } from ".";

class InstanceSchema<K extends keyof Instances> extends BaseSchema<Instances[K]> {
    private class: K;

    override parse(value: any): value is Instances[K] {
        return _instance(undefined, this.class, value);
    }

    constructor(className: K) {
        super()
        this.class = className;
    }
}

export { InstanceSchema };