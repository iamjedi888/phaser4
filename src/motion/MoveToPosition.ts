import { AddTimer } from '../time/AddTimer';
import { AngleBetween } from '../math/angle/AngleBetween';
import { GetVec2Distance } from '../math/vec2/GetVec2Distance';
import { IGameObject } from '../gameobjects/IGameObject';

export function MoveToPosition <T extends IGameObject> (x: number, y: number, duration: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        const px = child.x;
        const py = child.y;

        const azimuth = AngleBetween(px, py, x, y);
        const speed = GetVec2Distance({ x: px, y: py} , { x, y }) / (duration / 1000);

        const incX = Math.cos(azimuth) * speed;
        const incY = Math.sin(azimuth) * speed;

        const moveHandler = (delta: number): void =>
        {
            delta /= 1000;

            child.x += incX * delta;
            child.y += incY * delta;
        };

        const world = child.world;

        // if (world)
        // {
        //     AddTimer(world, {
        //         duration,
        //         onUpdate: moveHandler
        //     });
        // }
    });

    return children;
}
