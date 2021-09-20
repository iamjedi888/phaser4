import { AddColorMatrix } from './AddColorMatrix';
import { BindColorMatrix } from './BindColorMatrix';
import { Color } from '../../../components/color/Color';
import { CompareColorMatrix } from '../../../components/color/CompareColorMatrix';
import { CurrentColorMatrix } from './CurrentColorMatrix';

export function SetColorMatrix (color: Color): void
{
    const current = CurrentColorMatrix();

    const entry = AddColorMatrix(color.colorMatrix, color.colorOffset);

    if (!CompareColorMatrix(entry.colorMatrix, entry.colorOffset, current.colorMatrix, current.colorOffset))
    {
        BindColorMatrix(entry);
    }
}
