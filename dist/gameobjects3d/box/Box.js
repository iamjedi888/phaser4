import { BoxGeometry } from "../../geom3d/BoxGeometry";
import { Geometry } from "../geometry/Geometry";
import { Mesh } from "../mesh/Mesh";
export class Box extends Mesh {
  constructor(x = 0, y = 0, z = 0, width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {
    const data = BoxGeometry(0, 0, 0, width, height, depth, widthSegments, heightSegments, depthSegments);
    const geometry = new Geometry(data);
    super(x, y, z, geometry);
  }
}
