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

> [!NOTE]
> *Ok* and *ok* are exposed. (*Err* and *err* also) There is no difference between them. So you can use whichever your project fits. 

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

// You can also access the value by checking the err field.
if (!result.err) {
    console.log(result.ok)
}

// If the result's ok field is false, TypeScript infers the result as Err.
console.error(result.error)

```

The result field is following:

| Class | ok field | err field | value | error |
|:------|:--------:|:---------:|:-----:|:-----:|
| OK    |   true   |   false   |   T   |  N/D  |
| ERR   |  false   |   true    |  N/D  |   E   |

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

#### HasError

This is created to check if the result is ERR.
Result type checking can sometimes be bothersome and impact readability.
This function serves to address cases.
After performing this check, you can use the 'unwrap' function in the production code.

Of course, careful attention is required when using the 'unwrap'.

```typescript

const result: Result<string, any> = okFunction();
const result2: Result<string, any> = okFunction2();
const result3: Result<string, any> = okFunction3();

const errorCheck = hasError([result, result2, result3]);

if (!errorCheck.ok) {
    // write error handling
}

//You can use "unwrap" because it's guaranteed OK.
const resultValue = result.unwrap();
const result2Value = result2.unwrap();
const result3Value = result3.unwrap();

```

## Publishing

To publish this result type, only need to add a tag to the main branch.
Once pushed to the main branch, GitHub Actions runs and publishes [this package](https://www.npmjs.com/package/result-ts-type).

