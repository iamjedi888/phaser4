export declare type FloatSetter = (v: number) => void;
export declare type F32Setter = (v: Float32List) => void;
export declare type I32Setter = (v: Int32List) => void;
export declare function CreateUniformSetter(uniform: WebGLActiveInfo, location: WebGLUniformLocation, isArray?: boolean): FloatSetter | F32Setter | I32Setter;
//# sourceMappingURL=CreateUniformSetter.d.ts.map