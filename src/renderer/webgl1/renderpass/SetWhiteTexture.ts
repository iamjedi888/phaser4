import { SetTexture } from './SetTexture';
import { WhiteTexture } from '../../../textures/WhiteTexture';

export function SetWhiteTexture (): number
{
    return SetTexture(WhiteTexture.get());
}
