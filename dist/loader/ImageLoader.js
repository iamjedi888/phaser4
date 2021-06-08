export function ImageTagLoader(file) {
  const fileCast = file;
  fileCast.data = new Image();
  if (fileCast.crossOrigin) {
    fileCast.data.crossOrigin = file.crossOrigin;
  }
  return new Promise((resolve, reject) => {
    fileCast.data.onload = () => {
      if (fileCast.data.onload) {
        fileCast.data.onload = null;
        fileCast.data.onerror = null;
        resolve(fileCast);
      }
    };
    fileCast.data.onerror = (event) => {
      if (fileCast.data.onload) {
        fileCast.data.onload = null;
        fileCast.data.onerror = null;
        fileCast.error = event;
        reject(fileCast);
      }
    };
    fileCast.data.src = file.url;
    if (fileCast.data.complete && fileCast.data.width && fileCast.data.height) {
      fileCast.data.onload = null;
      fileCast.data.onerror = null;
      resolve(fileCast);
    }
  });
}
