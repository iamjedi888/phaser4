import { Frame } from '../../textures/Frame';
import { Geometry } from '../geometry/Geometry';
import { IGameObject3D } from '../IGameObject3D';
import { Material } from '../material/Material';
import { Texture } from '../../textures/Texture';

export interface IMesh extends IGameObject3D
{
    texture: Texture;
    frame: Frame;
    hasTexture: boolean;
    geometry: Geometry;
    material: Material;
    setTexture (key: string | Texture, frame?: string | number): this;
    setFrame (key?: string | number | Frame): this;
    setMaterial (material: Material): this;
}
