export let gl;
export const GL = {
  get: () => {
    return gl;
  },
  set: (context) => {
    gl = context;
  }
};
