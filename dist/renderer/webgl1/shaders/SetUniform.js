export function SetUniform(shader, key, value) {
  const uniforms = shader.uniforms;
  if (uniforms.has(key)) {
    uniforms.set(key, value);
    if (shader.isActive) {
      const setter = shader.uniformSetters.get(key);
      setter(value);
    }
  }
}
