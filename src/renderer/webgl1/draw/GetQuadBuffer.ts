/**
 * Buffer Structure:
 *
 * Triangle 1:
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
 *
 * Triangle 2:
 *
 * Top Left Vert
 *
 * 27 - x position
 * 28 - y position
 * 29 - u0
 * 30 - v0
 * 31 - Texture Index
 * 32 - Red Component
 * 33 - Green Component
 * 34 - Blue Component
 * 35 - Alpha Component
 *
 * Bottom Right Vert
 *
 * 36 - x position
 * 37 - y position
 * 38 - u1
 * 39 - v1
 * 40 - Texture Index
 * 41 - Red Component
 * 42 - Green Component
 * 43 - Blue Component
 * 44 - Alpha Component
 *
 * Top Right Vert
 *
 * 45 - x position
 * 46 - y position
 * 47 - u1
 * 48 - v0
 * 49 - Texture Index
 * 50 - Red Component
 * 51 - Green Component
 * 52 - Blue Component
 * 53 - Alpha Component
 */

export function GetQuadBuffer (): Float32Array
{
    const quad = new Float32Array(54);

    //  Set default UVs
    quad[12] = 1;
    quad[20] = 1;
    quad[21] = 1;
    quad[38] = 1;
    quad[39] = 1;
    quad[47] = 1;

    return quad;
}
