import { SetWorldSize } from './SetWorldSize';

export function WorldSize (width: number, height: number): () => void
{
    return (): void =>
    {
        SetWorldSize(width, height);
    };
}
