export function AddBlendMode(renderPass, enable, sfactor, dfactor) {
  const entry = { enable, sfactor, dfactor };
  renderPass.blendModeStack.push(entry);
  return entry;
}
