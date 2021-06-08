import { gl } from "../GL";
export function CreateUniformSetter(uniform, location, isArray = false) {
  switch (uniform.type) {
    case gl.INT:
    case gl.BOOL: {
      if (isArray) {
        return (v) => {
          gl.uniform1iv(location, v);
        };
      } else {
        return (v) => {
          gl.uniform1i(location, v);
        };
      }
    }
    case gl.INT_VEC2:
    case gl.BOOL_VEC2: {
      return (v) => {
        gl.uniform2iv(location, v);
      };
    }
    case gl.INT_VEC3:
    case gl.BOOL_VEC3: {
      return (v) => {
        gl.uniform3iv(location, v);
      };
    }
    case gl.INT_VEC4:
    case gl.BOOL_VEC4: {
      return (v) => {
        gl.uniform4iv(location, v);
      };
    }
    case gl.FLOAT: {
      if (isArray) {
        return (v) => {
          gl.uniform1fv(location, v);
        };
      } else {
        return (v) => {
          gl.uniform1f(location, v);
        };
      }
    }
    case gl.FLOAT_VEC2: {
      return (v) => {
        gl.uniform2fv(location, v);
      };
    }
    case gl.FLOAT_VEC3: {
      return (v) => {
        gl.uniform3fv(location, v);
      };
    }
    case gl.FLOAT_VEC4: {
      return (v) => {
        gl.uniform4fv(location, v);
      };
    }
    case gl.FLOAT_MAT2: {
      return (v) => {
        gl.uniformMatrix2fv(location, false, v);
      };
    }
    case gl.FLOAT_MAT3: {
      return (v) => {
        gl.uniformMatrix3fv(location, false, v);
      };
    }
    case gl.FLOAT_MAT4: {
      return (v) => {
        gl.uniformMatrix4fv(location, false, v);
      };
    }
    case gl.SAMPLER_2D:
    case gl.SAMPLER_CUBE: {
      if (uniform.size > 1) {
        return (v) => {
          gl.uniform1iv(location, v);
        };
      } else {
        return (v) => {
          gl.uniform1i(location, v);
        };
      }
    }
  }
}
