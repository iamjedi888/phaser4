//  Rotates the target Matrix by the angle (in radians), then returns the target Matrix.
export default function Rotate(target, angle) {
    const { a, b, c, d, tx, ty } = target;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    return target.set((a * cos) + (c * sin), (b * cos) + (d * sin), (a * -sin) + (c * cos), (b * -sin) + (d * cos), tx, ty);
}
//# sourceMappingURL=Rotate.js.map