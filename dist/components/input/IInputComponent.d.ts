import { IGameObject } from '../../gameobjects/IGameObject';
import { IInteractiveArea } from '../../input/IInteractiveArea';
export interface IInputComponent {
    entity: IGameObject;
    enabled: boolean;
    enabledChildren: boolean;
    hitArea?: IInteractiveArea;
    destroy(): void;
}
//# sourceMappingURL=IInputComponent.d.ts.map