import { Cache } from "../../cache/Cache";
import { File } from "../File";
import { GetURL } from "../GetURL";
import { XHRLoader } from "../XHRLoader";
export function JSONFile(key, url) {
  const file = new File(key, url);
  file.load = () => {
    file.url = GetURL(file.key, file.url, ".json", file.loader);
    return new Promise((resolve, reject) => {
      const cache = Cache.get("JSON");
      if (!file.skipCache && cache.has(file.key)) {
        resolve(file);
      } else {
        XHRLoader(file).then((file2) => {
          file2.data = JSON.parse(file2.data);
          if (!file2.skipCache) {
            cache.set(file2.key, file2.data);
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
