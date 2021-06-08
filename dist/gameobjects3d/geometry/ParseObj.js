var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
export class ParseObj {
  constructor(fileContents, flipUVs = true, defaultModelName = "untitled") {
    __publicField(this, "fileContents");
    __publicField(this, "defaultModelName");
    __publicField(this, "currentMaterial", "");
    __publicField(this, "currentGroup", "");
    __publicField(this, "smoothingGroup", 0);
    __publicField(this, "result", {
      materialLibraries: [],
      models: []
    });
    __publicField(this, "flipUVs");
    this.fileContents = fileContents;
    this.defaultModelName = defaultModelName;
    this.flipUVs = flipUVs;
  }
  parseAsync() {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.parse());
      } catch (theError) {
        reject(theError);
      }
    });
  }
  parse() {
    const stripComments = (line) => {
      const commentIndex = line.indexOf("#");
      if (commentIndex > -1) {
        return line.substring(0, commentIndex);
      }
      return line;
    };
    const lines = this.fileContents.split("\n");
    for (const line of lines) {
      const strippedline = stripComments(line);
      const lineItems = strippedline.replace(/\s\s+/g, " ").trim().split(" ");
      switch (lineItems[0].toLowerCase()) {
        case "o":
          this.parseObject(lineItems);
          break;
        case "g":
          this.parseGroup(lineItems);
          break;
        case "v":
          this.parseVertexCoords(lineItems);
          break;
        case "vt":
          this.parseTextureCoords(lineItems);
          break;
        case "vn":
          this.parseVertexNormal(lineItems);
          break;
        case "s":
          this.parseSmoothShadingStatement(lineItems);
          break;
        case "f":
          this.parsePolygon(lineItems);
          break;
        case "mtllib":
          this.parseMtlLib(lineItems);
          break;
        case "usemtl":
          this.parseUseMtl(lineItems);
          break;
      }
    }
    this.fileContents = "";
    return this.result;
  }
  currentModel() {
    if (this.result.models.length === 0) {
      this.result.models.push({
        faces: [],
        name: this.defaultModelName,
        textureCoords: [],
        vertexNormals: [],
        vertices: []
      });
      this.currentGroup = "";
      this.smoothingGroup = 0;
    }
    return this.result.models[this.result.models.length - 1];
  }
  parseObject(lineItems) {
    const modelName = lineItems.length >= 2 ? lineItems[1] : this.defaultModelName;
    this.result.models.push({
      faces: [],
      name: modelName,
      textureCoords: [],
      vertexNormals: [],
      vertices: []
    });
    this.currentGroup = "";
    this.smoothingGroup = 0;
  }
  parseGroup(lineItems) {
    if (lineItems.length !== 2) {
      throw "Group statements must have exactly 1 argument (eg. g group_1)";
    }
    this.currentGroup = lineItems[1];
  }
  parseVertexCoords(lineItems) {
    const len = lineItems.length;
    const x = len >= 2 ? parseFloat(lineItems[1]) : 0;
    const y = len >= 3 ? parseFloat(lineItems[2]) : 0;
    const z = len >= 4 ? parseFloat(lineItems[3]) : 0;
    this.currentModel().vertices.push({ x, y, z });
  }
  parseTextureCoords(lineItems) {
    const len = lineItems.length;
    let u = len >= 2 ? parseFloat(lineItems[1]) : 0;
    let v = len >= 3 ? parseFloat(lineItems[2]) : 0;
    let w = len >= 4 ? parseFloat(lineItems[3]) : 0;
    if (isNaN(u)) {
      u = 0;
    }
    if (isNaN(v)) {
      v = 0;
    }
    if (isNaN(w)) {
      w = 0;
    }
    if (this.flipUVs) {
      v = 1 - v;
    }
    this.currentModel().textureCoords.push({ u, v, w });
  }
  parseVertexNormal(lineItems) {
    const len = lineItems.length;
    const x = len >= 2 ? parseFloat(lineItems[1]) : 0;
    const y = len >= 3 ? parseFloat(lineItems[2]) : 0;
    const z = len >= 4 ? parseFloat(lineItems[3]) : 0;
    this.currentModel().vertexNormals.push({ x, y, z });
  }
  parsePolygon(lineItems) {
    const totalVertices = lineItems.length - 1;
    if (totalVertices < 3) {
      throw "Face < 3 vertices";
    }
    const face = {
      group: this.currentGroup,
      material: this.currentMaterial,
      smoothingGroup: this.smoothingGroup,
      vertices: []
    };
    for (let i = 0; i < totalVertices; i++) {
      const vertexString = lineItems[i + 1];
      const vertexValues = vertexString.split("/");
      const vvLen = vertexValues.length;
      if (vvLen < 1 || vvLen > 3) {
        throw "Too many / values for single vertex";
      }
      let vertexIndex = 0;
      let textureCoordsIndex = 0;
      let vertexNormalIndex = 0;
      vertexIndex = parseInt(vertexValues[0], 10);
      if (vvLen > 1 && vertexValues[1] !== "") {
        textureCoordsIndex = parseInt(vertexValues[1], 10);
      }
      if (vvLen > 2) {
        vertexNormalIndex = parseInt(vertexValues[2], 10);
      }
      if (vertexIndex === 0) {
        throw "Faces uses invalid vertex index of 0";
      }
      if (vertexIndex < 0) {
        vertexIndex = this.currentModel().vertices.length + 1 + vertexIndex;
      }
      textureCoordsIndex -= 1;
      vertexIndex -= 1;
      vertexNormalIndex -= 1;
      face.vertices.push({
        textureCoordsIndex,
        vertexIndex,
        vertexNormalIndex
      });
    }
    this.currentModel().faces.push(face);
  }
  parseMtlLib(lineItems) {
    if (lineItems.length >= 2) {
      this.result.materialLibraries.push(lineItems[1]);
    }
  }
  parseUseMtl(lineItems) {
    if (lineItems.length >= 2) {
      this.currentMaterial = lineItems[1];
    }
  }
  parseSmoothShadingStatement(lineItems) {
    if (lineItems.length !== 2) {
      throw "Smoothing group statements must have exactly 1 argument (eg. s <number|off>)";
    }
    const groupNumber = lineItems[1].toLowerCase() === "off" ? 0 : parseInt(lineItems[1], 10);
    this.smoothingGroup = groupNumber;
  }
}
