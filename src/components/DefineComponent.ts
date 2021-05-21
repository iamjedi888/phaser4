import { ComponentType, ISchema, defineComponent } from 'bitecs';

export function DefineComponent <T extends ISchema> (schema?: T): ComponentType<T>
{
    return defineComponent(schema);
}
