export const GORAUD_LAMBERT_VERT = `
#define SHADER_NAME GORAUD_LAMBERT_VERT

//  Goraud Shading + Lambert Reflection

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;
uniform mat4 uNormalMatrix;
uniform mat4 uModelMatrix;

uniform float uShininess;
uniform vec3 uLightDirection;

uniform vec4 uLightAmbient;
uniform vec4 uLightDiffuse;
uniform vec4 uLightSpecular;

uniform vec4 uMaterialAmbient;
uniform vec4 uMaterialDiffuse;
uniform vec4 uMaterialSpecular;

varying vec4 vTintColor;
varying vec2 vTextureCoord;

void main(void)
{
    vTextureCoord = aTextureCoord;

    vec4 vertex = uCameraMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);

    vec3 N = vec3(uNormalMatrix * vec4(aVertexNormal, 1.0));

    vec3 L = normalize(uLightDirection);

    float lambertTerm = clamp(dot(N, -L), 0.0, 1.0);

    vec4 Ia = uLightAmbient * uMaterialAmbient;
    vec4 Id = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 Is = vec4(0.0, 0.0, 0.0, 1.0);

    Id = uLightDiffuse * uMaterialDiffuse * lambertTerm;

    vec3 eyeVec = -vec3(vertex.xyz);
    vec3 E = normalize(eyeVec);
    vec3 R = reflect(L, N);
    float specular = pow(max(dot(R, E), 0.0), uShininess);

    Is = uLightSpecular * uMaterialSpecular * specular;

    vTintColor = Ia + Id + Is;
    vTintColor.a = 1.0;

    gl_Position = uProjectionMatrix * vertex;
}
`;
