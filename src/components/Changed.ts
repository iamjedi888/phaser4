import { Changed as BITECSChanged, ComponentType, IComponent, ISchema, QueryModifier } from 'bitecs';

export function Changed (c: ComponentType<ISchema>): IComponent | QueryModifier
{
    return BITECSChanged(c);
}
