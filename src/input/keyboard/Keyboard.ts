import { Emit } from '../../events/Emit';
import { EventEmitter } from '../../events/EventEmitter';
import { IKey } from './IKey';

export class Keyboard extends EventEmitter
{
    keys: Map<string, IKey>;

    private keydownHandler: { (event: KeyboardEvent): void; (this: Window, ev: KeyboardEvent): void };
    private keyupHandler: { (event: KeyboardEvent): void; (this: Window, ev: KeyboardEvent): void };
    private blurHandler: { (): void; (this: Window, ev: FocusEvent): void };

    /* eslint-disable @typescript-eslint/naming-convention */
    keyConversion: { [ key: string ]: string } = {
        Up: 'ArrowUp',
        Down: 'ArrowDown',
        Left: 'ArrowLeft',
        Right: 'ArrowRight',
        Spacebar: ' ',
        Win: 'Meta',
        Scroll: 'ScrollLock',
        Del: 'Delete',
        Apps: 'ContextMenu',
        Esc: 'Escape',
        Add: '+',
        Subtract: '-',
        Multiply: '*',
        Decimal: '.',
        Divide: '/'
    };
    /* eslint-enable @typescript-eslint/naming-convention */

    constructor ()
    {
        super();

        this.keydownHandler = (event: KeyboardEvent): void => this.onKeyDown(event);
        this.keyupHandler = (event: KeyboardEvent): void => this.onKeyUp(event);
        this.blurHandler = (): void => this.onBlur();

        window.addEventListener('keydown', this.keydownHandler);
        window.addEventListener('keyup', this.keyupHandler);
        window.addEventListener('blur', this.blurHandler);

        this.keys = new Map();
    }

    addKeys (...keys: IKey[]): void
    {
        keys.forEach(key =>
        {
            this.keys.set(key.getValue(), key);
        });
    }

    clearKeys (): void
    {
        this.keys.clear();
    }

    private onBlur (): void
    {
        //  Iterate Keys and reset their state
        this.keys.forEach(key =>
        {
            key.reset();
        });
    }

    private getKeyValue (key: string): string
    {
        if (this.keyConversion.hasOwnProperty(key))
        {
            return this.keyConversion[key];
        }
        else
        {
            return key;
        }
    }

    private onKeyDown (event: KeyboardEvent): void
    {
        const value = this.getKeyValue(event.key);

        if (this.keys.has(value))
        {
            const key = this.keys.get(value);

            key.down(event);
        }

        //  Key specific event
        Emit(this, 'keydown-' + value, event);

        //  Global keydown event
        Emit(this, 'keydown', event);
    }

    private onKeyUp (event: KeyboardEvent): void
    {
        const value = this.getKeyValue(event.key);

        if (this.keys.has(value))
        {
            const key = this.keys.get(value);

            key.up(event);
        }

        //  Key specific event
        Emit(this, 'keyup-' + value, event);

        //  Global keyup event
        Emit(this, 'keyup', event);
    }

    destroy (): void
    {
        window.removeEventListener('keydown', this.keydownHandler);
        window.removeEventListener('keyup', this.keyupHandler);
        window.removeEventListener('blur', this.blurHandler);

        Emit(this, 'destroy');
    }
}
