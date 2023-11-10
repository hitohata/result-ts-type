export type Result<T, E> = IOk<T> | IErr<E>;
export const Ok = <T>(value: T): OK<T> => new OK<T>(value);
export const Err = <E>(error: E): ERR<E> => new ERR<E>(error);

interface IOk<T> {
	ok: true;
	value: T;
	unwrap(): T;
	unwrapOrElse(defaultValue: T): T;
	unwrapError(): never;
}

interface IErr<E> {
	ok: false;
	error: E;
	unwrap(): never;
	unwrapOrElse(DefaultValue: any): any;
	unwrapError(): E;
}

class OK<T> implements IOk<T>{
	public readonly ok: true;
	public readonly value: T;

	constructor(value: T) {
		this.ok = true;
		this.value = value;
	}

	/**
	 * Return a value without a type gard.
	 */
	unwrap(): T {
		return this.value;
	}

	/**
	 * return a value.
	 * @param defaultValue
	 */
	unwrapOrElse(defaultValue: T): T {
		return this.value;
	}

	/**
	 * This method must throw an error.
	 * @throws Error
	 */
	unwrapError(): never {
		throw Error("This result is OK");
	}
}

class ERR<E> implements IErr<E> {
	ok: false;
	error: E;

	constructor(error: E) {
		this.ok = false;
		this.error = error;
	}

	/**
	 * This function throw an error.
	 * @throws Error
	 */
	unwrap(): never {
		throw Error("This result is error");
	}

	/**
	 * Returns a default value that passed as an argument.
	 * @param defaultValue
	 */
	unwrapOrElse(defaultValue: any): any {
		return defaultValue;
	}

	/**
	 * Return an error.
	 */
	unwrapError(): E {
		return this.error;
	}
}
