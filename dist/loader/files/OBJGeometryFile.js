import {Cache} from "../../cache/Cache";
import {File} from "../File";
import {Geometry} from "../../gameobjects3d/geometry/Geometry";
import {GetBufferFromObj} from "../../gameobjects3d/geometry/GetBufferFromObj";
import {GetURL} from "../GetURL";
import {XHRLoader} from "../XHRLoader";
export function OBJGeometryFile(key, url, flipUVs = true) {
  const file = new File(key, url);
  file.load = () => {
    file.url = GetURL(file.key, file.url, ".obj", file.loader);
    return new Promise((resolve, reject) => {
      const cache = Cache.get("Geometry");
      if (!file.skipCache && cache.has(file.key)) {
        resolve(file);
      } else {
        XHRLoader(file).then((file2) => {
          const models = GetBufferFromObj(file2.data, flipUVs);
          file2.data = models;
          if (!file2.skipCache) {
            let key2 = file2.key;
            models.forEach((model, index) => {
              if (index > 0) {
                key2 = file2.key + index.toString();
              }
              const geom = new Geometry(model.buffer);
              cache.set(key2, geom);
            });
          }
          resolve(file2);
        }).catch((file2) => {
          reject(file2);
        });
      }
    });
  };
  return file;
}
