import { Emit } from '../../events/Emit';
import { IEventInstance } from '../../events/IEventInstance';
import { IKey } from './IKey';

export class Key implements IKey
{
    //  The KeyEvent.key identifier
    readonly value: string;

    events: Map<string, Set<IEventInstance>>;

    //  Will it invoke preventDefault?
    capture: boolean = true;

    //  Is it currently down?
    isDown: boolean = false;

    //  Process this key?
    enabled: boolean = true;

    //  rate of repeats in ms
    repeatRate: number = 0;

    //  Can this key repeat, or do you have to release it before pressing again
    canRepeat: boolean = true;

    //  The game time this key was last pressed down
    timeDown: number = 0;

    //  The game time this key was last updated (i.e. if down and repeating)
    timeUpdated: number = 0;

    //  The game time this key was last released
    timeUp: number = 0;

    shiftKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;

    downCallback: (key: IKey) => void;
    upCallback: (key: IKey) => void;

    constructor (value: string)
    {
        this.value = value;
        this.events = new Map();
    }

    getValue (): string
    {
        return this.value;
    }

    down (event: KeyboardEvent): void
    {
        if (!this.enabled)
        {
            return;
        }

        if (this.capture)
        {
            event.preventDefault();
        }

        this.shiftKey = event.shiftKey;
        this.ctrlKey = event.ctrlKey;
        this.altKey = event.altKey;

        if (this.isDown && this.canRepeat)
        {
            this.timeUpdated = event.timeStamp;

            const delay = this.timeUpdated - this.timeDown;

            //  Key is repeating
            if (delay >= this.repeatRate)
            {
                Emit(this, 'keydown', this);

                if (this.downCallback)
                {
                    this.downCallback(this);
                }
            }
        }
        else
        {
            //  Key is first down
            this.isDown = true;

            this.timeDown = event.timeStamp;
            this.timeUpdated = event.timeStamp;

            Emit(this, 'keydown', this);

            if (this.downCallback)
            {
                this.downCallback(this);
            }
        }
    }

    up (event: KeyboardEvent): void
    {
        if (!this.enabled)
        {
            return;
        }

        if (this.capture)
        {
            event.preventDefault();
        }

        this.shiftKey = event.shiftKey;
        this.ctrlKey = event.ctrlKey;
        this.altKey = event.altKey;

        if (this.isDown)
        {
            //  Key is up
            this.isDown = false;
            this.timeUp = event.timeStamp;
            this.timeUpdated = event.timeStamp;

            Emit(this, 'keyup', this);

            if (this.upCallback)
            {
                this.upCallback(this);
            }
        }
    }

    reset (): void
    {
        this.isDown = false;
        this.timeUpdated = this.timeDown;
        this.timeUp = this.timeDown;
    }

    destroy (): void
    {
        this.downCallback = null;
        this.upCallback = null;

        this.events.clear();
    }
}
