/**
 * Shuffles the contents of the given array using the Fisher-Yates implementation.
 *
 * The original array is modified directly and returned.
 *
 * @function Phaser.Utils.Array.Shuffle
 * @since 3.0.0
 *
 * @generic T
 * @genericUse {T[]} - [array,$return]
 *
 * @param {T[]} array - The array to shuffle. This array is modified in place.
 *
 * @return {T[]} The shuffled array.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Shuffle <T extends any> (array: T[]): T[]
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));

        const temp = array[i];

        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}
