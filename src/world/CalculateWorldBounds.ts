import { GetNumChildren, GetParentID, GetParents, GetWorldDepth, HasParent } from '../components/hierarchy';
import { IWorld, Query } from 'bitecs';

import { BoundsComponent } from '../components/bounds';

const processList = new Set();

export function CalculateWorldBounds (world: IWorld, query: Query): number
{
    return 1;
}
