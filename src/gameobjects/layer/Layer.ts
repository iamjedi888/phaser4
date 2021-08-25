import { GameObject } from '../GameObject';
import { SetWillCacheChildren } from '../../components/permissions/SetWillCacheChildren';
import { SetWillTransformChildren } from '../../components/permissions/SetWillTransformChildren';

//  A Layer is a way of grouping Game Objects together, without impacting their
//  transforms. Children of a Layer do not inherit the layers transform (as it
//  doesn't have one), however you are able to control the visibility of the layers children in a single pass.

export class Layer extends GameObject
{
    readonly type: string = 'Layer';

    constructor ()
    {
        super();

        SetWillTransformChildren(this.id, false);
        SetWillCacheChildren(this.id, false);
    }
}
