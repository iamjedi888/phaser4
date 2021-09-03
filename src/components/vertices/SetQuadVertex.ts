import { SetQuadColor } from './SetQuadColor';
import { SetQuadPosition } from './SetQuadPosition';
import { SetUV } from './SetUV';

export function SetQuadVertex (id: number, width: number = 0, height: number = 0, flipY: boolean = true): void
{
    if (width || height)
    {
        if (flipY)
        {
            SetUV(id, 0, 1, 1, 0);
        }
        else
        {
            SetUV(id, 0, 0, 1, 1);
        }

        SetQuadColor(id, 1, 1, 1, 1);
        SetQuadPosition(id, 0, 0, 0, height, width, height, width, 0);
    }
}
