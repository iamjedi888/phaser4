export function AddShader(renderPass, shader, textureID) {
  const stackEntry = { shader, textureID };
  renderPass.shaderStack.push(stackEntry);
  return stackEntry;
}
