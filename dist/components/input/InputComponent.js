export class InputComponent {
  constructor(entity) {
    this.enabled = false;
    this.enabledChildren = true;
    this.entity = entity;
  }
  destroy() {
    this.entity = null;
    this.hitArea = null;
  }
}
