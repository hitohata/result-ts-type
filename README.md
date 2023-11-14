# Result TS Type

This result type is inspired by Rust's [result type](https://doc.rust-lang.org/std/result/).
It allows you to handle errors without relying on error throwing, contribution to creation reliable and readable code.

## Install

```shell
npm install result-ts-type
```

## How to use

You can designate a result type as a return type of your function.
Within the function, you use *Ok* to return value or *Err* to signify an error. 

```typescript
import { Result, Ok, Err } from "result-ts-type"

function someFunction(): Result<string, Error> {
    if (someStatemant) {
        return Ok("ok value")
    } else {
        return Err(new Error("this is an error"))
    }
}
```

### How to handle the result

This result is used to handle error.

```typescript

const result: Result<any, any> = someFunction();

// When you want to access the value.
// You have to check if the result is Ok or Err, checking ok field.
if (reuslt.ok) {
    // If the ok field is true, TypeScript infers the result as OK.
    console.log(result.value)
}

// If the result's ok field is false, TypeScript infers the result as Err.
console.error(result.error)

```

### Extra methods

The result implements [*unwrap*](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap), [*unwrapOrElse*](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or_else), [*unwrapError*](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_err) for debugging purposes.

```typescript

const result: Result<any, any> = someFunction();

// You can access value without checking ok method.
// If the reuslt is Err, Error will be thorwed.
const unwrap = reuslt.unwrap();

// This is a simliar one to the unwrap.
// The difference is that if the result is an error, this function won't throw an error, just return the argument value.
const resultOrElse = reusult.unwrapOrElse("value");

// This is the opposite of the unwrap above.
const unwrapError = reulst.unwrapError();

```

## Publishing

To publish this result type, you only need to add a tag to the main branch.
