import { Color } from './Color';
import { IColor } from './IColor';
import { SetHSV } from './SetHSV';

export function FromHSV (h: number, s: number = 1, v: number = 1): IColor
{
    return SetHSV(new Color(), h, s, v);
}
