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
import { RequestFile } from "../RequestFile";
export function JSONFile(key, url, fileData = {}) {
  return (loader) => {
    const file = CreateFile(key, GetURL(key, url, "json", loader), fileData.skipCache);
    const cache = Cache.get("JSON");
    const preload = (file2) => {
      return cache && (!cache.has(key) || !file2.skipCache);
    };
    const onload = (file2) => __async(this, null, function* () {
      file2.data = yield file2.response.json();
      if (!file2.skipCache) {
        cache.set(key, file2.data);
      }
      return true;
    });
    return RequestFile(file, preload, onload, fileData);
  };
}
