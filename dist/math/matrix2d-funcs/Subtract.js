import Matrix2D from '../matrix2d/Matrix2D';
export default function Subtract(a, b) {
    return new Matrix2D(a.a - b.a, a.b - b.b, a.c - b.c, a.c - b.c, a.tx - b.tx, a.ty - b.ty);
}
//# sourceMappingURL=Subtract.js.map