export declare class CanvasRenderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    clearColor: string;
    width: number;
    height: number;
    resolution: number;
    textureIndex: number[];
    flushTotal: number;
    clearBeforeRender: boolean;
    optimizeRedraw: boolean;
    autoResize: boolean;
    constructor();
    initContext(): void;
    resize(width: number, height: number, resolution?: number): void;
    setBackgroundColor(color: number): this;
    reset(): void;
    begin(willRedraw: boolean): void;
    end(): void;
    render(): void;
    destroy(): void;
}
//# sourceMappingURL=CanvasRenderer.d.ts.map