export const AMBIENT_LIGHT_FRAG = `#define SHADER_NAME AMBIENT_LIGHT_FRAG

precision highp float;

uniform vec3 uLightPosition;
uniform vec3 uLightAmbient;
uniform vec3 uLightDiffuse;
uniform vec3 uLightSpecular;

uniform vec3 uMaterialAmbient;
uniform vec3 uMaterialDiffuse;
uniform vec3 uMaterialSpecular;
uniform float uMaterialShine;

uniform vec3 uCameraPosition;

uniform sampler2D uTexture;

varying vec2 vTextureCoord;
varying vec3 vNormal;
varying vec3 vPosition;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    vec3 ambient = uLightAmbient * uMaterialAmbient;

    vec3 norm = normalize(vNormal);
    vec3 lightDir = normalize(uLightPosition - vPosition);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = uLightDiffuse * (diff * uMaterialDiffuse);

    vec3 viewDir = normalize(uCameraPosition - vPosition);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), uMaterialShine);
    vec3 specular = uLightSpecular * (spec * uMaterialSpecular);

    vec3 result = (ambient + diffuse + specular) * color.rgb;

    gl_FragColor = vec4(result, color.a);
}`;
