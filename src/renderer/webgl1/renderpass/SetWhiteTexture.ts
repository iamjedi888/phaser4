import { SetTexture } from './SetTexture';
import { WhiteTexture } from '../../../textures/WhiteTexture';

export function SetWhiteTexture (): void
{
    SetTexture(WhiteTexture.get());
}
