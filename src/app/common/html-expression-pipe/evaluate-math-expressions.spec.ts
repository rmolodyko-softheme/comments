import { evaluateMathExpressions } from './evaluate-math-expressions';

describe('Evaluate Math Expressions', () => {
  it('evaluate testcases', () => {
    expect(evaluateMathExpressions(null)).toEqual(undefined);
    expect(evaluateMathExpressions('aa 1+3 bb 3+4+10+3')).toEqual('aa 1+3(=4) bb 3+4+10+3(=20)');
    expect(evaluateMathExpressions('1+3')).toEqual('1+3(=4)');
    expect(evaluateMathExpressions('11-2')).toEqual('11-2(=9)');
    expect(evaluateMathExpressions('1+')).toEqual('1+');
    expect(evaluateMathExpressions('1*8')).toEqual('1*8(=8)');
    expect(evaluateMathExpressions(' (1*8) ')).toEqual(' (1*8(=8)) ');
    expect(evaluateMathExpressions('8/3')).toEqual('8/3(=2)');
    expect(
      evaluateMathExpressions(`8/3 sdaf asdf 0+333333
      4+4 dsf 4 + 5 aa 4+ 5 ,,, 999+999
      adsf
    `)
    ).toEqual(`8/3(=2) sdaf asdf 0+333333(=333333)
      4+4(=8) dsf 4 + 5 aa 4+ 5 ,,, 999+999(=1998)
      adsf
    `);
    expect(evaluateMathExpressions('1+3', { '+': (a, b) => a + b })).toEqual('1+3(=4)');
  });
});
