import { Matrix2D } from '../../math/mat2d';

export function UpdateLocalTransform (localTransform: Matrix2D, transformData: Float32Array): void
{
    const [ x, y, rotation, scaleX, scaleY, skewX, skewY ] = transformData;

    localTransform.set(
        Math.cos(rotation + skewY) * scaleX,
        Math.sin(rotation + skewY) * scaleX,
        -Math.sin(rotation - skewX) * scaleY,
        Math.cos(rotation - skewX) * scaleY,
        x,
        y
    );
}
