import { BindBlendMode } from './BindBlendMode';
import { BlendModeStack } from './BlendModeStack';

export function PopBlendMode (): void
{
    BlendModeStack.index--;

    BindBlendMode();
}
