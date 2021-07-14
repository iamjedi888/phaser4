import { DEFAULT_COLOR_OFFSET } from './consts';
import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetColorMatrix } from './SetColorMatrix';

//  From Pixi.js

export function ColorTone <T extends IGameObject & IColorComponent> (gameObject: T, desaturation: number = 0.2, toned: number = 0.15, lightColor: number = 0xffe580, darkColor: number = 0x338000, multiply: boolean = false): T
{
    const lR = ((lightColor >> 16) & 0xFF) / 255;
    const lG = ((lightColor >> 8) & 0xFF) / 255;
    const lB = (lightColor & 0xFF) / 255;

    const dR = ((darkColor >> 16) & 0xFF) / 255;
    const dG = ((darkColor >> 8) & 0xFF) / 255;
    const dB = (darkColor & 0xFF) / 255;

    const values = [
        0.3, 0.59, 0.11, 0,
        lR, lG, lB, desaturation,
        dR, dG, dB, toned,
        lR - dR, lG - dG, lB - dB, 0
    ];

    if (SetColorMatrix(gameObject.id, values, DEFAULT_COLOR_OFFSET, multiply))
    {
        gameObject.color.colorMatrixEnabled = true;
    }

    return gameObject;
}
