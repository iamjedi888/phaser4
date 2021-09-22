export function XHRLoader(file) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", file.url, true);
  xhr.responseType = file.responseType;
  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      const type = file.responseType;
      file.data = type === "text" || type === "" ? xhr.responseText : xhr.response;
      file.hasLoaded = true;
      resolve(file);
    };
    xhr.onerror = () => {
      file.hasLoaded = true;
      reject(file);
    };
    xhr.send();
  });
}
