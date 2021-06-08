export function SetDefaultShader(renderPass, shader, textureID) {
  const entry = { shader, textureID };
  renderPass.shaderStack[0] = entry;
  renderPass.currentShader = entry;
  renderPass.defaultShader = entry;
}
