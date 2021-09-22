function GetSize(width, height, x, y, dx, dy, mult = 16) {
  return Math.floor((width + x) / dx) * Math.floor((height + y) / dy) * mult;
}
function PVRTC2bppSize(width, height) {
  width = Math.max(width, 16);
  height = Math.max(height, 8);
  return width * height / 4;
}
function PVRTC4bppSize(width, height) {
  width = Math.max(width, 8);
  height = Math.max(height, 8);
  return width * height / 2;
}
function DXTEtcSmallSize(width, height) {
  return GetSize(width, height, 3, 3, 4, 4, 8);
}
function DXTEtcAstcBigSize(width, height) {
  return GetSize(width, height, 3, 3, 4, 4);
}
function ATC5x4Size(width, height) {
  return GetSize(width, height, 4, 3, 5, 4);
}
function ATC5x5Size(width, height) {
  return GetSize(width, height, 4, 4, 5, 5);
}
function ATC6x5Size(width, height) {
  return GetSize(width, height, 5, 4, 6, 5);
}
function ATC6x6Size(width, height) {
  return GetSize(width, height, 5, 5, 6, 6);
}
function ATC8x5Size(width, height) {
  return GetSize(width, height, 7, 4, 8, 5);
}
function ATC8x6Size(width, height) {
  return GetSize(width, height, 7, 5, 8, 6);
}
function ATC8x8Size(width, height) {
  return GetSize(width, height, 7, 7, 8, 8);
}
function ATC10x5Size(width, height) {
  return GetSize(width, height, 9, 4, 10, 5);
}
function ATC10x6Size(width, height) {
  return GetSize(width, height, 9, 5, 10, 6);
}
function ATC10x8Size(width, height) {
  return GetSize(width, height, 9, 7, 10, 8);
}
function ATC10x10Size(width, height) {
  return GetSize(width, height, 9, 9, 10, 10);
}
function ATC12x10Size(width, height) {
  return GetSize(width, height, 11, 9, 12, 10);
}
function ATC12x12Size(width, height) {
  return GetSize(width, height, 11, 11, 12, 12);
}
const FORMATS = {
  0: { sizeFunc: PVRTC2bppSize, glFormat: 35841 },
  1: { sizeFunc: PVRTC2bppSize, glFormat: 35843 },
  2: { sizeFunc: PVRTC4bppSize, glFormat: 35840 },
  3: { sizeFunc: PVRTC4bppSize, glFormat: 35842 },
  6: { sizeFunc: DXTEtcSmallSize, glFormat: 36196 },
  7: { sizeFunc: DXTEtcSmallSize, glFormat: 33776 },
  8: { sizeFunc: DXTEtcAstcBigSize, glFormat: 33777 },
  9: { sizeFunc: DXTEtcAstcBigSize, glFormat: 33778 },
  11: { sizeFunc: DXTEtcAstcBigSize, glFormat: 33779 },
  22: { sizeFunc: DXTEtcSmallSize, glFormat: 37492 },
  23: { sizeFunc: DXTEtcAstcBigSize, glFormat: 37496 },
  24: { sizeFunc: DXTEtcSmallSize, glFormat: 37494 },
  25: { sizeFunc: DXTEtcSmallSize, glFormat: 37488 },
  26: { sizeFunc: DXTEtcAstcBigSize, glFormat: 37490 },
  27: { sizeFunc: DXTEtcAstcBigSize, glFormat: 37808 },
  28: { sizeFunc: ATC5x4Size, glFormat: 37809 },
  29: { sizeFunc: ATC5x5Size, glFormat: 37810 },
  30: { sizeFunc: ATC6x5Size, glFormat: 37811 },
  31: { sizeFunc: ATC6x6Size, glFormat: 37812 },
  32: { sizeFunc: ATC8x5Size, glFormat: 37813 },
  33: { sizeFunc: ATC8x6Size, glFormat: 37814 },
  34: { sizeFunc: ATC8x8Size, glFormat: 37815 },
  35: { sizeFunc: ATC10x5Size, glFormat: 37816 },
  36: { sizeFunc: ATC10x6Size, glFormat: 37817 },
  37: { sizeFunc: ATC10x8Size, glFormat: 37818 },
  38: { sizeFunc: ATC10x10Size, glFormat: 37819 },
  39: { sizeFunc: ATC12x10Size, glFormat: 37820 },
  40: { sizeFunc: ATC12x12Size, glFormat: 37821 }
};
export function PVRParser(data) {
  const header = new Uint32Array(data, 0, 13);
  const pvrFormat = header[2];
  const internalFormat = FORMATS[pvrFormat].glFormat;
  const sizeFunction = FORMATS[pvrFormat].sizeFunc;
  const mipmapLevels = header[11];
  const width = header[7];
  const height = header[6];
  const dataOffset = 52 + header[12];
  const image = new Uint8Array(data, dataOffset);
  const mipmaps = new Array(mipmapLevels);
  let offset = 0;
  let levelWidth = width;
  let levelHeight = height;
  for (let i = 0; i < mipmapLevels; i++) {
    const levelSize = sizeFunction(levelWidth, levelHeight);
    mipmaps[i] = {
      data: new Uint8Array(image.buffer, image.byteOffset + offset, levelSize),
      width: levelWidth,
      height: levelHeight
    };
    levelWidth = Math.max(1, levelWidth >> 1);
    levelHeight = Math.max(1, levelHeight >> 1);
    offset += levelSize;
  }
  return {
    mipmaps,
    width,
    height,
    internalFormat,
    compressed: true,
    generateMipmap: false
  };
}
