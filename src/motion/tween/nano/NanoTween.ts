import { Off, On } from '../../../events';

import { GameInstance } from '../../../GameInstance';
import { IEventEmitter } from '../../../events/IEventEmitter';
import { IEventInstance } from '../../../events/IEventInstance';
import { Linear } from '../../../math/easing/Linear';
import { TweenProperty } from '../TweenProperty';
import { UpdateEvent } from '../../../gameobjects/events';

/*
    Done
    ----

    Delay (influences start of playback)
    Repeat Counter (number of times to repeat full tween cycle)
    Repeat Delay (how long before repeat starts)
    Yoyo (repeat tween in reverse back to starting values)
    Hold Delay (how long before a yoyo should start)
    AutoStart (tween will begin automatically, or wait for 'start' to be called)
    Restart (reset tween to beginning at any point during playback)
    Easing (set ease function to use)
    From and To flow
    Value modifiers via strings, i.e. '-200' or '+0.5'
    All durations now given in ms

    Todo
    ----

    Bezier values
    Callbacks based on tween state
    Overall duration (based on delay + repeat, hold, etc)
    Overall progress (based on an overall elapsed / overall duration)
    Tween.stop (plus option to jump to end values, or end at current)
    GetEase function (for eases that provide input values, like Elastic)

    Todo - but maybe not Nano features?
    -----------------------------------

    Config object instead of methods?
    Allow multiple targets?
    Allow for infinite repeats?
    Tween.seek
    Short Rotate to
    Scale via a single property instead of scaleX & scaleY
*/

type TweenState = {
    running: boolean;
    repeat: boolean;
    hold: boolean;
    delay: boolean;
    yoyo: boolean;
    yoyoing: boolean;
    autoStart: boolean;
    reversed: boolean;
};

type TweenInit = {
    duration: number;
    repeat: number;
    repeatDelay: number;
    hold: number;
    delay: number;
};

type TweenCounters = {
    repeat: number;
    delay: number;
    progress: number;
    elapsed: number;
};

type EaseFunction = (v: number) => number;

export class NanoTween
{
    target: unknown;

    state: TweenState = { running: false, repeat: false, hold: false, delay: false, yoyo: false, yoyoing: false, autoStart: true, reversed: false };
    init: TweenInit = { duration: 0, repeat: 0, repeatDelay: 0, hold: 0, delay: 0 };
    counters: TweenCounters = { repeat: 0, delay: 0, progress: 0, elapsed: 0 };

    ease: EaseFunction = Linear;
    listener: IEventInstance;
    emitter: IEventEmitter;

    onStart: () => void = () => {};
    onUpdate: () => void = () => {};
    onRepeat: () => void = () => {};
    onComplete: () => void = () => {};

    private properties: TweenProperty[] = [];

    constructor (target: unknown, emitter: IEventEmitter, autoStart: boolean = true)
    {
        if (!emitter)
        {
            emitter = GameInstance.get();
        }

        this.target = target;

        this.state.autoStart = autoStart;

        this.emitter = emitter;
    }

    to (duration: number, properties: Record<string, number | string> = null): this
    {
        return this.add(duration, properties, false);
    }

    from (duration: number, properties: Record<string, number | string> = null): this
    {
        return this.add(duration, properties, true);
    }

    private add (duration: number, props: Record<string, number | string>, reversed: boolean): this
    {
        const state = this.state;
        const init = this.init;

        if (state.running)
        {
            return this;
        }

        const properties = this.properties;

        for (const [ name, value ] of Object.entries(props))
        {
            properties.push(new TweenProperty(name, value));
        }

        init.duration = duration;
        state.reversed = reversed;

        if (state.autoStart)
        {
            this.start();
        }

        return this;
    }

    start (): this
    {
        const state = this.state;

        if (state.running)
        {
            return this;
        }

        const target = this.target;
        const properties = this.properties;

        properties.forEach(property =>
        {
            if (state.reversed)
            {
                property.from(target);
            }
            else
            {
                property.to(target);
            }
        });

        state.running = true;

        this.listener = On(this.emitter, UpdateEvent, (delta: number) => this.update(delta));

        this.onStart();

        return this;
    }

    restart (): this
    {
        const state = this.state;
        const init = this.init;
        const counters = this.counters;

        if (!state)
        {
            throw 'Cannot restart destroyed tween';
        }

        counters.delay = init.delay;
        counters.elapsed = 0;
        counters.progress = 0;
        counters.repeat = init.repeat;

        state.yoyoing = false;
        state.running = true;

        return this;
    }

    //  If it returns true it means this Tween has completed
    update (delta: number): boolean
    {
        const state = this.state;
        const init = this.init;
        const counters = this.counters;

        if (!state.running)
        {
            return false;
        }

        if (counters.delay > 0)
        {
            //  Tween delayed? either via start delay, repeat delay or hold
            counters.delay -= delta;

            if (counters.delay <= 0)
            {
                //  Carry over the difference to the duration
                counters.elapsed = Math.abs(counters.delay) - delta;
                counters.delay = 0;
            }
            else
            {
                return false;
            }
        }

        //  If we got here, the Tween isn't delayed
        counters.elapsed += delta;

        const progress = Math.min(counters.elapsed / init.duration, 1);

        counters.progress = progress;

        const v = (state.yoyoing) ? this.ease(1 - progress) : this.ease(progress);

        const target = this.target;
        const properties = this.properties;

        properties.forEach(property =>
        {
            property.update(target, v);
        });

        this.onUpdate();

        //  Nothing more to do here
        if (progress < 1)
        {
            return false;
        }

        //  Tween progress is at 100%, what next? Either yoyo or repeat

        //  How much extra time do we have?
        const diff = counters.elapsed - init.duration;

        //  Should we yoyo?
        if (state.yoyo && !state.yoyoing)
        {
            //  Resetting elapsed also resets progress
            counters.elapsed = diff;
            counters.delay = init.hold - diff;

            state.yoyoing = true;

            return false;
        }

        if (counters.repeat > 0)
        {
            counters.repeat--;

            counters.elapsed = diff;
            counters.delay = init.repeatDelay - diff;

            state.yoyoing = false;

            this.onRepeat();

            return false;
        }

        //  If we got this far, the tween is complete
        this.onComplete();

        this.destroy();

        return true;
    }

    delay (duration: number): this
    {
        const delay = duration;

        this.init.delay = delay;
        this.counters.delay = delay;

        return this;
    }

    hold (duration: number): this
    {
        this.init.hold = duration;

        return this;
    }

    yoyo (value: boolean = true): this
    {
        this.state.yoyo = value;

        return this;
    }

    repeat (repeatCount: number = 1, delay: number = 0): this
    {
        const init = this.init;

        if (repeatCount === -1)
        {
            repeatCount = Number.MAX_SAFE_INTEGER;
        }

        this.state.repeat = (repeatCount > 0);
        this.counters.repeat = repeatCount;

        init.repeat = repeatCount;
        init.repeatDelay = delay;

        return this;
    }

    easing (f: EaseFunction): this
    {
        this.ease = f;

        return this;
    }

    destroy (): void
    {
        Off(this.emitter, UpdateEvent, this.listener);

        this.properties.length = 0;

        this.target = null;
        this.ease = null;
        this.emitter = null;
        this.state = null;
        this.init = null;
        this.counters = null;
    }
}
