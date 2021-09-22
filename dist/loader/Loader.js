var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Emit } from "../events/Emit";
import { EventEmitter } from "../events/EventEmitter";
export class Loader extends EventEmitter {
  constructor() {
    super();
    __publicField(this, "baseURL", "");
    __publicField(this, "path", "");
    __publicField(this, "crossOrigin", "anonymous");
    __publicField(this, "maxParallelDownloads", -1);
    __publicField(this, "isLoading", false);
    __publicField(this, "progress");
    __publicField(this, "queue");
    __publicField(this, "inflight");
    __publicField(this, "completed");
    __publicField(this, "onComplete");
    __publicField(this, "onError");
    this.reset();
  }
  reset() {
    this.isLoading = false;
    this.queue = new Set();
    this.inflight = new Set();
    this.completed = new Set();
    this.progress = 0;
  }
  add(...file) {
    file.forEach((entity) => {
      this.queue.add(entity);
    });
    return this;
  }
  start() {
    if (this.isLoading) {
      return null;
    }
    return new Promise((resolve, reject) => {
      this.completed.clear();
      this.progress = 0;
      if (this.queue.size > 0) {
        this.isLoading = true;
        this.onComplete = resolve;
        this.onError = reject;
        Emit(this, "start");
        this.nextFile();
      } else {
        this.progress = 1;
        Emit(this, "complete");
        resolve(this);
      }
    });
  }
  nextFile() {
    let limit = this.queue.size;
    if (this.maxParallelDownloads !== -1) {
      limit = Math.min(limit, this.maxParallelDownloads) - this.inflight.size;
    }
    if (limit) {
      const iterator = this.queue.values();
      while (limit > 0) {
        const loadFile = iterator.next().value;
        this.inflight.add(loadFile);
        this.queue.delete(loadFile);
        loadFile(this).then((file) => {
          this.fileComplete(file);
          this.updateProgress(file, loadFile);
        }).catch((file) => {
          this.fileError(file);
          this.updateProgress(file, loadFile);
        });
        limit--;
      }
    } else if (this.inflight.size === 0) {
      this.stop();
    }
  }
  stop() {
    if (!this.isLoading) {
      return;
    }
    this.isLoading = false;
    Emit(this, "complete", this.completed);
    this.onComplete();
    this.completed.clear();
  }
  updateProgress(file, queueEntry) {
    this.inflight.delete(queueEntry);
    this.completed.add(file);
    const totalCompleted = this.completed.size;
    const totalQueued = this.queue.size + this.inflight.size;
    if (totalCompleted > 0) {
      this.progress = totalCompleted / (totalCompleted + totalQueued);
    }
    Emit(this, "progress", this.progress, totalCompleted, totalQueued);
    this.nextFile();
  }
  fileComplete(file) {
    Emit(this, "filecomplete", file);
  }
  fileError(file) {
    Emit(this, "fileerror", file);
  }
  totalFilesToLoad() {
    return this.queue.size + this.inflight.size;
  }
  setBaseURL(url = "") {
    if (url !== "" && url.substr(-1) !== "/") {
      url = url.concat("/");
    }
    this.baseURL = url;
    return this;
  }
  setPath(path = "") {
    if (path !== "" && path.substr(-1) !== "/") {
      path = path.concat("/");
    }
    this.path = path;
    return this;
  }
  setCORS(crossOrigin) {
    this.crossOrigin = crossOrigin;
    return this;
  }
  setMaxParallelDownloads(max) {
    this.maxParallelDownloads = max;
    return this;
  }
}
