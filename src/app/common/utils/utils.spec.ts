import { deepClone, removeDuplicates } from './utils';

describe('Utils', () => {
  it('should be able to perform deep clone', () => {
    const a = { a: 1 };
    const b = deepClone(a);
    b.a = 2;
    expect(a.a).toEqual(1);
    expect(b.a).toEqual(2);
  });

  it('should be able to remove duplicates in array', () => {
    expect(removeDuplicates(['a', 'b', 'c', 'a'])).toEqual(['a', 'b', 'c']);
  });
});
