import { IBaseCamera } from '../../camera/IBaseCamera';
import { SetQuadPosition } from './SetQuadPosition';

export function SetInversedQuadFromCamera <T extends IBaseCamera> (id: number, camera: T, width: number, height: number): void
{
    const x = camera.getBoundsX();
    const y = camera.getBoundsY();

    //  Adjust for the camera position (still inverted scale Y)
    SetQuadPosition(id,
        x, y + height,
        x, y,
        x + width, y,
        x + width, y + height
    );
}
