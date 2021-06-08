export function BindShader(renderPass, entry) {
  let prevShader;
  if (!entry) {
    entry = renderPass.currentShader;
  } else {
    prevShader = renderPass.currentShader.shader;
  }
  if (!entry.shader.isActive) {
    const success = entry.shader.bind(renderPass, entry.textureID);
    if (success) {
      entry.shader.setAttributes(renderPass);
      if (prevShader && prevShader !== entry.shader) {
        prevShader.isActive = false;
      }
    }
  }
}
