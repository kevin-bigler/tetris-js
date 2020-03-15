import Matrix from '../../main/common/Matrix';

describe('Matrix', () => {
    /**
     *  2x3 array test
     *
     *  expect length = 2, width = 3
     *  expect to be able to get value at (1, 2)
     *  - not (2, 2) and not (1, 3)
     *  - able to get (0, 0) and (0, 1) and (0, 2) and (1, 0) and (1, 1) as well
     *
     */
    it('creates 2x3 array & #get(x, y) works', () => {
        const uut = new Matrix(2,3, 'foo');

        expect(uut.width).toBe(2);
        expect(uut.height).toBe(3);

        expect(uut.get(1, 2)).toBeDefined();
        expect(uut.get(1, 1)).toBeDefined();
        expect(uut.get(1, 0)).toBeDefined();
        expect(uut.get(0, 2)).toBeDefined();
        expect(uut.get(0, 1)).toBeDefined();
        expect(uut.get(0, 0)).toBeDefined();

        expect(uut.get(2, 2)).toBeUndefined();
        expect(uut.get(1, 3)).toBeUndefined();
    });

    it('#set() happy path', () => {
        const uut = new Matrix(3, 2, 0);
        expect(uut.toArray()).toEqual([
            [0, 0],
            [0, 0],
            [0, 0]
        ]);
        uut.set(1, 0, 'wilmaaaa');
        uut.set(2, 1, 'yabadabadoo');
        expect(uut.toArray()).toEqual([
            [0, 0],
            ['wilmaaaa', 0],
            [0, 'yabadabadoo']
        ]);
    });

    it('#toArray() returns a regular 2d array COPY', () => {
        const uut = new Matrix(1, 2, 'foo');
        expect(Array.isArray(uut.toArray())).toBe(true);
        expect(Array.isArray(uut.toArray()[0])).toBe(true);
        // TODO assert that it is a copy by changing it, compare to original etc
    });
});