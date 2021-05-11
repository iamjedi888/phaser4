import { Color } from './Color';
import { IColor } from './IColor';

export function CloneColor (color: IColor): Color
{
    return new Color(color.red, color.green, color.blue, color.alpha);
}
