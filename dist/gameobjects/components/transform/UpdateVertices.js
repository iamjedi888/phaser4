import {GetVertices} from "./GetVertices";
export function UpdateVertices(gameObject) {
  const vertices = gameObject.vertices;
  const {x0, y0, x1, y1, x2, y2, x3, y3} = GetVertices(gameObject.transform);
  vertices[0].setPosition(x0, y0);
  vertices[1].setPosition(x1, y1);
  vertices[2].setPosition(x2, y2);
  vertices[3].setPosition(x3, y3);
  return gameObject;
}
