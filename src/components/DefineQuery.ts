import { ComponentType, IComponent, ISchema, Query, QueryModifier, defineQuery } from 'bitecs';

export function DefineQuery (components: (ComponentType<ISchema> | IComponent | QueryModifier)[]): Query
{
    return defineQuery(components);
}
