import Timer from "../../main/engine/Timer";

describe('Timer', () => {
    it('do a thing 30x/sec', (done) => {
        const fn = jest.fn();
        const timer = new Timer({fps: 30, fn});
        timer.start();
        setTimeout(() => {
            timer.stop();
            expect(fn).toHaveBeenCalled();
            expect(fn).toHaveBeenCalledTimes(30 * 3);
            done();
        }, 3000);
    });
});