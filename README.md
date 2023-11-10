# Result Types

This result type features Rust's [result type](https://doc.rust-lang.org/std/result/).
This enables you to handle errors without throwing errors and to write reliable and readable code.

## Install

```shell
npm install https://github.com/genesis-tech-tribe/result-type
```

## How to use

You can set a result type as a return type of your function.
Inside the function, you return a value or error using *Ok* or *Err*.  

```typescript
import { Result, Ok, Err } from "result-type"

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

The result implements [*unwrap*](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap), [*unwrapOrDefault*](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or_else), [*unwrapError*](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_err).
Those are implemented for the debug use.

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

## Deploy

This project is deployed on the GitHub.
To release this project, you only have to add a tag to the main branch.
