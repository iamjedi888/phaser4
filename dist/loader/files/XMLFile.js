import { Cache } from "../../cache/Cache";
import { File } from "../File";
import { GetURL } from "../GetURL";
import { ParseXML } from "../../dom/ParseXML";
import { XHRLoader } from "../XHRLoader";
export function XMLFile(key, url) {
  const file = new File(key, url);
  file.load = () => {
    file.url = GetURL(file.key, file.url, ".xml", file.loader);
    return new Promise((resolve, reject) => {
      const cache = Cache.get("XML");
      if (!file.skipCache && cache.has(file.key)) {
        resolve(file);
      } else {
        XHRLoader(file).then((file2) => {
          const xml = ParseXML(file2.data);
          if (xml !== null) {
            file2.data = xml;
            if (!file2.skipCache) {
              cache.set(file2.key, xml);
            }
            resolve(file2);
          } else {
            reject(file2);
          }
        }).catch((file2) => {
          reject(file2);
        });
      }
    });
  };
  return file;
}
