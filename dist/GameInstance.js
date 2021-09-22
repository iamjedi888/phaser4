export let instance;
export let frame = 0;
export let elapsed = 0;
export const GameInstance = {
  get: () => {
    return instance;
  },
  set: (game) => {
    instance = game;
  },
  getFrame: () => {
    return frame;
  },
  setFrame: (current) => {
    frame = current;
  },
  getElapsed: () => {
    return elapsed;
  },
  setElapsed: (current) => {
    elapsed = current;
  }
};
