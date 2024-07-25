export type Result<T, E> = IOk<T> | IErr<E>;
export const Ok = <T>(value: T): Result<T, never> => new OK<T>(value);
export const ok = Ok;
export const Err = <E>(error: E): Result<never, E> => new ERR<E>(error);
export const err = Err;

interface IOk<T> {
	ok: true;
	err: false;
	value: T;
	unwrap(): T;
	unwrapOrElse(defaultValue: any): T;
	unwrapError(): never;
}

interface IErr<E> {
	ok: false;
	err: true;
	error: E;
	unwrap(): never;
	unwrapOrElse(DefaultValue: any): any;
	unwrapError(): E;
}

class OK<T> implements IOk<T> {
	public readonly ok: true;
	public readonly err: false;
	public readonly value: T;

	constructor(value: T) {
		this.ok = true;
		this.err = false;
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
	readonly ok: false;
	readonly err: true;
	readonly error: E;

	constructor(error: E) {
		this.ok = false;
		this.err = true;
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

/**
 * get the Result lists from a list of argument.
 * Then return a Result.
 * The error of result is the first error of the list of argument.
 * If the result doesn't contain an error, return Ok(null).
 * Using this, you can use unwrap after this check function.
 * @param results
 */
export const hasError = <E>(results: Result<any, E>[]): Result<null, E> => {
	for (const result of results) {
		if (!result.ok) {
			return Err(result.error);
		}
	}

	return Ok(null);
}


