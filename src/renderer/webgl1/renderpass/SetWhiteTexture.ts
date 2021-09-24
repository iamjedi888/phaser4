import { SetWebGLTexture } from './SetWebGLTexture';
import { WhiteTexture } from '../../../textures/WhiteTexture';

export function SetWhiteTexture (): number
{
    return SetWebGLTexture(WhiteTexture.get());
}
