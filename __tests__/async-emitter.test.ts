import { describe, expect, it } from "vitest";
import { AsyncEmitter } from "../src/index";

describe("Basic Usage", () => {
  type MyEvents = {
    helloAsync: (txt: string) => Promise<string>;
  };

  const emitter = new AsyncEmitter<MyEvents>();

  it("async", async () => {
    emitter.on("helloAsync", async (txt) => `hello ${txt}`);
    emitter.on("helloAsync", async (txt) => `good day ${txt}`);

    expect(await emitter.emit("helloAsync", "world")).toStrictEqual([
      "hello world",
      "good day world",
    ]);
  });

  it("removeAll", async () => {
    emitter.removeAllListeners("helloAsync");
    expect(await emitter.emit("helloAsync", "world")).toStrictEqual([]);
  });
});

describe("Exception", () => {
  type MyEvents = {
    helloAsync: (txt: string) => Promise<string>;
  };

  const emitter = new AsyncEmitter<MyEvents>();

  emitter.on("helloAsync", async (txt) => `hello ${txt}`);

  emitter.on("helloAsync", async (txt) => {
    throw new Error("boom");
  });

  it("async exception", () => {
    expect(emitter.emit("helloAsync", "world")).rejects.toThrowError(
      "boom",
    );
  });
});
