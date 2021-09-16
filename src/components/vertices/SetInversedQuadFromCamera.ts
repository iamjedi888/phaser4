import { IBaseCamera } from '../../camera/IBaseCamera';
import { SetQuadPosition } from './SetQuadPosition';

export function SetInversedQuadFromCamera <T extends IBaseCamera> (id: number, camera: T, x: number, y: number, width: number, height: number): void
{
    const cx = camera.getBoundsX() + x;
    const cy = camera.getBoundsY() + y;

    //  Adjust for the camera position (still inverted scale Y)
    SetQuadPosition(id,
        cx, cy + height,
        cx, cy,
        cx + width, cy,
        cx + width, cy + height
    );
}
