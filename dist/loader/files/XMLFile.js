var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { Cache } from "../../cache/Cache";
import { CreateFile } from "../CreateFile";
import { GetURL } from "../GetURL";
import { ParseXML } from "../../dom/ParseXML";
import { RequestFile } from "../RequestFile";
export function XMLFile(key, url, fileData = {}) {
  return (loader) => {
    const file = CreateFile(key, GetURL(key, url, "xml", loader), fileData.skipCache);
    const cache = Cache.get("XML");
    const preload = (file2) => {
      return cache && (!cache.has(key) || !file2.skipCache);
    };
    const onload = (file2) => __async(this, null, function* () {
      const data = yield file2.response.text();
      const xml = ParseXML(data);
      if (xml !== null) {
        file2.data = xml;
        if (!file2.skipCache) {
          cache.set(key, xml);
        }
        return true;
      } else {
        return false;
      }
    });
    return RequestFile(file, preload, onload, fileData);
  };
}
