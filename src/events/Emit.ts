import { IEventEmitter } from './IEventEmitter';
import { IEventInstance } from './IEventInstance';

export function Emit (emitter: IEventEmitter, event: string, ...args: unknown[]): boolean
{
    if (emitter.events.size === 0 || !emitter.events.has(event))
    {
        return false;
    }

    const listeners: Set<IEventInstance> = emitter.events.get(event);

    //  Convert to an array so the callbacks cannot impact what we're iterating
    //  It works, but generates gc
    const handlers = [ ...listeners ];

    for (const ee of handlers)
    {
        ee.callback.apply(ee.context, args);

        if (ee.once)
        {
            listeners.delete(ee);
        }
    }

    if (listeners.size === 0)
    {
        emitter.events.delete(event);
    }

    return true;
}
