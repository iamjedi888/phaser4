export function SetDefaultBlendMode(renderPass, enable, sfactor, dfactor) {
  const entry = { enable, sfactor, dfactor };
  renderPass.blendModeStack[0] = entry;
  renderPass.currentBlendMode = entry;
  renderPass.defaultBlendMode = entry;
}
