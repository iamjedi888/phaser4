import { BlendModeStack } from './BlendModeStack';
import { BlendModeStackEntry } from './BlendModeStackEntry';

export function CurrentBlendMode (): BlendModeStackEntry
{
    return BlendModeStack.stack[BlendModeStack.index];
}
