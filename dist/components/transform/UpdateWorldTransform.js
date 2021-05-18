import {Mat2dCopyFrom} from "../../math/mat2d/Mat2dCopyFrom";
export function UpdateWorldTransform(localTransform, worldTransform, passthru, parentWorldTransform) {
  if (!parentWorldTransform) {
    Mat2dCopyFrom(localTransform, worldTransform);
  } else if (passthru) {
    Mat2dCopyFrom(parentWorldTransform, worldTransform);
  } else {
    const {a, b, c, d, tx, ty} = localTransform;
    const {a: pa, b: pb, c: pc, d: pd, tx: ptx, ty: pty} = parentWorldTransform;
    worldTransform.set(a * pa + b * pc, a * pb + b * pd, c * pa + d * pc, c * pb + d * pd, tx * pa + ty * pc + ptx, tx * pb + ty * pd + pty);
  }
}
