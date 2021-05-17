import { IGameObject } from '../../gameobjects/IGameObject';
import { IInputComponent } from './IInputComponent';
import { IInteractiveArea } from '../../input/IInteractiveArea';
export declare class InputComponent implements IInputComponent {
    entity: IGameObject;
    enabled: boolean;
    enabledChildren: boolean;
    hitArea: IInteractiveArea;
    constructor(entity: IGameObject);
    destroy(): void;
}
//# sourceMappingURL=InputComponent.d.ts.map