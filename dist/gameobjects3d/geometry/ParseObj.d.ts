export interface IParseObjResult {
    models: IParseObjModel[];
    materialLibraries: string[];
}
export interface IParseObjModel {
    name: string;
    vertices: IParseObjVertex[];
    textureCoords: IParseObjTextureVertex[];
    vertexNormals: IParseObjVertex[];
    faces: IParseObjFace[];
}
export interface IParseObjFace {
    material: string;
    group: string;
    smoothingGroup: number;
    vertices: IParseObjFaceVertexIndicies[];
}
export interface IParseObjFaceVertexIndicies {
    vertexIndex: number;
    textureCoordsIndex: number;
    vertexNormalIndex: number;
}
export interface IParseObjVertex {
    x: number;
    y: number;
    z: number;
}
export interface IParseObjTextureVertex {
    u: number;
    v: number;
    w: number;
}
export declare class ParseObj {
    private fileContents;
    private defaultModelName;
    private currentMaterial;
    private currentGroup;
    private smoothingGroup;
    private result;
    private flipUVs;
    constructor(fileContents: string, flipUVs?: boolean, defaultModelName?: string);
    parseAsync(): Promise<IParseObjResult>;
    parse(): IParseObjResult;
    private currentModel;
    private parseObject;
    private parseGroup;
    private parseVertexCoords;
    private parseTextureCoords;
    private parseVertexNormal;
    private parsePolygon;
    private parseMtlLib;
    private parseUseMtl;
    private parseSmoothShadingStatement;
}
//# sourceMappingURL=ParseObj.d.ts.map