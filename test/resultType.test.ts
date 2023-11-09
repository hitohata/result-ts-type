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
		expect(ok.unwrapOrDefault("default")).toBe(VALUE);
		expect(ok.unwrapOrDefault("default")).not.toBe("default");
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
		expect(err.unwrapOrDefault("default")).toBe("default");
	});

	it("unwrap error", () => {
		expect(err.unwrapError()).toBe(ERROR);
	});
});

describe("result", () => {
	const okResult = (): Result<string, any> => {
		return Ok("value");
	};

	const errResult = (): Result<any, Error> => {
		return Err(new Error("error"));
	};

	it("ok", () => {
		const ok = okResult();

		// to access to value, it needs type guard
		if (ok.ok) {
			expect(ok.value).toBe("value");
		}
	});

	it("err", () => {
		const err = errResult();

		// to access to error, it needs type guard
		if (!err.ok) {
			expect(err.error).toBeInstanceOf(Error);
		}
	});
});
