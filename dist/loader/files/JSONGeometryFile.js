import {Cache} from "../../cache/Cache";
import {File} from "../File";
import {Geometry} from "../../gameobjects3d/geometry/Geometry";
import {GetURL} from "../GetURL";
import {XHRLoader} from "../XHRLoader";
export function JSONGeometryFile(key, url, mappingConfig) {
  const file = new File(key, url);
  const {
    vertices = "verts",
    normals = "normals",
    uvs = "uvs",
    numberOfVertices = 0
  } = mappingConfig;
  file.load = () => {
    file.url = GetURL(file.key, file.url, ".json", file.loader);
    return new Promise((resolve, reject) => {
      const cache = Cache.get("Geometry");
      if (!file.skipCache && cache.has(file.key)) {
        resolve(file);
      } else {
        XHRLoader(file).then((file2) => {
          const data = JSON.parse(file2.data);
          const geom = new Geometry({
            vertices: data[vertices],
            normals: data[normals],
            uvs: data[uvs],
            numberOfVertices
          });
          file2.data = geom;
          if (!file2.skipCache) {
            cache.set(file2.key, geom);
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
