import { IGameObject } from '../../IGameObject';
import { IInputComponent } from './IInputComponent';
import { IInteractiveArea } from '../../../input/IInteractiveArea';

export class InputComponent implements IInputComponent
{
    entity: IGameObject;
    enabled: boolean = false;
    enabledChildren: boolean = true;
    hitArea: IInteractiveArea;

    constructor (entity: IGameObject)
    {
        this.entity = entity;
    }

    destroy (): void
    {
        this.entity = null;
        this.hitArea = null;
    }
}
