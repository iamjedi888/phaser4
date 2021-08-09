export function CreateWorkerURL (src: string | Function): string
{
    const str = (typeof src === 'function') ? src.toString() : src;

    const blob = new Blob([ `'use strict'; self.onmessage = ${str}` ], { type: 'text/javascript' });

    return window.URL.createObjectURL(blob);
}
