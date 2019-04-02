import TwoDArray from '../../main/common/2DArray';

test('foooooooooey', () => {
    expect(1).toBe(2);
});
// describe('2DArray', () => {
//     /**
//      *  2x3 array test
//      *
//      *  expect length = 2, width = 3
//      *  expect to be able to get value at (1, 2)
//      *  - not (2, 2) and not (1, 3)
//      *  - able to get (0, 0) and (0, 1) and (0, 2) and (1, 0) and (1, 1) as well
//      *
//      */
//     it('creates 2x3 array', () => {
//         const uut = new TwoDArray({n: 2, m: 3});
//
//         expect(uut.length).toBe(2);
//         expect(uut.height).toBe(3);
//
//         expect(uut.get(1, 2)).toBeDefined();
//         expect(uut.get(1, 1)).toBeDefined();
//         expect(uut.get(1, 0)).toBeDefined();
//         expect(uut.get(0, 2)).toBeDefined();
//         expect(uut.get(0, 1)).toBeDefined();
//         expect(uut.get(0, 0)).toBeDefined();
//
//         expect(uut.get(2, 2)).toBeUndefined();
//         expect(uut.get(1, 3)).toBeUndefined();
//     });
// });