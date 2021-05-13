import { ITransformComponent } from './ITransformComponent';

export function UpdateLocalTransform (transform: ITransformComponent): void
{
    const local = transform.local;

    const x = transform.position.x;
    const y = transform.position.y;
    const rotation = transform.rotation;
    const scaleX = transform.scale.x;
    const scaleY = transform.scale.y;
    const skewX = transform.skew.x;
    const skewY = transform.skew.y;

    local.set(
        Math.cos(rotation + skewY) * scaleX,
        Math.sin(rotation + skewY) * scaleX,
        -Math.sin(rotation - skewX) * scaleY,
        Math.cos(rotation - skewX) * scaleY,
        x,
        y
    );
}
