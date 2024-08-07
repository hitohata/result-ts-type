import { describe, expect, it } from "vitest";
import { Err, Ok, type Result, hasError } from "../lib";

describe("result", () => {
	describe("ok", () => {
		const VALUE = "value";

		const okResult = (): Result<string, any> => {
			return Ok(VALUE);
		};

		const ok = okResult();

		it("how to use ok", () => {
			// to access to value, it needs type guard
			if (ok.ok) {
				expect(ok.value).toBe("value");
			} else {
				throw Err("the ok must be true");
			}

			// you can access the value by checking the err.
			if (!ok.err) {
				expect(ok.value).toBe("value");
			} else {
				throw Err("the err must be false");
			}
		});

		it("unwrap in ok", () => {
			const unwrapResult = okResult().unwrap();
			expect(unwrapResult).toBe(VALUE);
		});

		it("unwrap or default in ok", () => {
			const DEFAULT = "default";
			const unwrapOrElseResult = okResult().unwrapOrElse(DEFAULT);
			expect(unwrapOrElseResult).toBe(VALUE);
			expect(unwrapOrElseResult).not.toBe(DEFAULT);
		});

		it("unwrap err in ok", () => {
			expect(() => okResult().unwrapError()).toThrow();
		});
	});

	describe("error", () => {
		const ERROR = new Error("error");

		const errResult = (): Result<any, Error> => {
			return Err(ERROR);
		};

		it("err", () => {
			const err = errResult();

			// to access to error, it needs type guard
			if (err.err) {
				expect(err.error).toBeInstanceOf(Error);
			} else {
				throw Error("the err must be true");
			}

			// you can access the value by checking the ok.
			if (!err.ok) {
				expect(err.error).toBeInstanceOf(Error);
			} else {
				throw Error("the ok must be false");
			}
		});

		it("unwrap in err", () => {
			expect(() => errResult().unwrap()).toThrowError();
		});

		it("unwrap or default in err", () => {
			const DEFAULT = "default";
			const unwrapOrElseResult = errResult().unwrapOrElse(DEFAULT);
			expect(unwrapOrElseResult).toBe(DEFAULT);
		});

		it("unwrap err in ok", () => {
			expect(errResult().unwrapError()).toBeInstanceOf(Error);
		});
	});
});

describe("OK", () => {
	const VALUE = "value";
	const ok = Ok(VALUE);

	it("ok?", () => {
		expect(ok.ok).toBeTruthy();
	});

	it("access to value", () => {
		expect(ok.ok && ok.value).toBe(VALUE);
	});

	it("unwrap", () => {
		expect(ok.unwrap()).toBe(VALUE);
	});

	it("unwrap or default", () => {
		expect(ok.unwrapOrElse("default")).toBe(VALUE);
		expect(ok.unwrapOrElse("default")).not.toBe("default");
	});

	it("unwrap error, threw error", () => {
		expect(() => ok.unwrapError()).toThrowError();
	});
});

describe("ERR", () => {
	const ERROR = new Error("crucial error");
	const err = Err(ERROR);

	it("ok?", () => {
		expect(err.ok).toBeFalsy();
	});

	it("access to error", () => {
		expect(!err.ok && err.error).toBe(ERROR);
	});

	it("unwrap", () => {
		expect(() => err.unwrap()).toThrow();
	});

	it("unwrap or default", () => {
		expect(err.unwrapOrElse("default")).toBe("default");
	});

	it("unwrap error", () => {
		expect(err.unwrapError()).toBe(ERROR);
	});
});

describe("hasError", () => {
	const stringValueResult = Ok("value");
	const numberValueResult = Ok(42);
	const errorResult = Err("error");

	it("detecting error", () => {
		const errorCheckResult = hasError([
			stringValueResult,
			errorResult,
			numberValueResult,
		]);
		expect(errorCheckResult.ok).toBeFalsy();
		expect(errorCheckResult.unwrapError()).toBe("error");
	});

	it("no error result", () => {
		const errorCheckResult = hasError([stringValueResult, numberValueResult]);
		expect(errorCheckResult.ok).toBeTruthy();
	});
});
