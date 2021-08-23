import { Material } from '../gameobjects3d/material/Material';

export const GreenRubber = new Material({
    ambient: [ 0, 0.05, 0 ],
    diffuse: [ 0.4, 0.5, 0.4 ],
    specular: [ 0.04, 0.7, 0.04 ],
    shine: 0.078125
});
