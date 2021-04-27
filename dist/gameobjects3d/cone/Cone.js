import {ConeGeometry} from "../../geom3d/ConeGeometry";
import {Geometry} from "../geometry/Geometry";
import {Mesh} from "../mesh/Mesh";
export class Cone extends Mesh {
  constructor(x = 0, y = 0, z = 0, radius = 1, height = 1, radialSegments = 8, heightSegments = 1, openEnded = false, thetaStart = 0, thetaLength = Math.PI * 2) {
    const data = ConeGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
    const geometry = new Geometry(data);
    super(x, y, z, geometry);
  }
}
