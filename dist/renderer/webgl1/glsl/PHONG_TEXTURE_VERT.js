export const PHONG_TEXTURE_VERT = `
#define SHADER_NAME phong_texture_vert

precision highp float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec4 aVertexColor;

uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;
uniform mat4 uNormalMatrix;

varying vec3 vNormal;
varying vec3 vEyeVec;
varying vec4 vColor;

void main(void) {

    vColor = vec4(aVertexColor.bgr, 1.0);

    vec4 vertex = uCameraMatrix * vec4(aVertexPosition, 1.0);

    vNormal = vec3(uNormalMatrix * vec4(aVertexNormal, 1.0));

    vEyeVec = -vec3(vertex.xyz);

    gl_Position = uProjectionMatrix * uCameraMatrix * vec4(aVertexPosition, 1.0);
}
`;
