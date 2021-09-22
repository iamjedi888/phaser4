import { IVertexAttribPointer } from './IVertexAttribPointer';
export declare type ShaderAttributeEntry = {
    size: number;
    type?: number;
    normalized?: boolean;
    stride?: number;
};
export declare function CreateAttributes(program: WebGLProgram, attribs: Record<string, ShaderAttributeEntry>): Map<string, IVertexAttribPointer>;
//# sourceMappingURL=CreateAttributes.d.ts.map