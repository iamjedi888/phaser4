import {PackColor} from "../../renderer/webgl1";
import {Vertex} from "../../components";
export class FaceUVNormalTexture {
  constructor(v1, v2, v3, n1, n2, n3, uv1, uv2, uv3, scale = 1) {
    this.color = 16777215;
    this.alpha = 1;
    this.size = 30;
    this.vertex1 = new Vertex(v1.x * scale, v1.y * scale, v1.z * scale);
    this.vertex2 = new Vertex(v2.x * scale, v2.y * scale, v2.z * scale);
    this.vertex3 = new Vertex(v3.x * scale, v3.y * scale, v3.z * scale);
    this.vertex1.setUV(uv1.x, uv1.y);
    this.vertex2.setUV(uv2.x, uv2.y);
    this.vertex3.setUV(uv3.x, uv3.y);
    this.normal1 = n1;
    this.normal2 = n2;
    this.normal3 = n3;
    this._packedColor = PackColor(this.color, this.alpha);
  }
  setColor(color, alpha = 1) {
    this.color = color;
    this.alpha = alpha;
    this._packedColor = PackColor(color, alpha);
  }
  addToBuffer(F32, U32, textureID, offset) {
    const v1 = this.vertex1;
    const v2 = this.vertex2;
    const v3 = this.vertex3;
    const n1 = this.normal1;
    const n2 = this.normal2;
    const n3 = this.normal3;
    const color = this._packedColor;
    F32[offset++] = v1.x;
    F32[offset++] = v1.y;
    F32[offset++] = v1.z;
    F32[offset++] = n1.x;
    F32[offset++] = n1.y;
    F32[offset++] = n1.z;
    F32[offset++] = v1.u;
    F32[offset++] = v1.v;
    F32[offset++] = textureID;
    U32[offset++] = color;
    F32[offset++] = v2.x;
    F32[offset++] = v2.y;
    F32[offset++] = v2.z;
    F32[offset++] = n2.x;
    F32[offset++] = n2.y;
    F32[offset++] = n2.z;
    F32[offset++] = v2.u;
    F32[offset++] = v2.v;
    F32[offset++] = textureID;
    U32[offset++] = color;
    F32[offset++] = v3.x;
    F32[offset++] = v3.y;
    F32[offset++] = v3.z;
    F32[offset++] = n3.x;
    F32[offset++] = n3.y;
    F32[offset++] = n3.z;
    F32[offset++] = v3.u;
    F32[offset++] = v3.v;
    F32[offset++] = textureID;
    U32[offset++] = color;
    return offset;
  }
}
