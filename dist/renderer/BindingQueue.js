const queue = [];
export const BindingQueue = {
  add: (texture, glConfig) => {
    queue.push({ texture, glConfig });
  },
  get: () => {
    return queue;
  },
  clear: () => {
    queue.length = 0;
  }
};
