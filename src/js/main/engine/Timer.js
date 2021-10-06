import * as R from 'ramda';
import FpsCalculator from './FpsCalculator';

/**
 * Every X seconds, notify listener.
 * AS CLOSE AS POSSIBLE to X seconds, but always >= X seconds (not sooner)
 */
export default class Timer {
    running = false;

    /**
     * DI constructor
     *
     * @param {number} fps Frames per second configuration value
     * @param {Function} fn The main function to be ran in the loop
     * @param {Function} onFpsUpdate Listener function, invoked upon each new fps calculation
     * @param [maxDt] Optional. Used to clamp dt to a maximum value. Defaults to 5x normal frame duration (from fps)
     */
    constructor({fps, fn, onFpsUpdate, maxDt}) {
        this.onFpsUpdate = onFpsUpdate;
        this.init({
            fps,
            fn,
            maxDt: maxDt || getFrameTime(fps) * 5.0
        });
    }

    /**
     * // TODO: remove itr variable, after debugging is complete (or build a switch to turn it off/on)
     *
     * @param fps
     * @param fn
     * @param maxDt Used to clamp dt to a maximum value
     */
    init({fps, fn, maxDt}) {
        const frameTime = getFrameTime(fps);
        console.log('game loop init, fps:', fps);

        let dt = 0;
        let lastTime;
        let itr = 0;

        logConfigValues({fps, maxDt});

        const fpsCalculator = new FpsCalculator();

        const loop = (timeMillis) => {
            if (++itr > 1000) {
                this.running = false;
            }

            if (!this.running) {
                console.log('game loop stopping, because running=false');
                return;
            }

            /**
             * current time in seconds
             * @type {number}
             */
            const time = timeMillis / 1000.0;

            if (!lastTime) {
                lastTime = time;
            }

            dt += time - lastTime;

            if (dt > maxDt) {
                dt = maxDt;
            }

            // TODO: I think a better approach instead of while etc here is to calc the # iterations, and loop that many times explicitly
            while (dt > frameTime) {
                dt -= frameTime;
                // TODO: may want to separate update() from draw(), ie update() in this loop, and draw() outside? but only if we update() AT LEAST ONCE
                // run the main function (fn) that we're wrapping in the loop
                fn(dt); // TODO: should this be fn(frameTime) instead?
                this.recordFpsUpdate(timeMillis, fpsCalculator);
            }

            lastTime = time;
            // calls loop() via setTimeout and requestAnimationFrame
            this.enqueue(this.loop, frameTime / 2.0); // TODO: wtf is this value? lol. probably want to use `frame / 2.0` here or something
        };
        this.loop = loop.bind(this);
    }

    /**
     * @param fn
     * @param timeout millis
     */
    enqueue(fn, timeout) {
        setTimeout(() =>
                typeof requestAnimationFrame === 'function' // TODO: change jest run style to browser, not 'node'
                    ? requestAnimationFrame(fn)
                    : fn(),
            timeout);
    }

    start() {
        if (this.running) {
            console.log('game loop already started');
            return;
        }
        console.log('game loop start');
        this.running = true;
        this.enqueue(this.loop, 0);
    }

    stop() {
        console.log('game loop stop');
        this.running = false;
    }

    recordFpsUpdate(timeMillis, fpsCalculator) {
        if (typeof this.onFpsUpdate === 'function') {
            const currentFps = fpsCalculator.recalculateFps(timeMillis);
            this.onFpsUpdate(currentFps);
        }
    }
}

/**
 * logs numeric values, rounded, named
 *
 * @param {Object} vals key-value named config values (numbers)
 */
const logConfigValues = (vals) => {
    const roundedValues = R.map(Math.round, vals);
    console.table(roundedValues);
};

/**
 * Calculates how long a frame should last, given a frame rate (fps)
 * @param {number} fps
 * @return {number} time in sec
 */
const getFrameTime = fps => 1.0 / fps;
