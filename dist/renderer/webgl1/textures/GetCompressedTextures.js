export function GetCompressedTextures(gl) {
  const extString = "WEBGL_compressed_texture_";
  const wkExtString = "WEBKIT_" + extString;
  const hasExt = (format) => {
    const results = gl.getExtension(extString + format) || gl.getExtension(wkExtString + format);
    if (results) {
      const glEnums = {};
      for (const key in results) {
        glEnums[results[key]] = key;
      }
      return glEnums;
    }
  };
  return {
    ETC: hasExt("etc"),
    ETC1: hasExt("etc1"),
    ATC: hasExt("atc"),
    ASTC: hasExt("astc"),
    BPTC: hasExt("bptc"),
    RGTC: hasExt("rgtc"),
    PVRTC: hasExt("pvrtc"),
    S3TC: hasExt("s3tc"),
    S3TCSRGB: hasExt("s3tc_srgb"),
    IMG: true
  };
}
