import {Emit, EventEmitter} from "../events";
export class Loader extends EventEmitter {
  constructor() {
    super();
    this.baseURL = "";
    this.path = "";
    this.crossOrigin = "anonymous";
    this.maxParallelDownloads = -1;
    this.isLoading = false;
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
      entity.loader = this;
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
        const file = iterator.next().value;
        this.inflight.add(file);
        this.queue.delete(file);
        file.load().then((file2) => this.fileComplete(file2)).catch((file2) => this.fileError(file2));
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
  updateProgress(file) {
    this.inflight.delete(file);
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
    this.updateProgress(file);
  }
  fileError(file) {
    Emit(this, "fileerror", file);
    this.updateProgress(file);
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
