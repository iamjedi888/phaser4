import {DIRTY_CONST} from "../DIRTY_CONST";
export function SetQuadTint(topLeft, topRight, bottomLeft, bottomRight, ...children) {
  children.forEach((child) => {
    const vertices = child.vertices;
    vertices[0].setAlpha(topLeft);
    vertices[1].setAlpha(topRight);
    vertices[2].setAlpha(bottomLeft);
    vertices[3].setAlpha(bottomRight);
    child.setDirty(DIRTY_CONST.COLORS);
  });
  return children;
}
