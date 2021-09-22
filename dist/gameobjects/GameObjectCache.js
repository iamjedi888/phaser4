export const GameObjectCache = {
  local: [],
  set: function(index, object) {
    this.local[index] = object;
  },
  get: function(index) {
    return this.local[index];
  },
  clear: function() {
    this.local.length = 0;
  },
  remove: function(index) {
    this.local[index] = null;
  }
};
