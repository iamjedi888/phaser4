import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
export declare function ColorTone<T extends IGameObject & IColorComponent>(gameObject: T, desaturation?: number, toned?: number, lightColor?: number, darkColor?: number, multiply?: boolean): T;
//# sourceMappingURL=ColorTone.d.ts.map