/**
 * Buffer Structure:
 *
 * Top Left Vert
 *
 * 0 - x position
 * 1 - y position
 * 2 - u0
 * 3 - v0
 * 4 - Texture Index
 * 5 - Red Component
 * 6 - Green Component
 * 7 - Blue Component
 * 8 - Alpha Component
 *
 * Bottom Left Vert
 *
 * 9 - x position
 * 10 - y position
 * 11 - u0
 * 12 - v1
 * 13 - Texture Index
 * 14 - Red Component
 * 15 - Green Component
 * 16 - Blue Component
 * 17 - Alpha Component
 *
 * Bottom Right Vert
 *
 * 18 - x position
 * 19 - y position
 * 20 - u1
 * 21 - v1
 * 22 - Texture Index
 * 23 - Red Component
 * 24 - Green Component
 * 25 - Blue Component
 * 26 - Alpha Component
 */

export function GetTriBuffer (): Float32Array
{
    const tri = new Float32Array(27);

    tri[12] = 1;
    tri[20] = 1;
    tri[21] = 1;

    return tri;
}
