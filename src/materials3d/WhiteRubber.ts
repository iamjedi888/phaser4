import { Material } from '../gameobjects3d/material/Material';

export const WhiteRubber = new Material({
    ambient: [ 0.05, 0.05, 0.05 ],
    diffuse: [ 0.5, 0.5, 0.5 ],
    specular: [ 0.7, 0.7, 0.7 ],
    shine: 0.078125
});
