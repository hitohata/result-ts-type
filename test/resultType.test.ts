import { describe, expect, it } from "vitest";
import { Err, Ok, Result } from "../lib";

describe("OK", () => {
	const VALUE = "value";
	const ok = Ok(VALUE);

	it("ok?", () => {
		expect(ok.ok).toBeTruthy();
	});

	it("access to value", () => {
		expect(ok.value).toBe(VALUE);
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
		expect(err.error).toBe(ERROR);
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
			if (!err.ok) {
				expect(err.error).toBeInstanceOf(Error);
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
