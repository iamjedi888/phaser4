/**
 * Given 3 separate color values this will return an integer representation of it.
 *
 * @param {number} red - The red color value. A number between 0 and 255.
 * @param {number} green - The green color value. A number between 0 and 255.
 * @param {number} blue - The blue color value. A number between 0 and 255.
 *
 * @return {number} The combined color value.
 */

export function GetColorFromRGB (red: number, green: number, blue: number): number
{
    return red << 16 | green << 8 | blue;
}
