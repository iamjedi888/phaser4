export declare class Vertex {
    x: number;
    y: number;
    z: number;
    u: number;
    v: number;
    texture: number;
    tint: number;
    alpha: number;
    color: number;
    constructor(x?: number, y?: number, z?: number);
    setPosition(x: number, y: number, z?: number): this;
    setUV(u: number, v: number): this;
    setColor(color: number, alpha?: number): this;
    setAlpha(value: number): this;
    setTint(value: number): this;
    packColor(): void;
}
//# sourceMappingURL=Vertex.d.ts.map