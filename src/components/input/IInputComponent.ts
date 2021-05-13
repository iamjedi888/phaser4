import { IGameObject } from '../../IGameObject';
import { IInteractiveArea } from '../../../input/IInteractiveArea';

export interface IInputComponent
{
    entity: IGameObject;
    enabled: boolean;
    enabledChildren: boolean;
    hitArea?: IInteractiveArea;
    destroy (): void;
}
