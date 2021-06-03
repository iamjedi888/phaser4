import { SetWorldSize } from './SetWorldSize';

export function WorldSize (size: number): () => void
{
    return (): void =>
    {
        SetWorldSize(size);
    };
}
