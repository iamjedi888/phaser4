import { SetGlobalVar } from './SetGlobalVar';

export function GlobalVar (name: string): () => void
{
    return (): void =>
    {
        SetGlobalVar(name);
    };
}
