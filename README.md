# @chriscdn/async-emitter

## Motivation

I usually use [mitt](https://www.npmjs.com/package/mitt) when I need an event emitter, but it lacks support for:

- collecting the results from each listener (both synchronous or asynchronous), and
- catching and handling exceptions in asynchronous listener functions.

This package is similar to `mitt`, but adds these features.

## Installing

Using npm:

```bash
npm install @chriscdn/async-emitter
```

Using yarn:

```bash
yarn add @chriscdn/async-emitter
```

## Usage

### Create an `emitter` instance:

```ts
type MyEvents = {
  helloAsync: (txt: string) => Promise<string>;
};

const emitter = new AsyncEmitter<MyEvents>();
```

### Listen to events

```ts
// add listner functions to respond to "helloAsync" events
emitter.on("helloAsync", async (txt) => `hello ${txt}`);
emitter.on("helloAsync", async (txt) => `good day ${txt}`);
```

### Emit an event

```ts
// fire an event and capture the results
const results = await emitter.emit("helloAsync", "world");
// ["hello world", "good day world"];
```

The order of the results is not guaranteed.

### Exceptions

```ts
emitter.on("helloAsync", async (txt) => {
  throw new Error("boom");
});

try {
  const results = await emitter.emit("helloAsync", "world");
} catch (e) {
  console.log(e.message); // boom
}
```

### Remove a listener

```ts
const handler = async (txt) => `hello ${txt}`;

emitter.on("helloAsync", handler);
emitter.off("helloAsync", handler);
```

### Remove all listeners from an event

```ts
emitter.removeAllListeners("helloAsync");
```

## License

[MIT](LICENSE)
