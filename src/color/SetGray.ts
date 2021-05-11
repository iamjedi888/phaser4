import { IColor } from './IColor';

/**
 * Sets this Color object to be grayscaled based on the shade value given.
 *
 * @method Phaser.Display.Color#gray
 * @since 3.13.0
 *
 * @param {number} shade - A value between 0 and 255.
 *
 * @return {Phaser.Display.Color} This Color object.
 */
export function SetGray <T extends IColor> (color: T, amount: number): T
{
    return color.set(amount, amount, amount);
}
