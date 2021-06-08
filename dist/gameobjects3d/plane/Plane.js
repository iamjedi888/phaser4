import { Geometry } from "../geometry/Geometry";
import { Mesh } from "../mesh/Mesh";
import { PlaneGeometry } from "../../geom3d/PlaneGeometry";
export class Plane extends Mesh {
  constructor(x = 0, y = 0, z = 0, width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
    const data = PlaneGeometry(null, 0, 0, 0, 0, 1, 2, 1, -1, width, height, 1, widthSegments, heightSegments);
    const geometry = new Geometry(data);
    super(x, y, z, geometry);
  }
}
