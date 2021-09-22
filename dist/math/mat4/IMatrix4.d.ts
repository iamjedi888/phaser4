export interface IMatrix4 {
    data: Float32Array;
    onChange: (mat4: IMatrix4) => void;
    set(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): this;
    toArray(dst: Float32List, index?: number): Float32List;
    fromArray(src: Float32List, index?: number): this;
    destroy(): void;
}
//# sourceMappingURL=IMatrix4.d.ts.map