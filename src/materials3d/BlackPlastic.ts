import { Material } from '../gameobjects3d/material/Material';

export const BlackPlastic = new Material({
    ambient: [ 0, 0, 0 ],
    diffuse: [ 0.01, 0.01, 0.01 ],
    specular: [ 0.5, 0.5, 0.5 ],
    shine: 0.25
});
