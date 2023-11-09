import * as async_hooks from "async_hooks";

export type Result<T, E> = IOk<T> | IErr<E>
export const Ok = <T>(value: T): OK<T> => new OK<T>(value);
export const Err = <E>(error: E): ERR<E> => new ERR<E>(error);

interface IOk<T> {
    ok: true,
    value: T
    unwrap(): T
    unwrapOrDefault(defaultValue: T): T
    unwrapError(): never
}

interface IErr<E> {
    ok: false,
    error: E,
    unwrap(): never
    unwrapOrDefault(DefaultValue: any): any
    unwrapError(): E
}

class OK<T> implements IOk<T> {
    public readonly ok: true
    public readonly value: T

    constructor(value: T) {
        this.ok = true;
        this.value = value;
    }

    /**
     * return value
     */
    unwrap(): T {
        return this.value
    }

    unwrapOrDefault(defaultValue: T): T {
        return this.value;
    }

    unwrapError(): never {
        throw Error("This result is OK")
    }
}

class ERR<E> implements IErr<E> {
    ok: false;
    error: E

    constructor(error: E) {
        this.ok = false;
        this.error = error;
    }
    unwrap(): never {
        throw Error("This result is error")
    }

    unwrapOrDefault(defaultValue: any): any {
        return defaultValue
    }

    unwrapError(): E {
        return this.error
    }
}