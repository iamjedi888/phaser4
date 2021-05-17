import { IAnimatedSprite } from '../gameobjects/animatedsprite/IAnimatedSprite';
import { IAnimation } from './IAnimation';
import { IPlayAnimationConfig } from './IPlayAnimationConfig';
export declare function Play<T extends IAnimatedSprite>(animation: IAnimation, config?: IPlayAnimationConfig, ...sprites: T[]): T[];
//# sourceMappingURL=Play.d.ts.map