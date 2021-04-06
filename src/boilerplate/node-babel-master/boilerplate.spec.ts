// Is there a way to not have to import expect like this?
// Don't know, but this is probably how mocha describe/it works:
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b1cfdc9ab7257e7cab9238a4ae61758df96ee7ff/types/mocha/index.d.ts#L2856

describe('tests written in ts', () => {
  it('should work', () => {
    const foo: number = 123;

    expect(foo).toBe(123);
  });
});
