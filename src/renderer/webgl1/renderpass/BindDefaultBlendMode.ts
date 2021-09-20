import { BindBlendMode } from './BindBlendMode';
import { BlendModeStack } from './BlendModeStack';

export function BindDefaultBlendMode (): void
{
    BlendModeStack.index = 0;

    BindBlendMode(BlendModeStack.default);
}
