import { BaseCamera } from './BaseCamera';
import { ClearDirtyTransform } from '../components/dirty/ClearDirtyTransform';
import { HasDirtyTransform } from '../components/dirty/HasDirtyTransform';
import { IStaticCamera } from './IStaticCamera';

//  A Static Camera just has a size. It cannot be moved or scaled.

export class StaticCamera extends BaseCamera implements IStaticCamera
{
    readonly type: string = 'StaticCamera';

    constructor (width: number, height: number)
    {
        super(width, height);
    }

    preRender (): boolean
    {
        const id = this.id;

        if (HasDirtyTransform(id))
        {
            this.isDirty = true;

            ClearDirtyTransform(id);

            return true;
        }

        return false;
    }
}
