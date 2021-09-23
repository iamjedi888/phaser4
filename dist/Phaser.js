var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/animation/index.ts
var animation_exports = {};
__export(animation_exports, {
  AddFrame: () => AddFrame,
  AddFrames: () => AddFrames,
  Animation: () => Animation,
  AnimationFrame: () => AnimationFrame,
  CalculateDuration: () => CalculateDuration,
  CreateAnimData: () => CreateAnimData,
  CreateAnimationFromAtlas: () => CreateAnimationFromAtlas,
  LinkFrames: () => LinkFrames,
  Play: () => Play,
  RemoveFrame: () => RemoveFrame,
  RemoveFrames: () => RemoveFrames
});

// src/animation/CalculateDuration.ts
function CalculateDuration(animation, frameRate, duration) {
  const totalFrames = animation.frames.size;
  if (!Number.isFinite(duration) && !Number.isFinite(frameRate)) {
    animation.frameRate = 24;
    animation.duration = 24 / totalFrames * 1e3;
  } else if (duration && !Number.isFinite(frameRate)) {
    animation.duration = duration;
    animation.frameRate = totalFrames / (duration / 1e3);
  } else {
    animation.frameRate = frameRate;
    animation.duration = totalFrames / frameRate * 1e3;
  }
  animation.msPerFrame = 1e3 / animation.frameRate;
  return animation;
}

// src/animation/LinkFrames.ts
function LinkFrames(animation) {
  const totalFrames = animation.frames.size;
  if (totalFrames === 0) {
    return animation;
  }
  let i = 0;
  const framePercent = 1 / totalFrames;
  let firstFrame;
  let prevFrame2;
  for (const frame2 of animation.frames.values()) {
    if (!prevFrame2) {
      frame2.isFirst = true;
      animation.firstFrame = frame2;
      firstFrame = frame2;
    } else {
      prevFrame2.nextFrame = frame2;
      frame2.prevFrame = prevFrame2;
    }
    prevFrame2 = frame2;
    i++;
    frame2.progress = framePercent * i;
    if (i === totalFrames) {
      frame2.isLast = true;
      frame2.nextFrame = firstFrame;
      firstFrame.prevFrame = frame2;
    }
  }
  return animation;
}

// src/animation/AddFrame.ts
function AddFrame(animation, frame2) {
  animation.frames.add(frame2);
  CalculateDuration(animation, animation.frameRate);
  return LinkFrames(animation);
}

// src/animation/AddFrames.ts
function AddFrames(animation, ...frames) {
  frames.forEach((frame2) => {
    animation.frames.add(frame2);
  });
  CalculateDuration(animation, animation.frameRate);
  return LinkFrames(animation);
}

// src/animation/Animation.ts
var Animation = class {
  key;
  frames;
  firstFrame;
  msPerFrame;
  frameRate;
  duration;
  skipMissedFrames;
  delay;
  hold;
  repeat;
  repeatDelay;
  yoyo;
  showOnStart;
  hideOnComplete;
  paused;
  constructor(config) {
    const {
      key,
      frames = [],
      frameRate = null,
      duration = null,
      skipMissedFrames = true,
      delay = 0,
      repeat = 0,
      repeatDelay = 0,
      yoyo = false,
      showOnStart = false,
      hideOnComplete = false,
      paused = false
    } = config;
    this.key = key;
    this.skipMissedFrames = skipMissedFrames;
    this.delay = delay;
    this.repeat = repeat;
    this.repeatDelay = repeatDelay;
    this.yoyo = yoyo;
    this.showOnStart = showOnStart;
    this.hideOnComplete = hideOnComplete;
    this.paused = paused;
    this.frames = new Set(frames);
    CalculateDuration(this, frameRate, duration);
    LinkFrames(this);
  }
  getTotalFrames() {
    return this.frames.size;
  }
  destroy() {
    this.frames.clear();
  }
};

// src/animation/AnimationFrame.ts
var AnimationFrame = class {
  texture;
  frame;
  isFirst = false;
  isLast = false;
  isKeyFrame = false;
  nextFrame;
  prevFrame;
  duration = 0;
  progress = 0;
  constructor(texture, frame2) {
    this.texture = texture;
    this.frame = frame2;
  }
  destroy() {
    this.texture = null;
    this.frame = null;
    this.nextFrame = null;
    this.prevFrame = null;
  }
};

// src/animation/CreateAnimData.ts
function CreateAnimData(currentAnim = "", frameRate = 0, duration = 0, delay = 0, repeat = 0, repeatDelay = 0, yoyo = false, hold = 0, showOnStart = false, hideOnComplete = false) {
  return {
    currentAnim,
    frameRate,
    duration,
    delay,
    repeat,
    repeatDelay,
    yoyo,
    hold,
    showOnStart,
    hideOnComplete,
    stopAfter: 0,
    startFrame: 0,
    timeScale: 1,
    onStart: null,
    onRepeat: null,
    onComplete: null,
    nextFrameTime: 0,
    repeatCount: 0,
    isPlaying: false,
    forceRestart: false,
    pendingStart: false,
    playingForward: true
  };
}

// src/textures/GetFramesInRange.ts
function GetFramesInRange(texture, config) {
  const {
    prefix = "",
    start = 0,
    zeroPad = 0,
    suffix = ""
  } = config;
  let end = config.end;
  const output = [];
  const diff2 = start < end ? 1 : -1;
  end += diff2;
  for (let i = start; i !== end; i += diff2) {
    const frameKey = prefix + i.toString().padStart(zeroPad, "0") + suffix;
    output.push(texture.getFrame(frameKey));
  }
  return output;
}

// src/textures/TextureManagerInstance.ts
var instance;
var TextureManagerInstance = {
  get: () => {
    return instance;
  },
  set: (manager) => {
    if (instance) {
      throw new Error("Cannot instantiate TextureManager more than once");
    }
    instance = manager;
  }
};

// src/textures/GetTexture.ts
function GetTexture(key) {
  return TextureManagerInstance.get().get(key);
}

// src/renderer/BindingQueue.ts
var queue = [];
var BindingQueue = {
  add: (texture, glConfig) => {
    queue.push({ texture, glConfig });
  },
  get: () => {
    return queue;
  },
  clear: () => {
    queue.length = 0;
  }
};

// src/textures/UpdateFrameUVs.ts
function UpdateFrameUVs(frame2) {
  const { x, y, width, height } = frame2;
  const baseTextureWidth = frame2.texture.width;
  const baseTextureHeight = frame2.texture.height;
  frame2.u0 = x / baseTextureWidth;
  frame2.v0 = y / baseTextureHeight;
  frame2.u1 = (x + width) / baseTextureWidth;
  frame2.v1 = (y + height) / baseTextureHeight;
  return frame2;
}

// src/textures/Frame.ts
var Frame = class {
  texture;
  key;
  x;
  y;
  width;
  height;
  trimmed = false;
  sourceSizeWidth;
  sourceSizeHeight;
  spriteSourceSizeX;
  spriteSourceSizeY;
  spriteSourceSizeWidth;
  spriteSourceSizeHeight;
  pivot;
  u0;
  v0;
  u1;
  v1;
  constructor(texture, key, x, y, width, height) {
    this.texture = texture;
    this.key = key;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sourceSizeWidth = width;
    this.sourceSizeHeight = height;
    UpdateFrameUVs(this);
  }
  destroy() {
    this.texture = null;
  }
};

// src/textures/SetFrameSize.ts
function SetFrameSize(frame2, width, height) {
  frame2.width = width;
  frame2.height = height;
  frame2.sourceSizeWidth = width;
  frame2.sourceSizeHeight = height;
  return UpdateFrameUVs(frame2);
}

// src/textures/Texture.ts
var Texture = class {
  key = "";
  locked = true;
  width;
  height;
  image;
  binding;
  firstFrame;
  frames;
  data;
  constructor(image, width, height, glConfig) {
    if (image) {
      width = image.width;
      height = image.height;
    }
    this.image = image;
    this.width = width;
    this.height = height;
    this.frames = new Map();
    this.data = {};
    this.addFrame("__BASE", 0, 0, width, height);
    BindingQueue.add(this, glConfig);
  }
  addFrame(key, x, y, width, height) {
    if (this.frames.has(key)) {
      return null;
    }
    const frame2 = new Frame(this, key, x, y, width, height);
    this.frames.set(key, frame2);
    if (!this.firstFrame || this.firstFrame.key === "__BASE") {
      this.firstFrame = frame2;
    }
    return frame2;
  }
  getFrame(key) {
    if (!key) {
      return this.firstFrame;
    }
    if (key instanceof Frame) {
      key = key.key;
    }
    let frame2 = this.frames.get(key);
    if (!frame2) {
      console.warn(`Frame missing: ${key}`);
      frame2 = this.firstFrame;
    }
    return frame2;
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    const frame2 = this.frames.get("__BASE");
    SetFrameSize(frame2, width, height);
  }
  update(image, glConfig) {
    this.image = image;
    this.setSize(image.width, image.height);
    BindingQueue.add(this, glConfig);
  }
  destroy() {
    if (this.binding) {
      this.binding.destroy();
    }
    this.frames.clear();
    this.binding = null;
    this.data = null;
    this.image = null;
    this.firstFrame = null;
  }
};

// src/animation/CreateAnimationFromAtlas.ts
function CreateAnimationFromAtlas(config) {
  const texture = config.texture instanceof Texture ? config.texture : GetTexture(config.texture);
  const frames = [];
  GetFramesInRange(texture, config).forEach((frame2) => {
    frames.push(new AnimationFrame(texture, frame2));
  });
  return new Animation({ frames, ...config });
}

// src/animation/Play.ts
function Play(animation, config = {}, ...sprites) {
  const data = CreateAnimData(animation.key, animation.frameRate, animation.duration, animation.delay, animation.repeat, animation.repeatDelay, animation.yoyo, animation.hold, animation.showOnStart, animation.hideOnComplete);
  Object.assign(data, config);
  data.nextFrameTime = animation.msPerFrame + data.delay;
  sprites.forEach((sprite) => {
    if (!sprite || !sprite.animData) {
      return;
    }
    const spriteAnimData = sprite.animData;
    if (spriteAnimData.isPlaying) {
      if (sprite.currentAnimation !== animation) {
        spriteAnimData.isPlaying = false;
        if (spriteAnimData.onComplete) {
          spriteAnimData.onComplete(sprite, sprite.currentAnimation);
        }
      } else if (!data.forceRestart) {
        return;
      }
    }
    Object.assign(spriteAnimData, data);
    sprite.currentAnimation = animation;
    sprite.currentFrame = animation.firstFrame;
    sprite.play();
  });
  return sprites;
}

// src/animation/RemoveFrame.ts
function RemoveFrame(animation, frame2) {
  animation.frames.delete(frame2);
  CalculateDuration(animation, animation.frameRate);
  return LinkFrames(animation);
}

// src/animation/RemoveFrames.ts
function RemoveFrames(animation, ...frames) {
  frames.forEach((frame2) => {
    animation.frames.delete(frame2);
  });
  CalculateDuration(animation, animation.frameRate);
  return LinkFrames(animation);
}

// src/camera/index.ts
var camera_exports = {};
__export(camera_exports, {
  StaticCamera: () => StaticCamera,
  WorldCamera: () => WorldCamera
});

// node_modules/bitecs/dist/index.mjs
var TYPES_ENUM = {
  i8: "i8",
  ui8: "ui8",
  ui8c: "ui8c",
  i16: "i16",
  ui16: "ui16",
  i32: "i32",
  ui32: "ui32",
  f32: "f32",
  f64: "f64",
  eid: "eid"
};
var TYPES_NAMES = {
  i8: "Int8",
  ui8: "Uint8",
  ui8c: "Uint8Clamped",
  i16: "Int16",
  ui16: "Uint16",
  i32: "Int32",
  ui32: "Uint32",
  eid: "Uint32",
  f32: "Float32",
  f64: "Float64"
};
var TYPES = {
  i8: Int8Array,
  ui8: Uint8Array,
  ui8c: Uint8ClampedArray,
  i16: Int16Array,
  ui16: Uint16Array,
  i32: Int32Array,
  ui32: Uint32Array,
  f32: Float32Array,
  f64: Float64Array,
  eid: Uint32Array
};
var UNSIGNED_MAX = {
  uint8: 2 ** 8,
  uint16: 2 ** 16,
  uint32: 2 ** 32
};
var roundToMultiple = (mul) => (x) => Math.ceil(x / mul) * mul;
var roundToMultiple4 = roundToMultiple(4);
var $storeRef = Symbol("storeRef");
var $storeSize = Symbol("storeSize");
var $storeMaps = Symbol("storeMaps");
var $storeFlattened = Symbol("storeFlattened");
var $storeBase = Symbol("storeBase");
var $storeType = Symbol("storeType");
var $storeArrayCounts = Symbol("storeArrayCount");
var $storeSubarrays = Symbol("storeSubarrays");
var $subarrayCursors = Symbol("subarrayCursors");
var $subarray = Symbol("subarray");
var $subarrayFrom = Symbol("subarrayFrom");
var $subarrayTo = Symbol("subarrayTo");
var $parentArray = Symbol("subStore");
var $tagStore = Symbol("tagStore");
var $queryShadow = Symbol("queryShadow");
var $serializeShadow = Symbol("serializeShadow");
var $indexType = Symbol("indexType");
var $indexBytes = Symbol("indexBytes");
var $isEidType = Symbol("isEidType");
var stores = {};
var resize = (ta, size) => {
  const newBuffer = new ArrayBuffer(size * ta.BYTES_PER_ELEMENT);
  const newTa = new ta.constructor(newBuffer);
  newTa.set(ta, 0);
  return newTa;
};
var createShadow = (store, key) => {
  if (!ArrayBuffer.isView(store)) {
    const shadowStore = store[$parentArray].slice(0).fill(0);
    store[key] = store.map((_, eid) => {
      const from = store[eid][$subarrayFrom];
      const to = store[eid][$subarrayTo];
      return shadowStore.subarray(from, to);
    });
  } else {
    store[key] = store.slice(0).fill(0);
  }
};
var resizeSubarray = (metadata, store, size) => {
  const cursors = metadata[$subarrayCursors];
  let type = store[$storeType];
  const length = store[0].length;
  const indexType = length <= UNSIGNED_MAX.uint8 ? "ui8" : length <= UNSIGNED_MAX.uint16 ? "ui16" : "ui32";
  const arrayCount = metadata[$storeArrayCounts][type];
  const summedLength = Array(arrayCount).fill(0).reduce((a, p) => a + length, 0);
  const array = new TYPES[type](roundToMultiple4(summedLength * size));
  array.set(metadata[$storeSubarrays][type]);
  metadata[$storeSubarrays][type] = array;
  array[$indexType] = TYPES_NAMES[indexType];
  array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
  const start = cursors[type];
  let end = 0;
  for (let eid = 0; eid < size; eid++) {
    const from = cursors[type] + eid * length;
    const to = from + length;
    store[eid] = metadata[$storeSubarrays][type].subarray(from, to);
    store[eid][$subarrayFrom] = from;
    store[eid][$subarrayTo] = to;
    store[eid][$subarray] = true;
    store[eid][$indexType] = TYPES_NAMES[indexType];
    store[eid][$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    end = to;
  }
  cursors[type] = end;
  store[$parentArray] = metadata[$storeSubarrays][type].subarray(start, end);
};
var resizeRecursive = (metadata, store, size) => {
  Object.keys(store).forEach((key) => {
    const ta = store[key];
    if (Array.isArray(ta)) {
      resizeSubarray(metadata, ta, size);
      store[$storeFlattened].push(ta);
    } else if (ArrayBuffer.isView(ta)) {
      store[key] = resize(ta, size);
      store[$storeFlattened].push(store[key]);
    } else if (typeof ta === "object") {
      resizeRecursive(metadata, store[key], size);
    }
  });
};
var resizeStore = (store, size) => {
  if (store[$tagStore])
    return;
  store[$storeSize] = size;
  store[$storeFlattened].length = 0;
  Object.keys(store[$subarrayCursors]).forEach((k) => {
    store[$subarrayCursors][k] = 0;
  });
  resizeRecursive(store, store, size);
};
var resetStoreFor = (store, eid) => {
  if (store[$storeFlattened]) {
    store[$storeFlattened].forEach((ta) => {
      if (ArrayBuffer.isView(ta))
        ta[eid] = 0;
      else
        ta[eid].fill(0);
    });
  }
};
var createTypeStore = (type, length) => {
  const totalBytes = length * TYPES[type].BYTES_PER_ELEMENT;
  const buffer = new ArrayBuffer(totalBytes);
  const store = new TYPES[type](buffer);
  store[$isEidType] = type === TYPES_ENUM.eid;
  return store;
};
var createArrayStore = (metadata, type, length) => {
  const size = metadata[$storeSize];
  const store = Array(size).fill(0);
  store[$storeType] = type;
  store[$isEidType] = type === TYPES_ENUM.eid;
  const cursors = metadata[$subarrayCursors];
  const indexType = length < UNSIGNED_MAX.uint8 ? "ui8" : length < UNSIGNED_MAX.uint16 ? "ui16" : "ui32";
  if (!length)
    throw new Error("bitECS - Must define component array length");
  if (!TYPES[type])
    throw new Error(`bitECS - Invalid component array property type ${type}`);
  if (!metadata[$storeSubarrays][type]) {
    const arrayCount = metadata[$storeArrayCounts][type];
    const summedLength = Array(arrayCount).fill(0).reduce((a, p) => a + length, 0);
    const array = new TYPES[type](roundToMultiple4(summedLength * size));
    metadata[$storeSubarrays][type] = array;
    array[$indexType] = TYPES_NAMES[indexType];
    array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
  }
  const start = cursors[type];
  let end = 0;
  for (let eid = 0; eid < size; eid++) {
    const from = cursors[type] + eid * length;
    const to = from + length;
    store[eid] = metadata[$storeSubarrays][type].subarray(from, to);
    store[eid][$subarrayFrom] = from;
    store[eid][$subarrayTo] = to;
    store[eid][$subarray] = true;
    store[eid][$indexType] = TYPES_NAMES[indexType];
    store[eid][$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    end = to;
  }
  cursors[type] = end;
  store[$parentArray] = metadata[$storeSubarrays][type].subarray(start, end);
  return store;
};
var isArrayType = (x) => Array.isArray(x) && typeof x[0] === "string" && typeof x[1] === "number";
var createStore = (schema, size) => {
  const $store = Symbol("store");
  if (!schema || !Object.keys(schema).length) {
    stores[$store] = {
      [$storeSize]: size,
      [$tagStore]: true,
      [$storeBase]: () => stores[$store]
    };
    return stores[$store];
  }
  schema = JSON.parse(JSON.stringify(schema));
  const arrayCounts = {};
  const collectArrayCounts = (s) => {
    const keys = Object.keys(s);
    for (const k of keys) {
      if (isArrayType(s[k])) {
        if (!arrayCounts[s[k][0]])
          arrayCounts[s[k][0]] = 0;
        arrayCounts[s[k][0]]++;
      } else if (s[k] instanceof Object) {
        collectArrayCounts(s[k]);
      }
    }
  };
  collectArrayCounts(schema);
  const metadata = {
    [$storeSize]: size,
    [$storeMaps]: {},
    [$storeSubarrays]: {},
    [$storeRef]: $store,
    [$subarrayCursors]: Object.keys(TYPES).reduce((a, type) => ({ ...a, [type]: 0 }), {}),
    [$storeFlattened]: [],
    [$storeArrayCounts]: arrayCounts
  };
  if (schema instanceof Object && Object.keys(schema).length) {
    const recursiveTransform = (a, k) => {
      if (typeof a[k] === "string") {
        a[k] = createTypeStore(a[k], size);
        a[k][$storeBase] = () => stores[$store];
        metadata[$storeFlattened].push(a[k]);
      } else if (isArrayType(a[k])) {
        const [type, length] = a[k];
        a[k] = createArrayStore(metadata, type, length);
        a[k][$storeBase] = () => stores[$store];
        metadata[$storeFlattened].push(a[k]);
      } else if (a[k] instanceof Object) {
        a[k] = Object.keys(a[k]).reduce(recursiveTransform, a[k]);
      }
      return a;
    };
    stores[$store] = Object.assign(Object.keys(schema).reduce(recursiveTransform, schema), metadata);
    stores[$store][$storeBase] = () => stores[$store];
    return stores[$store];
  }
};
var SparseSet = () => {
  const dense = [];
  const sparse = [];
  dense.sort = function(comparator) {
    const result = Array.prototype.sort.call(this, comparator);
    for (let i = 0; i < dense.length; i++) {
      sparse[dense[i]] = i;
    }
    return result;
  };
  const has = (val) => dense[sparse[val]] === val;
  const add = (val) => {
    if (has(val))
      return;
    sparse[val] = dense.push(val) - 1;
  };
  const remove = (val) => {
    if (!has(val))
      return;
    const index = sparse[val];
    const swapped = dense.pop();
    if (swapped !== val) {
      dense[index] = swapped;
      sparse[swapped] = index;
    }
  };
  return {
    add,
    remove,
    has,
    sparse,
    dense
  };
};
var newEntities = new Map();
var $entityMasks = Symbol("entityMasks");
var $entityComponents = Symbol("entityComponents");
var $entitySparseSet = Symbol("entitySparseSet");
var $entityArray = Symbol("entityArray");
var $entityIndices = Symbol("entityIndices");
var $removedEntities = Symbol("removedEntities");
var defaultSize = 1e5;
var globalEntityCursor = 0;
var globalSize = defaultSize;
var getGlobalSize = () => globalSize;
var removed = [];
var getEntityCursor = () => globalEntityCursor;
var eidToWorld = new Map();
var addEntity = (world2) => {
  if (globalEntityCursor + 1 >= defaultSize) {
    console.error(`bitECS - max entities of ${defaultSize} reached, increase with setDefaultSize function.`);
    return;
  }
  const eid = removed.length > 0 ? removed.shift() : globalEntityCursor++;
  world2[$entitySparseSet].add(eid);
  eidToWorld.set(eid, world2);
  world2[$notQueries].forEach((q) => {
    const match = queryCheckEntity(world2, q, eid);
    if (match)
      queryAddEntity(q, eid);
  });
  world2[$entityComponents].set(eid, new Set());
  return eid;
};
var removeEntity = (world2, eid) => {
  if (!world2[$entitySparseSet].has(eid))
    return;
  world2[$queries].forEach((q) => {
    queryRemoveEntity(world2, q, eid);
  });
  removed.push(eid);
  world2[$entitySparseSet].remove(eid);
  world2[$entityComponents].delete(eid);
  world2[$localEntities].delete(world2[$localEntityLookup].get(eid));
  world2[$localEntityLookup].delete(eid);
  for (let i = 0; i < world2[$entityMasks].length; i++)
    world2[$entityMasks][i][eid] = 0;
};
function Any(...comps) {
  return function QueryAny() {
    return comps;
  };
}
function All(...comps) {
  return function QueryAll() {
    return comps;
  };
}
function None(...comps) {
  return function QueryNone() {
    return comps;
  };
}
var $queries = Symbol("queries");
var $notQueries = Symbol("notQueries");
var $queryAny = Symbol("queryAny");
var $queryAll = Symbol("queryAll");
var $queryNone = Symbol("queryNone");
var $queryMap = Symbol("queryMap");
var $dirtyQueries = Symbol("$dirtyQueries");
var $queryComponents = Symbol("queryComponents");
var $enterQuery = Symbol("enterQuery");
var $exitQuery = Symbol("exitQuery");
var registerQuery = (world2, query) => {
  const components2 = [];
  const notComponents = [];
  const changedComponents = [];
  query[$queryComponents].forEach((c) => {
    if (typeof c === "function") {
      const [comp, mod] = c();
      if (!world2[$componentMap].has(comp))
        registerComponent(world2, comp);
      if (mod === "not") {
        notComponents.push(comp);
      }
      if (mod === "changed") {
        changedComponents.push(comp);
        components2.push(comp);
      }
    } else {
      if (!world2[$componentMap].has(c))
        registerComponent(world2, c);
      components2.push(c);
    }
  });
  const mapComponents = (c) => world2[$componentMap].get(c);
  const allComponents = components2.concat(notComponents).map(mapComponents);
  const sparseSet = SparseSet();
  const archetypes = [];
  const changed = [];
  const toRemove = SparseSet();
  const entered = [];
  const exited = [];
  const generations = allComponents.map((c) => c.generationId).reduce((a, v) => {
    if (a.includes(v))
      return a;
    a.push(v);
    return a;
  }, []);
  const reduceBitflags = (a, c) => {
    if (!a[c.generationId])
      a[c.generationId] = 0;
    a[c.generationId] |= c.bitflag;
    return a;
  };
  const masks = components2.map(mapComponents).reduce(reduceBitflags, {});
  const notMasks = notComponents.map(mapComponents).reduce(reduceBitflags, {});
  const hasMasks = allComponents.reduce(reduceBitflags, {});
  const flatProps = components2.filter((c) => !c[$tagStore]).map((c) => Object.getOwnPropertySymbols(c).includes($storeFlattened) ? c[$storeFlattened] : [c]).reduce((a, v) => a.concat(v), []);
  const shadows = flatProps.map((prop) => {
    const $ = Symbol();
    createShadow(prop, $);
    return prop[$];
  }, []);
  const q = Object.assign(sparseSet, {
    archetypes,
    changed,
    components: components2,
    notComponents,
    changedComponents,
    allComponents,
    masks,
    notMasks,
    hasMasks,
    generations,
    flatProps,
    toRemove,
    entered,
    exited,
    shadows
  });
  world2[$queryMap].set(query, q);
  world2[$queries].add(q);
  allComponents.forEach((c) => {
    c.queries.add(q);
  });
  if (notComponents.length)
    world2[$notQueries].add(q);
  for (let eid = 0; eid < getEntityCursor(); eid++) {
    if (!world2[$entitySparseSet].has(eid))
      continue;
    const match = queryCheckEntity(world2, q, eid);
    if (match)
      queryAddEntity(q, eid);
  }
};
var diff = (q, clearDiff) => {
  if (clearDiff)
    q.changed = [];
  const { flatProps, shadows } = q;
  for (let i = 0; i < q.dense.length; i++) {
    const eid = q.dense[i];
    let dirty = false;
    for (let pid = 0; pid < flatProps.length; pid++) {
      const prop = flatProps[pid];
      const shadow = shadows[pid];
      if (ArrayBuffer.isView(prop[eid])) {
        for (let i2 = 0; i2 < prop[eid].length; i2++) {
          if (prop[eid][i2] !== shadow[eid][i2]) {
            dirty = true;
            shadow[eid][i2] = prop[eid][i2];
            break;
          }
        }
      } else {
        if (prop[eid] !== shadow[eid]) {
          dirty = true;
          shadow[eid] = prop[eid];
        }
      }
    }
    if (dirty)
      q.changed.push(eid);
  }
  return q.changed;
};
var flatten = (a, v) => a.concat(v);
var aggregateComponentsFor = (mod) => (x) => x.filter((f) => f.name === mod().constructor.name).reduce(flatten);
var getAnyComponents = aggregateComponentsFor(Any);
var getAllComponents = aggregateComponentsFor(All);
var getNoneComponents = aggregateComponentsFor(None);
var defineQuery = (...args) => {
  let components2;
  let any, all, none;
  if (Array.isArray(args[0])) {
    components2 = args[0];
  } else {
    any = getAnyComponents(args);
    all = getAllComponents(args);
    none = getNoneComponents(args);
  }
  if (components2 === void 0 || components2[$componentMap] !== void 0) {
    return (world2) => world2 ? world2[$entityArray] : components2[$entityArray];
  }
  const query = function(world2, clearDiff = true) {
    if (!world2[$queryMap].has(query))
      registerQuery(world2, query);
    const q = world2[$queryMap].get(query);
    commitRemovals(world2);
    if (q.changedComponents.length)
      return diff(q, clearDiff);
    return q.dense;
  };
  query[$queryComponents] = components2;
  query[$queryAny] = any;
  query[$queryAll] = all;
  query[$queryNone] = none;
  return query;
};
var queryCheckEntity = (world2, q, eid) => {
  const { masks, notMasks, generations } = q;
  let or = 0;
  for (let i = 0; i < generations.length; i++) {
    const generationId = generations[i];
    const qMask = masks[generationId];
    const qNotMask = notMasks[generationId];
    const eMask = world2[$entityMasks][generationId][eid];
    if (qNotMask && (eMask & qNotMask) !== 0) {
      return false;
    }
    if (qMask && (eMask & qMask) !== qMask) {
      return false;
    }
  }
  return true;
};
var queryAddEntity = (q, eid) => {
  if (q.has(eid))
    return;
  q.add(eid);
  q.entered.push(eid);
};
var queryCommitRemovals = (q) => {
  for (let i = q.toRemove.dense.length - 1; i >= 0; i--) {
    const eid = q.toRemove.dense[i];
    q.toRemove.remove(eid);
    q.remove(eid);
  }
};
var commitRemovals = (world2) => {
  if (!world2[$dirtyQueries].size)
    return;
  world2[$dirtyQueries].forEach(queryCommitRemovals);
  world2[$dirtyQueries].clear();
};
var queryRemoveEntity = (world2, q, eid) => {
  if (!q.has(eid) || q.toRemove.has(eid))
    return;
  q.toRemove.add(eid);
  world2[$dirtyQueries].add(q);
  q.exited.push(eid);
};
var $componentMap = Symbol("componentMap");
var components = [];
var defineComponent = (schema) => {
  const component = createStore(schema, getGlobalSize());
  if (schema && Object.keys(schema).length)
    components.push(component);
  return component;
};
var incrementBitflag = (world2) => {
  world2[$bitflag] *= 2;
  if (world2[$bitflag] >= 2 ** 31) {
    world2[$bitflag] = 1;
    world2[$entityMasks].push(new Uint32Array(world2[$size]));
  }
};
var registerComponent = (world2, component) => {
  if (!component)
    throw new Error(`bitECS - Cannot register null or undefined component`);
  const queries = new Set();
  const notQueries = new Set();
  const changedQueries = new Set();
  world2[$queries].forEach((q) => {
    if (q.allComponents.includes(component)) {
      queries.add(q);
    }
  });
  world2[$componentMap].set(component, {
    generationId: world2[$entityMasks].length - 1,
    bitflag: world2[$bitflag],
    store: component,
    queries,
    notQueries,
    changedQueries
  });
  if (component[$storeSize] < getGlobalSize()) {
    resizeStore(component, getGlobalSize());
  }
  incrementBitflag(world2);
};
var hasComponent = (world2, component, eid) => {
  const registeredComponent = world2[$componentMap].get(component);
  if (!registeredComponent)
    return;
  const { generationId, bitflag } = registeredComponent;
  const mask = world2[$entityMasks][generationId][eid];
  return (mask & bitflag) === bitflag;
};
var addComponent = (world2, component, eid, reset = true) => {
  if (eid === void 0)
    throw new Error("bitECS - entity is undefined.");
  if (!world2[$entitySparseSet].has(eid))
    throw new Error("bitECS - entity does not exist in the world.");
  if (!world2[$componentMap].has(component))
    registerComponent(world2, component);
  if (hasComponent(world2, component, eid))
    return;
  const c = world2[$componentMap].get(component);
  const { generationId, bitflag, queries, notQueries } = c;
  world2[$entityMasks][generationId][eid] |= bitflag;
  queries.forEach((q) => {
    if (q.toRemove.has(eid))
      q.toRemove.remove(eid);
    const match = queryCheckEntity(world2, q, eid);
    if (match)
      queryAddEntity(q, eid);
    if (!match)
      queryRemoveEntity(world2, q, eid);
  });
  world2[$entityComponents].get(eid).add(component);
  if (reset)
    resetStoreFor(component, eid);
};
var removeComponent = (world2, component, eid, reset = false) => {
  const c = world2[$componentMap].get(component);
  const { generationId, bitflag, queries, notQueries } = c;
  if (!(world2[$entityMasks][generationId][eid] & bitflag))
    return;
  world2[$entityMasks][generationId][eid] &= ~bitflag;
  queries.forEach((q) => {
    if (q.toRemove.has(eid))
      q.toRemove.remove(eid);
    const match = queryCheckEntity(world2, q, eid);
    if (match)
      queryAddEntity(q, eid);
    if (!match)
      queryRemoveEntity(world2, q, eid);
  });
  world2[$entityComponents].get(eid).delete(component);
  if (reset)
    resetStoreFor(component, eid);
};
var $size = Symbol("size");
var $resizeThreshold = Symbol("resizeThreshold");
var $bitflag = Symbol("bitflag");
var $archetypes = Symbol("archetypes");
var $localEntities = Symbol("localEntities");
var $localEntityLookup = Symbol("localEntityLookp");
var worlds = [];
var createWorld = (obj = {}) => {
  const world2 = obj;
  resetWorld(world2);
  worlds.push(world2);
  return world2;
};
var resetWorld = (world2) => {
  const size = getGlobalSize();
  world2[$size] = size;
  if (world2[$entityArray])
    world2[$entityArray].forEach((eid) => removeEntity(world2, eid));
  world2[$entityMasks] = [new Uint32Array(size)];
  world2[$entityComponents] = new Map();
  world2[$archetypes] = [];
  world2[$entitySparseSet] = SparseSet();
  world2[$entityArray] = world2[$entitySparseSet].dense;
  world2[$bitflag] = 1;
  world2[$componentMap] = new Map();
  world2[$queryMap] = new Map();
  world2[$queries] = new Set();
  world2[$notQueries] = new Set();
  world2[$dirtyQueries] = new Set();
  world2[$localEntities] = new Map();
  world2[$localEntityLookup] = new Map();
  return world2;
};
var Types = TYPES_ENUM;

// src/components/transform/Transform2DComponent.ts
var TRANSFORM = {
  IS_ROOT: 0,
  X: 1,
  Y: 2,
  ROTATION: 3,
  SCALE_X: 4,
  SCALE_Y: 5,
  SKEW_X: 6,
  SKEW_Y: 7,
  AXIS_ALIGNED: 8,
  FRAME_X1: 9,
  FRAME_Y1: 10,
  FRAME_X2: 11,
  FRAME_Y2: 12,
  LOCAL_A: 13,
  LOCAL_B: 14,
  LOCAL_C: 15,
  LOCAL_D: 16,
  LOCAL_TX: 17,
  LOCAL_TY: 18,
  BOUNDS_X1: 19,
  BOUNDS_Y1: 20,
  BOUNDS_X2: 21,
  BOUNDS_Y2: 22,
  ORIGIN_X: 23,
  ORIGIN_Y: 24,
  WORLD_A: 25,
  WORLD_B: 26,
  WORLD_C: 27,
  WORLD_D: 28,
  WORLD_TX: 29,
  WORLD_TY: 30,
  FRAME_WIDTH: 31,
  FRAME_HEIGHT: 32,
  IN_VIEW: 33,
  UPDATED: 34
};
var Transform2DComponent = defineComponent({
  data: [Types.f32, 35]
});

// src/GameObjectWorld.ts
var world = createWorld();
var GameObjectWorld = world;

// src/components/transform/AddTransform2DComponent.ts
function AddTransform2DComponent(id) {
  addComponent(GameObjectWorld, Transform2DComponent, id);
  const data = Transform2DComponent.data[id];
  data[TRANSFORM.SCALE_X] = 1;
  data[TRANSFORM.SCALE_Y] = 1;
  data[TRANSFORM.AXIS_ALIGNED] = 1;
}

// src/utils/NOOP.ts
function NOOP() {
}

// src/math/mat4/Matrix4.ts
var Matrix4 = class {
  data;
  onChange;
  constructor(src) {
    const data = new Float32Array(16);
    this.data = data;
    this.onChange = NOOP;
    if (src) {
      if (Array.isArray(src)) {
        this.fromArray(src);
      } else {
        this.fromArray(src.data);
      }
    } else {
      data[0] = 1;
      data[5] = 1;
      data[10] = 1;
      data[15] = 1;
    }
  }
  set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    this.data.set([
      m00,
      m01,
      m02,
      m03,
      m10,
      m11,
      m12,
      m13,
      m20,
      m21,
      m22,
      m23,
      m30,
      m31,
      m32,
      m33
    ]);
    this.onChange(this);
    return this;
  }
  toArray(dst = [], index = 0) {
    const data = this.data;
    for (let i = 0; i < 16; i++) {
      dst[index + i] = data[i];
    }
    return dst;
  }
  fromArray(src, index = 0) {
    const data = this.data;
    for (let i = 0; i < 16; i++) {
      data[i] = src[index + i];
    }
    this.onChange(this);
    return this;
  }
  toString() {
    return "[ mat4=" + this.data.join(", ") + " ]";
  }
  destroy() {
    this.onChange = NOOP;
    this.data = null;
  }
};

// src/components/transform/SetBounds.ts
function SetBounds(id, x, y, right, bottom) {
  const data = Transform2DComponent.data[id];
  data[TRANSFORM.BOUNDS_X1] = x;
  data[TRANSFORM.BOUNDS_Y1] = y;
  data[TRANSFORM.BOUNDS_X2] = right;
  data[TRANSFORM.BOUNDS_Y2] = bottom;
}

// src/components/dirty/DirtyComponent.ts
var DIRTY = {
  TRANSFORM: 0,
  CHILD_TRANSFORM: 1,
  COLOR: 2,
  CHILD_COLOR: 3,
  CHILD_CACHE: 4,
  WORLD_TRANSFORM: 5,
  DISPLAY_LIST: 6,
  SELF: 7
};
var DirtyComponent = defineComponent({
  data: [Types.ui8, 8]
});

// src/GameInstance.ts
var instance2;
var frame = 0;
var elapsed = 0;
var GameInstance = {
  get: () => {
    return instance2;
  },
  set: (game) => {
    instance2 = game;
  },
  getFrame: () => {
    return frame;
  },
  setFrame: (current) => {
    frame = current;
  },
  getElapsed: () => {
    return elapsed;
  },
  setElapsed: (current) => {
    elapsed = current;
  }
};

// src/components/hierarchy/HierarchyComponent.ts
var HIERARCHY = {
  WORLD: 0,
  PARENT: 1,
  NEXT: 2,
  PREV: 3,
  FIRST: 4,
  LAST: 5,
  NUM_CHILDREN: 6,
  DEPTH: 7
};
var HierarchyComponent = defineComponent({
  data: [Types.ui32, 8]
});

// src/components/hierarchy/GetParentID.ts
function GetParentID(id) {
  return HierarchyComponent.data[id][HIERARCHY.PARENT];
}

// src/components/dirty/SetDirtyChildCache.ts
function SetDirtyChildCache(id) {
  DirtyComponent.data[id][DIRTY.CHILD_CACHE] = 1;
}

// src/components/dirty/SetDirtyChildTransform.ts
function SetDirtyChildTransform(id) {
  DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM] = 1;
}

// src/components/permissions/PermissionsComponent.ts
var PERMISSION = {
  VISIBLE: 0,
  VISIBLE_CHILDREN: 1,
  WILL_UPDATE: 2,
  WILL_UPDATE_CHILDREN: 3,
  WILL_RENDER: 4,
  WILL_RENDER_CHILDREN: 5,
  WILL_CACHE_CHILDREN: 6,
  WILL_TRANSFORM_CHILDREN: 7,
  WILL_COLOR_CHILDREN: 8,
  CUSTOM_DISPLAY_LIST: 9
};
var PermissionsComponent = defineComponent({
  data: [Types.ui8, 10]
});

// src/components/permissions/WillCacheChildren.ts
function WillCacheChildren(id) {
  return !!PermissionsComponent.data[id][PERMISSION.WILL_CACHE_CHILDREN];
}

// src/components/dirty/SetDirtyParents.ts
var prevParentID;
var prevFrame;
function SetDirtyParents(childID) {
  let id = GetParentID(childID);
  const frame2 = GameInstance.getFrame();
  if (id === prevParentID && frame2 === prevFrame) {
    return;
  }
  prevParentID = id;
  prevFrame = frame2;
  while (id) {
    SetDirtyChildTransform(id);
    if (WillCacheChildren(id)) {
      SetDirtyChildCache(id);
    }
    id = GetParentID(id);
  }
}

// src/components/dirty/SetDirtyTransform.ts
function SetDirtyTransform(id) {
  DirtyComponent.data[id][DIRTY.TRANSFORM] = 1;
  SetDirtyParents(id);
}

// src/components/transform/UpdateExtent.ts
function UpdateExtent(id, width, height) {
  const data = Transform2DComponent.data[id];
  const x = -data[TRANSFORM.ORIGIN_X] * width;
  const y = -data[TRANSFORM.ORIGIN_Y] * height;
  data[TRANSFORM.FRAME_X1] = x;
  data[TRANSFORM.FRAME_Y1] = y;
  data[TRANSFORM.FRAME_X2] = x + width;
  data[TRANSFORM.FRAME_Y2] = y + height;
  data[TRANSFORM.FRAME_WIDTH] = width;
  data[TRANSFORM.FRAME_HEIGHT] = height;
  SetDirtyTransform(id);
}

// src/components/transform/Size.ts
var Size = class {
  id;
  _data;
  constructor(id, width = 0, height = 0) {
    this.id = id;
    this._data = Transform2DComponent.data[id];
    this.set(width, height);
  }
  set(width, height = width) {
    this.width = width;
    this.height = height;
    return this;
  }
  set width(value) {
    UpdateExtent(this.id, value, this.height);
  }
  get width() {
    return this._data[TRANSFORM.FRAME_WIDTH];
  }
  set height(value) {
    UpdateExtent(this.id, this.width, value);
  }
  get height() {
    return this._data[TRANSFORM.FRAME_HEIGHT];
  }
  set x(value) {
    this.width = value;
  }
  get x() {
    return this.width;
  }
  set y(value) {
    this.height = value;
  }
  get y() {
    return this.height;
  }
  destroy() {
    this._data = null;
  }
};

// src/camera/BaseCamera.ts
var BaseCamera = class {
  id = addEntity(GameObjectWorld);
  type = "BaseCamera";
  name = "";
  size;
  matrix;
  isDirty;
  _data;
  constructor(width, height) {
    const id = this.id;
    AddTransform2DComponent(id);
    this.matrix = new Matrix4();
    this.size = new Size(id, width, height);
    this._data = Transform2DComponent.data[id];
    this.reset(width, height);
  }
  preRender() {
    return this.isDirty;
  }
  postRender() {
    this.isDirty = false;
  }
  getBoundsX() {
    return this._data[TRANSFORM.BOUNDS_X1];
  }
  getBoundsY() {
    return this._data[TRANSFORM.BOUNDS_Y1];
  }
  getBoundsRight() {
    return this._data[TRANSFORM.BOUNDS_X2];
  }
  getBoundsBottom() {
    return this._data[TRANSFORM.BOUNDS_Y2];
  }
  getMatrix() {
    return this.matrix.data;
  }
  reset(width, height) {
    this.size.set(width, height);
    this.isDirty = true;
    SetBounds(this.id, 0, 0, width, height);
  }
  destroy() {
    const id = this.id;
    removeComponent(GameObjectWorld, Transform2DComponent, id);
    removeEntity(GameObjectWorld, id);
  }
};

// src/components/dirty/ClearDirtyTransform.ts
function ClearDirtyTransform(id) {
  DirtyComponent.data[id][DIRTY.TRANSFORM] = 0;
}

// src/components/dirty/HasDirtyTransform.ts
function HasDirtyTransform(id) {
  return !!DirtyComponent.data[id][DIRTY.TRANSFORM];
}

// src/camera/StaticCamera.ts
var StaticCamera = class extends BaseCamera {
  type = "StaticCamera";
  constructor(width, height) {
    super(width, height);
  }
  preRender() {
    const id = this.id;
    if (HasDirtyTransform(id)) {
      this.isDirty = true;
      ClearDirtyTransform(id);
      return true;
    }
    return false;
  }
};

// src/components/transform/Position.ts
var Position = class {
  id;
  _x;
  _y;
  _data;
  constructor(id, x = 0, y = 0) {
    this.id = id;
    this._data = Transform2DComponent.data[id];
    this.set(x, y);
  }
  set(x, y = x) {
    this.x = x;
    this.y = y;
    return this;
  }
  set x(value) {
    this._x = value;
    this._data[TRANSFORM.X] = value;
    SetDirtyTransform(this.id);
  }
  get x() {
    return this._x;
  }
  set y(value) {
    this._y = value;
    this._data[TRANSFORM.Y] = value;
    SetDirtyTransform(this.id);
  }
  get y() {
    return this._y;
  }
  destroy() {
    this._data = null;
  }
};

// src/camera/WorldCamera.ts
var WorldCamera = class extends BaseCamera {
  type = "WorldCamera";
  position;
  constructor(width, height) {
    super(width, height);
    this.position = new Position(this.id, 0, 0);
  }
  set x(value) {
    this.position.x = value;
  }
  get x() {
    return this.position.x;
  }
  set y(value) {
    this.position.y = value;
  }
  get y() {
    return this.position.y;
  }
  setPosition(x, y) {
    this.position.set(x, y);
    return this;
  }
  preRender() {
    const id = this.id;
    if (HasDirtyTransform(id)) {
      const x = this.x;
      const y = this.y;
      const w = this.size.width;
      const h = this.size.height;
      const ox = -x + w / 2;
      const oy = -y + h / 2;
      const bx = ox - w / 2;
      const by = oy - h / 2;
      SetBounds(id, bx, by, bx + w, by + h);
      const data = this.matrix.data;
      data[12] = this.x;
      data[13] = this.y;
      ClearDirtyTransform(id);
      this.isDirty = true;
      return true;
    }
    return false;
  }
};

// src/color/index.ts
var color_exports = {};
__export(color_exports, {
  CloneColor: () => CloneColor,
  Color: () => Color,
  FromHSV: () => FromHSV,
  GetColorFromRGB: () => GetColorFromRGB,
  GetColorSpectrum: () => GetColorSpectrum,
  RGBAToFloat: () => RGBAToFloat,
  RGBToFloat: () => RGBToFloat,
  SetGray: () => SetGray,
  SetHSV: () => SetHSV
});

// src/color/Color.ts
var Color = class {
  rgba;
  constructor(red = 0, green = 0, blue = 0, alpha = 255) {
    this.rgba = new Uint8ClampedArray([red, green, blue, alpha]);
  }
  set(red, green, blue, alpha = this.alpha) {
    this.rgba.set([red, green, blue, alpha]);
    return this;
  }
  setColor(color) {
    const rgba = this.rgba;
    const alpha = color > 16777215 ? color >>> 24 : 255;
    rgba.set([
      color >> 16 & 255,
      color >> 8 & 255,
      color & 255,
      alpha
    ]);
    return this;
  }
  getColor(includeAlpha = false) {
    const [r, g, b, a] = this.rgba;
    if (includeAlpha) {
      return a << 24 | r << 16 | g << 8 | b;
    } else {
      return r << 16 | g << 8 | b;
    }
  }
  get red() {
    return this.rgba[0];
  }
  set red(value) {
    this.rgba[0] = value;
  }
  get green() {
    return this.rgba[1];
  }
  set green(value) {
    this.rgba[1] = value;
  }
  get blue() {
    return this.rgba[2];
  }
  set blue(value) {
    this.rgba[2] = value;
  }
  get alpha() {
    return this.rgba[3];
  }
  set alpha(value) {
    this.rgba[3] = value;
  }
  get r() {
    return this.rgba[0] / 255;
  }
  get g() {
    return this.rgba[1] / 255;
  }
  get b() {
    return this.rgba[2] / 255;
  }
  get a() {
    return this.rgba[3] / 255;
  }
};

// src/color/CloneColor.ts
function CloneColor(color) {
  return new Color(color.red, color.green, color.blue, color.alpha);
}

// src/color/SetHSV.ts
function ConvertValue(n, h, s, v) {
  const k = (n + h * 6) % 6;
  const min = Math.min(k, 4 - k, 1);
  return Math.round(255 * (v - v * s * Math.max(0, min)));
}
function SetHSV(color, h, s = 1, v = 1) {
  const r = ConvertValue(5, h, s, v);
  const g = ConvertValue(3, h, s, v);
  const b = ConvertValue(1, h, s, v);
  return color.set(r, g, b);
}

// src/color/FromHSV.ts
function FromHSV(h, s = 1, v = 1) {
  return SetHSV(new Color(), h, s, v);
}

// src/color/GetColorFromRGB.ts
function GetColorFromRGB(red, green, blue) {
  return red << 16 | green << 8 | blue;
}

// src/color/GetColorSpectrum.ts
function GetColorSpectrum(limit = 1024) {
  const colors = [];
  const range = 255;
  let i;
  let r = 255;
  let g = 0;
  let b = 0;
  for (i = 0; i <= range; i++) {
    colors.push(new Color(r, i, b));
  }
  g = 255;
  for (i = range; i >= 0; i--) {
    colors.push(new Color(i, g, b));
  }
  r = 0;
  for (i = 0; i <= range; i++, g--) {
    colors.push(new Color(r, g, i));
  }
  g = 0;
  b = 255;
  for (i = 0; i <= range; i++, b--, r++) {
    colors.push(new Color(r, g, b));
  }
  if (limit === 1024) {
    return colors;
  } else {
    const out = [];
    let t = 0;
    const inc = 1024 / limit;
    for (i = 0; i < limit; i++) {
      out.push(colors[Math.floor(t)]);
      t += inc;
    }
    return out;
  }
}

// src/color/RGBAToFloat.ts
function RGBAToFloat(red, green, blue, alpha) {
  return alpha << 24 | red << 16 | green << 8 | blue;
}

// src/color/RGBToFloat.ts
function RGBToFloat(red, green, blue) {
  return red << 16 | green << 8 | blue;
}

// src/color/SetGray.ts
function SetGray(color, amount) {
  return color.set(amount, amount, amount);
}

// src/config/index.ts
var config_exports = {};
__export(config_exports, {
  BackgroundColor: () => BackgroundColor,
  Banner: () => Banner,
  BatchSize: () => BatchSize,
  Canvas: () => Canvas,
  CanvasContext: () => CanvasContext,
  DefaultOrigin: () => DefaultOrigin,
  GlobalVar: () => GlobalVar,
  MaxTextures: () => MaxTextures,
  Parent: () => Parent,
  Scenes: () => Scenes,
  Size: () => Size2,
  WebGL: () => WebGL,
  WebGLContext: () => WebGLContext
});

// src/config/const.ts
var CONFIG_DEFAULTS = {
  AUTO: "Auto",
  BACKGROUND_COLOR: "BackgroundColor",
  BANNER: "Banner",
  BATCH_SIZE: "BatchSize",
  CANVAS_CONTEXT: "CanvasContext",
  CANVAS: "Canvas",
  DEFAULT_ORIGIN: "DefaultOrigin",
  GLOBAL_VAR: "GlobalVar",
  MAX_TEXTURES: "MaxTextures",
  PARENT: "Parent",
  RENDERER: "Renderer",
  SCENES: "Scenes",
  SIZE: "Size",
  WEBGL_CONTEXT: "WebGLContext",
  WEBGL: "WebGL",
  WORLD_SIZE: "WorldSize",
  WORLD_WIDTH: "WorldWidth",
  WORLD_HEIGHT: "WorldHeight"
};

// src/config/ConfigStore.ts
var ConfigStore = new Map();

// src/config/backgroundcolor/SetBackgroundColor.ts
function SetBackgroundColor(color) {
  ConfigStore.set(CONFIG_DEFAULTS.BACKGROUND_COLOR, color);
}

// src/config/backgroundcolor/BackgroundColor.ts
function BackgroundColor(color) {
  return () => {
    SetBackgroundColor(color);
  };
}

// src/config/banner/SetBanner.ts
function SetBanner(title = "", version = "", url = "", color = "#fff", background = "linear-gradient(#3e0081 40%, #00bcc3)") {
  ConfigStore.set(CONFIG_DEFAULTS.BANNER, { title, version, url, color, background });
}

// src/config/banner/Banner.ts
function Banner(title, version, url, color, background) {
  return () => {
    SetBanner(title, version, url, color, background);
  };
}

// src/config/batchsize/SetBatchSize.ts
function SetBatchSize(size) {
  ConfigStore.set(CONFIG_DEFAULTS.BATCH_SIZE, size);
}

// src/config/batchsize/BatchSize.ts
function BatchSize(size) {
  return () => {
    SetBatchSize(size);
  };
}

// src/config/backgroundcolor/GetBackgroundColor.ts
function GetBackgroundColor() {
  return ConfigStore.get(CONFIG_DEFAULTS.BACKGROUND_COLOR);
}

// src/config/canvascontext/GetCanvasContext.ts
function GetCanvasContext() {
  return ConfigStore.get(CONFIG_DEFAULTS.CANVAS_CONTEXT);
}

// src/config/size/GetHeight.ts
function GetHeight() {
  return ConfigStore.get(CONFIG_DEFAULTS.SIZE).height;
}

// src/config/size/GetResolution.ts
function GetResolution() {
  return ConfigStore.get(CONFIG_DEFAULTS.SIZE).resolution;
}

// src/config/size/GetWidth.ts
function GetWidth() {
  return ConfigStore.get(CONFIG_DEFAULTS.SIZE).width;
}

// src/renderer/canvas/CanvasRenderer.ts
var CanvasRenderer = class {
  canvas;
  ctx;
  clearColor;
  width;
  height;
  resolution;
  textureIndex;
  flushTotal;
  clearBeforeRender = true;
  optimizeRedraw = true;
  autoResize = true;
  constructor() {
    this.width = GetWidth();
    this.height = GetHeight();
    this.resolution = GetResolution();
    this.setBackgroundColor(GetBackgroundColor());
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    this.initContext();
  }
  initContext() {
    const ctx = this.canvas.getContext("2d", GetCanvasContext());
    this.ctx = ctx;
    this.resize(this.width, this.height, this.resolution);
  }
  resize(width, height, resolution = 1) {
    this.width = width * resolution;
    this.height = height * resolution;
    this.resolution = resolution;
    const canvas = this.canvas;
    canvas.width = this.width;
    canvas.height = this.height;
    if (this.autoResize) {
      canvas.style.width = (this.width / resolution).toString() + "px";
      canvas.style.height = (this.height / resolution).toString() + "px";
    }
  }
  setBackgroundColor(color) {
    const r = color >> 16 & 255;
    const g = color >> 8 & 255;
    const b = color & 255;
    const a = color > 16777215 ? color >>> 24 : 255;
    this.clearColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    return this;
  }
  reset() {
    const ctx = this.ctx;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  begin(willRedraw) {
  }
  end() {
  }
  render() {
  }
  destroy() {
  }
};

// src/config/renderer/SetRenderer.ts
function SetRenderer(renderer) {
  ConfigStore.set(CONFIG_DEFAULTS.RENDERER, renderer);
}

// src/config/canvas/Canvas.ts
function Canvas() {
  return () => {
    SetRenderer(CanvasRenderer);
  };
}

// src/config/canvascontext/SetCanvasContext.ts
function SetCanvasContext(contextAttributes) {
  ConfigStore.set(CONFIG_DEFAULTS.CANVAS_CONTEXT, contextAttributes);
}

// src/config/canvascontext/CanvasContext.ts
function CanvasContext(contextAttributes) {
  return () => {
    SetCanvasContext(contextAttributes);
  };
}

// src/config/defaultorigin/SetDefaultOrigin.ts
function SetDefaultOrigin(x = 0.5, y = x) {
  ConfigStore.set(CONFIG_DEFAULTS.DEFAULT_ORIGIN, { x, y });
}

// src/config/defaultorigin/DefaultOrigin.ts
function DefaultOrigin(x = 0.5, y = x) {
  return () => {
    SetDefaultOrigin(x, y);
  };
}

// src/config/globalvar/SetGlobalVar.ts
function SetGlobalVar(name) {
  ConfigStore.set(CONFIG_DEFAULTS.GLOBAL_VAR, name);
}

// src/config/globalvar/GlobalVar.ts
function GlobalVar(name) {
  return () => {
    SetGlobalVar(name);
  };
}

// src/config/maxtextures/SetMaxTextures.ts
function SetMaxTextures(max) {
  ConfigStore.set(CONFIG_DEFAULTS.MAX_TEXTURES, max);
}

// src/config/maxtextures/MaxTextures.ts
function MaxTextures(max = 0) {
  return () => {
    SetMaxTextures(max);
  };
}

// src/dom/GetElement.ts
function GetElement(target) {
  let element;
  if (target) {
    if (typeof target === "string") {
      element = document.getElementById(target);
    } else if (typeof target === "object" && target.nodeType === 1) {
      element = target;
    }
  }
  if (!element) {
    element = document.body;
  }
  return element;
}

// src/config/parent/SetParent.ts
function SetParent(parentElement) {
  if (parentElement) {
    ConfigStore.set(CONFIG_DEFAULTS.PARENT, GetElement(parentElement));
  }
}

// src/config/parent/Parent.ts
function Parent(parentElement) {
  return () => {
    SetParent(parentElement);
  };
}

// src/config/scenes/SetScenes.ts
function SetScenes(scenes) {
  ConfigStore.set(CONFIG_DEFAULTS.SCENES, [].concat(scenes));
}

// src/config/scenes/Scenes.ts
function Scenes(scenes) {
  return () => {
    SetScenes(scenes);
  };
}

// src/config/size/SetSize.ts
function SetSize(width = 800, height = 600, resolution = 1) {
  if (resolution === 0) {
    resolution = window.devicePixelRatio;
  }
  ConfigStore.set(CONFIG_DEFAULTS.SIZE, { width, height, resolution });
}

// src/config/size/Size.ts
function Size2(width = 800, height = 600, resolution = 1) {
  return () => {
    SetSize(width, height, resolution);
  };
}

// src/renderer/webgl1/renderpass/ShaderStack.ts
var ShaderStack = {
  renderPass: null,
  stack: [],
  active: null,
  default: null,
  index: 0,
  init: (renderPass) => {
    ShaderStack.renderPass = renderPass;
  }
};

// src/renderer/webgl1/renderpass/CurrentShader.ts
function CurrentShader() {
  return ShaderStack.stack[ShaderStack.index];
}

// src/renderer/webgl1/renderpass/VertexBufferStack.ts
var VertexBufferStack = {
  renderPass: null,
  stack: [],
  active: null,
  default: null,
  index: 0,
  init: (renderPass) => {
    VertexBufferStack.renderPass = renderPass;
  }
};

// src/renderer/webgl1/renderpass/CurrentVertexBuffer.ts
function CurrentVertexBuffer() {
  return VertexBufferStack.stack[VertexBufferStack.index];
}

// src/renderer/webgl1/renderpass/FramebufferStack.ts
var FramebufferStack = {
  renderPass: null,
  stack: [],
  active: null,
  default: null,
  index: 0,
  init: (renderPass) => {
    FramebufferStack.renderPass = renderPass;
  }
};

// src/renderer/webgl1/renderpass/CurrentFramebuffer.ts
function CurrentFramebuffer() {
  return FramebufferStack.stack[FramebufferStack.index];
}

// src/geom/rectangle/RectangleContains.ts
function RectangleContains(rect, x, y) {
  if (rect.width <= 0 || rect.height <= 0) {
    return false;
  }
  return rect.x <= x && rect.x + rect.width >= x && rect.y <= y && rect.y + rect.height >= y;
}

// src/geom/rectangle/Rectangle.ts
var Rectangle = class {
  x;
  y;
  width;
  height;
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.set(x, y, width, height);
  }
  set(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }
  contains(x, y) {
    return RectangleContains(this, x, y);
  }
  set right(value) {
    if (value <= this.x) {
      this.width = 0;
    } else {
      this.width = value - this.x;
    }
  }
  get right() {
    return this.x + this.width;
  }
  set bottom(value) {
    if (value <= this.y) {
      this.height = 0;
    } else {
      this.height = value - this.y;
    }
  }
  get bottom() {
    return this.y + this.height;
  }
};

// src/renderer/webgl1/renderpass/ViewportStack.ts
var ViewportStack = {
  renderPass: null,
  stack: [],
  active: null,
  default: null,
  index: 0,
  init: (renderPass) => {
    ViewportStack.renderPass = renderPass;
  }
};

// src/renderer/webgl1/renderpass/AddViewport.ts
function AddViewport(x = 0, y = 0, width = 0, height = 0) {
  const entry = new Rectangle(x, y, width, height);
  ViewportStack.index++;
  if (ViewportStack.index === ViewportStack.stack.length) {
    ViewportStack.stack.push(entry);
  } else {
    ViewportStack.stack[ViewportStack.index] = entry;
  }
  return entry;
}

// src/renderer/webgl1/renderpass/CurrentViewport.ts
function CurrentViewport() {
  return ViewportStack.stack[ViewportStack.index];
}

// src/geom/rectangle/RectangleEquals.ts
function RectangleEquals(rect, toCompare) {
  return rect.x === toCompare.x && rect.y === toCompare.y && rect.width === toCompare.width && rect.height === toCompare.height;
}

// src/renderer/webgl1/GL.ts
var gl;
var GL = {
  get: () => {
    return gl;
  },
  set: (context) => {
    gl = context;
  }
};

// src/renderer/webgl1/renderpass/BindViewport.ts
function BindViewport(viewport) {
  if (!viewport) {
    viewport = CurrentViewport();
  }
  if (!ViewportStack.active || !RectangleEquals(ViewportStack.active, viewport)) {
    gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
    ViewportStack.active = viewport;
  }
}

// src/renderer/webgl1/renderpass/SetViewport.ts
function SetViewport(x = 0, y = 0, width = 0, height = 0) {
  const entry = AddViewport(x, y, width, height);
  BindViewport(entry);
}

// src/renderer/webgl1/renderpass/BindFramebuffer.ts
function BindFramebuffer(clear = true, entry) {
  if (!entry) {
    entry = CurrentFramebuffer();
  }
  const { framebuffer, viewport } = entry;
  if (FramebufferStack.active !== framebuffer) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  }
  if (clear) {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
  if (viewport) {
    SetViewport(viewport.x, viewport.y, viewport.width, viewport.height);
  }
  FramebufferStack.active = framebuffer;
}

// src/renderer/webgl1/renderpass/PopViewport.ts
function PopViewport() {
  ViewportStack.index--;
  BindViewport();
}

// src/renderer/webgl1/renderpass/PopFramebuffer.ts
function PopFramebuffer() {
  if (CurrentFramebuffer().viewport) {
    PopViewport();
  }
  FramebufferStack.index--;
  BindFramebuffer(false);
}

// src/renderer/webgl1/renderpass/BlendModeStack.ts
var BlendModeStack = {
  renderPass: null,
  stack: [],
  default: null,
  index: 0,
  init: (renderPass) => {
    BlendModeStack.renderPass = renderPass;
  }
};

// src/renderer/webgl1/renderpass/ColorMatrixStack.ts
var ColorMatrixStack = {
  renderPass: null,
  stack: [],
  default: null,
  index: 0,
  init: (renderPass) => {
    ColorMatrixStack.renderPass = renderPass;
  }
};

// src/renderer/webgl1/renderpass/AddColorMatrix.ts
function AddColorMatrix(colorMatrix, colorOffset) {
  const entry = { colorMatrix, colorOffset };
  ColorMatrixStack.index++;
  if (ColorMatrixStack.index === ColorMatrixStack.stack.length) {
    ColorMatrixStack.stack.push(entry);
  } else {
    ColorMatrixStack.stack[ColorMatrixStack.index] = entry;
  }
  return entry;
}

// src/renderer/webgl1/renderpass/AddFramebuffer.ts
function AddFramebuffer(framebuffer, viewport) {
  const entry = { framebuffer, viewport };
  FramebufferStack.index++;
  if (FramebufferStack.index === FramebufferStack.stack.length) {
    FramebufferStack.stack.push(entry);
  } else {
    FramebufferStack.stack[FramebufferStack.index] = entry;
  }
  return entry;
}

// src/renderer/webgl1/renderpass/AddShader.ts
function AddShader(shader, textureID) {
  const entry = { shader, textureID };
  ShaderStack.index++;
  if (ShaderStack.index === ShaderStack.stack.length) {
    ShaderStack.stack.push(entry);
  } else {
    ShaderStack.stack[ShaderStack.index] = entry;
  }
  return entry;
}

// src/renderer/webgl1/shaders/SetAttributes.ts
function SetAttributes(shader, renderPass) {
  if (shader.program) {
    const stride = CurrentVertexBuffer().vertexByteSize;
    shader.attributes.forEach((attrib) => {
      gl.vertexAttribPointer(attrib.index, attrib.size, attrib.type, attrib.normalized, stride, attrib.offset);
    });
  }
}

// src/renderer/webgl1/renderpass/BindShaderEntry.ts
function BindShaderEntry(entry) {
  if (!entry) {
    entry = CurrentShader();
  }
  if (!entry.shader.isActive) {
    const success = entry.shader.bind(ShaderStack.renderPass, entry.textureID);
    if (success) {
      SetAttributes(entry.shader, ShaderStack.renderPass);
      if (ShaderStack.active && ShaderStack.active !== entry.shader) {
        ShaderStack.active.isActive = false;
      }
      ShaderStack.active = entry.shader;
    }
  }
}

// src/renderer/webgl1/renderpass/BindDefaultShader.ts
function BindDefaultShader() {
  ShaderStack.index = 0;
  BindShaderEntry(ShaderStack.default);
}

// src/renderer/webgl1/renderpass/SetCamera.ts
function SetCamera(renderPass, camera) {
  if (renderPass.current2DCamera !== camera) {
    Flush(renderPass);
    renderPass.current2DCamera = camera;
    renderPass.cameraMatrix = camera.getMatrix();
  }
  if (camera.isDirty) {
    CurrentShader().shader.bind(renderPass);
  }
}

// src/renderer/webgl1/renderpass/Begin.ts
function Begin(renderPass, camera) {
  BindDefaultShader();
  SetCamera(renderPass, camera);
}

// src/renderer/webgl1/renderpass/CurrentBlendMode.ts
function CurrentBlendMode() {
  return BlendModeStack.stack[BlendModeStack.index];
}

// src/renderer/webgl1/renderpass/BindBlendMode.ts
function BindBlendMode(entry) {
  if (!entry) {
    entry = CurrentBlendMode();
  }
  if (entry.enable) {
    if (!gl.isEnabled(gl.BLEND)) {
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(entry.srcRGB, entry.dstRGB, entry.srcAlpha, entry.dstAlpha);
    }
  } else {
    gl.disable(gl.BLEND);
  }
}

// src/renderer/webgl1/renderpass/CurrentColorMatrix.ts
function CurrentColorMatrix() {
  return ColorMatrixStack.stack[ColorMatrixStack.index];
}

// src/renderer/webgl1/shaders/SetUniform.ts
function SetUniform(shader, key, value) {
  const uniforms = shader.uniforms;
  if (uniforms.has(key)) {
    uniforms.set(key, value);
    if (shader.isActive) {
      const setter = shader.uniformSetters.get(key);
      setter(value);
    }
  }
}

// src/renderer/webgl1/renderpass/BindColorMatrix.ts
function BindColorMatrix(entry) {
  if (!entry) {
    entry = CurrentColorMatrix();
  }
  const shader = CurrentShader().shader;
  Flush(ColorMatrixStack.renderPass);
  SetUniform(shader, "uColorMatrix", entry.colorMatrix);
  SetUniform(shader, "uColorOffset", entry.colorOffset);
}

// src/renderer/webgl1/renderpass/BindDefaultBlendMode.ts
function BindDefaultBlendMode() {
  BlendModeStack.index = 0;
  BindBlendMode(BlendModeStack.default);
}

// src/renderer/webgl1/renderpass/BindDefaultColorMatrix.ts
function BindDefaultColorMatrix() {
  ColorMatrixStack.index = 0;
  BindColorMatrix(ColorMatrixStack.default);
}

// src/renderer/webgl1/renderpass/BindDefaultFramebuffer.ts
function BindDefaultFramebuffer() {
  FramebufferStack.index = 0;
  BindFramebuffer(false, FramebufferStack.default);
}

// src/renderer/webgl1/renderpass/BindVertexBuffer.ts
function BindVertexBuffer(buffer) {
  if (!buffer) {
    buffer = CurrentVertexBuffer();
  }
  if (!buffer.isBound) {
    const indexBuffer = buffer.indexed ? buffer.indexBuffer : null;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexBuffer);
    buffer.isBound = true;
    if (VertexBufferStack.active && VertexBufferStack.active !== buffer) {
      VertexBufferStack.active.isBound = false;
    }
    VertexBufferStack.active = buffer;
  }
}

// src/renderer/webgl1/renderpass/BindDefaultVertexBuffer.ts
function BindDefaultVertexBuffer() {
  VertexBufferStack.index = 0;
  BindVertexBuffer(VertexBufferStack.default);
}

// src/renderer/webgl1/renderpass/BindDefaultViewport.ts
function BindDefaultViewport() {
  ViewportStack.index = 0;
  BindViewport(ViewportStack.default);
}

// src/renderer/webgl1/renderpass/BindTexture.ts
function BindTexture(texture, index = 1) {
  const binding = texture.binding;
  binding.bind(index);
  gl.activeTexture(gl.TEXTURE0 + index);
  gl.bindTexture(gl.TEXTURE_2D, binding.texture);
}

// src/renderer/webgl1/renderpass/TextureStack.ts
var TextureStack = {
  renderPass: null,
  textures: null,
  tempTextures: null,
  textureIndex: [],
  maxTextures: 0,
  init: (renderPass) => {
    TextureStack.renderPass = renderPass;
  }
};

// src/renderer/webgl1/renderpass/ClearTextures.ts
function ClearTextures() {
  TextureStack.textures.forEach((texture) => {
    if (texture) {
      texture.binding.unbind();
    }
  });
  TextureStack.textures.clear();
}

// src/config/maxtextures/GetMaxTextures.ts
function GetMaxTextures() {
  return ConfigStore.get(CONFIG_DEFAULTS.MAX_TEXTURES);
}

// src/renderer/webgl1/renderpass/CreateTempTextures.ts
function CreateTempTextures() {
  let maxGPUTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
  let maxCombinedGPUTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  console.log("MAX GPU", maxGPUTextures, "MAX COMBINED", maxCombinedGPUTextures);
  const maxConfigTextures = GetMaxTextures();
  if (maxConfigTextures === 0 || maxConfigTextures > maxGPUTextures) {
    SetMaxTextures(maxGPUTextures);
  } else {
    maxGPUTextures = maxConfigTextures;
  }
  const textures = [];
  for (let i = 0; i < maxGPUTextures; i++) {
    const tempTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + i);
    gl.bindTexture(gl.TEXTURE_2D, tempTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    textures.push([i, tempTexture]);
  }
  return textures;
}

// src/renderer/webgl1/renderpass/GetVertexBufferEntry.ts
var bufferEntry = {
  buffer: null,
  F32: null,
  offset: 0
};
function GetVertexBufferEntry(renderPass, addToCount = 0) {
  const buffer = CurrentVertexBuffer();
  if (renderPass.count + addToCount >= buffer.batchSize) {
    Flush(renderPass);
  }
  bufferEntry.buffer = buffer;
  bufferEntry.F32 = buffer.vertexViewF32;
  bufferEntry.offset = renderPass.count * buffer.entryElementSize;
  renderPass.count += addToCount;
  return bufferEntry;
}

// src/renderer/webgl1/renderpass/PopColorMatrix.ts
function PopColorMatrix() {
  ColorMatrixStack.index--;
  BindColorMatrix();
}

// src/renderer/webgl1/renderpass/PopColor.ts
function PopColor(renderPass, color) {
  if (color.colorMatrixEnabled && color.willColorChildren) {
    PopColorMatrix();
  }
}

// src/renderer/webgl1/renderpass/PopShader.ts
function PopShader() {
  ShaderStack.index--;
  BindShaderEntry();
}

// src/renderer/webgl1/fbo/CreateFramebuffer.ts
function CreateFramebuffer(texture, attachment) {
  if (!attachment) {
    attachment = gl.COLOR_ATTACHMENT0;
  }
  const framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return framebuffer;
}

// src/renderer/webgl1/textures/CreateGLTexture.ts
function CreateGLTexture(binding, mipmaps) {
  const { generateMipmap, minFilter, parent, compressed, internalFormat, flipY, unpackPremultiplyAlpha, magFilter, wrapS, wrapT, isPOT } = binding;
  const source = parent.image;
  let width = parent.width;
  let height = parent.height;
  const glTexture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, glTexture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, unpackPremultiplyAlpha);
  if (source) {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    width = source.width;
    height = source.height;
  } else if (compressed && mipmaps) {
    for (let i = 0; i < mipmaps.length; i++) {
      gl.compressedTexImage2D(gl.TEXTURE_2D, i, internalFormat, mipmaps[i].width, mipmaps[i].height, 0, mipmaps[i].data);
    }
  } else {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  }
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
  if (generateMipmap && isPOT) {
    gl.generateMipmap(gl.TEXTURE_2D);
  }
  binding.texture = glTexture;
  return glTexture;
}

// src/renderer/webgl1/fbo/DeleteFramebuffer.ts
function DeleteFramebuffer(framebuffer) {
  if (gl && gl.isFramebuffer(framebuffer)) {
    gl.deleteFramebuffer(framebuffer);
  }
}

// src/renderer/webgl1/textures/DeleteGLTexture.ts
function DeleteGLTexture(texture) {
  if (gl.isTexture(texture)) {
    gl.deleteTexture(texture);
  }
}

// src/math/pow2/IsSizePowerOfTwo.ts
function IsSizePowerOfTwo(width, height) {
  if (width < 1 || height < 1) {
    return false;
  }
  return (width & width - 1) === 0 && (height & height - 1) === 0;
}

// src/renderer/webgl1/textures/SetGLTextureFilterMode.ts
function SetGLTextureFilterMode(texture, linear = true) {
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const mode = linear ? gl.LINEAR : gl.NEAREST;
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mode);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mode);
}

// src/renderer/webgl1/textures/UpdateGLTexture.ts
function UpdateGLTexture(binding) {
  const source = binding.parent.image;
  const width = source.width;
  const height = source.height;
  if (width > 0 && height > 0) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, binding.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, binding.flipY);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  }
  return binding.texture;
}

// src/renderer/webgl1/textures/GLTextureBinding.ts
var GLTextureBinding = class {
  parent;
  texture;
  framebuffer;
  depthbuffer;
  format;
  internalFormat;
  compressed;
  mipmaps;
  isBound = false;
  textureUnit = 0;
  unpackPremultiplyAlpha = true;
  minFilter;
  magFilter;
  wrapS;
  wrapT;
  flipY = false;
  isPOT = false;
  generateMipmap = false;
  constructor(parent, config = {}) {
    this.parent = parent;
    this.isPOT = IsSizePowerOfTwo(parent.width, parent.height);
    const {
      mipmaps = null,
      compressed = false,
      format = "IMG",
      internalFormat = 0,
      texture = null,
      framebuffer = null,
      createFramebuffer = false,
      depthbuffer = null,
      unpackPremultiplyAlpha = true,
      minFilter = this.isPOT ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR,
      magFilter = gl.LINEAR,
      wrapS = gl.CLAMP_TO_EDGE,
      wrapT = gl.CLAMP_TO_EDGE,
      generateMipmap = this.isPOT,
      flipY = false
    } = config;
    this.compressed = compressed;
    this.format = format;
    this.internalFormat = internalFormat;
    this.mipmaps = mipmaps;
    if (compressed) {
      this.minFilter = gl.LINEAR;
    } else {
      this.minFilter = minFilter;
    }
    this.magFilter = magFilter;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.generateMipmap = generateMipmap;
    this.flipY = flipY;
    this.unpackPremultiplyAlpha = unpackPremultiplyAlpha;
    if (texture) {
      this.texture = texture;
    } else {
      CreateGLTexture(this, mipmaps);
    }
    if (framebuffer) {
      this.framebuffer = framebuffer;
    } else if (createFramebuffer) {
      this.framebuffer = CreateFramebuffer(this.texture);
    }
    if (depthbuffer) {
      this.depthbuffer = depthbuffer;
    }
    parent.binding = this;
  }
  setFilter(linear) {
    if (this.texture) {
      SetGLTextureFilterMode(this.texture, linear);
    }
  }
  create() {
    const texture = this.texture;
    if (texture) {
      DeleteGLTexture(texture);
    }
    return CreateGLTexture(this);
  }
  update() {
    const texture = this.texture;
    if (!texture) {
      return CreateGLTexture(this);
    } else {
      return UpdateGLTexture(this);
    }
  }
  bind(index) {
    this.isBound = true;
    this.textureUnit = index;
  }
  unbind() {
    this.isBound = false;
    this.textureUnit = 0;
  }
  destroy() {
    this.unbind();
    DeleteGLTexture(this.texture);
    DeleteFramebuffer(this.framebuffer);
    this.parent = null;
    this.texture = null;
    this.framebuffer = null;
  }
};

// src/renderer/webgl1/renderpass/ProcessBindingQueue.ts
function ProcessBindingQueue() {
  const queue2 = BindingQueue.get();
  queue2.forEach((entry) => {
    const { texture, glConfig } = entry;
    if (!texture.binding) {
      texture.binding = new GLTextureBinding(texture, glConfig);
    }
  });
  BindingQueue.clear();
}

// src/colormatrix/const.ts
var DEFAULT_COLOR_MATRIX = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
var DEFAULT_COLOR_OFFSET = new Float32Array(4);

// src/config/batchsize/GetBatchSize.ts
function GetBatchSize() {
  return ConfigStore.get(CONFIG_DEFAULTS.BATCH_SIZE);
}

// src/math/mat4/Mat4Ortho.ts
function Mat4Ortho(matrix2, left, right, bottom, top, near, far) {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  const nf = 1 / (near - far);
  matrix2.set([
    -2 * lr,
    0,
    0,
    0,
    0,
    -2 * bt,
    0,
    0,
    0,
    0,
    2 * nf,
    0,
    (left + right) * lr,
    (top + bottom) * bt,
    (far + near) * nf,
    1
  ]);
}

// src/renderer/webgl1/shaders/SetUniforms.ts
function SetUniforms(shader, renderPass) {
  if (!shader.program) {
    return false;
  }
  gl.useProgram(shader.program);
  shader.isActive = true;
  const uniforms = shader.uniforms;
  for (const [name, setter] of shader.uniformSetters.entries()) {
    setter(uniforms.get(name));
  }
  return true;
}

// src/renderer/webgl1/shaders/BindShader.ts
function BindShader(shader, renderPass) {
  const uniforms = shader.uniforms;
  uniforms.set("uProjectionMatrix", renderPass.projectionMatrix);
  uniforms.set("uCameraMatrix", renderPass.cameraMatrix);
  shader.updateUniforms(renderPass);
  return SetUniforms(shader, renderPass);
}

// src/renderer/webgl1/glsl/MULTI_QUAD_FRAG.ts
var MULTI_QUAD_FRAG = `#define SHADER_NAME MULTI_QUAD_FRAG
#define numTextures %count%

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture[%count%];
uniform mat4 uColorMatrix;
uniform vec4 uColorOffset;

vec4 getSampler (int index, vec2 uv)
{
    for (int i = 0; i < numTextures; ++i)
    {
        vec4 color = texture2D(uTexture[i], uv);

        if (i == index)
        {
            return color * vec4(vTintColor.rgb * vTintColor.a, vTintColor.a);
        }
    }

    //  Return black
    return vec4(0);
}

void main (void)
{
    vec4 color = getSampler(int(vTextureId), vTextureCoord);

    //  Un pre-mult alpha
    if (color.a > 0.0)
    {
        color.rgb /= color.a;
    }

    vec4 result = color * uColorMatrix + (uColorOffset / 255.0);

    //  Pre-mult alpha
    result.rgb *= result.a;

    gl_FragColor = vec4(result.rgb, result.a);
}`;

// src/renderer/webgl1/fbo/CreateDepthBuffer.ts
function CreateDepthBuffer(framebuffer, textureWidth, textureHeight) {
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  const depthBuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, textureWidth, textureHeight);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return depthBuffer;
}

// src/renderer/webgl1/index.ts
var webgl1_exports = {};
__export(webgl1_exports, {
  CreateFramebuffer: () => CreateFramebuffer,
  CreateGLTexture: () => CreateGLTexture,
  DeleteFramebuffer: () => DeleteFramebuffer,
  DeleteGLBuffer: () => DeleteGLBuffer,
  DeleteGLTexture: () => DeleteGLTexture,
  GL: () => GL,
  PackColor: () => PackColor,
  PackColors: () => PackColors,
  SetGLTextureFilterMode: () => SetGLTextureFilterMode,
  UpdateGLTexture: () => UpdateGLTexture,
  WebGLRenderer: () => WebGLRenderer
});

// src/renderer/webgl1/buffers/DeleteGLBuffer.ts
function DeleteGLBuffer(buffer) {
  if (gl.isBuffer(buffer)) {
    gl.deleteBuffer(buffer);
  }
}

// src/renderer/webgl1/colors/PackColor.ts
function PackColor(rgb, alpha) {
  const ua = (alpha * 255 | 0) & 255;
  return (ua << 24 | rgb) >>> 0;
}

// src/renderer/webgl1/colors/PackColors.ts
function PackColors(vertices) {
  vertices.forEach((vertex) => {
    vertex.packColor();
  });
}

// src/renderer/webgl1/shaders/CompileShader.ts
function CompileShader(source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!status) {
    const info = gl.getShaderInfoLog(shader);
    const sourceLines = source.split("\n").map((line, index) => {
      return `${index}: ${line}`;
    });
    console.error(`Error compiling shader: ${info}`, sourceLines.join("\n"));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// src/renderer/webgl1/GL_CONST.ts
var BYTE = 5120;
var UNSIGNED_BYTE = 5121;
var SHORT = 5122;
var UNSIGNED_SHORT = 5123;
var FLOAT = 5126;

// src/renderer/webgl1/shaders/CreateAttributes.ts
function CreateAttributes(program, attribs) {
  const attributes = new Map();
  const defaultSettings = {
    size: 1,
    type: FLOAT,
    normalized: false,
    stride: 0
  };
  let offset = 0;
  for (const [name, entry] of Object.entries(attribs)) {
    const index = gl.getAttribLocation(program, name);
    if (index !== -1) {
      gl.enableVertexAttribArray(index);
      const {
        size = defaultSettings.size,
        type = defaultSettings.type,
        normalized = defaultSettings.normalized,
        stride = defaultSettings.stride
      } = entry;
      attributes.set(name, { index, size, type, normalized, stride, offset });
      let typeSize = 4;
      if (type === UNSIGNED_SHORT || type === SHORT) {
        typeSize = 2;
      } else if (type === UNSIGNED_BYTE || type === BYTE) {
        typeSize = 1;
      }
      offset += size * typeSize;
    }
  }
  return attributes;
}

// src/renderer/webgl1/shaders/DeleteShaders.ts
function DeleteShaders(...shaders) {
  shaders.forEach((shader) => {
    gl.deleteShader(shader);
  });
}

// src/renderer/webgl1/shaders/CreateProgram.ts
function CreateProgram(...shaders) {
  const program = gl.createProgram();
  shaders.forEach((shader) => {
    gl.attachShader(program, shader);
  });
  gl.linkProgram(program);
  const status = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!status) {
    const info = gl.getProgramInfoLog(program);
    console.error(`Error linking program: ${info}`);
    gl.deleteProgram(program);
    DeleteShaders(...shaders);
    return null;
  }
  return program;
}

// src/renderer/webgl1/shaders/CreateUniformSetter.ts
function CreateUniformSetter(uniform, location, isArray = false) {
  switch (uniform.type) {
    case gl.INT:
    case gl.BOOL: {
      if (isArray) {
        return (v) => {
          gl.uniform1iv(location, v);
        };
      } else {
        return (v) => {
          gl.uniform1i(location, v);
        };
      }
    }
    case gl.INT_VEC2:
    case gl.BOOL_VEC2: {
      return (v) => {
        gl.uniform2iv(location, v);
      };
    }
    case gl.INT_VEC3:
    case gl.BOOL_VEC3: {
      return (v) => {
        gl.uniform3iv(location, v);
      };
    }
    case gl.INT_VEC4:
    case gl.BOOL_VEC4: {
      return (v) => {
        gl.uniform4iv(location, v);
      };
    }
    case gl.FLOAT: {
      if (isArray) {
        return (v) => {
          gl.uniform1fv(location, v);
        };
      } else {
        return (v) => {
          gl.uniform1f(location, v);
        };
      }
    }
    case gl.FLOAT_VEC2: {
      return (v) => {
        gl.uniform2fv(location, v);
      };
    }
    case gl.FLOAT_VEC3: {
      return (v) => {
        gl.uniform3fv(location, v);
      };
    }
    case gl.FLOAT_VEC4: {
      return (v) => {
        gl.uniform4fv(location, v);
      };
    }
    case gl.FLOAT_MAT2: {
      return (v) => {
        gl.uniformMatrix2fv(location, false, v);
      };
    }
    case gl.FLOAT_MAT3: {
      return (v) => {
        gl.uniformMatrix3fv(location, false, v);
      };
    }
    case gl.FLOAT_MAT4: {
      return (v) => {
        gl.uniformMatrix4fv(location, false, v);
      };
    }
    case gl.SAMPLER_2D:
    case gl.SAMPLER_CUBE: {
      if (uniform.size > 1) {
        return (v) => {
          gl.uniform1iv(location, v);
        };
      } else {
        return (v) => {
          gl.uniform1i(location, v);
        };
      }
    }
  }
}

// src/renderer/webgl1/shaders/CreateUniforms.ts
function CreateUniforms(program) {
  const uniforms = new Map();
  const total = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < total; i++) {
    const uniform = gl.getActiveUniform(program, i);
    let name = uniform.name;
    if (name.startsWith("gl_") || name.startsWith("webgl_")) {
      continue;
    }
    const location = gl.getUniformLocation(program, name);
    if (location) {
      let isArray = false;
      if (name.endsWith("[0]")) {
        name = name.slice(0, -3);
        isArray = uniform.size > 1;
      }
      uniforms.set(name, CreateUniformSetter(uniform, location, isArray));
    }
  }
  return uniforms;
}

// src/renderer/webgl1/shaders/CreateShader.ts
function CreateShader(shader, fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
  const maxTextures = GetMaxTextures();
  fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);
  const fragmentShader = CompileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
  const vertexShader = CompileShader(vertexShaderSource, gl.VERTEX_SHADER);
  if (!fragmentShader || !vertexShader) {
    return;
  }
  const program = CreateProgram(fragmentShader, vertexShader);
  if (!program) {
    return;
  }
  const currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
  gl.useProgram(program);
  shader.program = program;
  shader.uniformSetters = CreateUniforms(program);
  shader.uniforms = new Map();
  for (const [key, value] of Object.entries(uniforms)) {
    if (shader.uniformSetters.has(key)) {
      shader.uniforms.set(key, value);
    }
  }
  shader.attributes = CreateAttributes(program, attribs);
  gl.useProgram(currentProgram);
  shader.isActive = false;
  return shader;
}

// src/renderer/webgl1/shaders/DefaultQuadAttributes.ts
var DefaultQuadAttributes = {
  aVertexPosition: { size: 2 },
  aTextureCoord: { size: 2 },
  aTextureId: { size: 1 },
  aTintColor: { size: 4 }
};

// src/renderer/webgl1/shaders/DefaultQuadUniforms.ts
var DefaultQuadUniforms = {
  uProjectionMatrix: new Float32Array(16),
  uCameraMatrix: new Float32Array(16),
  uTexture: 0,
  uColorMatrix: new Float32Array([
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ]),
  uColorOffset: new Float32Array(4)
};

// src/renderer/webgl1/glsl/SINGLE_QUAD_FRAG.ts
var SINGLE_QUAD_FRAG = `#define SHADER_NAME SINGLE_QUAD_FRAG

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform mat4 uColorMatrix;
uniform vec4 uColorOffset;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    //  Un pre-mult alpha
    if (color.a > 0.0)
    {
        color.rgb /= color.a;
    }

    vec4 result = color * uColorMatrix + (uColorOffset / 255.0);

    //  Pre-mult alpha
    result.rgb *= result.a;

    gl_FragColor = vec4(result.rgb, result.a);
}`;

// src/renderer/webgl1/glsl/SINGLE_QUAD_VERT.ts
var SINGLE_QUAD_VERT = `#define SHADER_NAME SINGLE_QUAD_VERT

precision highp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute float aTextureId;
attribute vec4 aTintColor;

uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

void main (void)
{
    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vTintColor = aTintColor;

    gl_Position = uProjectionMatrix * uCameraMatrix * vec4(aVertexPosition, 0.0, 1.0);
}`;

// src/renderer/webgl1/shaders/SetShaderFromConfig.ts
function SetShaderFromConfig(shader, config) {
  const {
    attributes = DefaultQuadAttributes,
    fragmentShader = SINGLE_QUAD_FRAG,
    height = GetHeight(),
    renderToFramebuffer = false,
    renderToDepthbuffer = false,
    resolution = GetResolution(),
    vertexShader = SINGLE_QUAD_VERT,
    width = GetWidth(),
    uniforms = DefaultQuadUniforms
  } = config;
  CreateShader(shader, fragmentShader, vertexShader, uniforms, attributes);
  if (renderToFramebuffer) {
    shader.renderToFramebuffer = true;
    const texture = new Texture(null, width * resolution, height * resolution);
    const binding = new GLTextureBinding(texture);
    binding.framebuffer = CreateFramebuffer(binding.texture);
    if (renderToDepthbuffer) {
      shader.renderToDepthbuffer = true;
      binding.depthbuffer = CreateDepthBuffer(binding.framebuffer, texture.width, texture.height);
    }
    shader.texture = texture;
    shader.framebuffer = binding.framebuffer;
    shader.viewport = new Rectangle(0, 0, width, height);
  }
  return shader;
}

// src/renderer/webgl1/shaders/Shader.ts
var Shader = class {
  program;
  attributes;
  uniforms;
  uniformSetters;
  texture;
  framebuffer;
  renderToFramebuffer = false;
  renderToDepthbuffer = false;
  isActive = false;
  viewport;
  constructor(config) {
    if (config) {
      SetShaderFromConfig(this, config);
    }
  }
  updateUniforms(renderPass) {
  }
  bind(renderPass) {
    return BindShader(this, renderPass);
  }
};

// src/renderer/webgl1/shaders/MultiTextureQuadShader.ts
var MultiTextureQuadShader = class extends Shader {
  constructor(config = {}) {
    config.fragmentShader = config?.fragmentShader || MULTI_QUAD_FRAG;
    super(config);
  }
  bind(renderPass) {
    this.uniforms.set("uTexture", TextureStack.textureIndex);
    return BindShader(this, renderPass);
  }
};

// src/renderer/webgl1/renderpass/SetDefaultBlendMode.ts
function SetDefaultBlendMode(enable, srcRGB, dstRGB, srcAlpha = gl.SRC_ALPHA, dstAlpha = gl.ONE_MINUS_SRC_ALPHA) {
  const entry = { enable, srcRGB, dstRGB, srcAlpha, dstAlpha };
  BlendModeStack.stack[0] = entry;
  BlendModeStack.index = 0;
  BlendModeStack.default = entry;
}

// src/renderer/webgl1/renderpass/SetDefaultColorMatrix.ts
function SetDefaultColorMatrix(colorMatrix, colorOffset) {
  const entry = { colorMatrix, colorOffset };
  ColorMatrixStack.stack[0] = entry;
  ColorMatrixStack.index = 0;
  ColorMatrixStack.default = entry;
}

// src/renderer/webgl1/renderpass/SetDefaultShader.ts
function SetDefaultShader(shader, textureID) {
  const entry = { shader, textureID };
  ShaderStack.stack[0] = entry;
  ShaderStack.index = 0;
  ShaderStack.default = entry;
}

// src/renderer/webgl1/renderpass/ResetTextures.ts
function ResetTextures() {
  TextureStack.tempTextures.forEach((texture, index) => {
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, texture);
  });
  ClearTextures();
}

// src/renderer/webgl1/renderpass/SetDefaultTextures.ts
function SetDefaultTextures() {
  if (TextureStack.textures) {
    ResetTextures();
  }
  const tempTextures = CreateTempTextures();
  TextureStack.maxTextures = tempTextures.length;
  TextureStack.tempTextures = new Map(tempTextures);
  TextureStack.textures = new Map();
  TextureStack.textureIndex = [];
  TextureStack.tempTextures.forEach((texture, index) => {
    TextureStack.textureIndex.push(index);
  });
}

// src/renderer/webgl1/renderpass/SetDefaultVertexBuffer.ts
function SetDefaultVertexBuffer(buffer) {
  VertexBufferStack.stack[0] = buffer;
  VertexBufferStack.index = 0;
  VertexBufferStack.default = buffer;
}

// src/renderer/webgl1/renderpass/SetDefaultViewport.ts
function SetDefaultViewport(x = 0, y = 0, width = 0, height = 0) {
  const entry = new Rectangle(x, y, width, height);
  ViewportStack.stack[0] = entry;
  ViewportStack.index = 0;
  ViewportStack.default = entry;
}

// src/renderer/webgl1/shaders/SingleTextureQuadShader.ts
var SingleTextureQuadShader = class extends Shader {
  constructor(config = {}) {
    config.fragmentShader = config?.fragmentShader || SINGLE_QUAD_FRAG;
    super(config);
  }
};

// src/renderer/webgl1/buffers/VertexBuffer.ts
var VertexBuffer = class {
  name;
  batchSize;
  dataSize;
  vertexElementSize;
  vertexByteSize;
  entryByteSize;
  bufferByteSize;
  data;
  vertexViewF32;
  vertexBuffer;
  entryElementSize;
  indexed = false;
  isDynamic = false;
  count = 0;
  offset = 0;
  elementsPerEntry;
  isBound = false;
  constructor(config = {}) {
    const {
      name = "VBO",
      batchSize = 1,
      dataSize = 4,
      isDynamic = true,
      elementsPerEntry = 3,
      vertexElementSize = 9
    } = config;
    this.name = name;
    this.batchSize = batchSize;
    this.dataSize = dataSize;
    this.vertexElementSize = vertexElementSize;
    this.isDynamic = isDynamic;
    this.elementsPerEntry = elementsPerEntry;
    this.vertexByteSize = vertexElementSize * dataSize;
    this.entryByteSize = this.vertexByteSize * elementsPerEntry;
    this.bufferByteSize = batchSize * this.entryByteSize;
    this.entryElementSize = this.vertexElementSize * this.elementsPerEntry;
    this.create();
  }
  resize(batchSize) {
    this.batchSize = batchSize;
    this.bufferByteSize = batchSize * this.entryByteSize;
    if (this.vertexBuffer) {
      DeleteGLBuffer(this.vertexBuffer);
    }
    this.create();
  }
  create() {
    const data = new ArrayBuffer(this.bufferByteSize);
    this.data = data;
    this.vertexViewF32 = new Float32Array(data);
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    const type = this.isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
    gl.bufferData(gl.ARRAY_BUFFER, data, type);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.isBound = false;
  }
  add(count) {
    this.count += count;
    this.offset += this.vertexElementSize * count;
  }
  reset() {
    this.count = 0;
    this.offset = 0;
  }
  canContain(count) {
    return this.count + count <= this.batchSize;
  }
  free() {
    return Math.max(0, 1 - this.count / this.batchSize);
  }
  bind() {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  }
  destroy() {
    DeleteGLBuffer(this.vertexBuffer);
    this.data = null;
    this.vertexViewF32 = null;
    this.vertexBuffer = null;
  }
};

// src/renderer/webgl1/renderpass/RenderPass.ts
var RenderPass = class {
  renderer;
  projectionMatrix;
  cameraMatrix;
  count = 0;
  prevCount = 0;
  flushTotal = 0;
  quadShader;
  quadCamera;
  current2DCamera;
  constructor(renderer) {
    this.renderer = renderer;
    this.projectionMatrix = new Float32Array(16);
    FramebufferStack.init(this);
    BlendModeStack.init(this);
    VertexBufferStack.init(this);
    ViewportStack.init(this);
    ShaderStack.init(this);
    ColorMatrixStack.init(this);
    TextureStack.init(this);
    this.reset();
  }
  flush() {
    this.prevCount = this.count;
    this.count = 0;
    this.flushTotal++;
  }
  reset() {
    const gl2 = this.renderer.gl;
    this.quadShader = new SingleTextureQuadShader();
    this.quadCamera = new StaticCamera(this.renderer.width, this.renderer.height);
    SetDefaultTextures();
    SetDefaultFramebuffer();
    SetDefaultBlendMode(true, gl2.ONE, gl2.ONE_MINUS_SRC_ALPHA);
    SetDefaultVertexBuffer(new VertexBuffer({ batchSize: GetBatchSize() }));
    SetDefaultShader(GetMaxTextures() === 1 ? new SingleTextureQuadShader() : new MultiTextureQuadShader());
    SetDefaultColorMatrix(DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET);
  }
  resize(width, height) {
    Mat4Ortho(this.projectionMatrix, 0, width, height, 0, -1e3, 1e3);
    this.quadCamera.reset(width, height);
    SetDefaultViewport(0, 0, width, height);
  }
  isCameraDirty() {
    return this.current2DCamera.isDirty;
  }
};

// src/components/color/CompareColorMatrix.ts
function CompareColorMatrix(srcMatrix, srcOffset, targetMatrix, targetOffset) {
  for (let i = 0; i < srcOffset.length; i++) {
    if (srcOffset[i] !== targetOffset[i]) {
      return false;
    }
  }
  for (let i = 0; i < srcMatrix.length; i++) {
    if (srcMatrix[i] !== targetMatrix[i]) {
      return false;
    }
  }
  return true;
}

// src/renderer/webgl1/renderpass/SetColorMatrix.ts
function SetColorMatrix(color) {
  const current = CurrentColorMatrix();
  const entry = AddColorMatrix(color.colorMatrix, color.colorOffset);
  if (!CompareColorMatrix(entry.colorMatrix, entry.colorOffset, current.colorMatrix, current.colorOffset)) {
    BindColorMatrix(entry);
  }
}

// src/renderer/webgl1/renderpass/SetColor.ts
function SetColor(renderPass, color) {
  if (color.colorMatrixEnabled && color.willColorChildren) {
    SetColorMatrix(color);
  }
}

// src/renderer/webgl1/renderpass/SetDefaultFramebuffer.ts
function SetDefaultFramebuffer(framebuffer = null, viewport) {
  const entry = { framebuffer, viewport };
  FramebufferStack.stack[0] = entry;
  FramebufferStack.index = 0;
  FramebufferStack.default = entry;
}

// src/renderer/webgl1/renderpass/SetFramebuffer.ts
function SetFramebuffer(framebuffer, clear = true, viewport) {
  const entry = AddFramebuffer(framebuffer, viewport);
  BindFramebuffer(clear, entry);
}

// src/renderer/webgl1/renderpass/SetShader.ts
function SetShader(shader, textureID) {
  const entry = AddShader(shader, textureID);
  BindShaderEntry(entry);
}

// src/renderer/webgl1/renderpass/SetTexture.ts
function SetTexture(texture) {
  if (!texture.binding) {
    return -1;
  }
  const binding = texture.binding;
  const textures = TextureStack.textures;
  if (!binding.isBound) {
    if (textures.size === TextureStack.maxTextures) {
      Flush(TextureStack.renderPass);
      ClearTextures();
    }
    const textureUnit = textures.size;
    gl.activeTexture(gl.TEXTURE0 + textureUnit);
    gl.bindTexture(gl.TEXTURE_2D, binding.texture);
    textures.set(textureUnit, texture);
    binding.bind(textureUnit);
  }
  return binding.textureUnit;
}

// src/textures/WhiteTexture.ts
var instance3;
var WhiteTexture = {
  get: () => {
    return instance3;
  },
  set: (texture) => {
    instance3 = texture;
  }
};

// src/renderer/webgl1/renderpass/SetWhiteTexture.ts
function SetWhiteTexture() {
  return SetTexture(WhiteTexture.get());
}

// src/renderer/webgl1/renderpass/Start.ts
function Start(renderPass) {
  if (!renderPass.current2DCamera) {
    renderPass.current2DCamera = renderPass.quadCamera;
    renderPass.cameraMatrix = renderPass.quadCamera.getMatrix();
  }
  renderPass.count = 0;
  renderPass.flushTotal = 0;
  BindDefaultFramebuffer();
  BindDefaultBlendMode();
  BindDefaultVertexBuffer();
  BindDefaultViewport();
  BindDefaultShader();
  BindDefaultColorMatrix();
  return renderPass;
}

// src/renderer/webgl1/renderpass/UnbindTexture.ts
function UnbindTexture(texture) {
  const index = texture.binding.textureUnit;
  const binding = texture.binding;
  binding.unbind();
  gl.activeTexture(gl.TEXTURE0 + index);
  gl.bindTexture(gl.TEXTURE_2D, TextureStack.tempTextures.get(index));
}

// src/renderer/webgl1/renderpass/Draw.ts
function Draw(renderPass) {
  const count = renderPass.count;
  if (count === 0) {
    return;
  }
  const currentBuffer = CurrentVertexBuffer();
  const currentShader = CurrentShader();
  const renderToFramebuffer = currentShader.shader.renderToFramebuffer;
  if (renderToFramebuffer) {
    SetFramebuffer(currentShader.shader.framebuffer, true, currentShader.shader.viewport);
  }
  if (count === currentBuffer.batchSize) {
    const type = currentBuffer.isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
    gl.bufferData(gl.ARRAY_BUFFER, currentBuffer.data, type);
  } else {
    const subsize = count * currentBuffer.entryElementSize;
    const view = currentBuffer.vertexViewF32.subarray(0, subsize);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
  }
  if (currentBuffer.indexed) {
    gl.drawElements(gl.TRIANGLES, count * currentBuffer.entryIndexSize, gl.UNSIGNED_SHORT, 0);
  } else {
    gl.drawArrays(gl.TRIANGLES, 0, count * currentBuffer.elementsPerEntry);
  }
  if (renderToFramebuffer) {
    PopFramebuffer();
  }
}

// src/renderer/webgl1/renderpass/Flush.ts
function Flush(renderPass, forceCount) {
  if (forceCount) {
    renderPass.count = forceCount;
  }
  const count = renderPass.count;
  if (count === 0) {
    return false;
  }
  Draw(renderPass);
  renderPass.flush();
  return true;
}

// src/renderer/webgl1/renderpass/End.ts
function End(renderPass) {
  Flush(renderPass);
}

// src/renderer/webgl1/textures/GetCompressedTextures.ts
function GetCompressedTextures(gl2) {
  const extString = "WEBGL_compressed_texture_";
  const wkExtString = "WEBKIT_" + extString;
  const hasExt = (format) => {
    const results = gl2.getExtension(extString + format) || gl2.getExtension(wkExtString + format);
    if (results) {
      const glEnums = {};
      for (const key in results) {
        glEnums[results[key]] = key;
      }
      return glEnums;
    }
  };
  return {
    ETC: hasExt("etc"),
    ETC1: hasExt("etc1"),
    ATC: hasExt("atc"),
    ASTC: hasExt("astc"),
    BPTC: hasExt("bptc"),
    RGTC: hasExt("rgtc"),
    PVRTC: hasExt("pvrtc"),
    S3TC: hasExt("s3tc"),
    S3TCSRGB: hasExt("s3tc_srgb"),
    IMG: true
  };
}

// src/renderer/webgl1/colors/GetRGBArray.ts
function GetRGBArray(color, output = []) {
  const r = color >> 16 & 255;
  const g = color >> 8 & 255;
  const b = color & 255;
  const a = color > 16777215 ? color >>> 24 : 255;
  output[0] = r / 255;
  output[1] = g / 255;
  output[2] = b / 255;
  output[3] = a / 255;
  return output;
}

// src/config/webglcontext/GetWebGLContext.ts
function GetWebGLContext() {
  return ConfigStore.get(CONFIG_DEFAULTS.WEBGL_CONTEXT);
}

// src/renderer/RendererInstance.ts
var instance4;
var RendererInstance = {
  get: () => {
    return instance4;
  },
  set: (renderer) => {
    instance4 = renderer;
  }
};

// src/renderer/webgl1/WebGLRendererInstance.ts
var instance5;
var WebGLRendererInstance = {
  get: () => {
    return instance5;
  },
  set: (renderer) => {
    instance5 = renderer;
    RendererInstance.set(renderer);
  }
};

// src/renderer/webgl1/WebGLRenderer.ts
var WebGLRenderer = class {
  canvas;
  gl;
  renderPass;
  clearColor = [0, 0, 0, 1];
  width;
  height;
  resolution;
  clearBeforeRender = true;
  optimizeRedraw = true;
  autoResize = true;
  contextLost = false;
  compression;
  constructor() {
    this.width = GetWidth();
    this.height = GetHeight();
    this.resolution = GetResolution();
    this.setBackgroundColor(GetBackgroundColor());
    const canvas = document.createElement("canvas");
    canvas.addEventListener("webglcontextlost", (event) => this.onContextLost(event), false);
    canvas.addEventListener("webglcontextrestored", () => this.onContextRestored(), false);
    this.canvas = canvas;
    this.initContext();
    WebGLRendererInstance.set(this);
    this.renderPass = new RenderPass(this);
    this.resize(this.width, this.height, this.resolution);
    ProcessBindingQueue();
  }
  initContext() {
    const gl2 = this.canvas.getContext("webgl", GetWebGLContext());
    GL.set(gl2);
    this.gl = gl2;
    this.compression = GetCompressedTextures(gl2);
    gl2.disable(gl2.DEPTH_TEST);
    gl2.disable(gl2.CULL_FACE);
  }
  resize(width, height, resolution = 1) {
    const calcWidth = width * resolution;
    const calcHeight = height * resolution;
    this.width = calcWidth;
    this.height = calcHeight;
    this.resolution = resolution;
    const canvas = this.canvas;
    canvas.width = calcWidth;
    canvas.height = calcHeight;
    if (this.autoResize) {
      canvas.style.width = width.toString() + "px";
      canvas.style.height = height.toString() + "px";
    }
    this.renderPass.resize(calcWidth, calcHeight);
  }
  onContextLost(event) {
    event.preventDefault();
    this.contextLost = true;
  }
  onContextRestored() {
    this.contextLost = false;
    this.initContext();
  }
  setBackgroundColor(color) {
    GetRGBArray(color, this.clearColor);
    return this;
  }
  reset() {
  }
  begin(willRedraw) {
    if (this.contextLost) {
      return;
    }
    const gl2 = this.gl;
    gl2.getContextAttributes();
    ProcessBindingQueue();
    if (this.optimizeRedraw && !willRedraw) {
    }
    if (this.clearBeforeRender) {
      const cls = this.clearColor;
      gl2.clearColor(cls[0], cls[1], cls[2], cls[3]);
      gl2.clear(gl2.COLOR_BUFFER_BIT);
    }
    return Start(this.renderPass);
  }
  end() {
    End(this.renderPass);
  }
  destroy() {
    WebGLRendererInstance.set(void 0);
  }
};

// src/config/webgl/WebGL.ts
function WebGL() {
  return () => {
    SetRenderer(WebGLRenderer);
  };
}

// src/config/webglcontext/SetWebGLContext.ts
function SetWebGLContext(contextAttributes) {
  ConfigStore.set(CONFIG_DEFAULTS.WEBGL_CONTEXT, contextAttributes);
}

// src/config/webglcontext/WebGLContext.ts
function WebGLContext(contextAttributes) {
  return () => {
    SetWebGLContext(contextAttributes);
  };
}

// src/dom/index.ts
var dom_exports = {};
__export(dom_exports, {
  AddToDOM: () => AddToDOM,
  DOMContentLoaded: () => DOMContentLoaded,
  GetElement: () => GetElement,
  ParseXML: () => ParseXML,
  RemoveFromDOM: () => RemoveFromDOM
});

// src/dom/AddToDOM.ts
function AddToDOM(element, parent) {
  const target = GetElement(parent);
  target.appendChild(element);
  return element;
}

// src/dom/DOMContentLoaded.ts
function DOMContentLoaded(callback) {
  const readyState = document.readyState;
  if (readyState === "complete" || readyState === "interactive") {
    callback();
    return;
  }
  const check = () => {
    document.removeEventListener("deviceready", check, true);
    document.removeEventListener("DOMContentLoaded", check, true);
    window.removeEventListener("load", check, true);
    callback();
  };
  if (!document.body) {
    window.setTimeout(check, 20);
  } else if (window.hasOwnProperty("cordova")) {
    document.addEventListener("deviceready", check, true);
  } else {
    document.addEventListener("DOMContentLoaded", check, true);
    window.addEventListener("load", check, true);
  }
}

// src/dom/ParseXML.ts
function ParseXML(data) {
  let xml;
  try {
    const parser = new DOMParser();
    xml = parser.parseFromString(data, "text/xml");
    if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
      return null;
    } else {
      return xml;
    }
  } catch (error) {
    return null;
  }
}

// src/dom/RemoveFromDOM.ts
function RemoveFromDOM(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

// src/device/index.ts
var device_exports = {};
__export(device_exports, {
  Audio: () => audio_exports,
  Browser: () => browser_exports,
  CanPlayAudioType: () => CanPlayAudioType,
  CanPlayH264Video: () => CanPlayH264Video,
  CanPlayHLSVideo: () => CanPlayHLSVideo,
  CanPlayM4A: () => CanPlayM4A,
  CanPlayMP3: () => CanPlayMP3,
  CanPlayOGG: () => CanPlayOGG,
  CanPlayOGGVideo: () => CanPlayOGGVideo,
  CanPlayOpus: () => CanPlayOpus,
  CanPlayVP9Video: () => CanPlayVP9Video,
  CanPlayVideoType: () => CanPlayVideoType,
  CanPlayWAV: () => CanPlayWAV,
  CanPlayWebM: () => CanPlayWebM,
  CanPlayWebMVideo: () => CanPlayWebMVideo,
  GetAudio: () => GetAudio,
  GetBrowser: () => GetBrowser,
  GetOS: () => GetOS,
  GetVideo: () => GetVideo,
  HasAudio: () => HasAudio,
  HasWebAudio: () => HasWebAudio,
  IsAndroid: () => IsAndroid,
  IsChrome: () => IsChrome,
  IsChromeOS: () => IsChromeOS,
  IsCordova: () => IsCordova,
  IsCrosswalk: () => IsCrosswalk,
  IsEdge: () => IsEdge,
  IsEjecta: () => IsEjecta,
  IsFirefox: () => IsFirefox,
  IsKindle: () => IsKindle,
  IsLinux: () => IsLinux,
  IsMSIE: () => IsMSIE,
  IsMacOS: () => IsMacOS,
  IsMobileSafari: () => IsMobileSafari,
  IsNode: () => IsNode,
  IsNodeWebkit: () => IsNodeWebkit,
  IsOpera: () => IsOpera,
  IsSafari: () => IsSafari,
  IsSilk: () => IsSilk,
  IsTrident: () => IsTrident,
  IsWebApp: () => IsWebApp,
  IsWindows: () => IsWindows,
  IsWindowsPhone: () => IsWindowsPhone,
  IsiOS: () => IsiOS,
  OS: () => os_exports,
  Video: () => video_exports
});

// src/device/audio/index.ts
var audio_exports = {};
__export(audio_exports, {
  CanPlayAudioType: () => CanPlayAudioType,
  CanPlayM4A: () => CanPlayM4A,
  CanPlayMP3: () => CanPlayMP3,
  CanPlayOGG: () => CanPlayOGG,
  CanPlayOpus: () => CanPlayOpus,
  CanPlayWAV: () => CanPlayWAV,
  CanPlayWebM: () => CanPlayWebM,
  GetAudio: () => GetAudio,
  HasAudio: () => HasAudio,
  HasWebAudio: () => HasWebAudio
});

// src/device/audio/CanPlayAudioType.ts
var _audioElement;
function CanPlayAudioType(type, audioElement) {
  if (!audioElement) {
    if (!_audioElement) {
      _audioElement = document.createElement("audio");
    }
    audioElement = _audioElement;
  }
  return audioElement && audioElement.canPlayType(type) !== "";
}

// src/device/audio/CanPlayM4A.ts
function CanPlayM4A(audioElement) {
  return CanPlayAudioType("audio/x-m4a", audioElement) || CanPlayAudioType("audio/aac", audioElement);
}

// src/device/audio/CanPlayMP3.ts
function CanPlayMP3(audioElement) {
  return CanPlayAudioType('audio/mpeg; codecs="mp3"', audioElement);
}

// src/device/audio/CanPlayOGG.ts
function CanPlayOGG(audioElement) {
  return CanPlayAudioType('audio/ogg; codecs="vorbis"', audioElement);
}

// src/device/audio/CanPlayOpus.ts
function CanPlayOpus(audioElement) {
  return CanPlayAudioType('audio/ogg; codecs="opus"', audioElement) || CanPlayAudioType('audio/webm; codecs="opus"', audioElement);
}

// src/device/audio/CanPlayWAV.ts
function CanPlayWAV(audioElement) {
  return CanPlayAudioType('audio/wav; codecs="1"', audioElement);
}

// src/device/audio/CanPlayWebM.ts
function CanPlayWebM(audioElement) {
  return CanPlayAudioType('audio/webm; codecs="vorbis"', audioElement);
}

// src/device/audio/HasAudio.ts
function HasAudio() {
  return window && window.hasOwnProperty("Audio");
}

// src/device/audio/HasWebAudio.ts
function HasWebAudio() {
  return window && (window.hasOwnProperty("AudioContext") || window.hasOwnProperty("webkitAudioContext"));
}

// src/device/audio/GetAudio.ts
function GetAudio() {
  const result = {
    audioData: HasAudio(),
    m4a: false,
    mp3: false,
    ogg: false,
    opus: false,
    wav: false,
    webAudio: HasWebAudio(),
    webm: false
  };
  if (result.audioData) {
    result.m4a = CanPlayM4A();
    result.mp3 = CanPlayMP3();
    result.ogg = CanPlayOGG();
    result.opus = CanPlayOpus();
    result.wav = CanPlayWAV();
    result.webm = CanPlayWebM();
  }
  return result;
}

// src/device/browser/index.ts
var browser_exports = {};
__export(browser_exports, {
  GetBrowser: () => GetBrowser,
  IsChrome: () => IsChrome,
  IsEdge: () => IsEdge,
  IsFirefox: () => IsFirefox,
  IsMSIE: () => IsMSIE,
  IsMobileSafari: () => IsMobileSafari,
  IsOpera: () => IsOpera,
  IsSafari: () => IsSafari,
  IsSilk: () => IsSilk,
  IsTrident: () => IsTrident
});

// src/device/browser/IsChrome.ts
function IsChrome() {
  const chrome = /Chrome\/(\d+)/.test(navigator.userAgent);
  const chromeVersion = chrome ? parseInt(RegExp.$1, 10) : 0;
  return {
    chrome,
    chromeVersion
  };
}

// src/device/browser/IsEdge.ts
function IsEdge() {
  const edge = /Edge\/\d+/.test(navigator.userAgent);
  return {
    edge
  };
}

// src/device/browser/IsFirefox.ts
function IsFirefox() {
  const firefox = /Firefox\D+(\d+)/.test(navigator.userAgent);
  const firefoxVersion = firefox ? parseInt(RegExp.$1, 10) : 0;
  return {
    firefox,
    firefoxVersion
  };
}

// src/device/browser/IsMSIE.ts
function IsMSIE() {
  const ie = /MSIE (\d+\.\d+);/.test(navigator.userAgent);
  const ieVersion = ie ? parseInt(RegExp.$1, 10) : 0;
  return {
    ie,
    ieVersion
  };
}

// src/device/os/IsiOS.ts
function IsiOS() {
  const ua = navigator.userAgent;
  const result = {
    iOS: false,
    iOSVersion: 0,
    iPhone: false,
    iPad: false
  };
  if (/iP[ao]d|iPhone/i.test(ua)) {
    const match = /OS (\d+)/.exec(navigator.appVersion);
    result.iOS = true;
    result.iOSVersion = parseInt(match[0], 10);
    result.iPhone = ua.toLowerCase().includes("iphone");
    result.iPad = ua.toLowerCase().includes("ipad");
  }
  return result;
}

// src/device/browser/IsMobileSafari.ts
function IsMobileSafari() {
  const { iOS } = IsiOS();
  const mobileSafari = navigator.userAgent.includes("AppleWebKit") && iOS;
  return {
    mobileSafari
  };
}

// src/device/browser/IsOpera.ts
function IsOpera() {
  const opera = navigator.userAgent.includes("Opera");
  return {
    opera
  };
}

// src/device/os/IsWindowsPhone.ts
function IsWindowsPhone() {
  const ua = navigator.userAgent;
  return /Windows Phone/i.test(ua) || /IEMobile/i.test(ua);
}

// src/device/browser/IsSafari.ts
function IsSafari() {
  const ua = navigator.userAgent;
  const safari = ua.includes("Safari") && !IsWindowsPhone();
  const safariVersion = /Version\/(\d+)\./.test(ua) ? parseInt(RegExp.$1, 10) : 0;
  return {
    safari,
    safariVersion
  };
}

// src/device/browser/IsSilk.ts
function IsSilk() {
  const silk = navigator.userAgent.includes("Silk");
  return {
    silk
  };
}

// src/device/browser/IsTrident.ts
function IsTrident() {
  const trident = /Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(navigator.userAgent);
  const tridentVersion = trident ? parseInt(RegExp.$1, 10) : 0;
  const tridentIEVersion = trident ? parseInt(RegExp.$3, 10) : 0;
  return {
    trident,
    tridentVersion,
    tridentIEVersion
  };
}

// src/device/browser/GetBrowser.ts
function GetBrowser() {
  const { chrome, chromeVersion } = IsChrome();
  const { edge } = IsEdge();
  const { firefox, firefoxVersion } = IsFirefox();
  let { ie, ieVersion } = IsMSIE();
  const { mobileSafari } = IsMobileSafari();
  const { opera } = IsOpera();
  const { safari, safariVersion } = IsSafari();
  const { silk } = IsSilk();
  const { trident, tridentVersion, tridentIEVersion } = IsTrident();
  if (trident) {
    ie = true;
    ieVersion = tridentIEVersion;
  }
  const result = {
    chrome,
    chromeVersion,
    edge,
    firefox,
    firefoxVersion,
    ie,
    ieVersion,
    mobileSafari,
    opera,
    safari,
    safariVersion,
    silk,
    trident,
    tridentVersion
  };
  return result;
}

// src/device/os/index.ts
var os_exports = {};
__export(os_exports, {
  GetOS: () => GetOS,
  IsAndroid: () => IsAndroid,
  IsChromeOS: () => IsChromeOS,
  IsCordova: () => IsCordova,
  IsCrosswalk: () => IsCrosswalk,
  IsEjecta: () => IsEjecta,
  IsKindle: () => IsKindle,
  IsLinux: () => IsLinux,
  IsMacOS: () => IsMacOS,
  IsNode: () => IsNode,
  IsNodeWebkit: () => IsNodeWebkit,
  IsWebApp: () => IsWebApp,
  IsWindows: () => IsWindows,
  IsWindowsPhone: () => IsWindowsPhone,
  IsiOS: () => IsiOS
});

// src/device/os/IsAndroid.ts
function IsAndroid() {
  return navigator.userAgent.includes("Android");
}

// src/device/os/IsChromeOS.ts
function IsChromeOS() {
  return navigator.userAgent.includes("CrOS");
}

// src/device/os/IsCordova.ts
function IsCordova() {
  return window.hasOwnProperty("cordova");
}

// src/device/os/IsCrosswalk.ts
function IsCrosswalk() {
  return navigator.userAgent.includes("Crosswalk");
}

// src/device/os/IsEjecta.ts
function IsEjecta() {
  return window.hasOwnProperty("ejecta");
}

// src/device/os/IsKindle.ts
function IsKindle() {
  const ua = navigator.userAgent;
  return ua.includes("Kindle") || /\bKF[A-Z][A-Z]+/.test(ua) || /Silk.*Mobile Safari/.test(ua);
}

// src/device/os/IsLinux.ts
function IsLinux() {
  return navigator.userAgent.includes("Linux");
}

// src/device/os/IsMacOS.ts
function IsMacOS() {
  const ua = navigator.userAgent;
  return ua.includes("Mac OS") && !ua.includes("like Mac OS");
}

// src/device/os/IsNode.ts
function IsNode() {
  return typeof process !== "undefined" && typeof process.versions === "object" && process.versions.hasOwnProperty("node");
}

// src/device/os/IsNodeWebkit.ts
function IsNodeWebkit() {
  return IsNode() && !!process.versions.hasOwnProperty("node-webkit");
}

// src/device/os/IsWebApp.ts
function IsWebApp() {
  return navigator.hasOwnProperty("standalone");
}

// src/device/os/IsWindows.ts
function IsWindows() {
  return navigator.userAgent.includes("Windows");
}

// src/device/os/GetOS.ts
function GetOS() {
  const ua = navigator.userAgent;
  const { iOS, iOSVersion, iPad, iPhone } = IsiOS();
  const result = {
    android: IsAndroid(),
    chromeOS: IsChromeOS(),
    cordova: IsCordova(),
    crosswalk: IsCrosswalk(),
    desktop: false,
    ejecta: IsEjecta(),
    iOS,
    iOSVersion,
    iPad,
    iPhone,
    kindle: IsKindle(),
    linux: IsLinux(),
    macOS: IsMacOS(),
    node: IsNode(),
    nodeWebkit: IsNodeWebkit(),
    pixelRatio: 1,
    webApp: IsWebApp(),
    windows: IsWindows(),
    windowsPhone: IsWindowsPhone()
  };
  if (result.windowsPhone) {
    result.android = false;
    result.iOS = false;
    result.macOS = false;
    result.windows = true;
  }
  const silk = ua.includes("Silk");
  if (result.windows || result.macOS || result.linux && !silk || result.chromeOS) {
    result.desktop = true;
  }
  if (result.windowsPhone || /Windows NT/i.test(ua) && /Touch/i.test(ua)) {
    result.desktop = false;
  }
  return result;
}

// src/device/video/index.ts
var video_exports = {};
__export(video_exports, {
  CanPlayH264Video: () => CanPlayH264Video,
  CanPlayHLSVideo: () => CanPlayHLSVideo,
  CanPlayOGGVideo: () => CanPlayOGGVideo,
  CanPlayVP9Video: () => CanPlayVP9Video,
  CanPlayVideoType: () => CanPlayVideoType,
  CanPlayWebMVideo: () => CanPlayWebMVideo,
  GetVideo: () => GetVideo
});

// src/device/video/CanPlayVideoType.ts
var _videoElement;
function CanPlayVideoType(type, videoElement) {
  if (!videoElement) {
    if (!_videoElement) {
      _videoElement = document.createElement("video");
    }
    videoElement = _videoElement;
  }
  return videoElement && videoElement.canPlayType(type) !== "";
}

// src/device/video/CanPlayH264Video.ts
function CanPlayH264Video(videoElement) {
  return CanPlayVideoType('video/mp4; codecs="avc1.42E01E"', videoElement);
}

// src/device/video/CanPlayHLSVideo.ts
function CanPlayHLSVideo(videoElement) {
  return CanPlayVideoType('application/x-mpegURL; codecs="avc1.42E01E"', videoElement);
}

// src/device/video/CanPlayOGGVideo.ts
function CanPlayOGGVideo(videoElement) {
  return CanPlayVideoType('video/ogg; codecs="theora"', videoElement);
}

// src/device/video/CanPlayVP9Video.ts
function CanPlayVP9Video(videoElement) {
  return CanPlayVideoType('video/webm; codecs="vp9"', videoElement);
}

// src/device/video/CanPlayWebMVideo.ts
function CanPlayWebMVideo(videoElement) {
  return CanPlayVideoType('video/webm; codecs="vp8, vorbis"', videoElement);
}

// src/device/video/GetVideo.ts
function GetVideo() {
  return {
    h264Video: CanPlayH264Video(),
    hlsVideo: CanPlayHLSVideo(),
    oggVideo: CanPlayOGGVideo(),
    vp9Video: CanPlayVP9Video(),
    webmVideo: CanPlayWebMVideo()
  };
}

// src/display/index.ts
var display_exports = {};
__export(display_exports, {
  AddChild: () => AddChild,
  AddChildAt: () => AddChildAt,
  AddChildren: () => AddChildren,
  AddChildrenAt: () => AddChildrenAt,
  AddPosition: () => AddPosition,
  AddRotation: () => AddRotation,
  AddScale: () => AddScale,
  AddSkew: () => AddSkew,
  BringChildToTop: () => BringChildToTop,
  ConsoleTreeChildren: () => ConsoleTreeChildren,
  CountMatchingChildren: () => CountMatchingChildren,
  DepthFirstSearch: () => DepthFirstSearch,
  DepthFirstSearchRecursive: () => DepthFirstSearchRecursive,
  DestroyChildren: () => DestroyChildren,
  DisplayDebugTools: () => DisplayDebugTools,
  FindChildrenByName: () => FindChildrenByName,
  GetAllChildren: () => GetAllChildren,
  GetBounds: () => GetBounds,
  GetChildAt: () => GetChildAt,
  GetChildIndex: () => GetChildIndex,
  GetChildren: () => GetChildren,
  GetClosestChild: () => GetClosestChild,
  GetFirstChild: () => GetFirstChild,
  GetFirstChildByName: () => GetFirstChildByName,
  GetFurthestChild: () => GetFurthestChild,
  GetLastChild: () => GetLastChild,
  GetParents: () => GetParents2,
  GetRandomChild: () => GetRandomChild,
  MoveChildDown: () => MoveChildDown,
  MoveChildUp: () => MoveChildUp,
  OverlapBounds: () => OverlapBounds,
  RemoveChild: () => RemoveChild,
  RemoveChildAt: () => RemoveChildAt,
  RemoveChildren: () => RemoveChildren,
  RemoveChildrenAt: () => RemoveChildrenAt,
  RemoveChildrenBetween: () => RemoveChildrenBetween,
  ReparentChildren: () => ReparentChildren,
  RotateChildrenLeft: () => RotateChildrenLeft,
  RotateChildrenRight: () => RotateChildrenRight,
  SendChildToBack: () => SendChildToBack,
  SetChildrenValue: () => SetChildrenValue,
  SetName: () => SetName,
  SetOrigin: () => SetOrigin,
  SetPosition: () => SetPosition,
  SetRotation: () => SetRotation,
  SetScale: () => SetScale,
  SetSize: () => SetSize2,
  SetSkew: () => SetSkew,
  SetValue: () => SetValue,
  SetVisible: () => SetVisible2,
  SetWorld: () => SetWorld,
  ShuffleChildren: () => ShuffleChildren,
  SwapChildren: () => SwapChildren
});

// src/components/hierarchy/GetLastChildID.ts
function GetLastChildID(parentID) {
  return HierarchyComponent.data[parentID][HIERARCHY.LAST];
}

// src/components/hierarchy/GetNumChildren.ts
function GetNumChildren(id) {
  return HierarchyComponent.data[id][HIERARCHY.NUM_CHILDREN];
}

// src/display/IsValidParent.ts
function IsValidParent(parent, child) {
  const childID = child.id;
  const parentID = parent.id;
  return !(parentID === 0 || childID === parentID || parentID === GetParentID(childID));
}

// src/components/hierarchy/SetNextSiblingID.ts
function SetNextSiblingID(parentID, childID) {
  HierarchyComponent.data[parentID][HIERARCHY.NEXT] = childID;
}

// src/components/hierarchy/SetPreviousSiblingID.ts
function SetPreviousSiblingID(parentID, childID) {
  HierarchyComponent.data[parentID][HIERARCHY.PREV] = childID;
}

// src/components/hierarchy/LinkSiblings.ts
function LinkSiblings(childA, childB) {
  SetNextSiblingID(childA, childB);
  SetPreviousSiblingID(childB, childA);
}

// src/components/hierarchy/GetFirstChildID.ts
function GetFirstChildID(parentID) {
  return HierarchyComponent.data[parentID][HIERARCHY.FIRST];
}

// src/components/hierarchy/GetNextSiblingID.ts
function GetNextSiblingID(id) {
  return HierarchyComponent.data[id][HIERARCHY.NEXT];
}

// src/components/hierarchy/GetPreviousSiblingID.ts
function GetPreviousSiblingID(id) {
  return HierarchyComponent.data[id][HIERARCHY.PREV];
}

// src/components/hierarchy/index.ts
var hierarchy_exports = {};
__export(hierarchy_exports, {
  AddChildIDAfter: () => AddChildIDAfter,
  AddChildIDBefore: () => AddChildIDBefore,
  AddHierarchyComponent: () => AddHierarchyComponent,
  AreSiblings: () => AreSiblings,
  BranchSearch: () => BranchSearch,
  ClearHierarchyComponent: () => ClearHierarchyComponent,
  ClearSiblings: () => ClearSiblings,
  ClearWorldAndParentID: () => ClearWorldAndParentID,
  DebugHierarchyComponent: () => DebugHierarchyComponent,
  DecreaseNumChildren: () => DecreaseNumChildren,
  DepthFirstSearchFromParentID: () => DepthFirstSearchFromParentID,
  GetChildIDAtIndex: () => GetChildIDAtIndex,
  GetChildIDsFromParent: () => GetChildIDsFromParent,
  GetChildIDsFromParentID: () => GetChildIDsFromParentID,
  GetChildrenFromParentID: () => GetChildrenFromParentID,
  GetDepth: () => GetDepth,
  GetFirstChildID: () => GetFirstChildID,
  GetLastChildID: () => GetLastChildID,
  GetNextSiblingID: () => GetNextSiblingID,
  GetNumChildren: () => GetNumChildren,
  GetParentGameObject: () => GetParentGameObject,
  GetParentID: () => GetParentID,
  GetParents: () => GetParents,
  GetPreviousSiblingID: () => GetPreviousSiblingID,
  GetSiblingIDs: () => GetSiblingIDs,
  GetWorldFromID: () => GetWorldFromID,
  GetWorldFromParentID: () => GetWorldFromParentID,
  GetWorldID: () => GetWorldID,
  HasChildren: () => HasChildren,
  HasParent: () => HasParent,
  HierarchyComponent: () => HierarchyComponent,
  IncreaseNumChildren: () => IncreaseNumChildren,
  InsertChildIDAfter: () => InsertChildIDAfter,
  InsertChildIDBefore: () => InsertChildIDBefore,
  IsRoot: () => IsRoot,
  LinkSiblings: () => LinkSiblings,
  MoveNext: () => MoveNext,
  MoveNextRenderable: () => MoveNextRenderable,
  MoveNextUpdatable: () => MoveNextUpdatable,
  RelinkChildren: () => RelinkChildren,
  RemoveChildID: () => RemoveChildID,
  RemoveChildIDFromCurrentParent: () => RemoveChildIDFromCurrentParent,
  RemoveWorldTag: () => RemoveWorldTag,
  SetAndUpdateParent: () => SetAndUpdateParent,
  SetDepth: () => SetDepth,
  SetFirstChildID: () => SetFirstChildID,
  SetLastChildID: () => SetLastChildID,
  SetNextSiblingID: () => SetNextSiblingID,
  SetNumChildren: () => SetNumChildren,
  SetParentID: () => SetParentID,
  SetPreviousSiblingID: () => SetPreviousSiblingID,
  SetWorldAndParentID: () => SetWorldAndParentID,
  SetWorldID: () => SetWorldID,
  SetWorldTag: () => SetWorldTag
});

// src/components/hierarchy/SetLastChildID.ts
function SetLastChildID(parentID, childID) {
  HierarchyComponent.data[parentID][HIERARCHY.LAST] = childID;
}

// src/components/hierarchy/AddChildIDAfter.ts
function AddChildIDAfter(afterID, childID) {
  const nextID = GetNextSiblingID(afterID);
  if (nextID) {
    LinkSiblings(childID, nextID);
  } else {
    SetNextSiblingID(childID, 0);
    const parentID = GetParentID(childID);
    SetLastChildID(parentID, childID);
  }
  LinkSiblings(afterID, childID);
}

// src/components/hierarchy/SetFirstChildID.ts
function SetFirstChildID(parentID, childID) {
  HierarchyComponent.data[parentID][HIERARCHY.FIRST] = childID;
}

// src/components/hierarchy/AddChildIDBefore.ts
function AddChildIDBefore(beforeID, childID) {
  const prevID = GetPreviousSiblingID(beforeID);
  if (prevID) {
    LinkSiblings(prevID, childID);
  } else {
    SetPreviousSiblingID(childID, 0);
    const parentID = GetParentID(childID);
    SetFirstChildID(parentID, childID);
  }
  LinkSiblings(childID, beforeID);
}

// src/components/hierarchy/AddHierarchyComponent.ts
function AddHierarchyComponent(id) {
  addComponent(GameObjectWorld, HierarchyComponent, id);
}

// src/components/hierarchy/AreSiblings.ts
function AreSiblings(childA, childB) {
  return GetNextSiblingID(childA) === childB || GetPreviousSiblingID(childA) === childB;
}

// src/components/hierarchy/BranchSearch.ts
function BranchSearch(id, processCallback) {
  const stack = [id];
  let stackIndex = 1;
  let node = GetFirstChildID(id);
  const results = [];
  stackBlock: {
    while (stackIndex > 0) {
      results.push(node);
      while (processCallback(node)) {
        stack[stackIndex++] = node;
        node = GetFirstChildID(node);
        results.push(node);
      }
      let next = GetNextSiblingID(node);
      let climb = true;
      while (next && climb) {
        if (processCallback(next)) {
          climb = false;
          break;
        } else {
          results.push(next);
          next = GetNextSiblingID(next);
        }
      }
      if (climb) {
        while (next === 0) {
          node = stack[--stackIndex];
          if (!node) {
            break stackBlock;
          }
          next = GetNextSiblingID(node);
        }
      }
      node = next;
    }
  }
  return results;
}

// src/components/hierarchy/ClearHierarchyComponent.ts
function ClearHierarchyComponent(id) {
  HierarchyComponent.data[id].fill(0);
}

// src/components/hierarchy/ClearSiblings.ts
function ClearSiblings(id) {
  SetNextSiblingID(id, 0);
  SetPreviousSiblingID(id, 0);
}

// src/components/hierarchy/DecreaseNumChildren.ts
function DecreaseNumChildren(parentID, total = 1) {
  const data = HierarchyComponent.data[parentID];
  data[HIERARCHY.NUM_CHILDREN] = Math.max(0, data[HIERARCHY.NUM_CHILDREN] - total);
}

// src/gameobjects/GameObjectCache.ts
var GameObjectCache = {
  local: [],
  set: function(index, object) {
    this.local[index] = object;
  },
  get: function(index) {
    return this.local[index];
  },
  clear: function() {
    this.local.length = 0;
  },
  remove: function(index) {
    this.local[index] = null;
  }
};

// src/components/hierarchy/GetWorldID.ts
function GetWorldID(id) {
  return HierarchyComponent.data[id][HIERARCHY.WORLD];
}

// src/components/hierarchy/ClearWorldAndParentID.ts
function ClearWorldAndParentID(id) {
  const worldID = GetWorldID(id);
  const parentID = GetParentID(id);
  const world2 = GameObjectCache.get(worldID);
  HierarchyComponent.data[id][HIERARCHY.WORLD] = 0;
  HierarchyComponent.data[id][HIERARCHY.PARENT] = 0;
  if (world2 && hasComponent(GameObjectWorld, world2.tag, id)) {
    removeComponent(GameObjectWorld, world2.tag, id);
  }
  DecreaseNumChildren(parentID);
  SetDirtyParents(id);
}

// src/components/hierarchy/DebugHierarchyComponent.ts
function DebugHierarchyComponent(id) {
  const data = HierarchyComponent.data[id];
  const parent = data[HIERARCHY.PARENT];
  const world2 = data[HIERARCHY.WORLD];
  const next = data[HIERARCHY.NEXT];
  const prev = data[HIERARCHY.PREV];
  console.group(`Entity ID: ${id}`);
  console.log(`parent: ${parent} - world: ${world2}`);
  console.log(`> next: ${next}      < prev: ${prev}`);
  const kids = data[HIERARCHY.NUM_CHILDREN];
  const first = data[HIERARCHY.FIRST];
  const last = data[HIERARCHY.LAST];
  if (kids > 0) {
    console.log(`first: ${first}`);
    console.log(`last: ${last}`);
    console.log(`numChildren: ${kids}`);
  }
  console.groupEnd();
}

// src/components/hierarchy/MoveNext.ts
function MoveNext(id, rootID) {
  const firstChild = GetFirstChildID(id);
  if (firstChild > 0) {
    return firstChild;
  } else {
    const sibling = GetNextSiblingID(id);
    if (sibling === 0) {
      const parent = GetParentID(id);
      if (parent === rootID) {
        return 0;
      } else {
        return GetNextSiblingID(parent);
      }
    } else {
      return sibling;
    }
  }
}

// src/components/hierarchy/DepthFirstSearchFromParentID.ts
function DepthFirstSearchFromParentID(parentID, removeParent = true) {
  const output = [parentID];
  let next = GetFirstChildID(parentID);
  while (next > 0) {
    output.push(next);
    next = MoveNext(next, parentID);
  }
  if (removeParent) {
    output.shift();
  }
  return output;
}

// src/components/hierarchy/GetChildIDAtIndex.ts
function GetChildIDAtIndex(parentID, index) {
  let next = GetFirstChildID(parentID);
  let total = 0;
  while (next > 0 && total < index) {
    next = GetNextSiblingID(next);
    total++;
  }
  return next;
}

// src/components/hierarchy/GetChildIDsFromParent.ts
function GetChildIDsFromParent(parent) {
  let next = GetFirstChildID(parent.id);
  const output = [];
  while (next > 0) {
    output.push(next);
    next = GetNextSiblingID(next);
  }
  return output;
}

// src/components/hierarchy/GetChildIDsFromParentID.ts
function GetChildIDsFromParentID(id) {
  let next = GetFirstChildID(id);
  const output = [];
  while (next > 0) {
    output.push(next);
    next = GetNextSiblingID(next);
  }
  return output;
}

// src/components/hierarchy/GetChildrenFromParentID.ts
function GetChildrenFromParentID(id) {
  const out = [];
  let next = GetFirstChildID(id);
  while (next > 0) {
    out.push(GameObjectCache.get(next));
    next = GetNextSiblingID(next);
  }
  return out;
}

// src/components/hierarchy/GetDepth.ts
function GetDepth(id) {
  return HierarchyComponent.data[id][HIERARCHY.DEPTH];
}

// src/components/hierarchy/GetParentGameObject.ts
function GetParentGameObject(id) {
  return GameObjectCache.get(HierarchyComponent.data[id][HIERARCHY.PARENT]);
}

// src/components/hierarchy/GetParents.ts
function GetParents(id) {
  const results = [];
  let currentParent = GetParentID(id);
  while (currentParent) {
    results.push(currentParent);
    currentParent = GetParentID(currentParent);
  }
  return results;
}

// src/components/hierarchy/GetSiblingIDs.ts
function GetSiblingIDs(childID) {
  let next = GetNextSiblingID(childID);
  const output = [];
  while (next > 0) {
    output.push(next);
    next = GetNextSiblingID(next);
  }
  return output;
}

// src/components/hierarchy/GetWorldFromID.ts
function GetWorldFromID(childID) {
  const worldID = GetWorldID(childID);
  if (worldID) {
    return GameObjectCache.get(worldID);
  }
}

// src/components/hierarchy/GetWorldFromParentID.ts
function GetWorldFromParentID(parentID) {
  const worldID = GetWorldID(parentID);
  return GameObjectCache.get(worldID);
}

// src/components/hierarchy/HasChildren.ts
function HasChildren(id) {
  return !!(HierarchyComponent.data[id][HIERARCHY.NUM_CHILDREN] > 0);
}

// src/components/hierarchy/HasParent.ts
function HasParent(id) {
  return HierarchyComponent.data[id][HIERARCHY.PARENT] > 0;
}

// src/components/hierarchy/IncreaseNumChildren.ts
function IncreaseNumChildren(parentID, total = 1) {
  HierarchyComponent.data[parentID][HIERARCHY.NUM_CHILDREN] += total;
}

// src/components/hierarchy/InsertChildIDAfter.ts
function InsertChildIDAfter(afterID, childID) {
  const nextID = GetNextSiblingID(afterID);
  if (nextID) {
    SetPreviousSiblingID(nextID, childID);
  } else {
    const parentID = GetParentID(childID);
    SetLastChildID(parentID, childID);
  }
  SetNextSiblingID(childID, nextID);
  LinkSiblings(afterID, childID);
}

// src/components/hierarchy/InsertChildIDBefore.ts
function InsertChildIDBefore(beforeID, childID) {
  const prevID = GetPreviousSiblingID(beforeID);
  if (prevID) {
    SetNextSiblingID(prevID, childID);
  } else {
    const parentID = GetParentID(childID);
    SetFirstChildID(parentID, childID);
  }
  LinkSiblings(childID, beforeID);
  SetPreviousSiblingID(childID, prevID);
}

// src/components/hierarchy/IsRoot.ts
function IsRoot(id) {
  return GetWorldID(id) === GetParentID(id);
}

// src/components/permissions/GetVisibleChildren.ts
function GetVisibleChildren(id) {
  return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE_CHILDREN]);
}

// src/components/permissions/WillRenderChildren.ts
function WillRenderChildren(id) {
  return GetVisibleChildren(id) && !!PermissionsComponent.data[id][PERMISSION.WILL_RENDER_CHILDREN];
}

// src/components/hierarchy/MoveNextRenderable.ts
function MoveNextRenderable(id) {
  const firstChild = GetFirstChildID(id);
  if (firstChild > 0 && WillRenderChildren(id)) {
    return firstChild;
  } else {
    const sibling = GetNextSiblingID(id);
    if (sibling === 0) {
      const parent = GetParentID(id);
      if (parent === GetWorldID(id)) {
        return 0;
      } else {
        return GetNextSiblingID(parent);
      }
    } else {
      return sibling;
    }
  }
}

// src/components/permissions/WillUpdateChildren.ts
function WillUpdateChildren(id) {
  return !!PermissionsComponent.data[id][PERMISSION.WILL_UPDATE_CHILDREN];
}

// src/components/hierarchy/MoveNextUpdatable.ts
function MoveNextUpdatable(id) {
  const firstChild = GetFirstChildID(id);
  if (firstChild > 0 && WillUpdateChildren(id)) {
    return firstChild;
  } else {
    const sibling = GetNextSiblingID(id);
    if (sibling === 0) {
      const parent = GetParentID(id);
      if (parent === GetWorldID(id)) {
        return 0;
      } else {
        return GetNextSiblingID(parent);
      }
    } else {
      return sibling;
    }
  }
}

// src/components/hierarchy/SetNumChildren.ts
function SetNumChildren(parentID, total) {
  HierarchyComponent.data[parentID][HIERARCHY.NUM_CHILDREN] = total;
}

// src/components/hierarchy/RelinkChildren.ts
function RelinkChildren(parentID, children) {
  const len = children.length;
  if (len === 0) {
    SetNumChildren(parentID, 0);
    SetFirstChildID(parentID, 0);
    SetLastChildID(parentID, 0);
    return;
  }
  let total = 1;
  let childA = children[0];
  SetFirstChildID(parentID, childA);
  if (len === 1) {
    SetLastChildID(parentID, childA);
    SetNumChildren(parentID, total);
    return;
  }
  for (let i = 1; i < len; i++) {
    const childB = children[i];
    LinkSiblings(childA, childB);
    childA = childB;
    total++;
  }
  SetLastChildID(parentID, childA);
  SetNumChildren(parentID, total);
}

// src/components/hierarchy/RemoveChildID.ts
function RemoveChildID(childID) {
  const parentID = GetParentID(childID);
  const first = GetFirstChildID(parentID);
  const last = GetLastChildID(parentID);
  const prevID = GetPreviousSiblingID(childID);
  const nextID = GetNextSiblingID(childID);
  LinkSiblings(prevID, nextID);
  if (first === childID) {
    SetFirstChildID(parentID, nextID);
  }
  if (last === childID) {
    SetLastChildID(parentID, prevID);
  }
  ClearSiblings(childID);
}

// src/components/hierarchy/SetWorldID.ts
function SetWorldID(id, worldID) {
  HierarchyComponent.data[id][HIERARCHY.WORLD] = worldID;
}

// src/components/hierarchy/RemoveWorldTag.ts
function RemoveWorldTag(id) {
  const world2 = GetWorldFromParentID(id);
  const children = DepthFirstSearchFromParentID(id, false);
  children.map((childID) => {
    removeComponent(GameObjectWorld, world2.tag, childID);
    SetWorldID(childID, 0);
  });
}

// src/components/hierarchy/SetParentID.ts
function SetParentID(childID, parentID) {
  HierarchyComponent.data[childID][HIERARCHY.PARENT] = parentID;
}

// src/components/permissions/WillTransformChildren.ts
function WillTransformChildren(id) {
  return !!PermissionsComponent.data[id][PERMISSION.WILL_TRANSFORM_CHILDREN];
}

// src/components/transform/SetRootTransform.ts
function SetRootTransform(id) {
  const worldID = GetWorldID(id);
  let currentParent = GetParentID(id);
  let isRootTransform = true;
  while (currentParent && currentParent !== worldID) {
    if (WillTransformChildren(currentParent)) {
      isRootTransform = false;
      break;
    }
    currentParent = GetParentID(currentParent);
  }
  Transform2DComponent.data[id][TRANSFORM.IS_ROOT] = Number(isRootTransform);
}

// src/components/dirty/SetDirtyChildColor.ts
function SetDirtyChildColor(id) {
  DirtyComponent.data[id][DIRTY.CHILD_COLOR] = 1;
}

// src/components/hierarchy/SetWorldTag.ts
function SetWorldTag(world2, id) {
  const worldID = world2.id;
  const worldTag = world2.tag;
  const children = DepthFirstSearchFromParentID(id, false);
  children.map((childID) => {
    addComponent(GameObjectWorld, worldTag, childID);
    SetWorldID(childID, worldID);
  });
  world2.updateDisplayList = true;
  SetDirtyChildColor(worldID);
}

// src/components/hierarchy/SetAndUpdateParent.ts
function SetAndUpdateParent(parentID, childID, addChildren = 1) {
  SetParentID(childID, parentID);
  if (!WillCacheChildren(childID)) {
    SetDirtyTransform(childID);
  }
  SetDirtyParents(childID);
  SetRootTransform(childID);
  SetNumChildren(parentID, GetNumChildren(parentID) + addChildren);
  if (WillCacheChildren(parentID)) {
    SetDirtyChildCache(parentID);
  }
  const world2 = GetWorldFromParentID(parentID);
  if (world2) {
    SetWorldTag(world2, childID);
  }
}

// src/components/hierarchy/SetDepth.ts
function SetDepth(id, depth) {
  HierarchyComponent.data[id][HIERARCHY.DEPTH] = depth;
}

// src/components/hierarchy/SetWorldAndParentID.ts
function SetWorldAndParentID(id, worldID, parentID) {
  HierarchyComponent.data[id][HIERARCHY.WORLD] = worldID;
  HierarchyComponent.data[id][HIERARCHY.PARENT] = parentID;
}

// src/components/hierarchy/RemoveChildIDFromCurrentParent.ts
function RemoveChildIDFromCurrentParent(childID, newParentID) {
  const parentID = GetParentID(childID);
  if (parentID) {
    const firstID = GetFirstChildID(parentID);
    const lastID = GetLastChildID(parentID);
    const nextID = GetNextSiblingID(childID);
    const prevID = GetPreviousSiblingID(childID);
    if (childID === firstID) {
      SetFirstChildID(parentID, nextID);
    }
    if (childID === lastID) {
      SetLastChildID(parentID, prevID);
    }
    if (nextID) {
      SetPreviousSiblingID(nextID, prevID);
    }
    if (prevID) {
      SetNextSiblingID(prevID, nextID);
    }
    SetDirtyParents(childID);
    SetParentID(childID, 0);
    SetNumChildren(parentID, GetNumChildren(parentID) - 1);
  }
  const oldWorld = GetWorldFromID(childID);
  const newWorld = newParentID ? GetWorldFromID(newParentID) : null;
  if (oldWorld && oldWorld !== newWorld) {
    RemoveWorldTag(childID);
  }
}

// src/display/AddChild.ts
function AddChild(parent, child) {
  if (IsValidParent(parent, child)) {
    const childID = child.id;
    const parentID = parent.id;
    const numChildren = GetNumChildren(parentID);
    RemoveChildIDFromCurrentParent(childID, parentID);
    if (numChildren === 0) {
      SetFirstChildID(parentID, childID);
    } else {
      const lastChild = GetLastChildID(parentID);
      LinkSiblings(lastChild, childID);
    }
    SetLastChildID(parentID, childID);
    SetAndUpdateParent(parentID, childID);
    parent.onAddChild(childID);
  }
  return child;
}

// src/display/AddChildAfter.ts
function AddChildAfter(after, child) {
  const afterID = after.id;
  const childID = child.id;
  const parent = GetParentGameObject(afterID);
  const parentID = parent.id;
  if (IsValidParent(parent, child)) {
    RemoveChildIDFromCurrentParent(childID, parentID);
    const nextID = GetNextSiblingID(afterID);
    if (nextID !== 0) {
      SetPreviousSiblingID(nextID, childID);
    } else {
      SetLastChildID(parentID, childID);
    }
    SetNextSiblingID(childID, nextID);
    LinkSiblings(afterID, childID);
    SetAndUpdateParent(parentID, childID);
    parent.onAddChild(childID);
  }
  return child;
}

// src/display/AddChildBefore.ts
function AddChildBefore(before, child) {
  const beforeID = before.id;
  const childID = child.id;
  const parent = GetParentGameObject(beforeID);
  const parentID = parent.id;
  if (IsValidParent(parent, child)) {
    RemoveChildIDFromCurrentParent(childID, parentID);
    const prevID = GetPreviousSiblingID(beforeID);
    if (prevID !== 0) {
      SetNextSiblingID(prevID, childID);
    } else {
      SetFirstChildID(parentID, childID);
    }
    LinkSiblings(childID, beforeID);
    SetPreviousSiblingID(childID, prevID);
    SetAndUpdateParent(parentID, childID);
    parent.onAddChild(childID);
  }
  return child;
}

// src/display/AddChildAt.ts
function AddChildAt(parent, child, index) {
  if (IsValidParent(parent, child)) {
    const parentID = parent.id;
    const numChildren = GetNumChildren(parentID);
    if (index < 0 || index > numChildren) {
      console.error("Index out of range");
      return child;
    }
    if (numChildren === 0) {
      AddChild(parent, child);
    } else {
      let next = GetFirstChildID(parentID);
      if (index === 0) {
        AddChildBefore(GameObjectCache.get(next), child);
      } else if (index === 1) {
        AddChildAfter(GameObjectCache.get(next), child);
      } else {
        let count = 1;
        while (next > 0 && count < index) {
          next = MoveNext(next, parentID);
          count++;
        }
        AddChildAfter(GameObjectCache.get(next), child);
      }
    }
  }
  return child;
}

// src/display/AddChildren.ts
function AddChildren(parent, ...children) {
  children.forEach((child) => {
    AddChild(parent, child);
  });
  return children;
}

// src/display/AddChildrenAt.ts
function AddChildrenAt(parent, index, ...children) {
  children.reverse().forEach((child) => {
    AddChildAt(parent, child, index);
  });
  return children;
}

// src/display/AddPosition.ts
function AddPosition(x, y, ...children) {
  children.forEach((child) => {
    child.x += x;
    child.y += y;
  });
  return children;
}

// src/display/AddRotation.ts
function AddRotation(rotation, ...children) {
  children.forEach((child) => {
    child.rotation += rotation;
  });
  return children;
}

// src/display/AddScale.ts
function AddScale(scaleX, scaleY, ...children) {
  children.forEach((child) => {
    child.scale.x += scaleX;
    child.scale.y += scaleY;
  });
  return children;
}

// src/display/AddSkew.ts
function AddSkew(skewX, skewY, ...children) {
  children.forEach((child) => {
    child.skew.x += skewX;
    child.skew.y += skewY;
  });
  return children;
}

// src/display/BringChildToTop.ts
function BringChildToTop(child) {
  const childID = child.id;
  const parentID = GetParentID(childID);
  const numChildren = GetNumChildren(parentID);
  const last = GetLastChildID(parentID);
  if (parentID && numChildren > 0 && childID !== last) {
    InsertChildIDAfter(last, childID);
    SetDirtyParents(childID);
  }
  return child;
}

// src/display/ConsoleTreeChildren.ts
function GetInfo(entry) {
  const legend = entry.getNumChildren() > 0 ? "Parent" : "Child";
  return `${legend} [ type=${entry.type}, id=${entry.id} name=${entry.name} ]`;
}
function LogChildren(entry) {
  console.group(GetInfo(entry));
  entry.getChildren().forEach((child) => {
    if (child.getNumChildren() > 0) {
      LogChildren(child);
    } else {
      console.log(GetInfo(child));
    }
  });
  console.groupEnd();
}
function ConsoleTreeChildren(parent) {
  const entries = parent.getChildren();
  if (parent.hasOwnProperty("tag")) {
    console.group("World");
  } else {
    console.group(GetInfo(parent));
  }
  entries.forEach((entry) => {
    if (entry.getNumChildren() > 0) {
      LogChildren(entry);
    } else {
      console.log(GetInfo(entry));
    }
  });
  console.groupEnd();
}

// src/display/CountMatchingChildren.ts
function CountMatchingChildren(parent, property, value) {
  const children = GetChildrenFromParentID(parent.id);
  let total = 0;
  children.forEach((child) => {
    if (property in child && (value === void 0 || child[property] === value)) {
      total++;
    }
  });
  return total;
}

// src/display/DepthFirstSearch.ts
function DepthFirstSearch(parent) {
  const children = DepthFirstSearchFromParentID(parent.id);
  return children.map((id) => GameObjectCache.get(id));
}

// src/display/DepthFirstSearchRecursive.ts
function DepthFirstSearchRecursive(parent, output = []) {
  for (const child of parent.getChildren()) {
    output.push(child);
    if (child.getNumChildren() > 0) {
      DepthFirstSearchRecursive(child, output);
    }
  }
  return output;
}

// src/display/RemoveChildrenBetween.ts
function RemoveChildrenBetween(parent, beginIndex = 0, endIndex) {
  const parentID = parent.id;
  if (endIndex === void 0) {
    endIndex = GetNumChildren(parentID);
  }
  const range = endIndex - beginIndex;
  if (range > 0 && range <= endIndex) {
    const children = GetChildIDsFromParent(parent);
    const removed2 = children.splice(beginIndex, range);
    removed2.forEach((childID) => {
      ClearWorldAndParentID(childID);
    });
    RelinkChildren(parentID, children);
    removed2.forEach((id) => parent.onRemoveChild(id));
    return removed2.map((id) => GameObjectCache.get(id));
  } else {
    return [];
  }
}

// src/display/DestroyChildren.ts
function DestroyChildren(parent, beginIndex = 0, endIndex) {
  const removed2 = RemoveChildrenBetween(parent, beginIndex, endIndex);
  removed2.forEach((child) => {
    child.destroy();
  });
  const world2 = GetWorldFromParentID(parent.id);
  if (world2) {
    world2.updateDisplayList = true;
  }
}

// src/components/color/ColorComponent.ts
var ColorComponent = defineComponent({
  r: Types.ui8c,
  g: Types.ui8c,
  b: Types.ui8c,
  a: Types.f32,
  colorMatrix: [Types.f32, 16],
  colorOffset: [Types.f32, 4]
});

// src/components/color/AddColorComponent.ts
function AddColorComponent(id) {
  addComponent(GameObjectWorld, ColorComponent, id);
  ColorComponent.r[id] = 255;
  ColorComponent.g[id] = 255;
  ColorComponent.b[id] = 255;
  ColorComponent.a[id] = 1;
  ColorComponent.colorMatrix[id].set(DEFAULT_COLOR_MATRIX);
}

// src/components/dirty/index.ts
var dirty_exports = {};
__export(dirty_exports, {
  AddDirtyComponent: () => AddDirtyComponent,
  ClearDirty: () => ClearDirty,
  ClearDirtyChildCache: () => ClearDirtyChildCache,
  ClearDirtyChildColor: () => ClearDirtyChildColor,
  ClearDirtyChildTransform: () => ClearDirtyChildTransform,
  ClearDirtyColor: () => ClearDirtyColor,
  ClearDirtyDisplayList: () => ClearDirtyDisplayList,
  ClearDirtyTransform: () => ClearDirtyTransform,
  ClearDirtyWorldTransform: () => ClearDirtyWorldTransform,
  DirtyComponent: () => DirtyComponent,
  HasDirtyChildCache: () => HasDirtyChildCache,
  HasDirtyChildColor: () => HasDirtyChildColor,
  HasDirtyChildTransform: () => HasDirtyChildTransform,
  HasDirtyColor: () => HasDirtyColor,
  HasDirtyDisplayList: () => HasDirtyDisplayList,
  HasDirtyTransform: () => HasDirtyTransform,
  HasDirtyWorldTransform: () => HasDirtyWorldTransform,
  IsDirty: () => IsDirty,
  SetDirty: () => SetDirty,
  SetDirtyChildCache: () => SetDirtyChildCache,
  SetDirtyChildColor: () => SetDirtyChildColor,
  SetDirtyChildTransform: () => SetDirtyChildTransform,
  SetDirtyColor: () => SetDirtyColor,
  SetDirtyDisplayList: () => SetDirtyDisplayList,
  SetDirtyParents: () => SetDirtyParents,
  SetDirtyTransform: () => SetDirtyTransform,
  SetDirtyWorldTransform: () => SetDirtyWorldTransform,
  WillUpdateTransform: () => WillUpdateTransform
});

// src/components/dirty/SetDirtyColor.ts
function SetDirtyColor(id) {
  DirtyComponent.data[id][DIRTY.COLOR] = 1;
  const world2 = GetWorldID(id);
  if (world2) {
    DirtyComponent.data[world2][DIRTY.CHILD_COLOR] = 1;
  }
}

// src/components/dirty/AddDirtyComponent.ts
function AddDirtyComponent(id) {
  addComponent(GameObjectWorld, DirtyComponent, id);
  SetDirtyColor(id);
}

// src/components/dirty/ClearDirty.ts
function ClearDirty(id) {
  DirtyComponent.data[id][DIRTY.SELF] = 0;
}

// src/components/dirty/ClearDirtyChildCache.ts
function ClearDirtyChildCache(id) {
  DirtyComponent.data[id][DIRTY.CHILD_CACHE] = 0;
}

// src/components/dirty/ClearDirtyChildColor.ts
function ClearDirtyChildColor(id) {
  DirtyComponent.data[id][DIRTY.CHILD_COLOR] = 0;
}

// src/components/dirty/ClearDirtyChildTransform.ts
function ClearDirtyChildTransform(id) {
  DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM] = 0;
}

// src/components/dirty/ClearDirtyColor.ts
function ClearDirtyColor(id) {
  DirtyComponent.data[id][DIRTY.COLOR] = 0;
}

// src/components/dirty/ClearDirtyDisplayList.ts
function ClearDirtyDisplayList(id) {
  DirtyComponent.data[id][DIRTY.DISPLAY_LIST] = 0;
}

// src/components/dirty/ClearDirtyWorldTransform.ts
function ClearDirtyWorldTransform(id) {
  DirtyComponent.data[id][DIRTY.WORLD_TRANSFORM] = 0;
}

// src/components/dirty/HasDirtyChildCache.ts
function HasDirtyChildCache(id) {
  return !!DirtyComponent.data[id][DIRTY.CHILD_CACHE];
}

// src/components/dirty/HasDirtyChildColor.ts
function HasDirtyChildColor(id) {
  return !!DirtyComponent.data[id][DIRTY.CHILD_COLOR];
}

// src/components/dirty/HasDirtyChildTransform.ts
function HasDirtyChildTransform(id) {
  return !!DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM];
}

// src/components/dirty/HasDirtyColor.ts
function HasDirtyColor(id) {
  return !!DirtyComponent.data[id][DIRTY.COLOR];
}

// src/components/dirty/HasDirtyDisplayList.ts
function HasDirtyDisplayList(id) {
  return !!DirtyComponent.data[id][DIRTY.DISPLAY_LIST];
}

// src/components/dirty/HasDirtyWorldTransform.ts
function HasDirtyWorldTransform(id) {
  return !!DirtyComponent.data[id][DIRTY.WORLD_TRANSFORM];
}

// src/components/dirty/IsDirty.ts
function IsDirty(id) {
  return !!DirtyComponent.data[id][DIRTY.SELF];
}

// src/components/dirty/SetDirty.ts
function SetDirty(id) {
  DirtyComponent.data[id][DIRTY.SELF] = 1;
}

// src/components/dirty/SetDirtyDisplayList.ts
function SetDirtyDisplayList(id) {
  DirtyComponent.data[id][DIRTY.DISPLAY_LIST] = 1;
}

// src/components/dirty/SetDirtyWorldTransform.ts
function SetDirtyWorldTransform(id) {
  DirtyComponent.data[id][DIRTY.WORLD_TRANSFORM] = 1;
}

// src/components/dirty/WillUpdateTransform.ts
function WillUpdateTransform(id) {
  const data = DirtyComponent.data[id];
  return !!(data[DIRTY.WORLD_TRANSFORM] || data[DIRTY.CHILD_TRANSFORM]);
}

// src/components/permissions/SetWillColorChildren.ts
function SetWillColorChildren(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_COLOR_CHILDREN] = Number(value);
}

// src/components/permissions/WillColorChildren.ts
function WillColorChildren(id) {
  return !!PermissionsComponent.data[id][PERMISSION.WILL_COLOR_CHILDREN];
}

// src/components/color/Color.ts
var Color2 = class {
  id;
  colorMatrixEnabled = false;
  constructor(id, red = 255, green = 255, blue = 255, alpha = 1) {
    AddColorComponent(id);
    this.id = id;
    this.set(red, green, blue, alpha);
  }
  set(red, green, blue, alpha) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
  set tint(value) {
    this.red = value >> 16 & 255;
    this.green = value >> 8 & 255;
    this.blue = value & 255;
  }
  get tint() {
    return this.red << 16 | this.green << 8 | this.blue;
  }
  set willColorChildren(value) {
    SetWillColorChildren(this.id, value);
  }
  get willColorChildren() {
    return WillColorChildren(this.id);
  }
  set colorMatrix(value) {
    ColorComponent.colorMatrix[this.id].set(value);
    SetDirtyColor(this.id);
    this.colorMatrixEnabled = true;
  }
  get colorMatrix() {
    return ColorComponent.colorMatrix[this.id];
  }
  set colorOffset(value) {
    ColorComponent.colorOffset[this.id].set(value);
    SetDirtyColor(this.id);
  }
  get colorOffset() {
    return ColorComponent.colorOffset[this.id];
  }
  set red(value) {
    ColorComponent.r[this.id] = value;
    SetDirtyColor(this.id);
  }
  get red() {
    return ColorComponent.r[this.id];
  }
  set green(value) {
    ColorComponent.g[this.id] = value;
    SetDirtyColor(this.id);
  }
  get green() {
    return ColorComponent.g[this.id];
  }
  set blue(value) {
    ColorComponent.b[this.id] = value;
    SetDirtyColor(this.id);
  }
  get blue() {
    return ColorComponent.b[this.id];
  }
  set alpha(value) {
    ColorComponent.a[this.id] = value;
    SetDirtyColor(this.id);
  }
  get alpha() {
    return ColorComponent.a[this.id];
  }
};

// src/components/permissions/AddPermissionsComponent.ts
function AddPermissionsComponent(id) {
  addComponent(GameObjectWorld, PermissionsComponent, id);
  PermissionsComponent.data[id].set([1, 1, 1, 1, 1, 1, 0, 1, 1, 0]);
}

// src/components/permissions/GetVisible.ts
function GetVisible(id) {
  return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE]);
}

// src/display/ReparentChildren.ts
function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
  const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
  moved.forEach((child) => {
    AddChild(newParent, child);
  });
  return moved;
}

// src/components/permissions/SetVisible.ts
function SetVisible(id, value) {
  PermissionsComponent.data[id][PERMISSION.VISIBLE] = Number(value);
  SetDirtyParents(id);
}

// src/components/permissions/SetVisibleChildren.ts
function SetVisibleChildren(id, value) {
  PermissionsComponent.data[id][PERMISSION.VISIBLE_CHILDREN] = Number(value);
  SetDirtyParents(id);
}

// src/components/permissions/WillRender.ts
function WillRender(id) {
  return !!PermissionsComponent.data[id][PERMISSION.VISIBLE] && !!PermissionsComponent.data[id][PERMISSION.WILL_RENDER];
}

// src/gameobjects/GameObject.ts
var GameObject = class {
  id = addEntity(GameObjectWorld);
  type = "GameObject";
  name = "";
  events;
  constructor() {
    const id = this.id;
    AddHierarchyComponent(id);
    AddPermissionsComponent(id);
    AddDirtyComponent(id);
    GameObjectCache.set(id, this);
  }
  isRenderable() {
    return WillRender(this.id);
  }
  beforeUpdate(delta, time) {
  }
  update(delta, time) {
  }
  afterUpdate(delta, time) {
  }
  preRenderGL(renderPass) {
  }
  renderGL(renderPass) {
  }
  renderCanvas(renderer) {
  }
  postRenderGL(renderPass) {
  }
  postRenderCanvas(renderer) {
  }
  set visible(value) {
    SetVisible(this.id, value);
  }
  get visible() {
    return GetVisible(this.id);
  }
  set visibleChildren(value) {
    SetVisibleChildren(this.id, value);
  }
  get visibleChildren() {
    return GetVisibleChildren(this.id);
  }
  hasParent(id) {
    const parentID = GetParentID(this.id);
    if (id) {
      return parentID === id;
    } else {
      return parentID > 0;
    }
  }
  getParent() {
    return GetParentGameObject(this.id);
  }
  getChildren(renderPass) {
    return GetChildrenFromParentID(this.id);
  }
  getNumChildren() {
    return GetNumChildren(this.id);
  }
  onAddChild(childID) {
  }
  onUpdateChild(childID) {
  }
  onRemoveChild(childID) {
  }
  getDisplayData() {
    const id = this.id;
    const data = HierarchyComponent.data[id];
    return {
      id,
      parent: data[HIERARCHY.PARENT],
      world: data[HIERARCHY.WORLD],
      numChildren: data[HIERARCHY.NUM_CHILDREN]
    };
  }
  toString() {
    return `${this.type} id="${this.id}" name="${this.name}"`;
  }
  destroy(reparentChildren) {
    if (reparentChildren) {
      ReparentChildren(this, reparentChildren);
    } else {
      DestroyChildren(this);
    }
  }
};

// src/config/defaultorigin/GetDefaultOriginX.ts
function GetDefaultOriginX() {
  return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).x;
}

// src/config/defaultorigin/GetDefaultOriginY.ts
function GetDefaultOriginY() {
  return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).y;
}

// src/components/transform/Origin.ts
var Origin = class {
  id;
  _x;
  _y;
  _data;
  constructor(id, x = 0, y = 0) {
    this.id = id;
    this._data = Transform2DComponent.data[id];
    this.set(x, y);
  }
  set(x, y = x) {
    const data = this._data;
    this._x = x;
    this._y = y;
    data[TRANSFORM.ORIGIN_X] = x;
    data[TRANSFORM.ORIGIN_Y] = y;
    UpdateExtent(this.id, data[TRANSFORM.FRAME_WIDTH], data[TRANSFORM.FRAME_HEIGHT]);
    return this;
  }
  set x(value) {
    const data = this._data;
    this._x = value;
    data[TRANSFORM.ORIGIN_X] = value;
    UpdateExtent(this.id, data[TRANSFORM.FRAME_WIDTH], data[TRANSFORM.FRAME_HEIGHT]);
  }
  get x() {
    return this._x;
  }
  set y(value) {
    const data = this._data;
    this._y = value;
    data[TRANSFORM.ORIGIN_Y] = value;
    UpdateExtent(this.id, data[TRANSFORM.FRAME_WIDTH], data[TRANSFORM.FRAME_HEIGHT]);
  }
  get y() {
    return this._y;
  }
  destroy() {
    this._data = null;
  }
};

// src/components/transform/Scale.ts
var Scale = class {
  id;
  _x;
  _y;
  _data;
  constructor(id, x = 1, y = 1) {
    this.id = id;
    this._data = Transform2DComponent.data[id];
    this.set(x, y);
  }
  set(x, y = x) {
    this.x = x;
    this.y = y;
    return this;
  }
  set x(value) {
    this._x = value;
    this._data[TRANSFORM.SCALE_X] = value;
    SetDirtyTransform(this.id);
  }
  get x() {
    return this._x;
  }
  set y(value) {
    this._y = value;
    this._data[TRANSFORM.SCALE_Y] = value;
    SetDirtyTransform(this.id);
  }
  get y() {
    return this._y;
  }
  destroy() {
    this._data = null;
  }
};

// src/components/transform/UpdateAxisAligned.ts
function UpdateAxisAligned(id) {
  const data = Transform2DComponent.data[id];
  const rotation = data[TRANSFORM.ROTATION];
  const skewX = data[TRANSFORM.SKEW_X];
  const skewY = data[TRANSFORM.SKEW_Y];
  data[TRANSFORM.AXIS_ALIGNED] = Number(rotation === 0 && skewX === 0 && skewY === 0);
}

// src/components/transform/Skew.ts
var Skew = class {
  id;
  _x;
  _y;
  _data;
  constructor(id, x = 0, y = 0) {
    this.id = id;
    this._data = Transform2DComponent.data[id];
    this.set(x, y);
  }
  set(x, y = x) {
    this.x = x;
    this.y = y;
    return this;
  }
  set x(value) {
    this._x = value;
    this._data[TRANSFORM.SKEW_X] = value;
    const id = this.id;
    UpdateAxisAligned(id);
    SetDirtyTransform(id);
  }
  get x() {
    return this._x;
  }
  set y(value) {
    this._y = value;
    this._data[TRANSFORM.SKEW_Y] = value;
    const id = this.id;
    UpdateAxisAligned(id);
    SetDirtyTransform(id);
  }
  get y() {
    return this._y;
  }
  destroy() {
    this._data = null;
  }
};

// src/gameobjects/container/Container.ts
var Container = class extends GameObject {
  type = "Container";
  position;
  scale;
  skew;
  origin;
  size;
  color;
  shader;
  _rotation = 0;
  constructor(x = 0, y = 0) {
    super();
    const id = this.id;
    AddTransform2DComponent(id);
    this.position = new Position(id, x, y);
    this.scale = new Scale(id);
    this.skew = new Skew(id);
    this.size = new Size(id);
    this.origin = new Origin(id, GetDefaultOriginX(), GetDefaultOriginY());
    this.color = new Color2(id);
  }
  renderGL(renderPass) {
    if (this.shader) {
      Flush(renderPass);
      SetShader(this.shader, 0);
    }
    SetColor(renderPass, this.color);
    this.preRenderGL(renderPass);
  }
  postRenderGL(renderPass) {
    if (this.shader) {
      Flush(renderPass);
      PopShader();
    }
    PopColor(renderPass, this.color);
  }
  set x(value) {
    this.position.x = value;
  }
  get x() {
    return this.position.x;
  }
  set y(value) {
    this.position.y = value;
  }
  get y() {
    return this.position.y;
  }
  set rotation(value) {
    this._rotation = value;
    const id = this.id;
    Transform2DComponent.data[id][TRANSFORM.ROTATION] = value;
    UpdateAxisAligned(id);
    SetDirtyTransform(id);
  }
  get rotation() {
    return this._rotation;
  }
  get alpha() {
    return this.color.alpha;
  }
  set alpha(value) {
    this.color.alpha = value;
  }
  setAlpha(value) {
    this.alpha = value;
    return this;
  }
  setPosition(x, y) {
    this.position.set(x, y);
    return this;
  }
  setScale(x, y) {
    this.scale.set(x, y);
    return this;
  }
  setRotation(value) {
    this.rotation = value;
    return this;
  }
  setSkew(x, y) {
    this.skew.set(x, y);
    return this;
  }
  setOrigin(x, y) {
    this.origin.set(x, y);
    return this;
  }
  getBounds() {
    const data = Transform2DComponent.data[this.id];
    const x = data[TRANSFORM.BOUNDS_X1];
    const y = data[TRANSFORM.BOUNDS_Y1];
    const right = data[TRANSFORM.BOUNDS_X2];
    const bottom = data[TRANSFORM.BOUNDS_Y2];
    return new Rectangle(x, y, right - x, bottom - y);
  }
  destroy(reparentChildren) {
    this.position.destroy();
    this.scale.destroy();
    this.skew.destroy();
    this.origin.destroy();
    super.destroy(reparentChildren);
  }
};

// src/display/FindChildrenByName.ts
function FindChildrenByName(parent, searchString) {
  const children = DepthFirstSearch(parent);
  const regex = RegExp(searchString);
  return children.filter((child) => regex.test(child.name));
}

// src/display/GetAllChildren.ts
function GetAllChildren(parent, property, value) {
  const children = DepthFirstSearch(parent);
  if (!property) {
    return children;
  }
  return children.filter((child) => {
    return property in child && (value === void 0 || child[property] === value);
  });
}

// src/components/transform/GetLocalBounds.ts
function GetLocalBounds(id) {
  const data = Transform2DComponent.data[id];
  const left = data[TRANSFORM.BOUNDS_X1];
  const top = data[TRANSFORM.BOUNDS_Y1];
  const right = data[TRANSFORM.BOUNDS_X2];
  const bottom = data[TRANSFORM.BOUNDS_Y2];
  return { left, top, right, bottom };
}

// src/display/GetBounds.ts
function GetBounds(...children) {
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  children.forEach((child) => {
    const childID = child.id;
    if (hasComponent(GameObjectWorld, Transform2DComponent, childID)) {
      const { left, top, right, bottom } = GetLocalBounds(childID);
      if (left < minX) {
        minX = left;
      }
      if (top < minY) {
        minY = top;
      }
      if (right > maxX) {
        maxX = right;
      }
      if (bottom > maxY) {
        maxY = bottom;
      }
    }
  });
  return new Rectangle(minX, minY, maxX, maxY);
}

// src/display/GetChildAt.ts
function GetChildAt(parent, index) {
  const parentID = parent.id;
  if (index < 0 || index > GetNumChildren(parentID)) {
    throw new Error(`Index out of bounds: ${index}`);
  }
  const childID = GetChildIDAtIndex(parentID, index);
  return GameObjectCache.get(childID);
}

// src/display/GetChildIndex.ts
function GetChildIndex(child) {
  const childID = child.id;
  let index = 0;
  let prev = GetPreviousSiblingID(childID);
  while (prev > 0) {
    prev = GetPreviousSiblingID(childID);
    index++;
  }
  return index;
}

// src/display/GetChildren.ts
function GetChildren(parent, property, value) {
  const children = GetChildrenFromParentID(parent.id);
  if (!property) {
    return [...children];
  }
  return children.filter((child) => {
    return property in child && (value === void 0 || child[property] === value);
  });
}

// src/math/vec2/GetVec2DistanceSquared.ts
function GetVec2DistanceSquared(a, b) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  return x * x + y * y;
}

// src/math/vec2/GetVec2Distance.ts
function GetVec2Distance(a, b) {
  return Math.sqrt(GetVec2DistanceSquared(a, b));
}

// src/display/GetClosestChild.ts
function GetClosestChild(parent, point) {
  const children = GetChildrenFromParentID(parent.id);
  let closest = null;
  let distance = 0;
  children.forEach((child) => {
    if (hasComponent(GameObjectWorld, Transform2DComponent, child.id)) {
      const childDistance = GetVec2Distance(point, child.position);
      if (!closest || childDistance < distance) {
        closest = child;
        distance = childDistance;
      }
    }
  });
  return closest;
}

// src/display/GetFirstChild.ts
function GetFirstChild(parent, property, value) {
  const children = GetChildrenFromParentID(parent.id);
  if (!property) {
    return children[0];
  }
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (property in child && (value === void 0 || child[property] === value)) {
      return child;
    }
  }
}

// src/display/GetFirstChildByName.ts
function GetFirstChildByName(parent, searchString) {
  const children = DepthFirstSearch(parent);
  const regex = RegExp(searchString);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (regex.test(child.name)) {
      return child;
    }
  }
}

// src/display/GetFurthestChild.ts
function GetFurthestChild(parent, point) {
  const children = GetChildrenFromParentID(parent.id);
  let furthest = null;
  let distance = 0;
  children.forEach((child) => {
    if (hasComponent(GameObjectWorld, Transform2DComponent, child.id)) {
      const childDistance = GetVec2Distance(point, child.position);
      if (!furthest || childDistance > distance) {
        furthest = child;
        distance = childDistance;
      }
    }
  });
  return furthest;
}

// src/display/GetLastChild.ts
function GetLastChild(parent, property, value) {
  const children = GetChildrenFromParentID(parent.id);
  if (!property) {
    return children.pop();
  }
  for (let i = children.length; i >= 0; i--) {
    const child = children[i];
    if (property in child && (value === void 0 || child[property] === value)) {
      return child;
    }
  }
}

// src/display/GetParents.ts
function GetParents2(child) {
  const parents = [];
  let currentParent;
  while (child.hasParent()) {
    currentParent = child.getParent();
    parents.push(currentParent);
    child = currentParent;
  }
  return parents;
}

// src/utils/array/GetRandom.ts
function GetRandom(array, startIndex = 0, length) {
  if (!length) {
    length = array.length;
  }
  const randomIndex = startIndex + Math.floor(Math.random() * length);
  return array[randomIndex];
}

// src/display/GetRandomChild.ts
function GetRandomChild(parent, startIndex = 0, length) {
  const children = GetChildIDsFromParentID(parent.id);
  if (children.length > 0) {
    const random = GetRandom(children, startIndex, length);
    return GameObjectCache.get(random);
  }
}

// src/display/MoveChildDown.ts
function MoveChildDown(child) {
  const childID = child.id;
  const prevID = GetPreviousSiblingID(childID);
  if (prevID) {
    RemoveChildID(childID);
    InsertChildIDBefore(prevID, childID);
  }
  return child;
}

// src/display/MoveChildUp.ts
function MoveChildUp(child) {
  const childID = child.id;
  const nextID = GetNextSiblingID(childID);
  if (nextID) {
    RemoveChildID(childID);
    InsertChildIDAfter(nextID, childID);
  }
  return child;
}

// src/display/RemoveChild.ts
function RemoveChild(parent, child) {
  const childID = child.id;
  const parentID = parent.id;
  if (child.hasParent(parentID)) {
    RemoveChildID(childID);
    DecreaseNumChildren(parentID);
    parent.onRemoveChild(childID);
  }
  return child;
}

// src/display/RemoveChildAt.ts
function RemoveChildAt(parent, index) {
  const child = GetChildAt(parent, index);
  return RemoveChild(parent, child);
}

// src/display/RemoveChildren.ts
function RemoveChildren(parent, ...children) {
  children.forEach((child) => {
    RemoveChild(parent, child);
  });
  return children;
}

// src/display/RemoveChildrenAt.ts
function RemoveChildrenAt(parent, ...index) {
  const removed2 = [];
  index.sort((a, b) => a - b);
  index.reverse().forEach((i) => {
    const child = RemoveChildAt(parent, i);
    if (child) {
      removed2.push(child);
    }
  });
  return removed2;
}

// src/display/ClearWorld.ts
function ClearWorld(childID) {
  const worldID = HierarchyComponent.data[childID][HIERARCHY.WORLD];
  if (worldID !== 0) {
    const world2 = GameObjectCache.get(worldID);
    removeComponent(GameObjectWorld, world2.tag, childID);
    HierarchyComponent.data[childID][HIERARCHY.WORLD] = 0;
    world2.updateDisplayList = true;
  }
}

// src/display/RemoveWorld.ts
function RemoveWorld(world2, ...children) {
  children.forEach((child) => {
    ClearWorld(child.id);
  });
  return children;
}

// src/display/ReplaceChild.ts
function ReplaceChild(target, source) {
  const targetID = target.id;
  const sourceID = source.id;
  const targetParentID = GetParentID(targetID);
  const sourceParentID = GetParentID(sourceID);
  if (targetParentID === sourceParentID) {
    if (GetNumChildren(targetParentID) === 2) {
      RemoveChildID(targetID);
    } else {
      const targetNextID = GetNextSiblingID(targetID);
      const targetPrevID = GetPreviousSiblingID(targetID);
      RemoveChildID(targetID);
      RemoveChildID(sourceID);
      if (targetNextID) {
        InsertChildIDBefore(targetNextID, sourceID);
      } else {
        InsertChildIDAfter(targetPrevID, sourceID);
      }
    }
    DecreaseNumChildren(targetParentID);
  } else {
    const targetNextID = GetNextSiblingID(targetID);
    const targetPrevID = GetPreviousSiblingID(targetID);
    RemoveChildID(targetID);
    RemoveChildID(sourceID);
    DecreaseNumChildren(sourceParentID);
    if (targetNextID) {
      InsertChildIDBefore(targetNextID, sourceID);
    } else {
      InsertChildIDAfter(targetPrevID, sourceID);
    }
  }
  return target;
}

// src/display/RotateChildrenLeft.ts
function RotateChildrenLeft(parent, total = 1) {
  const parentID = parent.id;
  for (let i = 0; i < total; i++) {
    const first = GetFirstChildID(parentID);
    const last = GetLastChildID(parentID);
    RemoveChildID(first);
    AddChildIDAfter(last, first);
  }
  return parent;
}

// src/display/RotateChildrenRight.ts
function RotateChildrenRight(parent, total = 1) {
  const parentID = parent.id;
  for (let i = 0; i < total; i++) {
    const first = GetFirstChildID(parentID);
    const last = GetLastChildID(parentID);
    RemoveChildID(last);
    AddChildIDBefore(first, last);
  }
  return parent;
}

// src/display/SendChildToBack.ts
function SendChildToBack(child) {
  const childID = child.id;
  const parentID = GetParentID(childID);
  const numChildren = GetNumChildren(parentID);
  const first = GetFirstChildID(parentID);
  if (parentID && numChildren > 0 && childID !== first) {
    InsertChildIDBefore(first, childID);
    SetDirtyParents(childID);
  }
  return child;
}

// src/display/SetChildrenValue.ts
function SetChildrenValue(parent, property, value) {
  const children = DepthFirstSearch(parent);
  children.forEach((child) => {
    if (property in child) {
      child[property] = value;
    }
  });
  return children;
}

// src/display/SetName.ts
function SetName(name, ...children) {
  children.forEach((child) => {
    child.name = name;
  });
  return children;
}

// src/display/SetOrigin.ts
function SetOrigin(originX, originY, ...children) {
  children.forEach((child) => {
    child.origin.set(originX, originY);
  });
  return children;
}

// src/display/SetPosition.ts
function SetPosition(x, y, ...children) {
  children.forEach((child) => {
    child.position.set(x, y);
  });
  return children;
}

// src/display/SetRotation.ts
function SetRotation(rotation, ...children) {
  children.forEach((child) => {
    child.rotation = rotation;
  });
  return children;
}

// src/display/SetScale.ts
function SetScale(scaleX, scaleY, ...children) {
  children.forEach((child) => {
    child.scale.set(scaleX, scaleY);
  });
  return children;
}

// src/display/SetSize.ts
function SetSize2(width, height, ...children) {
  children.forEach((child) => {
    child.size.set(width, height);
  });
  return children;
}

// src/display/SetSkew.ts
function SetSkew(skewX, skewY, ...children) {
  children.forEach((child) => {
    child.skew.set(skewX, skewY);
  });
  return children;
}

// src/display/SetValue.ts
function SetValue(property, value, ...children) {
  children.forEach((child) => {
    if (property in child) {
      child[property] = value;
    }
  });
  return children;
}

// src/display/SetVisible.ts
function SetVisible2(visible, ...children) {
  children.forEach((child) => {
    child.visible = visible;
  });
  return children;
}

// src/display/SetWorld.ts
function SetWorld(world2, ...entries) {
  const worldID = world2.id;
  const worldTag = world2.tag;
  let setNewWorld = false;
  entries.forEach((entry) => {
    const currentWorldID = GetWorldID(entry.id);
    const children = DepthFirstSearchFromParentID(entry.id, false);
    children.map((id) => {
      if (currentWorldID !== worldID) {
        if (currentWorldID > 0) {
          ClearWorld(id);
        }
        addComponent(GameObjectWorld, worldTag, id);
        SetWorldID(id, worldID);
        setNewWorld = true;
      }
    });
  });
  if (setNewWorld) {
    world2.updateDisplayList = true;
  }
  return entries;
}

// src/utils/array/Shuffle.ts
function Shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// src/display/ShuffleChildren.ts
function ShuffleChildren(parent) {
  const children = GetChildIDsFromParent(parent);
  Shuffle(children);
  RelinkChildren(parent.id, children);
  return parent.getChildren();
}

// src/display/SortChildren.ts
function SortChildren(parent, propertyGetter) {
  const parentID = parent.id;
  const children = GetChildIDsFromParentID(parentID);
  children.sort((a, b) => {
    const childA = GameObjectCache.get(a);
    const childB = GameObjectCache.get(b);
    return propertyGetter(childA) - propertyGetter(childB);
  });
  RelinkChildren(parentID, children);
  return parent.getChildren();
}

// src/components/vertices/QuadVertexComponent.ts
var QuadVertexComponent = defineComponent({
  values: [Types.f32, 54]
});

// src/components/vertices/SetQuadColor.ts
function SetQuadColor(id, red, green, blue, alpha) {
  const data = QuadVertexComponent.values[id];
  data[5] = red;
  data[6] = green;
  data[7] = blue;
  data[8] = alpha;
  data[14] = red;
  data[15] = green;
  data[16] = blue;
  data[17] = alpha;
  data[23] = red;
  data[24] = green;
  data[25] = blue;
  data[26] = alpha;
  data[32] = red;
  data[33] = green;
  data[34] = blue;
  data[35] = alpha;
  data[41] = red;
  data[42] = green;
  data[43] = blue;
  data[44] = alpha;
  data[50] = red;
  data[51] = green;
  data[52] = blue;
  data[53] = alpha;
}

// src/components/vertices/SetQuadPosition.ts
function SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3) {
  const data = QuadVertexComponent.values[id];
  data[0] = x0;
  data[1] = y0;
  data[9] = x1;
  data[10] = y1;
  data[18] = x2;
  data[19] = y2;
  data[27] = x0;
  data[28] = y0;
  data[36] = x2;
  data[37] = y2;
  data[45] = x3;
  data[46] = y3;
}

// src/components/vertices/SetUV.ts
function SetUV(id, u0, v0, u1, v1) {
  const data = QuadVertexComponent.values[id];
  data[2] = u0;
  data[3] = v0;
  data[11] = u0;
  data[12] = v1;
  data[20] = u1;
  data[21] = v1;
  data[29] = u0;
  data[30] = v0;
  data[38] = u1;
  data[39] = v1;
  data[47] = u1;
  data[48] = v0;
}

// src/components/vertices/AddQuadVertex.ts
function AddQuadVertex(id, width = 0, height = 0) {
  addComponent(GameObjectWorld, QuadVertexComponent, id);
  if (width || height) {
    SetUV(id, 0, 0, 1, 1);
    SetQuadColor(id, 1, 1, 1, 1);
    SetQuadPosition(id, 0, 0, 0, height, width, height, width, 0);
  }
}

// src/components/vertices/SetQuadTextureIndex.ts
function SetQuadTextureIndex(id, textureIndex) {
  const data = QuadVertexComponent.values[id];
  if (data[4] !== textureIndex) {
    data[4] = textureIndex;
    data[13] = textureIndex;
    data[22] = textureIndex;
    data[31] = textureIndex;
    data[40] = textureIndex;
    data[49] = textureIndex;
  }
}

// src/renderer/webgl1/draw/BatchTexturedQuadBuffer.ts
function BatchTexturedQuadBuffer(texture, id, renderPass) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  const textureIndex = SetTexture(texture);
  SetQuadTextureIndex(id, textureIndex);
  F32.set(QuadVertexComponent.values[id], offset);
}

// src/components/transform/SetExtent.ts
function SetExtent(id, x, y, width, height) {
  const data = Transform2DComponent.data[id];
  data[TRANSFORM.FRAME_X1] = x;
  data[TRANSFORM.FRAME_Y1] = y;
  data[TRANSFORM.FRAME_X2] = x + width;
  data[TRANSFORM.FRAME_Y2] = y + height;
  data[TRANSFORM.FRAME_WIDTH] = width;
  data[TRANSFORM.FRAME_HEIGHT] = height;
  SetDirtyTransform(id);
}

// src/textures/SetExtentFromFrame.ts
function SetExtentFromFrame(child, frame2) {
  const originX = child.origin.x;
  const originY = child.origin.y;
  const sourceSizeWidth = frame2.sourceSizeWidth;
  const sourceSizeHeight = frame2.sourceSizeHeight;
  let x;
  let y;
  let width;
  let height;
  if (frame2.trimmed) {
    x = frame2.spriteSourceSizeX - originX * sourceSizeWidth;
    y = frame2.spriteSourceSizeY - originY * sourceSizeHeight;
    width = frame2.spriteSourceSizeWidth;
    height = frame2.spriteSourceSizeHeight;
  } else {
    x = -originX * sourceSizeWidth;
    y = -originY * sourceSizeHeight;
    width = sourceSizeWidth;
    height = sourceSizeHeight;
  }
  SetExtent(child.id, x, y, width, height);
  return child;
}

// src/textures/SetVertexUVsFromFrame.ts
function SetVertexUVsFromFrame(id, frame2) {
  SetUV(id, frame2.u0, frame2.v0, frame2.u1, frame2.v1);
  return frame2;
}

// src/gameobjects/sprite/SetFrame.ts
function SetFrame(texture, key, ...children) {
  const frame2 = texture.getFrame(key);
  const pivot = frame2.pivot;
  children.forEach((child) => {
    if (!child || frame2 === child.frame) {
      return;
    }
    child.frame = frame2;
    child.hasTexture = true;
    if (pivot) {
      child.origin.set(pivot.x, pivot.y);
    }
    SetExtentFromFrame(child, frame2);
    SetVertexUVsFromFrame(child.id, frame2);
  });
  return children;
}

// src/gameobjects/sprite/SetTexture.ts
function SetTexture2(key, frame2, ...children) {
  if (!key) {
    children.forEach((child) => {
      child.texture = null;
      child.frame = null;
      child.hasTexture = false;
    });
  } else {
    let texture;
    if (key instanceof Frame) {
      frame2 = key;
      texture = key.texture;
    } else if (key instanceof Texture) {
      texture = key;
    } else {
      texture = GetTexture(key);
    }
    if (!texture) {
      console.warn(`Invalid Texture key: ${key}`);
    } else {
      children.forEach((child) => {
        child.texture = texture;
      });
      SetFrame(texture, frame2, ...children);
    }
  }
  return children;
}

// src/gameobjects/sprite/Sprite.ts
var Sprite = class extends Container {
  type = "Sprite";
  texture;
  frame;
  hasTexture = false;
  constructor(x, y, texture = "__BLANK", frame2) {
    super(x, y);
    AddQuadVertex(this.id);
    this.setTexture(texture, frame2);
  }
  setTexture(key, frame2) {
    SetTexture2(key, frame2, this);
    return this;
  }
  setFrame(key) {
    SetFrame(this.texture, key, this);
    return this;
  }
  isRenderable() {
    return this.visible && this.hasTexture && WillRender(this.id) && this.alpha > 0;
  }
  renderGL(renderPass) {
    const color = this.color;
    if (this.shader) {
      Flush(renderPass);
      SetShader(this.shader, 0);
    }
    if (color.colorMatrixEnabled) {
      SetColorMatrix(color);
    }
    this.preRenderGL(renderPass);
    BatchTexturedQuadBuffer(this.texture, this.id, renderPass);
    if (color.colorMatrixEnabled && !color.willColorChildren) {
      Flush(renderPass);
      PopColorMatrix();
    }
  }
  renderCanvas(renderer) {
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.texture = null;
    this.frame = null;
    this.hasTexture = false;
  }
};

// src/display/SwapChildren.ts
function SwapChildren(child1, child2) {
  const child1ID = child1.id;
  const child2ID = child2.id;
  const parentID = GetParentID(child1ID);
  if (child2.hasParent(parentID)) {
    if (GetNextSiblingID(child1ID) === child2ID) {
      MoveChildUp(child1);
    } else if (GetPreviousSiblingID(child1ID) === child2ID) {
      MoveChildDown(child1);
    } else {
      const child1NextID = GetNextSiblingID(child1ID);
      const child1PrevID = GetPreviousSiblingID(child1ID);
      const child2NextID = GetNextSiblingID(child2ID);
      const child2PrevID = GetPreviousSiblingID(child2ID);
      RemoveChildID(child1ID);
      RemoveChildID(child2ID);
      if (child1NextID) {
        InsertChildIDBefore(child1NextID, child2ID);
      } else if (child1PrevID) {
        InsertChildIDAfter(child1PrevID, child2ID);
      }
      if (child2NextID) {
        InsertChildIDBefore(child2NextID, child1ID);
      } else if (child2PrevID) {
        InsertChildIDAfter(child2PrevID, child1ID);
      }
    }
  }
}

// src/display/DisplayDebugTools.ts
function DisplayDebugTools(world2) {
  const logHelp = [
    "%cPhaser 4 Display Debug Tools Help:",
    "%c"
  ];
  const logCSS = [
    "color: red;",
    "color: white;"
  ];
  const logCommands = [
    "%cPhaser 4 Display Debug Tools Commands:",
    "%c"
  ];
  const logCommandsCSS = [
    "color: red;",
    "color: white;"
  ];
  const addHelp = (command, description = "") => {
    logHelp.push(`%c${command}  %c${description}`);
    logCSS.push("color: blue");
    logCSS.push("color: black");
  };
  const addCommand = (command, description = "") => {
    logCommands.push(`%c${command}  %c${description}`);
    logCommandsCSS.push("color: blue");
    logCommandsCSS.push("color: black");
  };
  const top = window.parent.top;
  top["world"] = world2;
  addHelp("world", "A reference to the World instance");
  top["List"] = (parent = world2) => {
    ConsoleTreeChildren(parent);
  };
  addHelp("List(parent?)", "Dump the Display List to the console");
  top["Container"] = (x, y) => {
    return new Container(x, y);
  };
  addHelp("Container(x, y)", "Create and return a new Container Game Object");
  top["Sprite"] = (x, y, key, frame2) => {
    return new Sprite(x, y, key, frame2);
  };
  addHelp("Sprite(x, y, key, frame?)", "Create and return a new Sprite Game Object");
  top["Textures"] = () => {
    for (const key of TextureManagerInstance.get().textures.keys()) {
      console.log(key);
    }
  };
  addHelp("Textures()", "List all of the textures loaded into the Texture Manager");
  top["Frames"] = (texture) => {
    for (const key of GetTexture(texture).frames.keys()) {
      console.log(key);
    }
  };
  addHelp("Frames(textureKey)", "List all of the frames in the given Texture");
  top["GetParentID"] = (child) => {
    return GetParentID(child.id);
  };
  addHelp("GetParentID(child)", "Return the Parent ID");
  top["SaveList"] = (name) => {
    const entries = DepthFirstSearch(world2);
    console.log(entries);
  };
  top["LoadList"] = (name) => {
  };
  addHelp("");
  top["AddChild"] = (parent, child) => {
    return AddChild(parent, child);
  };
  addCommand("AddChild(parent, child)", "Add the child to the parent");
  top["AddChildAfter"] = (after, child) => {
    return AddChildAfter(after, child);
  };
  addCommand("AddChildAfter(after, child)", "Add the child after the other");
  top["AddChildAt"] = (parent, child, index = 0) => {
    return AddChildAt(parent, child, index);
  };
  addCommand("AddChildAt(parent, child, index?)", "Add the child to the parent at the given index");
  top["AddChildBefore"] = (before, child) => {
    return AddChildBefore(before, child);
  };
  addCommand("AddChildBefore(before, child)", "Add the child before the other");
  top["AddChildren"] = (parent = world2, ...children) => {
    return AddChildren(parent, ...children);
  };
  addCommand("AddChildren(parent, ...children)", "Add all children to the parent");
  top["AddChildrenAt"] = (parent = world2, index = 0, ...children) => {
    return AddChildrenAt(parent, index, ...children);
  };
  addCommand("AddChildrenAt(parent, index, ...children)", "Add all children to the parent at the given index");
  top["BringChildToTop"] = (child) => {
    return BringChildToTop(child);
  };
  addCommand("BringChildToTop(child)", "Moves the child to the top of its parents display list");
  top["CountMatchingChildren"] = (parent, property, value) => {
    return CountMatchingChildren(parent, property, value);
  };
  addCommand("CountMatchingChildren(parent, property, value?)", "How many children match the property and value");
  top["DepthFirstSearch"] = (parent = world2) => {
    return DepthFirstSearch(parent);
  };
  addCommand("DepthFirstSearch(parent?)", "Return all children from a DFS of the parent");
  top["DepthFirstSearchRecursive"] = (parent = world2) => {
    return DepthFirstSearchRecursive(parent);
  };
  addCommand("DepthFirstSearchRecursive(parent?)", "Return all children from a recursive DFS of the parent");
  top["DestroyChildren"] = (parent = world2, beginIndex = 0, endIndex) => {
    return DestroyChildren(parent, beginIndex, endIndex);
  };
  addCommand("DestroyChildren(parent?, beginIndex?, endIndex?)", "Destroy all children optionally between the indexes");
  top["FindChildrenByName"] = (parent, searchString) => {
    return FindChildrenByName(parent, searchString);
  };
  addCommand("FindChildrenByName(parent, searchString)", "Return all children with a name matching the string or regexp");
  top["GetAllChildren"] = (parent, property, value) => {
    return GetAllChildren(parent, property, value);
  };
  addCommand("GetAllChildren(parent, property?, value?)", "Return all children of the parent in a deep scan");
  top["GetBounds"] = (children) => {
    return GetBounds(...children);
  };
  addCommand("GetBounds(...children)", "Get the bounds of all children added together");
  top["GetChildAt"] = (parent, index) => {
    return GetChildAt(parent, index);
  };
  addCommand("GetChildAt(parent, index)", "Return the child at the given index");
  top["GetChildIndex"] = (child) => {
    return GetChildIndex(child);
  };
  addCommand("GetChildIndex(child)", "Get the index of the child within the parent display list");
  top["GetChildren"] = (parent, property, value) => {
    return GetChildren(parent, property, value);
  };
  addCommand("GetChildren(parent, property?, value?)", "Return all direct children of the parent");
  top["GetClosestChild"] = (parent, point) => {
    return GetClosestChild(parent, point);
  };
  addCommand("GetClosestChild(parent, IVec2Like point)", "Return the child closest to the given vector point");
  top["GetFirstChild"] = (parent, property, value) => {
    return GetFirstChild(parent, property, value);
  };
  addCommand("GetFirstChild(parent, property?, value?)", "Return the first child, optionally matching the given property and value");
  top["GetFirstChildByName"] = (parent, searchString) => {
    return GetFirstChildByName(parent, searchString);
  };
  addCommand("GetFirstChildByName(parent, searchString)", "Return the first child matching the string or regexp");
  top["GetFurthestChild"] = (parent, point) => {
    return GetFurthestChild(parent, point);
  };
  addCommand("GetFurthestChild(parent, IVec2Like point)", "Return the child furthest away from the given vector point");
  top["GetLastChild"] = (parent, property, value) => {
    return GetLastChild(parent, property, value);
  };
  addCommand("GetLastChild(parent, property?, value?)", "Return the last child, optionally matching the given property and value");
  top["GetParents"] = (child) => {
    return GetParents2(child);
  };
  addCommand("GetParents(child)", "Get all parents of the child in an array, recursively searching up");
  top["GetRandomChild"] = (parent, startIndex = 0, length) => {
    return GetRandomChild(parent, startIndex, length);
  };
  addCommand("GetRandomChild(parent, startIndex?, length?)", "Get a random child from the parent, optionally between the indexes");
  top["IsValidParent"] = (parent, child) => {
    return IsValidParent(parent, child);
  };
  addCommand("IsValidParent(parent, child)", "Is the parent a valid candidate for the child?");
  top["MoveChildDown"] = (child) => {
    return MoveChildDown(child);
  };
  addCommand("MoveChildDown(child)", "Moves the child one index down the display list");
  top["MoveChildUp"] = (child) => {
    return MoveChildUp(child);
  };
  addCommand("MoveChildUp(child)", "Moves the child one index up the display list");
  top["RemoveChild"] = (parent, child) => {
    return RemoveChild(parent, child);
  };
  addCommand("RemoveChild(parent, child)", "Removes a single child from its parent");
  top["RemoveChildAt"] = (parent, index) => {
    return RemoveChildAt(parent, index);
  };
  addCommand("RemoveChildAt(parent, index)", "Removes the child at the given index from the parent");
  top["RemoveChildren"] = (parent, ...children) => {
    return RemoveChildren(parent, ...children);
  };
  addCommand("RemoveChildren(parent, ...children)", "Removes all given children from the parent");
  top["RemoveChildrenAt"] = (parent, ...index) => {
    return RemoveChildrenAt(parent, ...index);
  };
  addCommand("RemoveChildrenAt(parent, ...index)", "Removes the children at the given indexes from the parent");
  top["RemoveChildrenBetween"] = (parent, beginIndex = 0, endIndex) => {
    return RemoveChildrenBetween(parent, beginIndex, endIndex);
  };
  addCommand("RemoveChildrenBetween(parent, beginIndex, endIndex)", "Removes the children from the parent between the start and end indexes");
  top["RemoveWorld"] = (world3, ...children) => {
    return RemoveWorld(world3, ...children);
  };
  addCommand("RemoveWorld(world, ...children)", "Removes the World component from the given children");
  top["ReparentChildren"] = (parent, newParent, beginIndex = 0, endIndex) => {
    return ReparentChildren(parent, newParent, beginIndex, endIndex);
  };
  addCommand("ReparentChildren(parent, newParent, beginIndex?, endIndex?)", "Removes the children from parent and adds them to newParent");
  top["ReplaceChild"] = (target, source) => {
    return ReplaceChild(target, source);
  };
  addCommand("ReplaceChild(target, source)", "Replaces the target with the source child within the parent");
  top["RotateChildrenLeft"] = (parent, total = 1) => {
    return RotateChildrenLeft(parent, total);
  };
  addCommand("RotateChildrenLeft(parent, total?)", 'Rotates the parent display list "total" places to the left');
  top["RotateChildrenRight"] = (parent, total = 1) => {
    return RotateChildrenRight(parent, total);
  };
  addCommand("RotateChildrenRight(parent, total?)", 'Rotates the parent display list "total" places to the right');
  top["SendChildToBack"] = (child) => {
    return SendChildToBack(child);
  };
  addCommand("SendChildToBack(child)", "Sends the given child to the back of the parent display list");
  top["SetChildrenValue"] = (parent, property, value) => {
    return SetChildrenValue(parent, property, value);
  };
  addCommand("SetChildrenValue(parent, property, value)", "Sets the property to value on all children of the parent");
  top["SetName"] = (name, ...children) => {
    return SetName(name, ...children);
  };
  addCommand("SetName(name, ...children)", "Sets the name property on all given children");
  top["SetOrigin"] = (originX, originY, ...children) => {
    return SetOrigin(originX, originY, ...children);
  };
  addCommand("SetOrigin(originX, originY, ...children)", "Sets the origin on all given children");
  top["SetPosition"] = (x, y, ...children) => {
    return SetPosition(x, y, ...children);
  };
  addCommand("SetPosition(x, y, ...children)", "Sets the position on all given children");
  top["SetRotation"] = (rotation, ...children) => {
    return SetRotation(rotation, ...children);
  };
  addCommand("SetRotation(rotation, ...children)", "Sets the rotation on all given children");
  top["SetScale"] = (scaleX, scaleY, ...children) => {
    return SetScale(scaleX, scaleY, ...children);
  };
  addCommand("SetScale(scaleX, scaleY, ...children)", "Sets the scale on all given children");
  top["SetSize"] = (width, height, ...children) => {
    return SetSize2(width, height, ...children);
  };
  addCommand("SetSize(width, height, ...children)", "Sets the size on all given children");
  top["SetSkew"] = (skewX, skewY, ...children) => {
    return SetSkew(skewX, skewY, ...children);
  };
  addCommand("SetSkew(skewX, skewY, ...children)", "Sets the skew on all given children");
  top["SetValue"] = (property, value, ...children) => {
    return SetValue(property, value, ...children);
  };
  addCommand("SetValue(property, value, ...children)", "Sets the property to the value on all given children");
  top["SetVisible"] = (visible, ...children) => {
    return SetVisible2(visible, ...children);
  };
  addCommand("SetVisible(visible, ...children)", "Sets the visible state on all given children");
  top["SetWorld"] = (world3, ...children) => {
    return SetWorld(world3, ...children);
  };
  addCommand("SetWorld(world, ...children)", "Sets the World on all given children");
  top["ShuffleChildren"] = (parent) => {
    return ShuffleChildren(parent);
  };
  addCommand("ShuffleChildren(parent)", "Shuffles all of the children of the given parent");
  top["SortChildren"] = (parent, getter) => {
    return SortChildren(parent, getter);
  };
  addCommand("SortChildren(parent, getter)", "Sorts all of the children based on the given getter function");
  top["SwapChildren"] = (child1, child2) => {
    SwapChildren(child1, child2);
  };
  addCommand("SwapChildren(child1, child2)", "Swaps the position of the 2 children of the same parent");
  top["DDHelp"] = () => {
    console.log(logHelp.join("\n"), ...logCSS);
  };
  top["DDCommands"] = () => {
    console.log(logCommands.join("\n"), ...logCommandsCSS);
  };
  console.log("%cDisplay Debug Tools Installed%c See DDHelp() and DDCommands() for command list", "padding: 4px 16px; color: #fff; background: linear-gradient(#81003e 40%, #c3bc00)", "");
}

// src/geom/intersects/RectangleToRectangle.ts
function RectangleToRectangle(rectA, rectB) {
  if (rectA.width <= 0 || rectA.height <= 0 || rectB.width <= 0 || rectB.height <= 0) {
    return false;
  }
  return !(rectA.right < rectB.x || rectA.bottom < rectB.y || rectA.x > rectB.right || rectA.y > rectB.bottom);
}

// src/display/OverlapBounds.ts
function OverlapBounds(source, ...targets) {
  const sourceBounds = GetBounds(source);
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (target === source) {
      continue;
    }
    if (RectangleToRectangle(sourceBounds, GetBounds(target))) {
      return true;
    }
  }
  return false;
}

// src/events/index.ts
var events_exports = {};
__export(events_exports, {
  ClearEvent: () => ClearEvent,
  Emit: () => Emit,
  EventEmitter: () => EventEmitter,
  EventInstance: () => EventInstance,
  GetEventNames: () => GetEventNames,
  GetListenerCount: () => GetListenerCount,
  GetListeners: () => GetListeners,
  Off: () => Off,
  On: () => On,
  Once: () => Once,
  RemoveAllListeners: () => RemoveAllListeners
});

// src/events/ClearEvent.ts
function ClearEvent(emitter, event) {
  emitter.events.delete(event);
  return emitter;
}

// src/events/Emit.ts
function Emit(emitter, event, ...args) {
  if (emitter.events.size === 0 || !emitter.events.has(event)) {
    return false;
  }
  const listeners = emitter.events.get(event);
  const handlers = [...listeners];
  for (const ee of handlers) {
    ee.callback.apply(ee.context, args);
    if (ee.once) {
      listeners.delete(ee);
    }
  }
  if (listeners.size === 0) {
    emitter.events.delete(event);
  }
  return true;
}

// src/events/EventEmitter.ts
var EventEmitter = class {
  events;
  constructor() {
    this.events = new Map();
  }
};

// src/events/EventInstance.ts
var EventInstance = class {
  callback;
  context;
  once;
  constructor(callback, context, once = false) {
    this.callback = callback;
    this.context = context;
    this.once = once;
  }
};

// src/events/GetEventNames.ts
function GetEventNames(emitter) {
  return [...emitter.events.keys()];
}

// src/events/GetListenerCount.ts
function GetListenerCount(emitter, event) {
  const listeners = emitter.events.get(event);
  return listeners ? listeners.size : 0;
}

// src/events/GetListeners.ts
function GetListeners(emitter, event) {
  const out = [];
  const listeners = emitter.events.get(event);
  listeners.forEach((listener) => {
    out.push(listener.callback);
  });
  return out;
}

// src/events/Off.ts
function Off(emitter, event, callback, context, once) {
  const events = emitter.events;
  const listeners = events.get(event);
  if (!callback) {
    events.delete(event);
  } else if (callback instanceof EventInstance) {
    listeners.delete(callback);
  } else {
    const hasContext = !context;
    const hasOnce = once !== void 0;
    for (const listener of listeners) {
      if (listener.callback === callback && (hasContext && listener.context === context) && (hasOnce && listener.once === once)) {
        listeners.delete(listener);
      }
    }
  }
  if (listeners.size === 0) {
    events.delete(event);
  }
  return emitter;
}

// src/events/On.ts
function On(emitter, event, callback, context = emitter, once = false) {
  if (typeof callback !== "function") {
    throw new TypeError("Listener not a function");
  }
  const listener = new EventInstance(callback, context, once);
  const listeners = emitter.events.get(event);
  if (!listeners) {
    emitter.events.set(event, new Set([listener]));
  } else {
    listeners.add(listener);
  }
  return listener;
}

// src/events/Once.ts
function Once(emitter, event, callback, context = emitter) {
  return On(emitter, event, callback, context, true);
}

// src/events/RemoveAllListeners.ts
function RemoveAllListeners(emitter, event) {
  if (!event) {
    emitter.events.clear();
  } else {
    emitter.events.delete(event);
  }
}

// src/gameobjects/index.ts
var gameobjects_exports = {};
__export(gameobjects_exports, {
  AnimatedSprite: () => AnimatedSprite,
  Components: () => components_exports,
  Container: () => Container,
  DirectDraw: () => DirectDraw,
  EffectLayer: () => EffectLayer,
  GameObject: () => GameObject,
  GameObjectCache: () => GameObjectCache,
  Layer: () => Layer,
  Rectangle: () => Rectangle2,
  RenderLayer: () => RenderLayer,
  SpatialGridLayer: () => SpatialGridLayer,
  Sprite: () => Sprite,
  Text: () => Text
});

// src/components/index.ts
var components_exports = {};
__export(components_exports, {
  Color: () => color_exports2,
  Dirty: () => dirty_exports,
  Hierarchy: () => hierarchy_exports,
  Input: () => input_exports,
  Permissions: () => permissions_exports,
  Transform: () => transform_exports,
  Vertex: () => Vertex,
  Vertices: () => vertices_exports
});

// src/components/color/index.ts
var color_exports2 = {};
__export(color_exports2, {
  AddColorComponent: () => AddColorComponent,
  Color: () => Color2,
  ColorComponent: () => ColorComponent,
  CompareColorMatrix: () => CompareColorMatrix,
  SetAlpha: () => SetAlpha
});

// src/components/color/SetAlpha.ts
function SetAlpha(id, value) {
  ColorComponent.a[id] = value;
  SetDirtyParents(id);
}

// src/components/input/index.ts
var input_exports = {};
__export(input_exports, {
  InputComponent: () => InputComponent
});

// src/components/input/InputComponent.ts
var InputComponent = class {
  entity;
  enabled = false;
  enabledChildren = true;
  hitArea;
  constructor(entity) {
    this.entity = entity;
  }
  destroy() {
    this.entity = null;
    this.hitArea = null;
  }
};

// src/components/permissions/index.ts
var permissions_exports = {};
__export(permissions_exports, {
  AddPermissionsComponent: () => AddPermissionsComponent,
  GetVisible: () => GetVisible,
  GetVisibleChildren: () => GetVisibleChildren,
  HasCustomDisplayList: () => HasCustomDisplayList,
  HasRenderableChildren: () => HasRenderableChildren,
  PermissionsComponent: () => PermissionsComponent,
  SetCustomDisplayList: () => SetCustomDisplayList,
  SetVisible: () => SetVisible,
  SetVisibleChildren: () => SetVisibleChildren,
  SetWillCacheChildren: () => SetWillCacheChildren,
  SetWillColorChildren: () => SetWillColorChildren,
  SetWillRender: () => SetWillRender,
  SetWillRenderChildren: () => SetWillRenderChildren,
  SetWillTransformChildren: () => SetWillTransformChildren,
  SetWillUpdate: () => SetWillUpdate,
  SetWillUpdateChildren: () => SetWillUpdateChildren,
  WillCacheChildren: () => WillCacheChildren,
  WillColorChildren: () => WillColorChildren,
  WillRender: () => WillRender,
  WillRenderChildren: () => WillRenderChildren,
  WillTransformChildren: () => WillTransformChildren,
  WillUpdate: () => WillUpdate,
  WillUpdateChildren: () => WillUpdateChildren
});

// src/components/permissions/HasCustomDisplayList.ts
function HasCustomDisplayList(id) {
  return !!PermissionsComponent.data[id][PERMISSION.CUSTOM_DISPLAY_LIST];
}

// src/components/permissions/HasRenderableChildren.ts
function HasRenderableChildren(id, dirtyCamera) {
  const numChildren = GetNumChildren(id);
  if (numChildren === 0 || !WillRenderChildren(id)) {
    return 0;
  }
  if (dirtyCamera || !WillCacheChildren(id) || WillCacheChildren(id) && HasDirtyChildCache(id)) {
    return numChildren;
  }
  return 0;
}

// src/components/permissions/SetCustomDisplayList.ts
function SetCustomDisplayList(id, value) {
  PermissionsComponent.data[id][PERMISSION.CUSTOM_DISPLAY_LIST] = Number(value);
}

// src/components/permissions/SetWillCacheChildren.ts
function SetWillCacheChildren(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_CACHE_CHILDREN] = Number(value);
}

// src/components/permissions/SetWillRender.ts
function SetWillRender(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_RENDER] = Number(value);
}

// src/components/permissions/SetWillRenderChildren.ts
function SetWillRenderChildren(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_RENDER_CHILDREN] = Number(value);
}

// src/components/permissions/SetWillTransformChildren.ts
function SetWillTransformChildren(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_TRANSFORM_CHILDREN] = Number(value);
}

// src/components/permissions/SetWillUpdate.ts
function SetWillUpdate(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_UPDATE] = Number(value);
}

// src/components/permissions/SetWillUpdateChildren.ts
function SetWillUpdateChildren(id, value) {
  PermissionsComponent.data[id][PERMISSION.WILL_UPDATE_CHILDREN] = Number(value);
}

// src/components/permissions/WillUpdate.ts
function WillUpdate(id) {
  return !!PermissionsComponent.data[id][PERMISSION.WILL_UPDATE];
}

// src/components/transform/index.ts
var transform_exports = {};
__export(transform_exports, {
  AddTransform2DComponent: () => AddTransform2DComponent,
  BoundsIntersects: () => BoundsIntersects,
  CopyLocalToWorld: () => CopyLocalToWorld,
  CopyWorldToWorld: () => CopyWorldToWorld,
  GetLocalBounds: () => GetLocalBounds,
  GetLocalTransform: () => GetLocalTransform,
  GetRotation: () => GetRotation,
  GetScaleX: () => GetScaleX,
  GetScaleY: () => GetScaleY,
  GetSkewX: () => GetSkewX,
  GetSkewY: () => GetSkewY,
  GetWorldTransform: () => GetWorldTransform,
  GetX: () => GetX,
  GetY: () => GetY,
  GlobalToLocal: () => GlobalToLocal,
  IsInView: () => IsInView,
  IsRootTransform: () => IsRootTransform,
  LocalToGlobal: () => LocalToGlobal,
  MultiplyLocalWithWorld: () => MultiplyLocalWithWorld,
  Origin: () => Origin,
  Position: () => Position,
  Scale: () => Scale,
  SetBounds: () => SetBounds,
  SetExtent: () => SetExtent,
  SetInView: () => SetInView,
  SetInViewFromBounds: () => SetInViewFromBounds,
  SetRootTransform: () => SetRootTransform,
  Size: () => Size,
  Skew: () => Skew,
  Transform2DComponent: () => Transform2DComponent,
  UpdateAxisAligned: () => UpdateAxisAligned,
  UpdateExtent: () => UpdateExtent,
  UpdateTransforms: () => UpdateTransforms,
  UpdateWorldTransform: () => UpdateWorldTransform
});

// src/components/transform/BoundsIntersects.ts
function BoundsIntersects(id, x, y, right, bottom) {
  const data = Transform2DComponent.data[id];
  const bx = data[TRANSFORM.BOUNDS_X1];
  const by = data[TRANSFORM.BOUNDS_Y1];
  const br = data[TRANSFORM.BOUNDS_X2];
  const bb = data[TRANSFORM.BOUNDS_Y2];
  return !(right < bx || bottom < by || x > br || y > bb);
}

// src/components/transform/CopyLocalToWorld.ts
function CopyLocalToWorld(source, target) {
  const targetData = Transform2DComponent.data[target];
  const sourceData = Transform2DComponent.data[source];
  targetData[TRANSFORM.WORLD_A] = sourceData[TRANSFORM.LOCAL_A];
  targetData[TRANSFORM.WORLD_B] = sourceData[TRANSFORM.LOCAL_B];
  targetData[TRANSFORM.WORLD_C] = sourceData[TRANSFORM.LOCAL_C];
  targetData[TRANSFORM.WORLD_D] = sourceData[TRANSFORM.LOCAL_D];
  targetData[TRANSFORM.WORLD_TX] = sourceData[TRANSFORM.LOCAL_TX];
  targetData[TRANSFORM.WORLD_TY] = sourceData[TRANSFORM.LOCAL_TY];
}

// src/components/transform/CopyWorldToWorld.ts
function CopyWorldToWorld(source, target) {
  const targetData = Transform2DComponent.data[target];
  const sourceData = Transform2DComponent.data[source];
  targetData[TRANSFORM.WORLD_A] = sourceData[TRANSFORM.WORLD_A];
  targetData[TRANSFORM.WORLD_B] = sourceData[TRANSFORM.WORLD_B];
  targetData[TRANSFORM.WORLD_C] = sourceData[TRANSFORM.WORLD_C];
  targetData[TRANSFORM.WORLD_D] = sourceData[TRANSFORM.WORLD_D];
  targetData[TRANSFORM.WORLD_TX] = sourceData[TRANSFORM.WORLD_TX];
  targetData[TRANSFORM.WORLD_TY] = sourceData[TRANSFORM.WORLD_TY];
}

// src/components/transform/GetLocalTransform.ts
function GetLocalTransform(id) {
  const data = Transform2DComponent.data[id];
  return {
    a: data[TRANSFORM.LOCAL_A],
    b: data[TRANSFORM.LOCAL_B],
    c: data[TRANSFORM.LOCAL_C],
    d: data[TRANSFORM.LOCAL_D],
    tx: data[TRANSFORM.LOCAL_TX],
    ty: data[TRANSFORM.LOCAL_TY]
  };
}

// src/components/transform/GetRotation.ts
function GetRotation(id) {
  return Transform2DComponent.data[id][TRANSFORM.ROTATION];
}

// src/components/transform/GetScaleX.ts
function GetScaleX(id) {
  return Transform2DComponent.data[id][TRANSFORM.SCALE_X];
}

// src/components/transform/GetScaleY.ts
function GetScaleY(id) {
  return Transform2DComponent.data[id][TRANSFORM.SCALE_Y];
}

// src/components/transform/GetSkewX.ts
function GetSkewX(id) {
  return Transform2DComponent.data[id][TRANSFORM.SKEW_X];
}

// src/components/transform/GetSkewY.ts
function GetSkewY(id) {
  return Transform2DComponent.data[id][TRANSFORM.SKEW_Y];
}

// src/components/transform/GetWorldTransform.ts
function GetWorldTransform(id) {
  const data = Transform2DComponent.data[id];
  return {
    a: data[TRANSFORM.WORLD_A],
    b: data[TRANSFORM.WORLD_B],
    c: data[TRANSFORM.WORLD_C],
    d: data[TRANSFORM.WORLD_D],
    tx: data[TRANSFORM.WORLD_TX],
    ty: data[TRANSFORM.WORLD_TY]
  };
}

// src/components/transform/GetX.ts
function GetX(id) {
  return Transform2DComponent.data[id][TRANSFORM.X];
}

// src/components/transform/GetY.ts
function GetY(id) {
  return Transform2DComponent.data[id][TRANSFORM.Y];
}

// src/math/vec2/Vec2FromArray.ts
function Vec2FromArray(dst, src = [], index = 0) {
  return dst.set(src[index], src[index + 1]);
}

// src/math/vec2/Vec2ToArray.ts
function Vec2ToArray(v, dst = [], index = 0) {
  dst[index] = v.x;
  dst[index + 1] = v.y;
  return dst;
}

// src/math/vec2/Vec2.ts
var Vec2 = class {
  x;
  y;
  constructor(x = 0, y = 0) {
    this.set(x, y);
  }
  set(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    return this;
  }
  toArray(dst = [], index = 0) {
    return Vec2ToArray(this, dst, index);
  }
  fromArray(src, index = 0) {
    Vec2FromArray(this, src, index);
    return this;
  }
  toString() {
    return `{ x=${this.x}, y=${this.y} }`;
  }
};

// src/components/transform/GlobalToLocal.ts
function GlobalToLocal(worldTransform, x, y, out = new Vec2()) {
  const { a, b, c, d, tx, ty } = worldTransform;
  const id = 1 / (a * d + c * -b);
  out.x = d * id * x + -c * id * y + (ty * c - tx * d) * id;
  out.y = a * id * y + -b * id * x + (-ty * a + tx * b) * id;
  return out;
}

// src/components/transform/IsInView.ts
function IsInView(id) {
  return !!Transform2DComponent.data[id][TRANSFORM.IN_VIEW];
}

// src/components/transform/IsRootTransform.ts
function IsRootTransform(id) {
  return !!Transform2DComponent.data[id][TRANSFORM.IS_ROOT];
}

// src/components/transform/LocalToGlobal.ts
function LocalToGlobal(worldTransform, x, y, out = new Vec2()) {
  const { a, b, c, d, tx, ty } = worldTransform;
  out.x = a * x + c * y + tx;
  out.y = b * x + d * y + ty;
  return out;
}

// src/components/transform/MultiplyLocalWithWorld.ts
function MultiplyLocalWithWorld(parentID, childID) {
  const parentData = Transform2DComponent.data[parentID];
  const childData = Transform2DComponent.data[childID];
  const pa = parentData[TRANSFORM.WORLD_A];
  const pb = parentData[TRANSFORM.WORLD_B];
  const pc = parentData[TRANSFORM.WORLD_C];
  const pd = parentData[TRANSFORM.WORLD_D];
  const ptx = parentData[TRANSFORM.WORLD_TX];
  const pty = parentData[TRANSFORM.WORLD_TY];
  const a = childData[TRANSFORM.LOCAL_A];
  const b = childData[TRANSFORM.LOCAL_B];
  const c = childData[TRANSFORM.LOCAL_C];
  const d = childData[TRANSFORM.LOCAL_D];
  const tx = childData[TRANSFORM.LOCAL_TX];
  const ty = childData[TRANSFORM.LOCAL_TY];
  childData[TRANSFORM.WORLD_A] = a * pa + b * pc;
  childData[TRANSFORM.WORLD_B] = a * pb + b * pd;
  childData[TRANSFORM.WORLD_C] = c * pa + d * pc;
  childData[TRANSFORM.WORLD_D] = c * pb + d * pd;
  childData[TRANSFORM.WORLD_TX] = tx * pa + ty * pc + ptx;
  childData[TRANSFORM.WORLD_TY] = tx * pb + ty * pd + pty;
}

// src/components/transform/SetInView.ts
function SetInView(id, value) {
  Transform2DComponent.data[id][TRANSFORM.IN_VIEW] = Number(value);
}

// src/components/transform/SetInViewFromBounds.ts
function SetInViewFromBounds(id, cx, cy, cright, cbottom) {
  const data = Transform2DComponent.data[id];
  const bx = data[TRANSFORM.BOUNDS_X1];
  const by = data[TRANSFORM.BOUNDS_Y1];
  const br = data[TRANSFORM.BOUNDS_X2];
  const bb = data[TRANSFORM.BOUNDS_Y2];
  data[TRANSFORM.IN_VIEW] = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));
}

// src/components/transform/UpdateTransforms.ts
function UpdateTransforms(id, cx, cy, cright, cbottom, forceUpdate, parentIsDisplayList) {
  const data = Transform2DComponent.data[id];
  let tx = data[TRANSFORM.X];
  let ty = data[TRANSFORM.Y];
  const rotation = data[TRANSFORM.ROTATION];
  const scaleX = data[TRANSFORM.SCALE_X];
  const scaleY = data[TRANSFORM.SCALE_Y];
  const skewX = data[TRANSFORM.SKEW_X];
  const skewY = data[TRANSFORM.SKEW_Y];
  let axisAligned = Boolean(data[TRANSFORM.AXIS_ALIGNED]);
  let a = scaleX;
  let b = 0;
  let c = 0;
  let d = scaleY;
  if (!axisAligned) {
    a = Math.cos(rotation + skewY) * scaleX;
    b = Math.sin(rotation + skewY) * scaleX;
    c = -Math.sin(rotation - skewX) * scaleY;
    d = Math.cos(rotation - skewX) * scaleY;
  }
  data[TRANSFORM.LOCAL_A] = a;
  data[TRANSFORM.LOCAL_B] = b;
  data[TRANSFORM.LOCAL_C] = c;
  data[TRANSFORM.LOCAL_D] = d;
  data[TRANSFORM.LOCAL_TX] = tx;
  data[TRANSFORM.LOCAL_TY] = ty;
  if (data[TRANSFORM.IS_ROOT]) {
    data[TRANSFORM.WORLD_A] = a;
    data[TRANSFORM.WORLD_B] = b;
    data[TRANSFORM.WORLD_C] = c;
    data[TRANSFORM.WORLD_D] = d;
    data[TRANSFORM.WORLD_TX] = tx;
    data[TRANSFORM.WORLD_TY] = ty;
  } else {
    const parentID = GetParentID(id);
    const parentData = Transform2DComponent.data[parentID];
    const pa = parentData[TRANSFORM.WORLD_A];
    const pb = parentData[TRANSFORM.WORLD_B];
    const pc = parentData[TRANSFORM.WORLD_C];
    const pd = parentData[TRANSFORM.WORLD_D];
    const ptx = parentData[TRANSFORM.WORLD_TX];
    const pty = parentData[TRANSFORM.WORLD_TY];
    data[TRANSFORM.WORLD_A] = a * pa + b * pc;
    data[TRANSFORM.WORLD_B] = a * pb + b * pd;
    data[TRANSFORM.WORLD_C] = c * pa + d * pc;
    data[TRANSFORM.WORLD_D] = c * pb + d * pd;
    data[TRANSFORM.WORLD_TX] = tx * pa + ty * pc + ptx;
    data[TRANSFORM.WORLD_TY] = tx * pb + ty * pd + pty;
    a = data[TRANSFORM.WORLD_A];
    b = data[TRANSFORM.WORLD_B];
    c = data[TRANSFORM.WORLD_C];
    d = data[TRANSFORM.WORLD_D];
    tx = data[TRANSFORM.WORLD_TX];
    ty = data[TRANSFORM.WORLD_TY];
    axisAligned = false;
  }
  const x = data[TRANSFORM.FRAME_X1];
  const y = data[TRANSFORM.FRAME_Y1];
  const right = data[TRANSFORM.FRAME_X2];
  const bottom = data[TRANSFORM.FRAME_Y2];
  let x0 = x * a + tx;
  let y0 = y * d + ty;
  let x1 = x * a + tx;
  let y1 = bottom * d + ty;
  let x2 = right * a + tx;
  let y2 = bottom * d + ty;
  let x3 = right * a + tx;
  let y3 = y * d + ty;
  let inView = 0;
  if (axisAligned) {
    data[TRANSFORM.BOUNDS_X1] = x0;
    data[TRANSFORM.BOUNDS_Y1] = y0;
    data[TRANSFORM.BOUNDS_X2] = x2;
    data[TRANSFORM.BOUNDS_Y2] = y2;
    inView = Number(!(cright < x0 || cbottom < y0 || cx > x2 || cy > y2));
  } else {
    x0 += y * c;
    y0 += x * b;
    x1 += bottom * c;
    y1 += x * b;
    x2 += bottom * c;
    y2 += right * b;
    x3 += y * c;
    y3 += right * b;
    const bx = Math.min(x0, x1, x2, x3);
    const by = Math.min(y0, y1, y2, y3);
    const br = Math.max(x0, x1, x2, x3);
    const bb = Math.max(y0, y1, y2, y3);
    data[TRANSFORM.BOUNDS_X1] = bx;
    data[TRANSFORM.BOUNDS_Y1] = by;
    data[TRANSFORM.BOUNDS_X2] = br;
    data[TRANSFORM.BOUNDS_Y2] = bb;
    inView = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));
  }
  data[TRANSFORM.IN_VIEW] = inView;
  if (inView === 1 || forceUpdate || parentIsDisplayList) {
    SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
  }
  ClearDirtyTransform(id);
  if (WillTransformChildren(id)) {
    SetDirtyWorldTransform(id);
  }
}

// src/components/transform/UpdateWorldTransform.ts
function UpdateWorldTransform(id, parentID, cx, cy, cright, cbottom, forceUpdate, parentIsDisplayList) {
  const parentData = Transform2DComponent.data[parentID];
  const data = Transform2DComponent.data[id];
  const pa = parentData[TRANSFORM.WORLD_A];
  const pb = parentData[TRANSFORM.WORLD_B];
  const pc = parentData[TRANSFORM.WORLD_C];
  const pd = parentData[TRANSFORM.WORLD_D];
  const ptx = parentData[TRANSFORM.WORLD_TX];
  const pty = parentData[TRANSFORM.WORLD_TY];
  let a = data[TRANSFORM.LOCAL_A];
  let b = data[TRANSFORM.LOCAL_B];
  let c = data[TRANSFORM.LOCAL_C];
  let d = data[TRANSFORM.LOCAL_D];
  let tx = data[TRANSFORM.LOCAL_TX];
  let ty = data[TRANSFORM.LOCAL_TY];
  data[TRANSFORM.WORLD_A] = a * pa + b * pc;
  data[TRANSFORM.WORLD_B] = a * pb + b * pd;
  data[TRANSFORM.WORLD_C] = c * pa + d * pc;
  data[TRANSFORM.WORLD_D] = c * pb + d * pd;
  data[TRANSFORM.WORLD_TX] = tx * pa + ty * pc + ptx;
  data[TRANSFORM.WORLD_TY] = tx * pb + ty * pd + pty;
  a = data[TRANSFORM.WORLD_A];
  b = data[TRANSFORM.WORLD_B];
  c = data[TRANSFORM.WORLD_C];
  d = data[TRANSFORM.WORLD_D];
  tx = data[TRANSFORM.WORLD_TX];
  ty = data[TRANSFORM.WORLD_TY];
  const x = data[TRANSFORM.FRAME_X1];
  const y = data[TRANSFORM.FRAME_Y1];
  const right = data[TRANSFORM.FRAME_X2];
  const bottom = data[TRANSFORM.FRAME_Y2];
  let x0 = x * a + tx;
  let y0 = y * d + ty;
  let x1 = x * a + tx;
  let y1 = bottom * d + ty;
  let x2 = right * a + tx;
  let y2 = bottom * d + ty;
  let x3 = right * a + tx;
  let y3 = y * d + ty;
  x0 += y * c;
  y0 += x * b;
  x1 += bottom * c;
  y1 += x * b;
  x2 += bottom * c;
  y2 += right * b;
  x3 += y * c;
  y3 += right * b;
  const bx = Math.min(x0, x1, x2, x3);
  const by = Math.min(y0, y1, y2, y3);
  const br = Math.max(x0, x1, x2, x3);
  const bb = Math.max(y0, y1, y2, y3);
  data[TRANSFORM.BOUNDS_X1] = bx;
  data[TRANSFORM.BOUNDS_Y1] = by;
  data[TRANSFORM.BOUNDS_X2] = br;
  data[TRANSFORM.BOUNDS_Y2] = bb;
  const inView = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));
  data[TRANSFORM.IN_VIEW] = inView;
  if (inView === 1 || forceUpdate || parentIsDisplayList) {
    SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
  }
  if (WillTransformChildren(id)) {
    SetDirtyWorldTransform(id);
  }
}

// src/components/vertices/index.ts
var vertices_exports = {};
__export(vertices_exports, {
  AddQuadVertex: () => AddQuadVertex,
  GetQuadVertices: () => GetQuadVertices,
  QuadVertexComponent: () => QuadVertexComponent,
  SetInversedQuadFromCamera: () => SetInversedQuadFromCamera,
  SetQuadColor: () => SetQuadColor,
  SetQuadPosition: () => SetQuadPosition,
  SetQuadTextureIndex: () => SetQuadTextureIndex,
  SetUV: () => SetUV
});

// src/components/vertices/GetQuadVertices.ts
function GetQuadVertices(id) {
  const data = QuadVertexComponent.values[id];
  const x0 = data[0];
  const y0 = data[1];
  const x1 = data[9];
  const y1 = data[10];
  const x2 = data[18];
  const y2 = data[19];
  const x3 = data[45];
  const y3 = data[46];
  return { x0, y0, x1, y1, x2, y2, x3, y3 };
}

// src/components/vertices/SetInversedQuadFromCamera.ts
function SetInversedQuadFromCamera(id, camera, x, y, width, height) {
  const cx = camera.getBoundsX() + x;
  const cy = camera.getBoundsY() + y;
  SetQuadPosition(id, cx, cy + height, cx, cy, cx + width, cy, cx + width, cy + height);
}

// src/components/Vertex.ts
var Vertex = class {
  x = 0;
  y = 0;
  z = 0;
  u = 0;
  v = 0;
  texture = 0;
  tint = 16777215;
  alpha = 1;
  color = 4294967295;
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  setPosition(x, y, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  setUV(u, v) {
    this.u = u;
    this.v = v;
    return this;
  }
  setColor(color, alpha = 1) {
    this.tint = color;
    this.alpha = alpha;
    this.packColor();
    return this;
  }
  setAlpha(value) {
    this.alpha = value;
    return this;
  }
  setTint(value) {
    this.tint = value;
    return this;
  }
  packColor() {
    this.color = PackColor(this.tint, this.alpha);
  }
};

// src/gameobjects/animatedsprite/AnimatedSprite.ts
var AnimatedSprite = class extends Sprite {
  currentAnimation;
  currentFrame;
  animData;
  hasStarted = false;
  forward = true;
  inReverse = false;
  accumulator = 0;
  nextTick = 0;
  delayCounter = 0;
  repeatCounter = 0;
  pendingRepeat = false;
  paused = false;
  wasPlaying = false;
  pendingStop = 0;
  pendingStopValue = 0;
  constructor(x, y, texture, frame2) {
    super(x, y, texture, frame2);
    this.animData = CreateAnimData();
  }
  handleStart() {
    if (this.animData.showOnStart) {
      this.visible = true;
    }
    this.setCurrentFrame(this.currentFrame);
    this.hasStarted = true;
  }
  handleRepeat() {
    this.pendingRepeat = false;
  }
  handleStop() {
    this.pendingStop = 0;
    this.animData.isPlaying = false;
  }
  handleComplete() {
    this.pendingStop = 0;
    this.animData.isPlaying = false;
    if (this.animData.hideOnComplete) {
      this.visible = false;
    }
  }
  reverse() {
    if (this.isPlaying) {
      this.inReverse = !this.inReverse;
      this.forward = !this.forward;
    }
    return this;
  }
  getProgress() {
    const frame2 = this.currentFrame;
    if (!frame2) {
      return 0;
    }
    let p = frame2.progress;
    if (this.inReverse) {
      p *= -1;
    }
    return p;
  }
  stop() {
    this.pendingStop = 0;
    this.animData.isPlaying = false;
    if (this.currentAnimation) {
      this.handleStop();
    }
    return this;
  }
  update(delta, now) {
    super.update(delta, now);
    const data = this.animData;
    const anim = this.currentAnimation;
    if (!anim || !data.isPlaying || anim.paused) {
      return;
    }
    this.accumulator += delta * data.timeScale;
    if (this.pendingStop === 1) {
      this.pendingStopValue -= delta;
      if (this.pendingStopValue <= 0) {
        this.stop();
        return;
      }
    }
    if (!this.hasStarted) {
      if (this.accumulator >= this.delayCounter) {
        this.accumulator -= this.delayCounter;
        this.handleStart();
      }
    } else if (this.accumulator >= this.nextTick) {
      if (this.forward) {
        this.nextFrame();
      } else {
        this.prevFrame();
      }
      if (data.isPlaying && this.pendingStop === 0 && anim.skipMissedFrames && this.accumulator > this.nextTick) {
        let safetyNet = 0;
        do {
          if (this.forward) {
            this.nextFrame();
          } else {
            this.prevFrame();
          }
          safetyNet++;
        } while (data.isPlaying && this.accumulator > this.nextTick && safetyNet < 60);
      }
    }
  }
  nextFrame() {
    const frame2 = this.currentFrame;
    const data = this.animData;
    if (frame2.isLast) {
      if (data.yoyo) {
        this.handleYoyoFrame(false);
      } else if (this.repeatCounter > 0) {
        if (this.inReverse && this.forward) {
          this.forward = false;
        } else {
          this.repeatAnimation();
        }
      } else {
        this.complete();
      }
    } else {
      this.setCurrentFrame(this.currentFrame.nextFrame);
      this.getNextTick();
    }
    return this;
  }
  repeatAnimation() {
    if (this.pendingStop === 2) {
      if (this.pendingStopValue === 0) {
        return this.stop();
      } else {
        this.pendingStopValue--;
      }
    }
    const data = this.animData;
    if (data.repeatDelay > 0 && !this.pendingRepeat) {
      this.pendingRepeat = true;
      this.accumulator -= this.nextTick;
      this.nextTick += data.repeatDelay;
    } else {
      this.repeatCounter--;
      if (this.forward) {
        this.setCurrentFrame(this.currentFrame.nextFrame);
      } else {
        this.setCurrentFrame(this.currentFrame.prevFrame);
      }
      if (this.isPlaying) {
        this.getNextTick();
        this.handleRepeat();
      }
    }
  }
  setCurrentFrame(animFrame) {
    this.currentFrame = animFrame;
    this.setTexture(animFrame.texture, animFrame.frame);
  }
  getNextTick() {
    this.accumulator -= this.nextTick;
    this.nextTick = this.currentAnimation.msPerFrame + this.currentFrame.duration;
  }
  handleYoyoFrame(isReverse = false) {
    const animData = this.animData;
    if (this.inReverse === !isReverse && this.repeatCounter > 0) {
      if (animData.repeatDelay === 0 || this.pendingRepeat) {
        this.forward = isReverse;
      }
      this.repeatAnimation();
      return;
    }
    if (this.inReverse !== isReverse && this.repeatCounter === 0) {
      this.complete();
      return;
    }
    this.forward = isReverse;
    if (isReverse) {
      this.setCurrentFrame(this.currentFrame.nextFrame);
    } else {
      this.setCurrentFrame(this.currentFrame.prevFrame);
    }
    this.getNextTick();
  }
  prevFrame() {
    const frame2 = this.currentFrame;
    const animData = this.animData;
    if (frame2.isFirst) {
      if (animData.yoyo) {
        this.handleYoyoFrame(true);
      } else if (this.repeatCounter > 0) {
        if (this.inReverse && !this.forward) {
          this.repeatAnimation();
        } else {
          this.forward = true;
          this.repeatAnimation();
        }
      } else {
        this.complete();
      }
    } else {
      this.setCurrentFrame(frame2.prevFrame);
      this.getNextTick();
    }
    return this;
  }
  complete() {
    this.pendingStop = 0;
    this.animData.isPlaying = false;
    if (this.currentAnimation) {
      this.handleComplete();
    }
  }
  play() {
    const data = this.animData;
    if (data.repeat === -1) {
      this.repeatCounter = Number.MAX_VALUE;
    }
    data.isPlaying = true;
    if (data.delay === 0) {
      this.setTexture(this.currentFrame.texture, this.currentFrame.frame);
      if (data.onStart) {
        data.onStart(this, this.currentAnimation);
      }
    } else {
      data.pendingStart = true;
    }
    return this;
  }
  pause(atFrame) {
    if (!this.paused) {
      this.paused = true;
      this.wasPlaying = this.isPlaying;
      this.animData.isPlaying = false;
    }
    if (atFrame) {
      this.setCurrentFrame(atFrame);
    }
    return this;
  }
  resume(fromFrame) {
    if (this.paused) {
      this.paused = false;
      this.animData.isPlaying = this.wasPlaying;
    }
    if (fromFrame) {
      this.setCurrentFrame(fromFrame);
    }
    return this;
  }
  get isPlaying() {
    return this.animData.isPlaying;
  }
  get isPlayingForward() {
    return this.animData.isPlaying && this.forward;
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.animData = null;
  }
};

// src/renderer/webgl1/draw/BatchTexturedQuad.ts
function BatchTexturedQuad(F32, offset, textureIndex, x1, y1, x2, y2, x3, y3, x4, y4, u0, v0, u1, v1, r, g, b, a) {
  F32[offset + 0] = x1;
  F32[offset + 1] = y1;
  F32[offset + 2] = u0;
  F32[offset + 3] = v0;
  F32[offset + 4] = textureIndex;
  F32[offset + 5] = r;
  F32[offset + 6] = g;
  F32[offset + 7] = b;
  F32[offset + 8] = a;
  F32[offset + 9] = x2;
  F32[offset + 10] = y2;
  F32[offset + 11] = u0;
  F32[offset + 12] = v1;
  F32[offset + 13] = textureIndex;
  F32[offset + 14] = r;
  F32[offset + 15] = g;
  F32[offset + 16] = b;
  F32[offset + 17] = a;
  F32[offset + 18] = x3;
  F32[offset + 19] = y3;
  F32[offset + 20] = u1;
  F32[offset + 21] = v1;
  F32[offset + 22] = textureIndex;
  F32[offset + 23] = r;
  F32[offset + 24] = g;
  F32[offset + 25] = b;
  F32[offset + 26] = a;
  F32[offset + 27] = x1;
  F32[offset + 28] = y1;
  F32[offset + 29] = u0;
  F32[offset + 30] = v0;
  F32[offset + 31] = textureIndex;
  F32[offset + 32] = r;
  F32[offset + 33] = g;
  F32[offset + 34] = b;
  F32[offset + 35] = a;
  F32[offset + 36] = x3;
  F32[offset + 37] = y3;
  F32[offset + 38] = u1;
  F32[offset + 39] = v1;
  F32[offset + 40] = textureIndex;
  F32[offset + 41] = r;
  F32[offset + 42] = g;
  F32[offset + 43] = b;
  F32[offset + 44] = a;
  F32[offset + 45] = x4;
  F32[offset + 46] = y4;
  F32[offset + 47] = u1;
  F32[offset + 48] = v0;
  F32[offset + 49] = textureIndex;
  F32[offset + 50] = r;
  F32[offset + 51] = g;
  F32[offset + 52] = b;
  F32[offset + 53] = a;
  return offset + 54;
}

// src/renderer/webgl1/draw/DrawFrame.ts
function DrawFrame(renderPass, texture, frame2, x, y, alpha = 1, scaleX = 1, scaleY = 1) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  frame2 = texture.getFrame(frame2);
  const textureIndex = SetTexture(texture);
  const displayWidth = frame2.width * scaleX;
  const displayHeight = frame2.height * scaleY;
  BatchTexturedQuad(F32, offset, textureIndex, x, y, x, y + displayHeight, x + displayWidth, y + displayHeight, x + displayWidth, y, frame2.u0, frame2.v0, frame2.u1, frame2.v1, 1, 1, 1, alpha);
}

// src/renderer/webgl1/draw/DrawImage.ts
function DrawImage(renderPass, texture, x, y, alpha = 1, scaleX = 1, scaleY = 1) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  const frame2 = texture.firstFrame;
  const textureIndex = SetTexture(texture);
  const displayWidth = frame2.width * scaleX;
  const displayHeight = frame2.height * scaleY;
  BatchTexturedQuad(F32, offset, textureIndex, x, y, x, y + displayHeight, x + displayWidth, y + displayHeight, x + displayWidth, y, frame2.u0, frame2.v0, frame2.u1, frame2.v1, 1, 1, 1, alpha);
}

// src/math/Clamp.ts
function Clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// src/renderer/webgl1/draw/DrawImagePart.ts
function DrawImagePart(renderPass, texture, x0, y0, x1, y1, dx, dy, dw, dh, alpha = 1) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  const frame2 = texture.firstFrame;
  const textureIndex = SetTexture(texture);
  const frameWidth = frame2.width;
  const frameHeight = frame2.height;
  x0 = Clamp(x0, 0, frameWidth);
  x1 = Clamp(x1, x0, frameWidth);
  y0 = Clamp(y0, 0, frameHeight);
  y1 = Clamp(y1, y0, frameHeight);
  const uRange = frame2.u1 - frame2.u0;
  const vRange = frame2.v1 - frame2.v0;
  const u0 = frame2.u0 + uRange * (x0 / frameWidth);
  const v0 = frame2.v0 + vRange * (y0 / frameHeight);
  const u1 = frame2.u0 + uRange * (x1 / frameWidth);
  const v1 = frame2.v0 + vRange * (y1 / frameHeight);
  if (dw === void 0 || dw === null) {
    dw = x1 - x0;
  }
  if (dh === void 0 || dh === null) {
    dh = y1 - y0;
  }
  BatchTexturedQuad(F32, offset, textureIndex, dx, dy, dx, dy + dh, dx + dw, dy + dh, dx + dw, dy, u0, v0, u1, v1, 1, 1, 1, alpha);
}

// src/renderer/webgl1/draw/DrawQuad.ts
function DrawQuad(renderPass, texture, frame2, x0, y0, x1, y1, x2, y2, x3, y3, alpha = 1) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  frame2 = texture.getFrame(frame2);
  const textureIndex = SetTexture(texture);
  BatchTexturedQuad(F32, offset, textureIndex, x0, y0, x1, y1, x2, y2, x3, y3, frame2.u0, frame2.v0, frame2.u1, frame2.v1, 1, 1, 1, alpha);
}

// src/renderer/webgl1/draw/DrawTiles.ts
function DrawTiles(renderPass, texture, tileWidth, tileHeight, mapData, mapWidth, x = 0, y = 0, alpha = 1) {
  let tx = 0;
  let ty = 0;
  let i = 0;
  mapData.forEach((tile) => {
    if (tile !== -1) {
      DrawFrame(renderPass, texture, tile, Math.floor(x + tx), Math.floor(y + ty), alpha);
    }
    i++;
    tx += tileWidth;
    if (i === mapWidth) {
      tx = 0;
      ty += tileHeight;
      i = 0;
    }
  });
}

// src/renderer/webgl1/draw/BatchTriangle.ts
function BatchTriangle(F32, offset, textureIndex, x1, y1, x2, y2, x3, y3, r, g, b, a) {
  F32.set([
    x1,
    y1,
    0,
    0,
    textureIndex,
    r,
    g,
    b,
    a,
    x2,
    y2,
    0,
    1,
    textureIndex,
    r,
    g,
    b,
    a,
    x3,
    y3,
    1,
    1,
    textureIndex,
    r,
    g,
    b,
    a
  ], offset);
  return offset + 27;
}

// src/geom/circle/CircleContains.ts
function CircleContains(circle2, x, y) {
  if (circle2.radius > 0 && x >= circle2.left && x <= circle2.right && y >= circle2.top && y <= circle2.bottom) {
    const dx = (circle2.x - x) * (circle2.x - x);
    const dy = (circle2.y - y) * (circle2.y - y);
    return dx + dy <= circle2.radius * circle2.radius;
  } else {
    return false;
  }
}

// src/geom/circle/Circle.ts
var Circle = class {
  x;
  y;
  _radius;
  _diameter;
  constructor(x = 0, y = 0, radius = 0) {
    this.set(x, y, radius);
  }
  set(x = 0, y = 0, radius = 0) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    return this;
  }
  contains(x, y) {
    return CircleContains(this, x, y);
  }
  get radius() {
    return this._radius;
  }
  set radius(value) {
    this._radius = value;
    this._diameter = value * 2;
  }
  get diameter() {
    return this._diameter;
  }
  set diameter(value) {
    this._diameter = value;
    this._radius = value * 0.5;
  }
  get left() {
    return this.x - this._radius;
  }
  set left(value) {
    this.x = value + this._radius;
  }
  get right() {
    return this.x + this._radius;
  }
  set right(value) {
    this.x = value - this._radius;
  }
  get top() {
    return this.y - this._radius;
  }
  set top(value) {
    this.y = value + this._radius;
  }
  get bottom() {
    return this.y + this._radius;
  }
  set bottom(value) {
    this.y = value - this._radius;
  }
};

// src/math/FromPercent.ts
function FromPercent(percent, min, max) {
  percent = Clamp(percent, 0, 1);
  return (max - min) * percent;
}

// src/geom/circle/GetCircleCircumference.ts
function GetCircleCircumference(circle2) {
  return 2 * (Math.PI * circle2.radius);
}

// src/geom/circle/GetCircleCircumferencePoint.ts
function GetCircleCircumferencePoint(circle2, angle, out = new Vec2()) {
  return out.set(circle2.x + circle2.radius * Math.cos(angle), circle2.y + circle2.radius * Math.sin(angle));
}

// src/math/const.ts
var MATH_CONST = {
  PI2: Math.PI * 2,
  HALF_PI: Math.PI * 0.5,
  EPSILON: 1e-6,
  DEG_TO_RAD: Math.PI / 180,
  RAD_TO_DEG: 180 / Math.PI,
  MIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER || -9007199254740991,
  MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 9007199254740991
};

// src/geom/circle/GetCirclePointsBetween.ts
function GetCirclePointsBetween(circle2, startAngle, endAngle, step, anticlockwise = false, includeCenter = false, quantity = 0, out = []) {
  if (!quantity) {
    quantity = GetCircleCircumference(circle2) / step;
  }
  for (let i = 0; i < quantity; i++) {
    const angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);
    if (angle >= startAngle && angle <= endAngle) {
      out.push(GetCircleCircumferencePoint(circle2, angle));
    }
  }
  if (anticlockwise) {
    out = out.reverse();
  }
  if (includeCenter) {
    out.push(new Vec2(circle2.x, circle2.y));
  }
  return out;
}

// src/geom/PolyPartition.ts
function Area(a, b, c) {
  return (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
}
function IsConvex(p1, p2, p3) {
  return Area(p1, p2, p3) < 0;
}
function Equals(a, b) {
  return a.x === b.x && a.y === b.y;
}
function IsClockwise(polygon) {
  let sum = 0;
  for (let i = 0, len = polygon.length; i < len; ++i) {
    const p1 = polygon[i];
    const p2 = polygon[(i + 1) % len];
    sum += (p2.x - p1.x) * (p2.y + p1.y);
  }
  return sum > 0;
}
function UpdateVertex(vertex, vertices) {
  if (!vertex.shouldUpdate) {
    return;
  }
  vertex.shouldUpdate = false;
  const v1 = vertex.prev.point;
  const v2 = vertex.point;
  const v3 = vertex.next.point;
  vertex.isConvex = IsConvex(v1, v2, v3);
  let v1x = v1.x - v2.x;
  let v1y = v1.y - v2.y;
  const v1Len = Math.sqrt(v1x * v1x + v1y * v1y);
  v1x /= v1Len;
  v1y /= v1Len;
  let v3x = v3.x - v2.x;
  let v3y = v3.y - v2.y;
  const v3Len = Math.sqrt(v3x * v3x + v3y * v3y);
  v3x /= v3Len;
  v3y /= v3Len;
  vertex.angleCos = v1x * v3x + v1y * v3y;
  if (vertex.isConvex) {
    vertex.isEar = true;
    for (let i = 0, len = vertices.length; i < len; ++i) {
      const curr = vertices[i];
      if (!curr.isActive || curr === vertex) {
        continue;
      }
      if (Equals(v1, curr.point) || Equals(v2, curr.point) || Equals(v3, curr.point)) {
        continue;
      }
      const areaA = Area(v1, curr.point, v2);
      const areaB = Area(v2, curr.point, v3);
      const areaC = Area(v3, curr.point, v1);
      if (areaA > 0 && areaB > 0 && areaC > 0) {
        vertex.isEar = false;
        break;
      }
      if (areaA === 0 && areaB >= 0 && areaC >= 0) {
        if (Area(v1, curr.prev.point, v2) > 0 || Area(v1, curr.next.point, v2) > 0) {
          vertex.isEar = false;
          break;
        }
      }
      if (areaB === 0 && areaA >= 0 && areaC >= 0) {
        if (Area(v2, curr.prev.point, v3) > 0 || Area(v2, curr.next.point, v3) > 0) {
          vertex.isEar = false;
          break;
        }
      }
      if (areaC === 0 && areaA >= 0 && areaB >= 0) {
        if (Area(v3, curr.prev.point, v1) > 0 || Area(v3, curr.next.point, v1) > 0) {
          vertex.isEar = false;
          break;
        }
      }
    }
  } else {
    vertex.isEar = false;
  }
}
function RemoveCollinearOrDuplicate(start) {
  for (let curr = start, end = start; ; ) {
    if (Equals(curr.point, curr.next.point) || Area(curr.prev.point, curr.point, curr.next.point) === 0) {
      curr.prev.next = curr.next;
      curr.next.prev = curr.prev;
      curr.prev.shouldUpdate = true;
      curr.next.shouldUpdate = true;
      if (curr === curr.next) {
        break;
      }
      end = curr.prev;
      curr = curr.next;
      continue;
    }
    curr = curr.next;
    if (curr === end) {
      break;
    }
  }
}
function Triangulate(polygon, doNotCheckOrdering = false) {
  if (!doNotCheckOrdering) {
    if (IsClockwise(polygon)) {
      throw new Error("Polygon should be counterclockwise");
    }
  }
  if (polygon.length < 4) {
    return [polygon];
  }
  const len = polygon.length;
  const vertices = [];
  const triangles = [];
  for (let i = 0; i < len; ++i) {
    vertices.push({
      isActive: true,
      isConvex: false,
      isEar: false,
      point: polygon[i],
      angleCos: 0,
      shouldUpdate: true,
      index: i
    });
  }
  for (let i = 0; i < len; ++i) {
    const vertex = vertices[i];
    vertex.prev = vertices[(i + len - 1) % len];
    vertex.next = vertices[(i + 1) % len];
  }
  vertices.forEach((vertex) => UpdateVertex(vertex, vertices));
  for (let i = 0; i < len - 3; ++i) {
    let ear = null;
    for (let j = 0; j < len; ++j) {
      const vertex = vertices[j];
      if (!vertex.isActive || !vertex.isEar) {
        continue;
      }
      if (!ear) {
        ear = vertex;
      } else if (vertex.angleCos > ear.angleCos) {
        ear = vertex;
      }
    }
    if (!ear) {
      for (let i2 = 0; i2 < len; ++i2) {
        const vertex = vertices[i2];
        if (vertex.isActive) {
          const p1 = vertex.prev.point;
          const p2 = vertex.point;
          const p3 = vertex.next.point;
          if (Math.abs(Area(p1, p2, p3)) > 1e-5) {
            throw new Error("Failed to find ear. There may be self-intersection in the polygon.");
          }
        }
      }
      break;
    }
    triangles.push([ear.prev.point, ear.point, ear.next.point]);
    ear.isActive = false;
    ear.prev.next = ear.next;
    ear.next.prev = ear.prev;
    ear.prev.shouldUpdate = true;
    ear.next.shouldUpdate = true;
    RemoveCollinearOrDuplicate(ear.next);
    if (i === len - 4) {
      break;
    }
    for (let i2 = 0; i2 < len; ++i2) {
      UpdateVertex(vertices[i2], vertices);
    }
  }
  for (let i = 0; i < len; ++i) {
    const vertex = vertices[i];
    if (vertex.isActive) {
      vertex.prev.isActive = false;
      vertex.next.isActive = false;
      const p1 = vertex.prev.point;
      const p2 = vertex.point;
      const p3 = vertex.next.point;
      if (Math.abs(Area(p1, p2, p3)) > 1e-5) {
        triangles.push([p1, p2, p3]);
      }
    }
  }
  return triangles;
}

// src/renderer/webgl1/draw/FillArc.ts
var circle;
function FillArc(renderPass, x, y, radius, startAngle, endAngle, steps, anticlockwise, includeCenter, red, green, blue, alpha) {
  if (!circle) {
    circle = new Circle();
  }
  circle.set(x, y, radius);
  const points = GetCirclePointsBetween(circle, startAngle, endAngle, steps, anticlockwise, includeCenter);
  const tris = Triangulate(points);
  if (!tris.length) {
    return;
  }
  const { F32, offset } = GetVertexBufferEntry(renderPass, tris.length);
  const textureIndex = SetWhiteTexture();
  let idx = offset;
  tris.forEach((tri) => {
    idx = BatchTriangle(F32, idx, textureIndex, tri[0].x, tri[0].y, tri[1].x, tri[1].y, tri[2].x, tri[2].y, red, green, blue, alpha);
  });
}

// src/renderer/webgl1/draw/BatchQuad.ts
function BatchQuad(F32, offset, textureIndex, x1, y1, x2, y2, x3, y3, x4, y4, r, g, b, a) {
  F32.set([
    x1,
    y1,
    0,
    0,
    textureIndex,
    r,
    g,
    b,
    a,
    x2,
    y2,
    0,
    1,
    textureIndex,
    r,
    g,
    b,
    a,
    x3,
    y3,
    1,
    1,
    textureIndex,
    r,
    g,
    b,
    a,
    x1,
    y1,
    0,
    0,
    textureIndex,
    r,
    g,
    b,
    a,
    x3,
    y3,
    1,
    1,
    textureIndex,
    r,
    g,
    b,
    a,
    x4,
    y4,
    1,
    0,
    textureIndex,
    r,
    g,
    b,
    a
  ], offset);
  return offset + 54;
}

// src/renderer/webgl1/draw/FillLine.ts
function FillLine(renderPass, x1, y1, x2, y2, width, red, green, blue, alpha) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  const textureIndex = SetWhiteTexture();
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  width *= 0.5;
  const al0 = width * (y2 - y1) / len;
  const al1 = width * (x1 - x2) / len;
  const bl0 = width * (y2 - y1) / len;
  const bl1 = width * (x1 - x2) / len;
  BatchQuad(F32, offset, textureIndex, Math.floor(x1 + al0), Math.floor(y1 + al1), Math.floor(x1 - al0), Math.floor(y1 - al1), Math.floor(x2 - bl0), Math.floor(y2 - bl1), Math.floor(x2 + bl0), Math.floor(y2 + bl1), red, green, blue, alpha);
}

// src/renderer/webgl1/draw/FillRect.ts
function FillRect(renderPass, x, y, width, height, red, green, blue, alpha) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  const textureIndex = SetWhiteTexture();
  x = Math.round(x);
  y = Math.round(y);
  BatchQuad(F32, offset, textureIndex, x, y, x, y + height, x + width, y + height, x + width, y, red, green, blue, alpha);
}

// src/renderer/webgl1/draw/FillTriangle.ts
function FillTriangle(renderPass, x1, y1, x2, y2, x3, y3, red, green, blue, alpha) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 1);
  const textureIndex = SetWhiteTexture();
  BatchTriangle(F32, offset, textureIndex, x1, y1, x2, y2, x3, y3, red, green, blue, alpha);
}

// src/gameobjects/directdraw/DirectDraw.ts
var DirectDraw = class extends GameObject {
  type = "DirectDraw";
  red = 1;
  green = 1;
  blue = 1;
  alpha = 1;
  smoothness = 8;
  renderPass;
  _color;
  constructor() {
    super();
  }
  set color(value) {
    if (value !== void 0 && value !== this._color) {
      this.red = (value >> 16 & 255) / 255;
      this.green = (value >> 8 & 255) / 255;
      this.blue = (value & 255) / 255;
      this._color = value;
    }
  }
  setRGB(red, green, blue, alpha = 1) {
    this.red = red / 255;
    this.green = green / 255;
    this.blue = blue / 255;
    this.alpha = alpha;
    return this;
  }
  arc(x, y, radius, startAngle = 0, endAngle = 6.283185307179586, anticlockwise = false, includeCenter = false, color) {
    this.color = color;
    FillArc(this.renderPass, x, y, radius, startAngle, endAngle, this.smoothness, anticlockwise, includeCenter, this.red, this.green, this.blue, this.alpha);
    return this;
  }
  circle(x, y, radius, color) {
    this.color = color;
    FillArc(this.renderPass, x, y, radius, 0, Math.PI * 2, this.smoothness, false, false, this.red, this.green, this.blue, this.alpha);
    return this;
  }
  plot(x, y, color) {
    this.color = color;
    FillRect(this.renderPass, x, y, 1, 1, this.red, this.green, this.blue, this.alpha);
    return this;
  }
  box(x, y, width, height, thickness = 1, color) {
    this.color = color;
    const tw = thickness * 0.5;
    this.line(x, y + tw, x + width, y + tw, thickness);
    this.line(x, y + height - tw, x + width, y + height - tw, thickness);
    this.line(x + tw, y + thickness, x + tw, y + height - thickness, thickness);
    this.line(x + width - tw, y + thickness, x + width - tw, y + height - thickness, thickness);
    return this;
  }
  rect(x, y, width, height, color) {
    this.color = color;
    FillRect(this.renderPass, x, y, width, height, this.red, this.green, this.blue, this.alpha);
    return this;
  }
  triangle(x1, y1, x2, y2, x3, y3, color) {
    this.color = color;
    FillTriangle(this.renderPass, x1, y1, x2, y2, x3, y3, this.red, this.green, this.blue, this.alpha);
    return this;
  }
  line(x1, y1, x2, y2, width, color) {
    this.color = color;
    FillLine(this.renderPass, x1, y1, x2, y2, width, this.red, this.green, this.blue, this.alpha);
    return this;
  }
  image(texture, x, y, alpha = 1, scaleX = 1, scaleY = 1) {
    DrawImage(this.renderPass, texture, x, y, alpha, scaleX, scaleY);
    return this;
  }
  imagePart(texture, x0, y0, x1, y1, dx, dy, dw, dh, alpha = 1) {
    DrawImagePart(this.renderPass, texture, x0, y0, x1, y1, dx, dy, dw, dh, alpha);
    return this;
  }
  frame(texture, frame2, x, y, alpha = 1, scaleX = 1, scaleY = 1) {
    DrawFrame(this.renderPass, texture, frame2, x, y, alpha, scaleX, scaleY);
    return this;
  }
  quad(texture, frame2, x0, y0, x1, y1, x2, y2, x3, y3, alpha = 1) {
    DrawQuad(this.renderPass, texture, frame2, x0, y0, x1, y1, x2, y2, x3, y3, alpha);
    return this;
  }
  tiles(texture, tileWidth, tileHeight, mapData, mapWidth, x = 0, y = 0) {
    DrawTiles(this.renderPass, texture, tileWidth, tileHeight, mapData, mapWidth, x, y, this.alpha);
    return this;
  }
  render() {
  }
  renderGL(renderPass) {
    this.renderPass = renderPass;
    this.render();
  }
};

// src/renderer/webgl1/draw/BatchSingleQuadFlipped.ts
function BatchSingleQuadFlipped(renderPass, x, y, width, height, u0, v0, u1, v1, textureIndex = 0) {
  const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
  BatchTexturedQuad(F32, offset, textureIndex, x, y + height, x, y, x + width, y, x + width, y + height, u0, v0, u1, v1, 1, 1, 1, 1);
}

// src/renderer/webgl1/draw/DrawTexturedQuadFlipped.ts
function DrawTexturedQuadFlipped(renderPass, texture, x, y, shader) {
  if (!shader) {
    shader = renderPass.quadShader;
  }
  const { u0, v0, u1, v1 } = texture.firstFrame;
  Flush(renderPass);
  ClearTextures();
  BindTexture(texture, 0);
  SetShader(shader, 0);
  const camera = renderPass.current2DCamera;
  const cx = camera.getBoundsX() + x;
  const cy = camera.getBoundsY() + y;
  BatchSingleQuadFlipped(renderPass, cx, cy, texture.width, texture.height, u0, v0, u1, v1, 0);
  Flush(renderPass);
  UnbindTexture(texture);
  PopShader();
}

// src/gameobjects/layer/Layer.ts
var Layer = class extends GameObject {
  type = "Layer";
  constructor() {
    super();
    const id = this.id;
    SetWillTransformChildren(id, false);
    SetWillCacheChildren(id, false);
  }
};

// src/gameobjects/renderlayer/RenderLayer.ts
var RenderLayer = class extends Layer {
  type = "RenderLayer";
  color;
  texture;
  framebuffer;
  viewport;
  _x;
  _y;
  constructor(x = 0, y = 0, width = GetWidth(), height = GetHeight(), resolution = GetResolution()) {
    super();
    const id = this.id;
    SetWillCacheChildren(id, true);
    SetWillRenderChildren(id, true);
    const texture = new Texture(null, width * resolution, height * resolution);
    texture.key = `${this.type}${id}`;
    const binding = new GLTextureBinding(texture, {
      createFramebuffer: true
    });
    AddQuadVertex(id, width, height);
    SetQuadPosition(id, 0, height, 0, 0, width, 0, width, height);
    this.texture = texture;
    this.framebuffer = binding.framebuffer;
    this.color = new Color2(id);
    this.x = x;
    this.y = y;
    this.viewport = new Rectangle();
  }
  set x(value) {
    this._x = value;
    SetDirty(this.id);
  }
  get x() {
    return this._x;
  }
  set y(value) {
    this._y = value;
    SetDirty(this.id);
  }
  get y() {
    return this._y;
  }
  renderGL(renderPass) {
    const id = this.id;
    const view = this.viewport;
    const texture = this.texture;
    if (IsDirty(id)) {
      const rendererHeight = renderPass.renderer.height;
      view.set(-this.x, -(rendererHeight - texture.height - this.y), renderPass.renderer.width, rendererHeight);
      SetDirtyChildCache(id);
    }
    SetColor(renderPass, this.color);
    if (renderPass.isCameraDirty() || HasDirtyChildCache(id)) {
      SetDirty(id);
      if (texture.binding.isBound) {
        UnbindTexture(texture);
      }
      Flush(renderPass);
      SetFramebuffer(this.framebuffer, true, view);
    }
  }
  postRenderGL(renderPass) {
    const id = this.id;
    const texture = this.texture;
    if (IsDirty(id)) {
      Flush(renderPass);
      PopFramebuffer();
      ClearDirty(id);
      ClearDirtyChildCache(id);
      SetDirtyParents(id);
      SetInversedQuadFromCamera(id, renderPass.current2DCamera, this.x, this.y, texture.width, texture.height);
      DrawTexturedQuadFlipped(renderPass, texture, this.x, this.y);
    } else {
      BatchTexturedQuadBuffer(this.texture, id, renderPass);
    }
    PopColor(renderPass, this.color);
  }
};

// src/gameobjects/effectlayer/EffectLayer.ts
var EffectLayer = class extends RenderLayer {
  type = "EffectLayer";
  shaders = [];
  constructor(width = GetWidth(), height = GetHeight(), resolution = GetResolution(), ...shaders) {
    super(0, 0, width, height, resolution);
    if (Array.isArray(shaders)) {
      this.shaders = shaders;
    }
  }
  postRenderGL(renderPass) {
    const id = this.id;
    const shaders = this.shaders;
    const texture = this.texture;
    if (IsDirty(id)) {
      Flush(renderPass);
      PopFramebuffer();
      ClearDirty(id);
      ClearDirtyChildCache(id);
      SetDirtyParents(id);
      SetInversedQuadFromCamera(id, renderPass.current2DCamera, this.x, this.y, texture.width, texture.height);
    }
    if (shaders.length === 0) {
      BatchTexturedQuadBuffer(texture, id, renderPass);
    } else {
      const x = this.x;
      const y = this.y;
      let prevTexture = texture;
      for (let i = 0; i < shaders.length; i++) {
        const shader = shaders[i];
        DrawTexturedQuadFlipped(renderPass, prevTexture, x, y, shader);
        prevTexture = shader.texture;
      }
      DrawTexturedQuadFlipped(renderPass, prevTexture, x, y);
    }
  }
};

// src/textures/index.ts
var textures_exports = {};
__export(textures_exports, {
  AlphaTexture: () => AlphaTexture,
  CreateCanvas: () => CreateCanvas,
  CreateTextureManager: () => CreateTextureManager,
  Frame: () => Frame,
  GetFrames: () => GetFrames,
  GetFramesInRange: () => GetFramesInRange,
  GetTexture: () => GetTexture,
  Palettes: () => palettes_exports,
  Parsers: () => parsers_exports,
  SetFilter: () => SetFilter,
  Texture: () => Texture,
  TextureManager: () => TextureManager,
  Types: () => types_exports,
  WhiteTexture: () => WhiteTexture
});

// src/textures/palettes/index.ts
var palettes_exports = {};
__export(palettes_exports, {
  Arne16: () => Arne16,
  C64: () => C64,
  CGA: () => CGA,
  JMP: () => JMP,
  MSX: () => MSX,
  PICO8: () => PICO8
});

// src/textures/palettes/Arne16.ts
var Arne16 = [
  "#000",
  "#9D9D9D",
  "#FFF",
  "#BE2633",
  "#E06F8B",
  "#493C2B",
  "#A46422",
  "#EB8931",
  "#F7E26B",
  "#2F484E",
  "#44891A",
  "#A3CE27",
  "#1B2632",
  "#005784",
  "#31A2F2",
  "#B2DCEF"
];

// src/textures/palettes/C64.ts
var C64 = [
  "#000",
  "#fff",
  "#8b4131",
  "#7bbdc5",
  "#8b41ac",
  "#6aac41",
  "#3931a4",
  "#d5de73",
  "#945a20",
  "#5a4100",
  "#bd736a",
  "#525252",
  "#838383",
  "#acee8b",
  "#7b73de",
  "#acacac"
];

// src/textures/palettes/CGA.ts
var CGA = [
  "#000",
  "#2234d1",
  "#0c7e45",
  "#44aacc",
  "#8a3622",
  "#5c2e78",
  "#aa5c3d",
  "#b5b5b5",
  "#5e606e",
  "#4c81fb",
  "#6cd947",
  "#7be2f9",
  "#eb8a60",
  "#e23d69",
  "#ffd93f",
  "#fff"
];

// src/textures/palettes/JMP.ts
var JMP = [
  "#000",
  "#191028",
  "#46af45",
  "#a1d685",
  "#453e78",
  "#7664fe",
  "#833129",
  "#9ec2e8",
  "#dc534b",
  "#e18d79",
  "#d6b97b",
  "#e9d8a1",
  "#216c4b",
  "#d365c8",
  "#afaab9",
  "#f5f4eb"
];

// src/textures/palettes/MSX.ts
var MSX = [
  "#000",
  "#191028",
  "#46af45",
  "#a1d685",
  "#453e78",
  "#7664fe",
  "#833129",
  "#9ec2e8",
  "#dc534b",
  "#e18d79",
  "#d6b97b",
  "#e9d8a1",
  "#216c4b",
  "#d365c8",
  "#afaab9",
  "#fff"
];

// src/textures/palettes/PICO8.ts
var PICO8 = [
  "#000",
  "#1D2B53",
  "#7E2553",
  "#008751",
  "#AB5236",
  "#5F574F",
  "#C2C3C7",
  "#FFF1E8",
  "#FF004D",
  "#FFA300",
  "#FFEC27",
  "#00E436",
  "#29ADFF",
  "#83769C",
  "#FF77A8",
  "#FFCCAA"
];

// src/textures/parsers/index.ts
var parsers_exports = {};
__export(parsers_exports, {
  AtlasParser: () => AtlasParser,
  BitmapTextParser: () => BitmapTextParser,
  KTXParser: () => KTXParser,
  PVRParser: () => PVRParser,
  SpriteSheetParser: () => SpriteSheetParser
});

// src/textures/SetFramePivot.ts
function SetFramePivot(frame2, x, y) {
  frame2.pivot = { x, y };
  return frame2;
}

// src/textures/SetFrameSourceSize.ts
function SetFrameSourceSize(frame2, width, height) {
  frame2.sourceSizeWidth = width;
  frame2.sourceSizeHeight = height;
  return frame2;
}

// src/textures/SetFrameTrim.ts
function SetFrameTrim(frame2, width, height, x, y, w, h) {
  frame2.trimmed = true;
  frame2.sourceSizeWidth = width;
  frame2.sourceSizeHeight = height;
  frame2.spriteSourceSizeX = x;
  frame2.spriteSourceSizeY = y;
  frame2.spriteSourceSizeWidth = w;
  frame2.spriteSourceSizeHeight = h;
  return frame2;
}

// src/textures/parsers/AtlasParser.ts
function AtlasParser(texture, data) {
  let frames;
  if (Array.isArray(data.textures)) {
    frames = data.textures[0].frames;
  } else if (Array.isArray(data.frames)) {
    frames = data.frames;
  } else if (data.hasOwnProperty("frames")) {
    frames = [];
    for (const [filename, frame2] of Object.entries(data.frames)) {
      frame2["filename"] = filename;
      frames.push(frame2);
    }
  } else {
    console.warn("Invalid Texture Atlas JSON");
  }
  if (frames) {
    let newFrame;
    for (let i = 0; i < frames.length; i++) {
      const src = frames[i];
      newFrame = texture.addFrame(src.filename, src.frame.x, src.frame.y, src.frame.w, src.frame.h);
      if (src.trimmed) {
        SetFrameTrim(newFrame, src.sourceSize.w, src.sourceSize.h, src.spriteSourceSize.x, src.spriteSourceSize.y, src.spriteSourceSize.w, src.spriteSourceSize.h);
      } else {
        SetFrameSourceSize(newFrame, src.sourceSize.w, src.sourceSize.h);
      }
      if (src.rotated) {
      }
      if (src.anchor) {
        SetFramePivot(newFrame, src.anchor.x, src.anchor.y);
      }
    }
  }
}

// src/textures/parsers/BitmapTextParser.ts
function GetValue(node, attribute) {
  return parseInt(node.getAttribute(attribute), 10);
}
function BitmapTextParser(texture, xml, frame2) {
  const xSpacing = 0;
  const ySpacing = 0;
  const info = xml.getElementsByTagName("info")[0];
  const common = xml.getElementsByTagName("common")[0];
  const data = {
    font: info.getAttribute("face"),
    size: GetValue(info, "size"),
    lineHeight: GetValue(common, "lineHeight") + ySpacing,
    chars: {}
  };
  const letters = xml.getElementsByTagName("char");
  for (let i = 0; i < letters.length; i++) {
    const node = letters[i];
    const charCode = GetValue(node, "id");
    const x = GetValue(node, "x");
    const y = GetValue(node, "y");
    const width = GetValue(node, "width");
    const height = GetValue(node, "height");
    data.chars[charCode] = {
      x,
      y,
      width,
      height,
      xOffset: GetValue(node, "xoffset"),
      yOffset: GetValue(node, "yoffset"),
      xAdvance: GetValue(node, "xadvance") + xSpacing,
      kerning: {}
    };
    texture.addFrame(charCode, x, y, width, height);
  }
  const kernings = xml.getElementsByTagName("kerning");
  for (let i = 0; i < kernings.length; i++) {
    const kern = kernings[i];
    const first = GetValue(kern, "first");
    const second = GetValue(kern, "second");
    const amount = GetValue(kern, "amount");
    data.chars[second].kerning[first] = amount;
  }
  return data;
}

// src/textures/parsers/KTXParser.ts
function KTXParser(data) {
  const idCheck = [171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10];
  const id = new Uint8Array(data, 0, 12);
  for (let i = 0; i < id.length; i++) {
    if (id[i] !== idCheck[i]) {
      console.error("KTXParser - Invalid file format");
      return;
    }
  }
  const size = Uint32Array.BYTES_PER_ELEMENT;
  const head = new DataView(data, 12, 13 * size);
  const littleEndian = head.getUint32(0, true) === 67305985;
  const glType = head.getUint32(1 * size, littleEndian);
  if (glType !== 0) {
    console.warn("KTXParser - Only compressed formats supported");
    return;
  }
  const internalFormat = head.getUint32(4 * size, littleEndian);
  const width = head.getUint32(6 * size, littleEndian);
  const height = head.getUint32(7 * size, littleEndian);
  const mipmapLevels = Math.max(1, head.getUint32(11 * size, littleEndian));
  const bytesOfKeyValueData = head.getUint32(12 * size, littleEndian);
  const mipmaps = new Array(mipmapLevels);
  let offset = 12 + 13 * 4 + bytesOfKeyValueData;
  let levelWidth = width;
  let levelHeight = height;
  for (let i = 0; i < mipmapLevels; i++) {
    const levelSize = new Int32Array(data, offset, 1)[0];
    offset += 4;
    mipmaps[i] = {
      data: new Uint8Array(data, offset, levelSize),
      width: levelWidth,
      height: levelHeight
    };
    console.log("KTX", i, "size", levelWidth, levelHeight);
    levelWidth = Math.max(1, levelWidth >> 1);
    levelHeight = Math.max(1, levelHeight >> 1);
    offset += levelSize;
  }
  return {
    mipmaps,
    width,
    height,
    internalFormat,
    compressed: true,
    generateMipmap: false
  };
}

// src/textures/parsers/PVRParser.ts
function GetSize(width, height, x, y, dx, dy, mult = 16) {
  return Math.floor((width + x) / dx) * Math.floor((height + y) / dy) * mult;
}
function PVRTC2bppSize(width, height) {
  width = Math.max(width, 16);
  height = Math.max(height, 8);
  return width * height / 4;
}
function PVRTC4bppSize(width, height) {
  width = Math.max(width, 8);
  height = Math.max(height, 8);
  return width * height / 2;
}
function DXTEtcSmallSize(width, height) {
  return GetSize(width, height, 3, 3, 4, 4, 8);
}
function DXTEtcAstcBigSize(width, height) {
  return GetSize(width, height, 3, 3, 4, 4);
}
function ATC5x4Size(width, height) {
  return GetSize(width, height, 4, 3, 5, 4);
}
function ATC5x5Size(width, height) {
  return GetSize(width, height, 4, 4, 5, 5);
}
function ATC6x5Size(width, height) {
  return GetSize(width, height, 5, 4, 6, 5);
}
function ATC6x6Size(width, height) {
  return GetSize(width, height, 5, 5, 6, 6);
}
function ATC8x5Size(width, height) {
  return GetSize(width, height, 7, 4, 8, 5);
}
function ATC8x6Size(width, height) {
  return GetSize(width, height, 7, 5, 8, 6);
}
function ATC8x8Size(width, height) {
  return GetSize(width, height, 7, 7, 8, 8);
}
function ATC10x5Size(width, height) {
  return GetSize(width, height, 9, 4, 10, 5);
}
function ATC10x6Size(width, height) {
  return GetSize(width, height, 9, 5, 10, 6);
}
function ATC10x8Size(width, height) {
  return GetSize(width, height, 9, 7, 10, 8);
}
function ATC10x10Size(width, height) {
  return GetSize(width, height, 9, 9, 10, 10);
}
function ATC12x10Size(width, height) {
  return GetSize(width, height, 11, 9, 12, 10);
}
function ATC12x12Size(width, height) {
  return GetSize(width, height, 11, 11, 12, 12);
}
var FORMATS = {
  0: { sizeFunc: PVRTC2bppSize, glFormat: 35841 },
  1: { sizeFunc: PVRTC2bppSize, glFormat: 35843 },
  2: { sizeFunc: PVRTC4bppSize, glFormat: 35840 },
  3: { sizeFunc: PVRTC4bppSize, glFormat: 35842 },
  6: { sizeFunc: DXTEtcSmallSize, glFormat: 36196 },
  7: { sizeFunc: DXTEtcSmallSize, glFormat: 33776 },
  8: { sizeFunc: DXTEtcAstcBigSize, glFormat: 33777 },
  9: { sizeFunc: DXTEtcAstcBigSize, glFormat: 33778 },
  11: { sizeFunc: DXTEtcAstcBigSize, glFormat: 33779 },
  22: { sizeFunc: DXTEtcSmallSize, glFormat: 37492 },
  23: { sizeFunc: DXTEtcAstcBigSize, glFormat: 37496 },
  24: { sizeFunc: DXTEtcSmallSize, glFormat: 37494 },
  25: { sizeFunc: DXTEtcSmallSize, glFormat: 37488 },
  26: { sizeFunc: DXTEtcAstcBigSize, glFormat: 37490 },
  27: { sizeFunc: DXTEtcAstcBigSize, glFormat: 37808 },
  28: { sizeFunc: ATC5x4Size, glFormat: 37809 },
  29: { sizeFunc: ATC5x5Size, glFormat: 37810 },
  30: { sizeFunc: ATC6x5Size, glFormat: 37811 },
  31: { sizeFunc: ATC6x6Size, glFormat: 37812 },
  32: { sizeFunc: ATC8x5Size, glFormat: 37813 },
  33: { sizeFunc: ATC8x6Size, glFormat: 37814 },
  34: { sizeFunc: ATC8x8Size, glFormat: 37815 },
  35: { sizeFunc: ATC10x5Size, glFormat: 37816 },
  36: { sizeFunc: ATC10x6Size, glFormat: 37817 },
  37: { sizeFunc: ATC10x8Size, glFormat: 37818 },
  38: { sizeFunc: ATC10x10Size, glFormat: 37819 },
  39: { sizeFunc: ATC12x10Size, glFormat: 37820 },
  40: { sizeFunc: ATC12x12Size, glFormat: 37821 }
};
function PVRParser(data) {
  const header = new Uint32Array(data, 0, 13);
  const pvrFormat = header[2];
  const internalFormat = FORMATS[pvrFormat].glFormat;
  const sizeFunction = FORMATS[pvrFormat].sizeFunc;
  const mipmapLevels = header[11];
  const width = header[7];
  const height = header[6];
  const dataOffset = 52 + header[12];
  const image = new Uint8Array(data, dataOffset);
  const mipmaps = new Array(mipmapLevels);
  let offset = 0;
  let levelWidth = width;
  let levelHeight = height;
  for (let i = 0; i < mipmapLevels; i++) {
    const levelSize = sizeFunction(levelWidth, levelHeight);
    mipmaps[i] = {
      data: new Uint8Array(image.buffer, image.byteOffset + offset, levelSize),
      width: levelWidth,
      height: levelHeight
    };
    levelWidth = Math.max(1, levelWidth >> 1);
    levelHeight = Math.max(1, levelHeight >> 1);
    offset += levelSize;
  }
  return {
    mipmaps,
    width,
    height,
    internalFormat,
    compressed: true,
    generateMipmap: false
  };
}

// src/textures/parsers/SpriteSheetParser.ts
function SpriteSheetParser(texture, x, y, width, height, frameConfig) {
  const {
    frameWidth = null,
    endFrame = -1,
    margin = 0,
    spacingX = 0,
    spacingY = 0
  } = frameConfig;
  let {
    frameHeight = null,
    startFrame = 0
  } = frameConfig;
  if (!frameHeight) {
    frameHeight = frameWidth;
  }
  if (frameWidth === null) {
    throw new Error("SpriteSheetParser: Invalid frameWidth");
  }
  const row = Math.floor((width - margin + spacingX) / (frameWidth + spacingX));
  const column = Math.floor((height - margin + spacingY) / (frameHeight + spacingY));
  let total = row * column;
  if (total === 0) {
    console.warn("SpriteSheetParser: Frame config will result in zero frames");
  }
  if (startFrame > total || startFrame < -total) {
    startFrame = 0;
  }
  if (startFrame < 0) {
    startFrame = total + startFrame;
  }
  if (endFrame !== -1) {
    total = startFrame + (endFrame + 1);
  }
  let fx = margin;
  let fy = margin;
  let ax = 0;
  let ay = 0;
  for (let i = 0; i < total; i++) {
    ax = 0;
    ay = 0;
    const w = fx + frameWidth;
    const h = fy + frameHeight;
    if (w > width) {
      ax = w - width;
    }
    if (h > height) {
      ay = h - height;
    }
    texture.addFrame(i, x + fx, y + fy, frameWidth - ax, frameHeight - ay);
    fx += frameWidth + spacingX;
    if (fx + frameWidth > width) {
      fx = margin;
      fy += frameHeight + spacingY;
    }
  }
}

// src/textures/types/index.ts
var types_exports = {};
__export(types_exports, {
  CanvasTexture: () => CanvasTexture,
  DebugSpriteIDTexture: () => DebugSpriteIDTexture,
  GridTexture: () => GridTexture,
  LinearGradientTexture: () => LinearGradientTexture,
  PixelTexture: () => PixelTexture,
  RenderTexture: () => RenderTexture,
  SolidColorTexture: () => SolidColorTexture
});

// src/textures/CreateCanvas.ts
function CreateCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d");
}

// src/textures/types/CanvasTexture.ts
function CanvasTexture(width = 32, height = 32) {
  const ctx = CreateCanvas(width, height);
  return new Texture(ctx.canvas);
}

// src/textures/types/DebugSpriteIDTexture.ts
function DebugSpriteIDTexture(cellWidth = 32, cellHeight = 32, cols = 32, rows = 32) {
  const ctx = CreateCanvas(cellWidth * cols, cellHeight * rows);
  const colors = [
    "#e27458",
    "#e89361",
    "#f0b26b",
    "#fff57e",
    "#b4d27e",
    "#8dc37e",
    "#62b57e",
    "#58b8b3",
    "#44bced",
    "#568ac5",
    "#5c73b4",
    "#605ca3",
    "#8061a4",
    "#9e67a5",
    "#e076a8",
    "#e1757f"
  ];
  let colorIndex = 0;
  let cell = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.fillStyle = colors[colorIndex];
      ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x * cellWidth + 0.5, y * cellHeight + 0.5, cellWidth - 1, cellHeight - 1);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.textAlign = "center";
      ctx.font = "12px monospace";
      ctx.fillText(`${cell}`, x * cellWidth + cellWidth / 2, y * cellHeight + 20);
      cell++;
      colorIndex++;
      if (colorIndex >= colors.length) {
        colorIndex = 0;
      }
    }
  }
  const texture = new Texture(ctx.canvas);
  SpriteSheetParser(texture, 0, 0, cellWidth * cols, cellHeight * rows, { frameWidth: cellWidth, frameHeight: cellHeight });
  return texture;
}

// src/textures/types/GridTexture.ts
function GridTexture(color1, color2, width = 32, height = 32, cols = 2, rows = 2) {
  const ctx = CreateCanvas(width, height);
  const colWidth = width / cols;
  const rowHeight = height / rows;
  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = color2;
  for (let y = 0; y < rows; y++) {
    for (let x = y % 2; x < cols; x += 2) {
      ctx.fillRect(x * colWidth, y * rowHeight, colWidth, rowHeight);
    }
  }
  return new Texture(ctx.canvas);
}

// src/textures/types/LinearGradientTexture.ts
function LinearGradientTexture(config) {
  const {
    width = 256,
    height = 256,
    horizontal = false,
    x0 = 0,
    y0 = 0,
    x1 = horizontal ? width : 0,
    y1 = horizontal ? 0 : height,
    colorStops = [{ offset: 0, color: "red" }]
  } = config;
  const ctx = CreateCanvas(width, height);
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  for (const colorStop of colorStops.values()) {
    gradient.addColorStop(colorStop.offset, colorStop.color);
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  return new Texture(ctx.canvas);
}

// src/textures/types/PixelTexture.ts
function PixelTexture(config) {
  const {
    data = [],
    palette = Arne16,
    pixelWidth = 1,
    pixelHeight = pixelWidth,
    preRender = null,
    postRender = null
  } = config;
  let {
    canvas = null,
    resizeCanvas = true,
    clearCanvas = true
  } = config;
  const width = Math.floor(Math.abs(data[0].length * pixelWidth));
  const height = Math.floor(Math.abs(data.length * pixelHeight));
  if (!canvas) {
    canvas = CreateCanvas(width, height).canvas;
    resizeCanvas = false;
    clearCanvas = false;
  }
  if (resizeCanvas) {
    canvas.width = width;
    canvas.height = height;
  }
  const ctx = canvas.getContext("2d");
  if (clearCanvas) {
    ctx.clearRect(0, 0, width, height);
  }
  if (preRender) {
    preRender(canvas, ctx);
  }
  for (let y = 0; y < data.length; y++) {
    const row = data[y];
    for (let x = 0; x < row.length; x++) {
      const d = row[x];
      if (d !== "." && d !== " ") {
        ctx.fillStyle = palette[parseInt("0x" + d.toUpperCase())];
        ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
      }
    }
  }
  if (postRender) {
    postRender(canvas, ctx);
  }
  return new Texture(canvas);
}

// src/textures/types/RenderTexture.ts
var RenderTexture = class extends Texture {
  renderer;
  cameraMatrix;
  projectionMatrix;
  constructor(renderer, width = 256, height = width) {
    super(null, width, height);
    this.renderer = renderer;
  }
  cls() {
    return this;
  }
  batchStart() {
    return this;
  }
  batchDraw(sprites) {
    for (let i = 0, len = sprites.length; i < len; i++) {
    }
    return this;
  }
  batchEnd() {
    const renderer = this.renderer;
    renderer.reset();
    return this;
  }
  draw(...sprites) {
    this.batchStart();
    this.batchDraw(sprites);
    this.batchEnd();
    return this;
  }
};

// src/textures/types/SolidColorTexture.ts
function SolidColorTexture(color = "rgba(0,0,0,0)", width = 32, height = 32) {
  const ctx = CreateCanvas(width, height);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  return new Texture(ctx.canvas);
}

// src/textures/AlphaTexture.ts
var instance6;
var AlphaTexture = {
  get: () => {
    return instance6;
  },
  set: (texture) => {
    instance6 = texture;
  }
};

// src/textures/TextureManager.ts
var TextureManager = class {
  textures;
  constructor() {
    TextureManagerInstance.set(this);
    this.textures = new Map();
    this.createDefaultTextures();
  }
  createDefaultTextures() {
    const alphaTexture = this.add("__BLANK", new Texture(CreateCanvas(2, 2).canvas));
    AlphaTexture.set(alphaTexture);
    const missing = CreateCanvas(32, 32);
    missing.strokeStyle = "#0f0";
    missing.moveTo(0, 0);
    missing.lineTo(32, 32);
    missing.stroke();
    missing.strokeRect(0.5, 0.5, 31, 31);
    this.add("__MISSING", new Texture(missing.canvas));
    const white = CreateCanvas(2, 2);
    white.fillStyle = "#fff";
    white.fillRect(0, 0, 2, 2);
    const whiteTexture = this.add("__WHITE", new Texture(white.canvas));
    WhiteTexture.set(whiteTexture);
  }
  get(key) {
    const textures = this.textures;
    if (textures.has(key)) {
      return textures.get(key);
    } else {
      return textures.get("__MISSING");
    }
  }
  has(key) {
    return this.textures.has(key);
  }
  add(key, source, glConfig) {
    let texture;
    if (!this.textures.has(key)) {
      if (source instanceof Texture) {
        texture = source;
      } else {
        texture = new Texture(source, 0, 0, glConfig);
      }
      texture.key = key;
      this.textures.set(key, texture);
    }
    return texture;
  }
  update(key, source, glConfig) {
    const texture = this.textures.get(key);
    if (texture) {
      texture.update(source, glConfig);
    }
    return texture;
  }
};

// src/textures/CreateTextureManager.ts
function CreateTextureManager() {
  new TextureManager();
}

// src/textures/GetFrames.ts
function GetFrames(texture, frames) {
  if (typeof texture === "string") {
    texture = GetTexture(texture);
  }
  const output = [];
  for (const frame2 of texture.frames.values()) {
    if (frame2.key === "__BASE" && texture.frames.size > 1) {
      continue;
    }
    if (!frames || frames.indexOf(frame2.key) !== -1) {
      output.push(frame2);
    }
  }
  return output;
}

// src/textures/SetFilter.ts
function SetFilter(linear, ...textures) {
  textures.forEach((texture) => {
    if (texture.binding) {
      texture.binding.setFilter(linear);
    }
  });
  return textures;
}

// src/gameobjects/rectangle/Rectangle.ts
var Rectangle2 = class extends Container {
  type = "Rectangle";
  texture;
  frame;
  constructor(x, y, width = 64, height = 64, color = 16777215) {
    super(x, y);
    const id = this.id;
    AddQuadVertex(id);
    this.texture = WhiteTexture.get();
    this.frame = this.texture.getFrame();
    SetExtentFromFrame(this, this.frame);
    SetVertexUVsFromFrame(id, this.frame);
    this.size.set(width, height);
    this.color.tint = color;
  }
  isRenderable() {
    return this.visible && WillRender(this.id) && this.alpha > 0;
  }
  renderGL(renderPass) {
    const color = this.color;
    if (this.shader) {
      Flush(renderPass);
      SetShader(this.shader, 0);
    }
    if (color.colorMatrixEnabled) {
      SetColorMatrix(color);
    }
    this.preRenderGL(renderPass);
    BatchTexturedQuadBuffer(this.texture, this.id, renderPass);
    if (color.colorMatrixEnabled && !color.willColorChildren) {
      Flush(renderPass);
      PopColorMatrix();
    }
  }
  renderCanvas(renderer) {
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.texture = null;
    this.frame = null;
  }
};

// src/math/spatialgrid/SpatialHashGrid.ts
var SpatialHashGrid = class {
  cellWidth;
  cellHeight;
  cells;
  ids;
  index;
  getBounds;
  constructor(cellWidth, cellHeight, getBounds = GetLocalBounds) {
    this.cellWidth = Math.abs(cellWidth);
    this.cellHeight = Math.abs(cellHeight);
    this.cells = new Map();
    this.ids = [];
    this.index = 0;
    this.getBounds = getBounds;
  }
  clear() {
    this.cells.forEach((cell) => cell.clear());
    this.cells.clear();
    this.ids = [];
    this.index = 0;
  }
  getX(x) {
    return Math.floor(x / this.cellWidth);
  }
  getY(y) {
    return Math.floor(y / this.cellHeight);
  }
  getXCeil(x) {
    return Math.ceil(x / this.cellWidth);
  }
  getYCeil(y) {
    return Math.ceil(y / this.cellHeight);
  }
  getKey(x, y) {
    return `${this.getX(x)} ${this.getY(y)}`;
  }
  getGridKey(x, y) {
    return `${x} ${y}`;
  }
  addToCell(id, gridX, gridY) {
    const cells = this.cells;
    const key = this.getGridKey(gridX, gridY);
    if (cells.has(key)) {
      cells.get(key).add(id);
    } else {
      cells.set(key, new Set([id]));
    }
    return key;
  }
  inView(x, y, width, height) {
    return this.intersects(x, y, x + width, y + height);
  }
  intersects(left, top, right, bottom) {
    const topLeftX = this.getX(left);
    const topLeftY = this.getY(top);
    const bottomRightX = this.getX(right);
    const bottomRightY = this.getY(bottom);
    const cells = this.cells;
    let results = [];
    if (topLeftX === bottomRightX && topLeftY === bottomRightY) {
      const key = this.getGridKey(topLeftX, topLeftY);
      if (cells.has(key)) {
        results = [...cells.get(key)];
      }
    } else {
      const width = bottomRightX - topLeftX + 1;
      const height = bottomRightY - topLeftY + 1;
      let gridX = topLeftX;
      let gridY = topLeftY;
      let placed = 0;
      for (let i = 0; i < width * height; i++) {
        const key = this.getGridKey(gridX, gridY);
        if (cells.has(key)) {
          results = results.concat(...cells.get(key));
        }
        gridX++;
        placed++;
        if (placed === width) {
          gridX = topLeftX;
          gridY++;
          placed = 0;
        }
      }
    }
    const ids = this.ids;
    results.sort((a, b) => {
      return ids[a] - ids[b];
    });
    return new Set(results);
  }
  add(id) {
    const { left, top, right, bottom } = this.getBounds(id);
    const topLeftX = this.getX(left);
    const topLeftY = this.getY(top);
    const bottomRightX = this.getXCeil(right);
    const bottomRightY = this.getYCeil(bottom);
    const width = bottomRightX - topLeftX;
    const height = bottomRightY - topLeftY;
    this.ids[id] = this.index++;
    if (width === 1 && height === 1) {
      this.addToCell(id, topLeftX, topLeftY);
      return;
    }
    let gridX = topLeftX;
    let gridY = topLeftY;
    let placed = 0;
    for (let i = 0; i < width * height; i++) {
      this.addToCell(id, gridX, gridY);
      gridX++;
      placed++;
      if (placed === width) {
        gridX = topLeftX;
        gridY++;
        placed = 0;
      }
    }
  }
  update(id) {
    this.remove(id);
    this.add(id);
  }
  has(id) {
    return !!this.ids[id];
  }
  getAll() {
    return this.ids.filter((index, id) => id !== void 0);
  }
  remove(id) {
    if (this.has(id)) {
      this.cells.forEach((cell) => cell.delete(id));
      this.ids[id] = void 0;
    }
  }
};

// src/gameobjects/spatialgridlayer/SpatialGridLayer.ts
var SpatialGridLayer = class extends GameObject {
  type = "SpatialGridLayer";
  hash;
  onSortChildren;
  constructor(cellWidth = 512, cellHeight = 512, updateChildren = false) {
    super();
    this.hash = new SpatialHashGrid(cellWidth, cellHeight);
    const id = this.id;
    SetCustomDisplayList(id, true);
    SetWillTransformChildren(id, false);
    SetWillUpdateChildren(id, updateChildren);
  }
  getChildren(renderPass) {
    ClearDirtyDisplayList(this.id);
    const camera = renderPass.current2DCamera;
    const cx = camera.getBoundsX();
    const cy = camera.getBoundsY();
    const cright = camera.getBoundsRight();
    const cbottom = camera.getBoundsBottom();
    const childIDs = this.hash.intersects(cx, cy, cright, cbottom);
    const result = [];
    childIDs.forEach((id) => {
      result.push(GameObjectCache.get(id));
    });
    if (this.onSortChildren) {
      result.sort(this.onSortChildren);
    }
    return result;
  }
  onAddChild(childID) {
    if (!HasDirtyTransform(childID)) {
      this.hash.add(childID);
    }
    const worldID = GetWorldID(this.id);
    SetDirtyDisplayList(this.id);
    SetDirtyChildTransform(worldID);
    SetDirtyChildColor(worldID);
  }
  onUpdateChild(childID) {
    this.hash.update(childID);
  }
  onRemoveChild(childID) {
    this.hash.remove(childID);
    SetDirtyDisplayList(this.id);
  }
  destroy(reparentChildren) {
    this.hash.clear();
    super.destroy(reparentChildren);
  }
};

// src/gameobjects/text/Text.ts
var Text = class extends Sprite {
  type = "Text";
  _text;
  preRenderCallback;
  wordWrapCallback;
  canvas;
  context;
  splitRegExp = /(?:\r\n|\r|\n)/;
  padding = { left: 0, right: 0, top: 0, bottom: 0 };
  verticalAlign = "ascent";
  lineSpacing = 0;
  resolution;
  font = "16px monospace";
  fillStyle = "#fff";
  strokeStyle = "";
  backgroundStyle = "";
  cornerRadius = 0;
  textAlign = "left";
  textBaseline = "alphabetic";
  lineWidth = 0;
  lineDash = [];
  fixedWidth;
  fixedHeight;
  antialias = false;
  constructor(x, y, text = "", font, fillStyle) {
    super(x, y, CanvasTexture());
    this.texture.key = `Text${this.id}`;
    const renderer = RendererInstance.get();
    this.resolution = renderer.resolution;
    this.canvas = this.texture.image;
    this.context = this.canvas.getContext("2d");
    if (font) {
      this.font = font;
    }
    if (fillStyle) {
      this.fillStyle = fillStyle;
    }
    this.setText(text);
  }
  syncContext(canvas, ctx) {
    if (this.preRenderCallback) {
      this.preRenderCallback(canvas, ctx);
    }
    ctx.font = this.font;
    ctx.textBaseline = this.textBaseline;
    ctx.textAlign = this.textAlign;
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.setLineDash(this.lineDash);
    ctx.imageSmoothingEnabled = this.antialias;
  }
  updateText() {
    const canvas = this.canvas;
    const ctx = this.context;
    const resolution = this.resolution;
    const lines = this._text.split(this.splitRegExp);
    const padding = this.padding;
    const fillStyle = this.fillStyle;
    const strokeStyle = this.strokeStyle;
    const strokeWidth = this.lineWidth;
    const lineSpacing = this.lineSpacing;
    const strokeWidthHalf = strokeWidth > 0 ? strokeWidth / 2 : 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.syncContext(canvas, ctx);
    ctx.textAlign = "start";
    let maxWidth = 0;
    let maxHeight = 0;
    let y = 0;
    const lineMetrics = [];
    const vAlignAscent = this.verticalAlign === "ascent";
    const metrics = ctx.measureText("|M\xC9q");
    const averageLineHeight = Math.ceil(Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent)) + strokeWidth;
    for (let i = 0; i < lines.length; i++) {
      const metrics2 = ctx.measureText(lines[i]);
      const left = metrics2.actualBoundingBoxLeft;
      const right = metrics2.actualBoundingBoxRight;
      let ascent = metrics2.actualBoundingBoxAscent;
      let descent = metrics2.actualBoundingBoxDescent;
      if (!ascent && !descent || lines[i] === "") {
        ascent = averageLineHeight;
        descent = 0;
      }
      const lineWidth = Math.ceil(Math.abs(left) + Math.abs(right)) + strokeWidth;
      const lineHeight = Math.ceil(Math.abs(ascent) + Math.abs(descent)) + strokeWidth;
      if (vAlignAscent) {
        y += ascent + strokeWidthHalf;
        if (i > 0) {
          y += lineSpacing + strokeWidthHalf;
        }
        maxHeight = y + descent + strokeWidthHalf;
      } else {
        y = maxHeight + (lineHeight - descent - strokeWidthHalf);
        maxHeight += lineHeight;
        if (i < lines.length - 1) {
          maxHeight += lineSpacing;
        }
      }
      maxWidth = Math.max(maxWidth, lineWidth);
      lineMetrics.push({ lineWidth, lineHeight, ascent, descent, left, right, y });
    }
    maxWidth += padding.left + padding.right;
    maxHeight += padding.top + padding.bottom;
    const displayWidth = this.fixedWidth ? this.fixedWidth : maxWidth;
    const displayHeight = this.fixedHeight ? this.fixedHeight : maxHeight;
    const canvasWidth = Math.ceil(displayWidth * resolution);
    const canvasHeight = Math.ceil(displayHeight * resolution);
    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      this.texture.setSize(displayWidth, displayHeight);
      this.size.set(displayWidth, displayHeight);
    }
    ctx.save();
    ctx.scale(resolution, resolution);
    this.syncContext(canvas, ctx);
    const backgroundStyle = this.backgroundStyle;
    if (backgroundStyle) {
      ctx.save();
      ctx.fillStyle = backgroundStyle;
      ctx.strokeStyle = backgroundStyle;
      const cornerRadius = this.cornerRadius;
      const halfRadius = cornerRadius > 0 ? cornerRadius / 2 : 0;
      if (cornerRadius) {
        ctx.lineWidth = cornerRadius;
        ctx.strokeRect(halfRadius, halfRadius, displayWidth - cornerRadius, displayHeight - cornerRadius);
      }
      ctx.fillRect(halfRadius, halfRadius, displayWidth - cornerRadius, displayHeight - cornerRadius);
      ctx.restore();
    }
    const textAlign = this.textAlign;
    const isCenter = textAlign === "center";
    const isRight = textAlign === "right" || textAlign === "end";
    const yOffset = (displayHeight - maxHeight) / 2 + padding.top;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const metrics2 = lineMetrics[i];
      let tx = padding.left + metrics2.left + strokeWidthHalf;
      const ty = yOffset + metrics2.y;
      if (isCenter) {
        tx = displayWidth / 2;
      } else if (isRight) {
        tx = displayWidth - strokeWidthHalf;
      }
      if (strokeStyle) {
        ctx.strokeText(line, tx, ty);
      }
      if (fillStyle) {
        ctx.fillText(line, tx, ty);
      }
    }
    ctx.restore();
    if (this.texture.binding) {
      this.texture.binding.update();
    }
    return this;
  }
  get text() {
    return this._text;
  }
  set text(value) {
    this.setText(value);
  }
  setText(value = "") {
    if (Array.isArray(value)) {
      value = value.join("\n");
    }
    if (value !== this._text) {
      this._text = value.toString();
      this.updateText();
    }
    return this;
  }
  destroy(reparentChildren) {
    this.texture.destroy();
    this.fillStyle = null;
    this.strokeStyle = null;
    this.backgroundStyle = null;
    this.canvas = null;
    this.context = null;
    super.destroy(reparentChildren);
  }
};

// src/geom/index.ts
var geom_exports = {};
__export(geom_exports, {
  Circle: () => circle_exports,
  Ellipse: () => ellipse_exports,
  Intersects: () => intersects_exports,
  Line: () => line_exports,
  Rectangle: () => rectangle_exports,
  Triangle: () => triangle_exports
});

// src/geom/circle/index.ts
var circle_exports = {};
__export(circle_exports, {
  Circle: () => Circle,
  CircleContains: () => CircleContains,
  CircleContainsPoint: () => CircleContainsPoint,
  CircleContainsRect: () => CircleContainsRect,
  CircleEquals: () => CircleEquals,
  CloneCircle: () => CloneCircle,
  CopyCircleFrom: () => CopyCircleFrom,
  GetCircleArea: () => GetCircleArea,
  GetCircleBounds: () => GetCircleBounds,
  GetCircleCircumference: () => GetCircleCircumference,
  GetCircleCircumferencePoint: () => GetCircleCircumferencePoint,
  GetCirclePoint: () => GetCirclePoint,
  GetCirclePoints: () => GetCirclePoints,
  GetCirclePointsBetween: () => GetCirclePointsBetween,
  GetCircleRandomPoint: () => GetCircleRandomPoint,
  TranslateCircle: () => TranslateCircle,
  TranslateCirclePoint: () => TranslateCirclePoint
});

// src/geom/circle/CircleContainsPoint.ts
function CircleContainsPoint(circle2, point) {
  return CircleContains(circle2, point.x, point.y);
}

// src/geom/circle/CircleContainsRect.ts
function CircleContainsRect(circle2, rect) {
  return CircleContains(circle2, rect.x, rect.y) && CircleContains(circle2, rect.right, rect.y) && CircleContains(circle2, rect.x, rect.bottom) && CircleContains(circle2, rect.right, rect.bottom);
}

// src/geom/circle/CircleEquals.ts
function CircleEquals(circle2, toCompare) {
  return circle2.x === toCompare.x && circle2.y === toCompare.y && circle2.radius === toCompare.radius;
}

// src/geom/circle/CloneCircle.ts
function CloneCircle(source) {
  return new Circle(source.x, source.y, source.radius);
}

// src/geom/circle/CopyCircleFrom.ts
function CopyCircleFrom(source, dest) {
  return dest.set(source.x, source.y, source.radius);
}

// src/geom/circle/GetCircleArea.ts
function GetCircleArea(circle2) {
  return circle2.radius > 0 ? Math.PI * circle2.radius * circle2.radius : 0;
}

// src/geom/circle/GetCircleBounds.ts
function GetCircleBounds(circle2, out = new Rectangle()) {
  return out.set(circle2.left, circle2.top, circle2.diameter, circle2.diameter);
}

// src/geom/circle/GetCirclePoint.ts
function GetCirclePoint(circle2, position, out = new Vec2()) {
  const angle = FromPercent(position, 0, MATH_CONST.PI2);
  return GetCircleCircumferencePoint(circle2, angle, out);
}

// src/geom/circle/GetCirclePoints.ts
function GetCirclePoints(circle2, step, quantity = 0, out = []) {
  if (!quantity) {
    quantity = GetCircleCircumference(circle2) / step;
  }
  for (let i = 0; i < quantity; i++) {
    const angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);
    out.push(GetCircleCircumferencePoint(circle2, angle));
  }
  return out;
}

// src/geom/circle/GetCircleRandomPoint.ts
function GetCircleRandomPoint(circle2, out = new Vec2()) {
  const t = 2 * Math.PI * Math.random();
  const u = Math.random() + Math.random();
  const r = u > 1 ? 2 - u : u;
  const x = r * Math.cos(t);
  const y = r * Math.sin(t);
  return out.set(circle2.x + x * circle2.radius, circle2.y + y * circle2.radius);
}

// src/geom/circle/TranslateCircle.ts
function TranslateCircle(circle2, x, y) {
  circle2.x += x;
  circle2.y += y;
  return circle2;
}

// src/geom/circle/TranslateCirclePoint.ts
function TranslateCirclePoint(circle2, point) {
  circle2.x += point.x;
  circle2.y += point.y;
  return circle2;
}

// src/geom/ellipse/index.ts
var ellipse_exports = {};
__export(ellipse_exports, {
  CloneEllipse: () => CloneEllipse,
  CopyEllipseFrom: () => CopyEllipseFrom,
  Ellipse: () => Ellipse,
  EllipseContains: () => EllipseContains,
  EllipseContainsPoint: () => EllipseContainsPoint,
  EllipseContainsRect: () => EllipseContainsRect,
  EllipseEquals: () => EllipseEquals,
  GetEllipseArea: () => GetEllipseArea,
  GetEllipseBounds: () => GetEllipseBounds,
  GetEllipseCircumference: () => GetEllipseCircumference,
  GetEllipseCircumferencePoint: () => GetEllipseCircumferencePoint,
  GetEllipsePoint: () => GetEllipsePoint,
  GetEllipsePoints: () => GetEllipsePoints,
  GetEllipseRandomPoint: () => GetEllipseRandomPoint,
  TranslateEllipse: () => TranslateEllipse,
  TranslateEllipsePoint: () => TranslateEllipsePoint
});

// src/geom/ellipse/EllipseContains.ts
function EllipseContains(ellipse, x, y) {
  if (ellipse.width <= 0 || ellipse.height <= 0) {
    return false;
  }
  let normx = (x - ellipse.x) / ellipse.width;
  let normy = (y - ellipse.y) / ellipse.height;
  normx *= normx;
  normy *= normy;
  return normx + normy < 0.25;
}

// src/geom/ellipse/Ellipse.ts
var Ellipse = class {
  x;
  y;
  width;
  height;
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.set(x, y, width, height);
  }
  set(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }
  contains(x, y) {
    return EllipseContains(this, x, y);
  }
  getMinorRadius() {
    return Math.min(this.width, this.height) / 2;
  }
  getMajorRadius() {
    return Math.max(this.width, this.height) / 2;
  }
  get left() {
    return this.x - this.width / 2;
  }
  set left(value) {
    this.x = value + this.width / 2;
  }
  get right() {
    return this.x + this.width / 2;
  }
  set right(value) {
    this.x = value - this.width / 2;
  }
  get top() {
    return this.y - this.height / 2;
  }
  set top(value) {
    this.y = value + this.height / 2;
  }
  get bottom() {
    return this.y + this.height / 2;
  }
  set bottom(value) {
    this.y = value - this.height / 2;
  }
};

// src/geom/ellipse/CloneEllipse.ts
function CloneEllipse(source) {
  return new Ellipse(source.x, source.y, source.width, source.height);
}

// src/geom/ellipse/CopyEllipseFrom.ts
function CopyEllipseFrom(source, dest) {
  return dest.set(source.x, source.y, source.width, source.height);
}

// src/geom/ellipse/EllipseContainsPoint.ts
function EllipseContainsPoint(ellipse, point) {
  return EllipseContains(ellipse, point.x, point.y);
}

// src/geom/ellipse/EllipseContainsRect.ts
function EllipseContainsRect(ellipse, rect) {
  return EllipseContains(ellipse, rect.x, rect.y) && EllipseContains(ellipse, rect.right, rect.y) && EllipseContains(ellipse, rect.x, rect.bottom) && EllipseContains(ellipse, rect.right, rect.bottom);
}

// src/geom/ellipse/EllipseEquals.ts
function EllipseEquals(ellipse, toCompare) {
  return ellipse.x === toCompare.x && ellipse.y === toCompare.y && ellipse.width === toCompare.width && ellipse.height === toCompare.height;
}

// src/geom/ellipse/GetEllipseArea.ts
function GetEllipseArea(ellipse) {
  if (ellipse.width <= 0 || ellipse.height <= 0) {
    return 0;
  }
  return ellipse.getMajorRadius() * ellipse.getMinorRadius() * Math.PI;
}

// src/geom/ellipse/GetEllipseBounds.ts
function GetEllipseBounds(ellipse, out = new Rectangle()) {
  return out.set(ellipse.left, ellipse.top, ellipse.width, ellipse.height);
}

// src/geom/ellipse/GetEllipseCircumference.ts
function GetEllipseCircumference(ellipse) {
  const rx = ellipse.width / 2;
  const ry = ellipse.height / 2;
  const h = Math.pow(rx - ry, 2) / Math.pow(rx + ry, 2);
  return Math.PI * (rx + ry) * (1 + 3 * h / (10 + Math.sqrt(4 - 3 * h)));
}

// src/geom/ellipse/GetEllipseCircumferencePoint.ts
function GetEllipseCircumferencePoint(ellipse, angle, out = new Vec2()) {
  const halfWidth = ellipse.width / 2;
  const halfHeight = ellipse.height / 2;
  return out.set(ellipse.x + halfWidth * Math.cos(angle), ellipse.y + halfHeight * Math.sin(angle));
}

// src/geom/ellipse/GetEllipsePoint.ts
function GetEllipsePoint(ellipse, position, out = new Vec2()) {
  const angle = FromPercent(position, 0, MATH_CONST.PI2);
  return GetEllipseCircumferencePoint(ellipse, angle, out);
}

// src/geom/ellipse/GetEllipsePoints.ts
function GetEllipsePoints(ellipse, step, quantity = 0, out = []) {
  if (!quantity) {
    quantity = GetEllipseCircumference(ellipse) / step;
  }
  for (let i = 0; i < quantity; i++) {
    const angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);
    out.push(GetEllipseCircumferencePoint(ellipse, angle));
  }
  return out;
}

// src/geom/ellipse/GetEllipseRandomPoint.ts
function GetEllipseRandomPoint(ellipse, out = new Vec2()) {
  const p = Math.random() * Math.PI * 2;
  const s = Math.sqrt(Math.random());
  out.x = ellipse.x + s * Math.cos(p) * ellipse.width / 2;
  out.y = ellipse.y + s * Math.sin(p) * ellipse.height / 2;
  return out;
}

// src/geom/ellipse/TranslateEllipse.ts
function TranslateEllipse(ellipse, x, y) {
  ellipse.x += x;
  ellipse.y += y;
  return ellipse;
}

// src/geom/ellipse/TranslateEllipsePoint.ts
function TranslateEllipsePoint(ellipse, point) {
  ellipse.x += point.x;
  ellipse.y += point.y;
  return ellipse;
}

// src/geom/intersects/index.ts
var intersects_exports = {};
__export(intersects_exports, {
  CircleToCircle: () => CircleToCircle,
  CircleToRectangle: () => CircleToRectangle,
  GetCircleToCircle: () => GetCircleToCircle,
  GetCircleToRectangle: () => GetCircleToRectangle,
  GetLineToCircle: () => GetLineToCircle,
  GetLineToRectangle: () => GetLineToRectangle,
  GetRectangleIntersection: () => GetRectangleIntersection,
  GetRectangleToRectangle: () => GetRectangleToRectangle,
  GetRectangleToTriangle: () => GetRectangleToTriangle,
  GetTriangleToCircle: () => GetTriangleToCircle,
  GetTriangleToLine: () => GetTriangleToLine,
  GetTriangleToTriangle: () => GetTriangleToTriangle,
  LineToCircle: () => LineToCircle,
  LineToLine: () => LineToLine,
  LineToRectangle: () => LineToRectangle,
  PointToLine: () => PointToLine,
  PointToLineSegment: () => PointToLineSegment,
  RectangleToRectangle: () => RectangleToRectangle,
  RectangleToTriangle: () => RectangleToTriangle,
  TriangleToCircle: () => TriangleToCircle,
  TriangleToLine: () => TriangleToLine,
  TriangleToTriangle: () => TriangleToTriangle
});

// src/geom/intersects/CircleToCircle.ts
function CircleToCircle(circleA, circleB) {
  return GetVec2Distance(circleA, circleB) <= circleA.radius + circleB.radius;
}

// src/geom/intersects/CircleToRectangle.ts
function CircleToRectangle(circle2, rect) {
  const halfWidth = rect.width / 2;
  const halfHeight = rect.height / 2;
  const cx = Math.abs(circle2.x - rect.x - halfWidth);
  const cy = Math.abs(circle2.y - rect.y - halfHeight);
  const xDist = halfWidth + circle2.radius;
  const yDist = halfHeight + circle2.radius;
  if (cx > xDist || cy > yDist) {
    return false;
  } else if (cx <= halfWidth || cy <= halfHeight) {
    return true;
  } else {
    const xCornerDist = cx - halfWidth;
    const yCornerDist = cy - halfHeight;
    const xCornerDistSq = xCornerDist * xCornerDist;
    const yCornerDistSq = yCornerDist * yCornerDist;
    const maxCornerDistSq = circle2.radius * circle2.radius;
    return xCornerDistSq + yCornerDistSq <= maxCornerDistSq;
  }
}

// src/geom/intersects/GetCircleToCircle.ts
function GetCircleToCircle(circleA, circleB, out = []) {
  if (CircleToCircle(circleA, circleB)) {
    const x0 = circleA.x;
    const y0 = circleA.y;
    const r0 = circleA.radius;
    const x1 = circleB.x;
    const y1 = circleB.y;
    const r1 = circleB.radius;
    let coefficientA;
    let coefficientB;
    let coefficientC;
    let lambda;
    let x;
    if (y0 === y1) {
      x = (r1 * r1 - r0 * r0 - x1 * x1 + x0 * x0) / (2 * (x0 - x1));
      coefficientA = 1;
      coefficientB = -2 * y1;
      coefficientC = x1 * x1 + x * x - 2 * x1 * x + y1 * y1 - r1 * r1;
      lambda = coefficientB * coefficientB - 4 * coefficientA * coefficientC;
      if (lambda === 0) {
        out.push(new Vec2(x, -coefficientB / (2 * coefficientA)));
      } else if (lambda > 0) {
        out.push(new Vec2(x, (-coefficientB + Math.sqrt(lambda)) / (2 * coefficientA)));
        out.push(new Vec2(x, (-coefficientB - Math.sqrt(lambda)) / (2 * coefficientA)));
      }
    } else {
      const v1 = (x0 - x1) / (y0 - y1);
      const n = (r1 * r1 - r0 * r0 - x1 * x1 + x0 * x0 - y1 * y1 + y0 * y0) / (2 * (y0 - y1));
      coefficientA = v1 * v1 + 1;
      coefficientB = 2 * y0 * v1 - 2 * n * v1 - 2 * x0;
      coefficientC = x0 * x0 + y0 * y0 + n * n - r0 * r0 - 2 * y0 * n;
      lambda = coefficientB * coefficientB - 4 * coefficientA * coefficientC;
      if (lambda === 0) {
        x = -coefficientB / (2 * coefficientA);
        out.push(new Vec2(x, n - x * v1));
      } else if (lambda > 0) {
        x = (-coefficientB + Math.sqrt(lambda)) / (2 * coefficientA);
        out.push(new Vec2(x, n - x * v1));
        x = (-coefficientB - Math.sqrt(lambda)) / (2 * coefficientA);
        out.push(new Vec2(x, n - x * v1));
      }
    }
  }
  return out;
}

// src/geom/intersects/LineToCircle.ts
var tmp = new Vec2();
function LineToCircle(line, circle2, nearest) {
  if (!nearest) {
    nearest = tmp;
  }
  const { x1, y1, x2, y2 } = line;
  if (CircleContains(circle2, x1, y1)) {
    nearest.set(x1, y1);
    return true;
  }
  if (CircleContains(circle2, x2, y2)) {
    nearest.set(x2, y2);
    return true;
  }
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lcx = circle2.x - x1;
  const lcy = circle2.y - y1;
  const dLen2 = dx * dx + dy * dy;
  let px = dx;
  let py = dy;
  if (dLen2 > 0) {
    const dp = (lcx * dx + lcy * dy) / dLen2;
    px *= dp;
    py *= dp;
  }
  nearest.set(x1 + px, y1 + py);
  const pLen2 = px * px + py * py;
  return pLen2 <= dLen2 && px * dx + py * dy >= 0 && CircleContains(circle2, nearest.x, nearest.y);
}

// src/geom/intersects/GetLineToCircle.ts
function GetLineToCircle(line, circle2, out = []) {
  if (LineToCircle(line, circle2)) {
    const { x1, y1, x2, y2 } = line;
    const cr = circle2.radius;
    const lDirX = x2 - x1;
    const lDirY = y2 - y1;
    const oDirX = x1 - circle2.x;
    const oDirY = y1 - circle2.y;
    const coefficientA = lDirX * lDirX + lDirY * lDirY;
    const coefficientB = 2 * (lDirX * oDirX + lDirY * oDirY);
    const coefficientC = oDirX * oDirX + oDirY * oDirY - cr * cr;
    const lambda = coefficientB * coefficientB - 4 * coefficientA * coefficientC;
    let x;
    let y;
    if (lambda === 0) {
      const root = -coefficientB / (2 * coefficientA);
      x = x1 + root * lDirX;
      y = y1 + root * lDirY;
      if (root >= 0 && root <= 1) {
        out.push(new Vec2(x, y));
      }
    } else if (lambda > 0) {
      const root1 = (-coefficientB - Math.sqrt(lambda)) / (2 * coefficientA);
      x = x1 + root1 * lDirX;
      y = y1 + root1 * lDirY;
      if (root1 >= 0 && root1 <= 1) {
        out.push(new Vec2(x, y));
      }
      const root2 = (-coefficientB + Math.sqrt(lambda)) / (2 * coefficientA);
      x = x1 + root2 * lDirX;
      y = y1 + root2 * lDirY;
      if (root2 >= 0 && root2 <= 1) {
        out.push(new Vec2(x, y));
      }
    }
  }
  return out;
}

// src/geom/line/Line.ts
var Line = class {
  x1;
  y1;
  x2;
  y2;
  constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    this.set(x1, y1, x2, y2);
  }
  set(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    return this;
  }
  get left() {
    return Math.min(this.x1, this.x2);
  }
  set left(value) {
    if (this.x1 <= this.x2) {
      this.x1 = value;
    } else {
      this.x2 = value;
    }
  }
  get right() {
    return Math.max(this.x1, this.x2);
  }
  set right(value) {
    if (this.x1 > this.x2) {
      this.x1 = value;
    } else {
      this.x2 = value;
    }
  }
  get top() {
    return Math.min(this.y1, this.y2);
  }
  set top(value) {
    if (this.y1 <= this.y2) {
      this.y1 = value;
    } else {
      this.y2 = value;
    }
  }
  get bottom() {
    return Math.max(this.y1, this.y2);
  }
  set bottom(value) {
    if (this.y1 > this.y2) {
      this.y1 = value;
    } else {
      this.y2 = value;
    }
  }
};

// src/geom/rectangle/GetRectangleEdges.ts
function GetRectangleEdges(rectangle) {
  const { x, y, right, bottom } = rectangle;
  const line1 = new Line(x, y, right, y);
  const line2 = new Line(right, y, right, bottom);
  const line3 = new Line(right, bottom, x, bottom);
  const line4 = new Line(x, bottom, x, y);
  return [line1, line2, line3, line4];
}

// src/geom/intersects/GetCircleToRectangle.ts
function GetCircleToRectangle(circle2, rect, out = []) {
  if (CircleToRectangle(circle2, rect)) {
    const [line1, line2, line3, line4] = GetRectangleEdges(rect);
    GetLineToCircle(line1, circle2, out);
    GetLineToCircle(line2, circle2, out);
    GetLineToCircle(line3, circle2, out);
    GetLineToCircle(line4, circle2, out);
  }
  return out;
}

// src/geom/intersects/LineToLine.ts
function LineToLine(line1, line2, out) {
  const { x1, y1, x2, y2 } = line1;
  const { x1: x3, y1: y3, x2: x4, y2: y4 } = line2;
  const numA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  const numB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
  const deNom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (deNom === 0) {
    return false;
  }
  const uA = numA / deNom;
  const uB = numB / deNom;
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    if (out) {
      out.set(x1 + uA * (x2 - x1), y1 + uA * (y2 - y1));
    }
    return true;
  }
  return false;
}

// src/geom/intersects/LineToRectangle.ts
function LineToRectangle(line, rect) {
  const { x1, y1, x2, y2 } = line;
  const { x, y, right, bottom } = rect;
  let t = 0;
  if (x1 >= x && x1 <= right && y1 >= y && y1 <= bottom || x2 >= x && x2 <= right && y2 >= y && y2 <= bottom) {
    return true;
  }
  if (x1 < x && x2 >= x) {
    t = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
    if (t > y && t <= bottom) {
      return true;
    }
  } else if (x1 > right && x2 <= right) {
    t = y1 + (y2 - y1) * (right - x1) / (x2 - x1);
    if (t >= y && t <= bottom) {
      return true;
    }
  }
  if (y1 < y && y2 >= y) {
    t = x1 + (x2 - x1) * (y - y1) / (y2 - y1);
    if (t >= x && t <= right) {
      return true;
    }
  } else if (y1 > bottom && y2 <= bottom) {
    t = x1 + (x2 - x1) * (bottom - y1) / (y2 - y1);
    if (t >= x && t <= right) {
      return true;
    }
  }
  return false;
}

// src/geom/intersects/GetLineToRectangle.ts
function GetLineToRectangle(line, rect, out = []) {
  if (LineToRectangle(line, rect)) {
    const [lineA, lineB, lineC, lineD] = GetRectangleEdges(rect);
    const points = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];
    const results = [
      LineToLine(lineA, line, points[0]),
      LineToLine(lineB, line, points[1]),
      LineToLine(lineC, line, points[2]),
      LineToLine(lineD, line, points[3])
    ];
    for (let i = 0; i < results.length; i++) {
      if (results[i]) {
        out.push(points[i]);
      }
    }
  }
  return out;
}

// src/geom/intersects/GetRectangleIntersection.ts
function GetRectangleIntersection(rectA, rectB, out = new Rectangle()) {
  if (RectangleToRectangle(rectA, rectB)) {
    const x = Math.max(rectA.x, rectB.x);
    const y = Math.max(rectA.y, rectB.y);
    return out.set(x, y, Math.min(rectA.right, rectB.right) - x, Math.min(rectA.bottom, rectB.bottom) - y);
  }
}

// src/geom/intersects/GetRectangleToRectangle.ts
function GetRectangleToRectangle(rectA, rectB, out = []) {
  if (RectangleToRectangle(rectA, rectB)) {
    const [lineA, lineB, lineC, lineD] = GetRectangleEdges(rectA);
    GetLineToRectangle(lineA, rectB, out);
    GetLineToRectangle(lineB, rectB, out);
    GetLineToRectangle(lineC, rectB, out);
    GetLineToRectangle(lineD, rectB, out);
  }
  return out;
}

// src/geom/triangle/GetTriangleEdges.ts
function GetTriangleEdges(triangle) {
  const { x1, y1, x2, y2, x3, y3 } = triangle;
  const edge1 = new Line(x1, y1, x2, y2);
  const edge2 = new Line(x2, y2, x3, y3);
  const edge3 = new Line(x3, y3, x1, y1);
  return [edge1, edge2, edge3];
}

// src/geom/rectangle/DecomposeRectangle.ts
function DecomposeRectangle(rect, out = []) {
  out.push(new Vec2(rect.x, rect.y), new Vec2(rect.right, rect.y), new Vec2(rect.right, rect.bottom), new Vec2(rect.x, rect.bottom));
  return out;
}

// src/geom/triangle/TriangleContains.ts
function TriangleContains(triangle, x, y) {
  const { x1, y1, x2, y2, x3, y3 } = triangle;
  const v0x = x3 - x1;
  const v0y = y3 - y1;
  const v1x = x2 - x1;
  const v1y = y2 - y1;
  const v2x = x - x1;
  const v2y = y - y1;
  const dot00 = v0x * v0x + v0y * v0y;
  const dot01 = v0x * v1x + v0y * v1y;
  const dot02 = v0x * v2x + v0y * v2y;
  const dot11 = v1x * v1x + v1y * v1y;
  const dot12 = v1x * v2x + v1y * v2y;
  const b = dot00 * dot11 - dot01 * dot01;
  const inv = b === 0 ? 0 : 1 / b;
  const u = (dot11 * dot02 - dot01 * dot12) * inv;
  const v = (dot00 * dot12 - dot01 * dot02) * inv;
  return u >= 0 && v >= 0 && u + v < 1;
}

// src/geom/triangle/TriangleContainsPoints.ts
function TriangleContainsPoints(triangle, points, returnFirst = false, out = []) {
  let skip = false;
  points.forEach((point) => {
    if (skip) {
      return;
    }
    const { x, y } = point;
    if (TriangleContains(triangle, x, y)) {
      out.push(new Vec2(x, y));
      if (returnFirst) {
        skip = true;
      }
    }
  });
  return out;
}

// src/geom/intersects/RectangleToTriangle.ts
function RectangleToTriangle(rect, triangle) {
  if (triangle.left > rect.right || triangle.right < rect.x || triangle.top > rect.bottom || triangle.bottom < rect.y) {
    return false;
  }
  const [triA, triB, triC] = GetTriangleEdges(triangle);
  if (RectangleContains(rect, triA.x1, triA.y1) || RectangleContains(rect, triA.x2, triA.y2)) {
    return true;
  }
  if (RectangleContains(rect, triB.x1, triB.y1) || RectangleContains(rect, triB.x2, triB.y2)) {
    return true;
  }
  if (RectangleContains(rect, triC.x1, triC.y1) || RectangleContains(rect, triC.x2, triC.y2)) {
    return true;
  }
  const [rectA, rectB, rectC, rectD] = GetRectangleEdges(rect);
  if (LineToLine(triA, rectA) || LineToLine(triA, rectB) || LineToLine(triA, rectC) || LineToLine(triA, rectD)) {
    return true;
  }
  if (LineToLine(triB, rectA) || LineToLine(triB, rectB) || LineToLine(triB, rectC) || LineToLine(triB, rectD)) {
    return true;
  }
  if (LineToLine(triC, rectA) || LineToLine(triC, rectB) || LineToLine(triC, rectC) || LineToLine(triC, rectD)) {
    return true;
  }
  const within = TriangleContainsPoints(triangle, DecomposeRectangle(rect), true);
  return within.length > 0;
}

// src/geom/intersects/GetRectangleToTriangle.ts
function GetRectangleToTriangle(rect, triangle, out = []) {
  if (RectangleToTriangle(rect, triangle)) {
    const [lineA, lineB, lineC] = GetTriangleEdges(triangle);
    GetLineToRectangle(lineA, rect, out);
    GetLineToRectangle(lineB, rect, out);
    GetLineToRectangle(lineC, rect, out);
  }
  return out;
}

// src/geom/intersects/TriangleToCircle.ts
function TriangleToCircle(triangle, circle2) {
  if (triangle.left > circle2.right || triangle.right < circle2.left || triangle.top > circle2.bottom || triangle.bottom < circle2.top) {
    return false;
  }
  if (TriangleContains(triangle, circle2.x, circle2.y)) {
    return true;
  }
  const [line1, line2, line3] = GetTriangleEdges(triangle);
  return LineToCircle(line1, circle2) || LineToCircle(line2, circle2) || LineToCircle(line3, circle2);
}

// src/geom/intersects/GetTriangleToCircle.ts
function GetTriangleToCircle(triangle, circle2, out = []) {
  if (TriangleToCircle(triangle, circle2)) {
    const [lineA, lineB, lineC] = GetTriangleEdges(triangle);
    GetLineToCircle(lineA, circle2, out);
    GetLineToCircle(lineB, circle2, out);
    GetLineToCircle(lineC, circle2, out);
  }
  return out;
}

// src/geom/intersects/TriangleToLine.ts
function TriangleToLine(triangle, line) {
  const { x1, y1, x2, y2 } = line;
  if (TriangleContains(triangle, x1, y1) || TriangleContains(triangle, x2, y2)) {
    return true;
  }
  const [line1, line2, line3] = GetTriangleEdges(triangle);
  return LineToLine(line1, line) || LineToLine(line2, line) || LineToLine(line3, line);
}

// src/geom/intersects/GetTriangleToLine.ts
function GetTriangleToLine(triangle, line, out = []) {
  if (TriangleToLine(triangle, line)) {
    const [lineA, lineB, lineC] = GetTriangleEdges(triangle);
    const points = [new Vec2(), new Vec2(), new Vec2()];
    const results = [
      LineToLine(lineA, line, points[0]),
      LineToLine(lineB, line, points[1]),
      LineToLine(lineC, line, points[2])
    ];
    for (let i = 0; i < results.length; i++) {
      if (results[i]) {
        out.push(points[i]);
      }
    }
  }
  return out;
}

// src/geom/triangle/DecomposeTriangle.ts
function DecomposeTriangle(triangle, out = []) {
  const { x1, y1, x2, y2, x3, y3 } = triangle;
  out.push(new Vec2(x1, y1), new Vec2(x2, y2), new Vec2(x3, y3));
  return out;
}

// src/geom/intersects/TriangleToTriangle.ts
function TriangleToTriangle(triangleA, triangleB) {
  if (triangleA.left > triangleB.right || triangleA.right < triangleB.left || triangleA.top > triangleB.bottom || triangleA.bottom < triangleB.top) {
    return false;
  }
  const [lineAA, lineAB, lineAC] = GetTriangleEdges(triangleA);
  const [lineBA, lineBB, lineBC] = GetTriangleEdges(triangleB);
  if (LineToLine(lineAA, lineBA) || LineToLine(lineAA, lineBB) || LineToLine(lineAA, lineBC) || LineToLine(lineAB, lineBA) || LineToLine(lineAB, lineBB) || LineToLine(lineAB, lineBC) || LineToLine(lineAC, lineBA) || LineToLine(lineAC, lineBB) || LineToLine(lineAC, lineBC)) {
    return true;
  }
  const withinA = TriangleContainsPoints(triangleB, DecomposeTriangle(triangleA), true);
  if (withinA.length > 0) {
    return true;
  }
  const withinB = TriangleContainsPoints(triangleA, DecomposeTriangle(triangleB), true);
  return withinB.length > 0;
}

// src/geom/intersects/GetTriangleToTriangle.ts
function GetTriangleToTriangle(triangleA, triangleB, out = []) {
  if (TriangleToTriangle(triangleA, triangleB)) {
    const [lineA, lineB, lineC] = GetTriangleEdges(triangleB);
    GetTriangleToLine(triangleA, lineA, out);
    GetTriangleToLine(triangleA, lineB, out);
    GetTriangleToLine(triangleA, lineC, out);
  }
  return out;
}

// src/geom/intersects/PointToLine.ts
function PointToLine(point, line, lineThickness = 1) {
  const { x1, y1, x2, y2 } = line;
  const { x: px, y: py } = point;
  const L2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  if (L2 === 0) {
    return false;
  }
  const r = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / L2;
  if (r < 0) {
    return Math.sqrt((x1 - px) * (x1 - px) + (y1 - py) * (y1 - py)) <= lineThickness;
  } else if (r >= 0 && r <= 1) {
    const s = ((y1 - py) * (x2 - x1) - (x1 - px) * (y2 - y1)) / L2;
    return Math.abs(s) * Math.sqrt(L2) <= lineThickness;
  } else {
    return Math.sqrt((x2 - px) * (x2 - px) + (y2 - py) * (y2 - py)) <= lineThickness;
  }
}

// src/geom/intersects/PointToLineSegment.ts
function PointToLineSegment(point, line) {
  if (!PointToLine(point, line)) {
    return false;
  }
  const { x1, y1, x2, y2 } = line;
  const { x, y } = point;
  const xMin = Math.min(x1, x2);
  const xMax = Math.max(x1, x2);
  const yMin = Math.min(y1, y2);
  const yMax = Math.max(y1, y2);
  return x >= xMin && x <= xMax && (y >= yMin && y <= yMax);
}

// src/geom/line/index.ts
var line_exports = {};
__export(line_exports, {
  CenterLineOn: () => CenterLineOn,
  CloneLine: () => CloneLine,
  CopyLineFrom: () => CopyLineFrom,
  ExtendLine: () => ExtendLine,
  GetLineAngle: () => GetLineAngle,
  GetLineBresenhamPoints: () => GetLineBresenhamPoints,
  GetLineHeight: () => GetLineHeight,
  GetLineLength: () => GetLineLength,
  GetLineMidPoint: () => GetLineMidPoint,
  GetLineNearestPoint: () => GetLineNearestPoint,
  GetLineNormal: () => GetLineNormal,
  GetLineNormalAngle: () => GetLineNormalAngle,
  GetLineNormalX: () => GetLineNormalX,
  GetLineNormalY: () => GetLineNormalY,
  GetLinePerpSlope: () => GetLinePerpSlope,
  GetLinePoint: () => GetLinePoint,
  GetLinePoints: () => GetLinePoints,
  GetLineRandomPoint: () => GetLineRandomPoint,
  GetLineReflectAngle: () => GetLineReflectAngle,
  GetLineSlope: () => GetLineSlope,
  GetLineWidth: () => GetLineWidth,
  GetShortestLineDistance: () => GetShortestLineDistance,
  Line: () => Line,
  LineEquals: () => LineEquals,
  RotateLine: () => RotateLine,
  RotateLineAround: () => RotateLineAround,
  RotateLineAroundPoint: () => RotateLineAroundPoint,
  SetLineToAngle: () => SetLineToAngle,
  TranslateLine: () => TranslateLine,
  TranslateLinePoint: () => TranslateLinePoint
});

// src/geom/line/CenterLineOn.ts
function CenterLineOn(line, x, y) {
  const tx = x - (line.x1 + line.x2) / 2;
  const ty = y - (line.y1 + line.y2) / 2;
  line.x1 += tx;
  line.y1 += ty;
  line.x2 += tx;
  line.y2 += ty;
  return line;
}

// src/geom/line/CloneLine.ts
function CloneLine(source) {
  return new Line(source.x1, source.y1, source.x2, source.y2);
}

// src/geom/line/CopyLineFrom.ts
function CopyLineFrom(source, dest) {
  return dest.set(source.x1, source.y1, source.x2, source.y2);
}

// src/geom/line/GetLineLength.ts
function GetLineLength(line) {
  const { x1, y1, x2, y2 } = line;
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

// src/geom/line/ExtendLine.ts
function ExtendLine(line, left, right = left) {
  const length = GetLineLength(line);
  const slopX = line.x2 - line.x1;
  const slopY = line.y2 - line.y1;
  if (left) {
    line.x1 = line.x1 - slopX / length * left;
    line.y1 = line.y1 - slopY / length * left;
  }
  if (right) {
    line.x2 = line.x2 + slopX / length * right;
    line.y2 = line.y2 + slopY / length * right;
  }
  return line;
}

// src/geom/line/GetLineAngle.ts
function GetLineAngle(line) {
  return Math.atan2(line.y2 - line.y1, line.x2 - line.x1);
}

// src/geom/line/GetLineBresenhamPoints.ts
function GetLineBresenhamPoints(line, stepRate = 1, results = []) {
  let x1 = Math.round(line.x1);
  let y1 = Math.round(line.y1);
  const x2 = Math.round(line.x2);
  const y2 = Math.round(line.y2);
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;
  results.push(new Vec2(x1, y1));
  let i = 1;
  while (!(x1 === x2 && y1 === y2)) {
    const e2 = err << 1;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
    if (i % stepRate === 0) {
      results.push(new Vec2(x1, y1));
    }
    i++;
  }
  return results;
}

// src/geom/line/GetLineHeight.ts
function GetLineHeight(line) {
  return Math.abs(line.y1 - line.y2);
}

// src/geom/line/GetLineMidPoint.ts
function GetLineMidPoint(line, out = new Vec2()) {
  out.x = (line.x1 + line.x2) / 2;
  out.y = (line.y1 + line.y2) / 2;
  return out;
}

// src/geom/line/GetLineNearestPoint.ts
function GetLineNearestPoint(line, point, out = new Vec2()) {
  const { x1, y1, x2, y2 } = line;
  const L2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  if (L2 === 0) {
    return out;
  }
  const r = ((point.x - x1) * (x2 - x1) + (point.y - y1) * (y2 - y1)) / L2;
  out.x = x1 + r * (x2 - x1);
  out.y = y1 + r * (y2 - y1);
  return out;
}

// src/geom/line/GetLineNormal.ts
function GetLineNormal(line, out = new Vec2()) {
  const a = GetLineAngle(line) - MATH_CONST.HALF_PI;
  out.x = Math.cos(a);
  out.y = Math.sin(a);
  return out;
}

// src/math/Wrap.ts
function Wrap(value, min, max) {
  const range = max - min;
  return min + ((value - min) % range + range) % range;
}

// src/geom/line/GetLineNormalAngle.ts
function GetLineNormalAngle(line) {
  const angle = GetLineAngle(line) - MATH_CONST.HALF_PI;
  return Wrap(angle, -Math.PI, Math.PI);
}

// src/geom/line/GetLineNormalX.ts
function GetLineNormalX(line) {
  return Math.cos(GetLineAngle(line) - MATH_CONST.HALF_PI);
}

// src/geom/line/GetLineNormalY.ts
function GetLineNormalY(line) {
  return Math.sin(GetLineAngle(line) - MATH_CONST.HALF_PI);
}

// src/geom/line/GetLinePerpSlope.ts
function GetLinePerpSlope(line) {
  const { x1, y1, x2, y2 } = line;
  return -((x2 - x1) / (y2 - y1));
}

// src/geom/line/GetLinePoint.ts
function GetLinePoint(line, position, out = new Vec2()) {
  out.x = line.x1 + (line.x2 - line.x1) * position;
  out.y = line.y1 + (line.y2 - line.y1) * position;
  return out;
}

// src/geom/line/GetLinePoints.ts
function GetLinePoints(line, quantity, stepRate = 0, out = []) {
  if (!quantity) {
    quantity = GetLineLength(line) / stepRate;
  }
  const { x1, y1, x2, y2 } = line;
  for (let i = 0; i < quantity; i++) {
    const position = i / quantity;
    const x = x1 + (x2 - x1) * position;
    const y = y1 + (y2 - y1) * position;
    out.push(new Vec2(x, y));
  }
  return out;
}

// src/geom/line/GetLineRandomPoint.ts
function GetLineRandomPoint(line, out = new Vec2()) {
  const t = Math.random();
  out.x = line.x1 + t * (line.x2 - line.x1);
  out.y = line.y1 + t * (line.y2 - line.y1);
  return out;
}

// src/geom/line/GetLineReflectAngle.ts
function GetLineReflectAngle(lineA, lineB) {
  return 2 * GetLineNormalAngle(lineB) - Math.PI - GetLineAngle(lineA);
}

// src/geom/line/GetLineSlope.ts
function GetLineSlope(line) {
  const { x1, y1, x2, y2 } = line;
  return (y2 - y1) / (x2 - x1);
}

// src/geom/line/GetLineWidth.ts
function GetLineWidth(line) {
  return Math.abs(line.x1 - line.x2);
}

// src/geom/line/GetShortestLineDistance.ts
function GetShortestLineDistance(line, point) {
  const { x1, y1, x2, y2 } = line;
  const L2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  if (L2 === 0) {
    return 0;
  }
  const s = ((y1 - point.y) * (x2 - x1) - (x1 - point.x) * (y2 - y1)) / L2;
  return Math.abs(s) * Math.sqrt(L2);
}

// src/geom/line/LineEquals.ts
function LineEquals(line, toCompare) {
  return line.x1 === toCompare.x1 && line.y1 === toCompare.y1 && line.x2 === toCompare.x2 && line.y2 === toCompare.y2;
}

// src/geom/line/RotateLineAround.ts
function RotateLineAround(line, x, y, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  let tx = line.x1 - x;
  let ty = line.y1 - y;
  line.x1 = tx * c - ty * s + x;
  line.y1 = tx * s + ty * c + y;
  tx = line.x2 - x;
  ty = line.y2 - y;
  line.x2 = tx * c - ty * s + x;
  line.y2 = tx * s + ty * c + y;
  return line;
}

// src/geom/line/RotateLine.ts
function RotateLine(line, angle) {
  const x = (line.x1 + line.x2) / 2;
  const y = (line.y1 + line.y2) / 2;
  return RotateLineAround(line, x, y, angle);
}

// src/geom/line/RotateLineAroundPoint.ts
function RotateLineAroundPoint(line, point, angle) {
  return RotateLineAround(line, point.x, point.y, angle);
}

// src/geom/line/SetLineToAngle.ts
function SetLineToAngle(line, x, y, angle, length) {
  line.x1 = x;
  line.y1 = y;
  line.x2 = x + Math.cos(angle) * length;
  line.y2 = y + Math.sin(angle) * length;
  return line;
}

// src/geom/line/TranslateLine.ts
function TranslateLine(line, x, y) {
  line.x1 += x;
  line.y1 += y;
  line.x2 += x;
  line.y2 += y;
  return line;
}

// src/geom/line/TranslateLinePoint.ts
function TranslateLinePoint(line, v) {
  return TranslateLine(line, v.x, v.y);
}

// src/geom/rectangle/index.ts
var rectangle_exports = {};
__export(rectangle_exports, {
  CeilRectangle: () => CeilRectangle,
  CeilRectanglePosition: () => CeilRectanglePosition,
  CenterRectangleOn: () => CenterRectangleOn,
  CloneRectangle: () => CloneRectangle,
  CopyRectangleFrom: () => CopyRectangleFrom,
  DecomposeRectangle: () => DecomposeRectangle,
  FitRectangleInside: () => FitRectangleInside,
  FitRectangleOutside: () => FitRectangleOutside,
  FitRectangleToPoint: () => FitRectangleToPoint,
  FitRectangleToPoints: () => FitRectangleToPoints,
  FloorRectangle: () => FloorRectangle,
  FloorRectanglePosition: () => FloorRectanglePosition,
  GetRectangleArea: () => GetRectangleArea,
  GetRectangleAspectRatio: () => GetRectangleAspectRatio,
  GetRectangleCenter: () => GetRectangleCenter,
  GetRectangleCenterX: () => GetRectangleCenterX,
  GetRectangleCenterY: () => GetRectangleCenterY,
  GetRectangleEdges: () => GetRectangleEdges,
  GetRectangleIntersection: () => GetRectangleIntersection2,
  GetRectangleMarchingAnts: () => GetRectangleMarchingAnts,
  GetRectangleOverlap: () => GetRectangleOverlap,
  GetRectanglePerimeter: () => GetRectanglePerimeter,
  GetRectanglePerimeterPoint: () => GetRectanglePerimeterPoint,
  GetRectanglePoint: () => GetRectanglePoint,
  GetRectanglePoints: () => GetRectanglePoints,
  GetRectangleRandomPoint: () => GetRectangleRandomPoint,
  GetRectangleRandomPointOutside: () => GetRectangleRandomPointOutside,
  GetRectangleSize: () => GetRectangleSize,
  GetRectangleUnion: () => GetRectangleUnion,
  InflateRectangle: () => InflateRectangle,
  MergeRectangle: () => MergeRectangle,
  Rectangle: () => Rectangle,
  RectangleContains: () => RectangleContains,
  RectangleContainsPoint: () => RectangleContainsPoint,
  RectangleContainsRectangle: () => RectangleContainsRectangle,
  RectangleEquals: () => RectangleEquals,
  RectangleFromPoints: () => RectangleFromPoints,
  RectangleSizeEquals: () => RectangleSizeEquals,
  ScaleRectangle: () => ScaleRectangle,
  TranslateRectangle: () => TranslateRectangle,
  TranslateRectanglePoint: () => TranslateRectanglePoint
});

// src/geom/rectangle/CeilRectangle.ts
function CeilRectangle(rect) {
  rect.x = Math.ceil(rect.x);
  rect.y = Math.ceil(rect.y);
  rect.width = Math.ceil(rect.width);
  rect.height = Math.ceil(rect.height);
  return rect;
}

// src/geom/rectangle/CeilRectanglePosition.ts
function CeilRectanglePosition(rect) {
  rect.x = Math.ceil(rect.x);
  rect.y = Math.ceil(rect.y);
  return rect;
}

// src/geom/rectangle/CenterRectangleOn.ts
function CenterRectangleOn(rect, x, y) {
  rect.x = x - rect.width / 2;
  rect.y = y - rect.height / 2;
  return rect;
}

// src/geom/rectangle/CloneRectangle.ts
function CloneRectangle(source) {
  return new Rectangle(source.x, source.y, source.width, source.height);
}

// src/geom/rectangle/CopyRectangleFrom.ts
function CopyRectangleFrom(source, dest) {
  return dest.set(source.x, source.y, source.width, source.height);
}

// src/geom/rectangle/GetRectangleAspectRatio.ts
function GetRectangleAspectRatio(rect) {
  return rect.height === 0 ? NaN : rect.width / rect.height;
}

// src/geom/rectangle/GetRectangleCenterX.ts
function GetRectangleCenterX(rect) {
  return rect.x + rect.width / 2;
}

// src/geom/rectangle/GetRectangleCenterY.ts
function GetRectangleCenterY(rect) {
  return rect.y + rect.height / 2;
}

// src/geom/rectangle/FitRectangleInside.ts
function FitRectangleInside(target, source) {
  const ratio = GetRectangleAspectRatio(target);
  let width = source.width;
  let height = source.height;
  if (ratio < GetRectangleAspectRatio(source)) {
    width = source.height * ratio;
  } else {
    height = source.width / ratio;
  }
  return target.set(GetRectangleCenterX(source) - target.width / 2, GetRectangleCenterY(source) - target.height / 2, width, height);
}

// src/geom/rectangle/FitRectangleOutside.ts
function FitRectangleOutside(target, source) {
  const ratio = GetRectangleAspectRatio(target);
  let width = source.width;
  let height = source.height;
  if (ratio > GetRectangleAspectRatio(source)) {
    width = source.height * ratio;
  } else {
    height = source.width / ratio;
  }
  return target.set(GetRectangleCenterX(source) - target.width / 2, GetRectangleCenterY(source) - target.height / 2, width, height);
}

// src/geom/rectangle/FitRectangleToPoint.ts
function FitRectangleToPoint(target, x, y) {
  const minX = Math.min(target.x, x);
  const maxX = Math.max(target.right, x);
  const minY = Math.min(target.y, y);
  const maxY = Math.max(target.bottom, y);
  return target.set(minX, minY, maxX - minX, maxY - minY);
}

// src/geom/rectangle/FitRectangleToPoints.ts
function FitRectangleToPoints(target, points) {
  let minX = target.x;
  let maxX = target.right;
  let minY = target.y;
  let maxY = target.bottom;
  for (let i = 0; i < points.length; i++) {
    minX = Math.min(minX, points[i].x);
    maxX = Math.max(maxX, points[i].x);
    minY = Math.min(minY, points[i].y);
    maxY = Math.max(maxY, points[i].y);
  }
  return target.set(minX, minY, maxX - minX, maxY - minY);
}

// src/geom/rectangle/FloorRectangle.ts
function FloorRectangle(rect) {
  rect.x = Math.floor(rect.x);
  rect.y = Math.floor(rect.y);
  rect.width = Math.floor(rect.width);
  rect.height = Math.floor(rect.height);
  return rect;
}

// src/geom/rectangle/FloorRectanglePosition.ts
function FloorRectanglePosition(rect) {
  rect.x = Math.floor(rect.x);
  rect.y = Math.floor(rect.y);
  return rect;
}

// src/geom/rectangle/GetRectangleArea.ts
function GetRectangleArea(rect) {
  return rect.width * rect.height;
}

// src/geom/rectangle/GetRectangleCenter.ts
function GetRectangleCenter(rect, out = new Vec2()) {
  return out.set(GetRectangleCenterX(rect), GetRectangleCenterY(rect));
}

// src/geom/rectangle/GetRectangleIntersection.ts
function GetRectangleIntersection2(rectA, rectB, out = new Rectangle()) {
  if (RectangleToRectangle(rectA, rectB)) {
    out.set(Math.max(rectA.x, rectB.x), Math.max(rectA.y, rectB.y), Math.min(rectA.right, rectB.right) - out.x, Math.min(rectA.bottom, rectB.bottom) - out.y);
  } else {
    out.set();
  }
  return out;
}

// src/geom/rectangle/GetRectanglePerimeter.ts
function GetRectanglePerimeter(rect) {
  return 2 * (rect.width + rect.height);
}

// src/geom/rectangle/GetRectangleMarchingAnts.ts
function GetRectangleMarchingAnts(rect, step, quantity, out = []) {
  if (!step && !quantity) {
    return out;
  }
  if (!step) {
    step = GetRectanglePerimeter(rect) / quantity;
  } else {
    quantity = Math.round(GetRectanglePerimeter(rect) / step);
  }
  let x = rect.x;
  let y = rect.y;
  let face = 0;
  for (let i = 0; i < quantity; i++) {
    out.push(new Vec2(x, y));
    switch (face) {
      case 0:
        x += step;
        if (x >= rect.right) {
          face = 1;
          y += x - rect.right;
          x = rect.right;
        }
        break;
      case 1:
        y += step;
        if (y >= rect.bottom) {
          face = 2;
          x -= y - rect.bottom;
          y = rect.bottom;
        }
        break;
      case 2:
        x -= step;
        if (x <= rect.x) {
          face = 3;
          y -= rect.x - x;
          x = rect.x;
        }
        break;
      case 3:
        y -= step;
        if (y <= rect.y) {
          face = 0;
          y = rect.y;
        }
        break;
    }
  }
  return out;
}

// src/geom/rectangle/GetRectangleOverlap.ts
function GetRectangleOverlap(rectA, rectB) {
  return rectA.x < rectB.right && rectA.right > rectB.x && rectA.y < rectB.bottom && rectA.bottom > rectB.y;
}

// src/math/DegToRad.ts
function DegToRad(degrees) {
  return degrees * MATH_CONST.DEG_TO_RAD;
}

// src/geom/rectangle/GetRectanglePerimeterPoint.ts
function GetRectanglePerimeterPoint(rectangle, angle, out = new Vec2()) {
  angle = DegToRad(angle);
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  let dx = c > 0 ? rectangle.width / 2 : rectangle.width / -2;
  let dy = s > 0 ? rectangle.height / 2 : rectangle.height / -2;
  if (Math.abs(dx * s) < Math.abs(dy * c)) {
    dy = dx * s / c;
  } else {
    dx = dy * c / s;
  }
  return out.set(dx + GetRectangleCenterX(rectangle), dy + GetRectangleCenterY(rectangle));
}

// src/geom/rectangle/GetRectanglePoint.ts
function GetRectanglePoint(rectangle, position, out = new Vec2()) {
  if (position <= 0 || position >= 1) {
    return out.set(rectangle.x, rectangle.y);
  }
  let p = GetRectanglePerimeter(rectangle) * position;
  if (position > 0.5) {
    p -= rectangle.width + rectangle.height;
    if (p <= rectangle.width) {
      return out.set(rectangle.right - p, rectangle.bottom);
    } else {
      return out.set(rectangle.x, rectangle.bottom - (p - rectangle.width));
    }
  } else if (p <= rectangle.width) {
    return out.set(rectangle.x + p, rectangle.y);
  } else {
    return out.set(rectangle.right, rectangle.y + (p - rectangle.width));
  }
}

// src/geom/rectangle/GetRectanglePoints.ts
function GetRectanglePoints(rectangle, step, quantity = 0, out = []) {
  if (!quantity) {
    quantity = GetRectanglePerimeter(rectangle) / step;
  }
  for (let i = 0; i < quantity; i++) {
    out.push(GetRectanglePoint(rectangle, i / quantity));
  }
  return out;
}

// src/geom/rectangle/GetRectangleRandomPoint.ts
function GetRectangleRandomPoint(rect, out = new Vec2()) {
  return out.set(rect.x + Math.random() * rect.width, rect.y + Math.random() * rect.height);
}

// src/math/Between.ts
function Between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// src/geom/rectangle/RectangleContainsRectangle.ts
function RectangleContainsRectangle(rectA, rectB) {
  if (rectB.width * rectB.height > rectA.width * rectA.height) {
    return false;
  }
  return rectB.x > rectA.x && rectB.x < rectA.right && (rectB.right > rectA.x && rectB.right < rectA.right) && (rectB.y > rectA.y && rectB.y < rectA.bottom) && (rectB.bottom > rectA.y && rectB.bottom < rectA.bottom);
}

// src/geom/rectangle/GetRectangleRandomPointOutside.ts
function GetRectangleRandomPointOutside(outer, inner, out = new Vec2()) {
  if (RectangleContainsRectangle(outer, inner)) {
    switch (Between(0, 3)) {
      case 0:
        out.x = outer.x + Math.random() * (inner.right - outer.x);
        out.y = outer.y + Math.random() * (inner.y - outer.y);
        break;
      case 1:
        out.x = inner.x + Math.random() * (outer.right - inner.x);
        out.y = inner.bottom + Math.random() * (outer.bottom - inner.bottom);
        break;
      case 2:
        out.x = outer.x + Math.random() * (inner.x - outer.x);
        out.y = inner.y + Math.random() * (outer.bottom - inner.y);
        break;
      case 3:
        out.x = inner.right + Math.random() * (outer.right - inner.right);
        out.y = outer.y + Math.random() * (inner.bottom - outer.y);
        break;
    }
  }
  return out;
}

// src/geom/rectangle/GetRectangleSize.ts
function GetRectangleSize(rect, out = new Vec2()) {
  return out.set(rect.width, rect.height);
}

// src/geom/rectangle/GetRectangleUnion.ts
function GetRectangleUnion(rectA, rectB, out = new Rectangle()) {
  const x = Math.min(rectA.x, rectB.x);
  const y = Math.min(rectA.y, rectB.y);
  const w = Math.max(rectA.right, rectB.right) - x;
  const h = Math.max(rectA.bottom, rectB.bottom) - y;
  return out.set(x, y, w, h);
}

// src/geom/rectangle/InflateRectangle.ts
function InflateRectangle(rect, x, y) {
  const cx = GetRectangleCenterX(rect);
  const cy = GetRectangleCenterY(rect);
  rect.width = rect.width + x * 2;
  rect.height = rect.height + y * 2;
  return CenterRectangleOn(rect, cx, cy);
}

// src/geom/rectangle/MergeRectangle.ts
function MergeRectangle(target, source) {
  const minX = Math.min(target.x, source.x);
  const maxX = Math.max(target.right, source.right);
  const minY = Math.min(target.y, source.y);
  const maxY = Math.max(target.bottom, source.bottom);
  return target.set(minX, minY, maxX - minX, maxY - minY);
}

// src/geom/rectangle/RectangleContainsPoint.ts
function RectangleContainsPoint(rect, point) {
  return RectangleContains(rect, point.x, point.y);
}

// src/geom/rectangle/RectangleFromPoints.ts
function RectangleFromPoints(points, out = new Rectangle()) {
  if (points.length === 0) {
    return out;
  }
  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = MATH_CONST.MIN_SAFE_INTEGER;
  let maxY = MATH_CONST.MIN_SAFE_INTEGER;
  for (let i = 0; i < points.length; i++) {
    const px = points[i].x;
    const py = points[i].y;
    minX = Math.min(minX, px);
    minY = Math.min(minY, py);
    maxX = Math.max(maxX, px);
    maxY = Math.max(maxY, py);
  }
  return out.set(minX, minY, maxX - minX, maxY - minY);
}

// src/geom/rectangle/RectangleSizeEquals.ts
function RectangleSizeEquals(rect, toCompare) {
  return rect.width === toCompare.width && rect.height === toCompare.height;
}

// src/geom/rectangle/ScaleRectangle.ts
function ScaleRectangle(rect, x, y = x) {
  rect.width *= x;
  rect.height *= y;
  return rect;
}

// src/geom/rectangle/TranslateRectangle.ts
function TranslateRectangle(rect, x, y) {
  rect.x += x;
  rect.y += y;
  return rect;
}

// src/geom/rectangle/TranslateRectanglePoint.ts
function TranslateRectanglePoint(rect, point) {
  rect.x += point.x;
  rect.y += point.y;
  return rect;
}

// src/geom/triangle/index.ts
var triangle_exports = {};
__export(triangle_exports, {
  BuildEquilateralTriangle: () => BuildEquilateralTriangle,
  BuildRightTriangle: () => BuildRightTriangle,
  CenterTriangleOn: () => CenterTriangleOn,
  CloneTriangle: () => CloneTriangle,
  CopyTriangleFrom: () => CopyTriangleFrom,
  DecomposeTriangle: () => DecomposeTriangle,
  GetTriangleArea: () => GetTriangleArea,
  GetTriangleCentroid: () => GetTriangleCentroid,
  GetTriangleCircumCenter: () => GetTriangleCircumCenter,
  GetTriangleCircumCircle: () => GetTriangleCircumCircle,
  GetTriangleEdges: () => GetTriangleEdges,
  GetTriangleInCenter: () => GetTriangleInCenter,
  GetTrianglePerimeter: () => GetTrianglePerimeter,
  GetTrianglePoint: () => GetTrianglePoint,
  GetTrianglePoints: () => GetTrianglePoints,
  GetTriangleRandomPoint: () => GetTriangleRandomPoint,
  RotateTriangle: () => RotateTriangle,
  RotateTriangleAround: () => RotateTriangleAround,
  RotateTriangleAroundPoint: () => RotateTriangleAroundPoint,
  TranslateTriangle: () => TranslateTriangle,
  Triangle: () => Triangle,
  TriangleContains: () => TriangleContains,
  TriangleContainsPoint: () => TriangleContainsPoint,
  TriangleContainsPoints: () => TriangleContainsPoints,
  TriangleEquals: () => TriangleEquals
});

// src/geom/triangle/Triangle.ts
var Triangle = class {
  x1;
  y1;
  x2;
  y2;
  x3;
  y3;
  constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0) {
    this.set(x1, y1, x2, y2, x3, y3);
  }
  set(x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    return this;
  }
  contains(x, y) {
    return TriangleContains(this, x, y);
  }
  get left() {
    return Math.min(this.x1, this.x2, this.x3);
  }
  set left(value) {
    let diff2 = 0;
    if (this.x1 <= this.x2 && this.x1 <= this.x3) {
      diff2 = this.x1 - value;
    } else if (this.x2 <= this.x1 && this.x2 <= this.x3) {
      diff2 = this.x2 - value;
    } else {
      diff2 = this.x3 - value;
    }
    this.x1 -= diff2;
    this.x2 -= diff2;
    this.x3 -= diff2;
  }
  get right() {
    return Math.max(this.x1, this.x2, this.x3);
  }
  set right(value) {
    let diff2 = 0;
    if (this.x1 >= this.x2 && this.x1 >= this.x3) {
      diff2 = this.x1 - value;
    } else if (this.x2 >= this.x1 && this.x2 >= this.x3) {
      diff2 = this.x2 - value;
    } else {
      diff2 = this.x3 - value;
    }
    this.x1 -= diff2;
    this.x2 -= diff2;
    this.x3 -= diff2;
  }
  get top() {
    return Math.min(this.y1, this.y2, this.y3);
  }
  set top(value) {
    let diff2 = 0;
    if (this.y1 <= this.y2 && this.y1 <= this.y3) {
      diff2 = this.y1 - value;
    } else if (this.y2 <= this.y1 && this.y2 <= this.y3) {
      diff2 = this.y2 - value;
    } else {
      diff2 = this.y3 - value;
    }
    this.y1 -= diff2;
    this.y2 -= diff2;
    this.y3 -= diff2;
  }
  get bottom() {
    return Math.max(this.y1, this.y2, this.y3);
  }
  set bottom(value) {
    let diff2 = 0;
    if (this.y1 >= this.y2 && this.y1 >= this.y3) {
      diff2 = this.y1 - value;
    } else if (this.y2 >= this.y1 && this.y2 >= this.y3) {
      diff2 = this.y2 - value;
    } else {
      diff2 = this.y3 - value;
    }
    this.y1 -= diff2;
    this.y2 -= diff2;
    this.y3 -= diff2;
  }
};

// src/geom/triangle/BuildEquilateralTriangle.ts
function BuildEquilateralTriangle(x, y, length) {
  const height = length * (Math.sqrt(3) / 2);
  const x1 = x;
  const y1 = y;
  const x2 = x + length / 2;
  const y2 = y + height;
  const x3 = x - length / 2;
  const y3 = y + height;
  return new Triangle(x1, y1, x2, y2, x3, y3);
}

// src/geom/triangle/BuildRightTriangle.ts
function BuildRightTriangle(x, y, width, height = width) {
  const x1 = x;
  const y1 = y;
  const x2 = x;
  const y2 = y - height;
  const x3 = x + width;
  const y3 = y;
  return new Triangle(x1, y1, x2, y2, x3, y3);
}

// src/geom/triangle/GetTriangleCentroid.ts
function GetTriangleCentroid(triangle, out = new Vec2()) {
  return out.set((triangle.x1 + triangle.x2 + triangle.x3) / 3, (triangle.y1 + triangle.y2 + triangle.y3) / 3);
}

// src/geom/triangle/TranslateTriangle.ts
function TranslateTriangle(triangle, x, y) {
  triangle.x1 += x;
  triangle.y1 += y;
  triangle.x2 += x;
  triangle.y2 += y;
  triangle.x3 += x;
  triangle.y3 += y;
  return triangle;
}

// src/geom/triangle/CenterTriangleOn.ts
function CenterTriangleOn(triangle, x, y, centerFunc = GetTriangleCentroid) {
  const center = centerFunc(triangle);
  const diffX = x - center.x;
  const diffY = y - center.y;
  return TranslateTriangle(triangle, diffX, diffY);
}

// src/geom/triangle/CloneTriangle.ts
function CloneTriangle(source) {
  const { x1, y1, x2, y2, x3, y3 } = source;
  return new Triangle(x1, y1, x2, y2, x3, y3);
}

// src/geom/triangle/CopyTriangleFrom.ts
function CopyTriangleFrom(source, dest) {
  const { x1, y1, x2, y2, x3, y3 } = source;
  return dest.set(x1, y1, x2, y2, x3, y3);
}

// src/geom/triangle/GetTriangleArea.ts
function GetTriangleArea(triangle) {
  const { x1, y1, x2, y2, x3, y3 } = triangle;
  return Math.abs(((x3 - x1) * (y2 - y1) - (x2 - x1) * (y3 - y1)) / 2);
}

// src/geom/triangle/GetTriangleCircumCenter.ts
function Det(m00, m01, m10, m11) {
  return m00 * m11 - m01 * m10;
}
function GetTriangleCircumCenter(triangle, out = new Vec2()) {
  const cx = triangle.x3;
  const cy = triangle.y3;
  const ax = triangle.x1 - cx;
  const ay = triangle.y1 - cy;
  const bx = triangle.x2 - cx;
  const by = triangle.y2 - cy;
  const denom = 2 * Det(ax, ay, bx, by);
  const numx = Det(ay, ax * ax + ay * ay, by, bx * bx + by * by);
  const numy = Det(ax, ax * ax + ay * ay, bx, bx * bx + by * by);
  return out.set(cx - numx / denom, cy + numy / denom);
}

// src/geom/triangle/GetTriangleCircumCircle.ts
function GetTriangleCircumCircle(triangle, out = new Circle()) {
  const { x1, y1, x2, y2, x3, y3 } = triangle;
  const A = x2 - x1;
  const B = y2 - y1;
  const C = x3 - x1;
  const D = y3 - y1;
  const E = A * (x1 + x2) + B * (y1 + y2);
  const F = C * (x1 + x3) + D * (y1 + y3);
  const G = 2 * (A * (y3 - y2) - B * (x3 - x2));
  if (Math.abs(G) < 1e-6) {
    const minX = Math.min(x1, x2, x3);
    const minY = Math.min(y1, y2, y3);
    const dx = (Math.max(x1, x2, x3) - minX) * 0.5;
    const dy = (Math.max(y1, y2, y3) - minY) * 0.5;
    return out.set(minX + dx, minY + dy, Math.sqrt(dx * dx + dy * dy));
  } else {
    const cx = (D * E - B * F) / G;
    const cy = (A * F - C * E) / G;
    const dx = cx - x1;
    const dy = cy - y1;
    return out.set(cx, cy, Math.sqrt(dx * dx + dy * dy));
  }
}

// src/geom/triangle/GetTriangleInCenter.ts
function GetLength(x1, y1, x2, y2) {
  const x = x1 - x2;
  const y = y1 - y2;
  return Math.sqrt(x * x + y * y);
}
function GetTriangleInCenter(triangle, out = new Vec2()) {
  const { x1, y1, x2, y2, x3, y3 } = triangle;
  const d1 = GetLength(x3, y3, x2, y2);
  const d2 = GetLength(x1, y1, x3, y3);
  const d3 = GetLength(x2, y2, x1, y1);
  const p = d1 + d2 + d3;
  return out.set((x1 * d1 + x2 * d2 + x3 * d3) / p, (y1 * d1 + y2 * d2 + y3 * d3) / p);
}

// src/geom/triangle/GetTrianglePerimeter.ts
function GetTrianglePerimeter(triangle) {
  const [line1, line2, line3] = GetTriangleEdges(triangle);
  return GetLineLength(line1) + GetLineLength(line2) + GetLineLength(line3);
}

// src/geom/triangle/GetTrianglePoint.ts
function GetTrianglePoint(triangle, position, out = new Vec2()) {
  const [line1, line2, line3] = GetTriangleEdges(triangle);
  if (position <= 0 || position >= 1) {
    return out.set(line1.x1, line1.y1);
  }
  const length1 = GetLineLength(line1);
  const length2 = GetLineLength(line2);
  const length3 = GetLineLength(line3);
  const perimeter = length1 + length2 + length3;
  let p = perimeter * position;
  let localPosition = 0;
  if (p < length1) {
    localPosition = p / length1;
    const { x1, y1, x2, y2 } = line1;
    return out.set(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
  } else if (p > length1 + length2) {
    p -= length1 + length2;
    localPosition = p / length3;
    const { x1, y1, x2, y2 } = line3;
    return out.set(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
  } else {
    p -= length1;
    localPosition = p / length2;
    const { x1, y1, x2, y2 } = line2;
    return out.set(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
  }
}

// src/geom/triangle/GetTrianglePoints.ts
function GetTrianglePoints(triangle, quantity, stepRate, out = []) {
  const [line1, line2, line3] = GetTriangleEdges(triangle);
  const length1 = GetLineLength(line1);
  const length2 = GetLineLength(line2);
  const length3 = GetLineLength(line3);
  const perimeter = length1 + length2 + length3;
  if (!quantity) {
    quantity = perimeter / stepRate;
  }
  for (let i = 0; i < quantity; i++) {
    let p = perimeter * (i / quantity);
    let localPosition = 0;
    let point;
    if (p < length1) {
      localPosition = p / length1;
      const { x1, y1, x2, y2 } = line1;
      point = new Vec2(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
    } else if (p > length1 + length2) {
      p -= length1 + length2;
      localPosition = p / length3;
      const { x1, y1, x2, y2 } = line3;
      point = new Vec2(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
    } else {
      p -= length1;
      localPosition = p / length2;
      const { x1, y1, x2, y2 } = line2;
      point = new Vec2(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
    }
    out.push(point);
  }
  return out;
}

// src/geom/triangle/GetTriangleRandomPoint.ts
function GetTriangleRandomPoint(triangle, out = new Vec2()) {
  const { x1, y1, x2, y2, x3, y3 } = triangle;
  const ux = x2 - x1;
  const uy = y2 - y1;
  const vx = x3 - x1;
  const vy = y3 - y1;
  let r = Math.random();
  let s = Math.random();
  if (r + s >= 1) {
    r = 1 - r;
    s = 1 - s;
  }
  return out.set(x1 + (ux * r + vx * s), y1 + (uy * r + vy * s));
}

// src/geom/triangle/RotateTriangleAround.ts
function RotateTriangleAround(triangle, x, y, angle) {
  const { x1, y1, x2, y2, x3, y3 } = triangle;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return triangle.set((x1 - x) * c - (y1 - y) * s + x, (x1 - x) * s + (y1 - y) * c + y, (x2 - x) * c - (y2 - y) * s + x, (x2 - x) * s + (y2 - y) * c + y, (x3 - x) * c - (y3 - y) * s + x, (x3 - x) * s + (y3 - y) * c + y);
}

// src/geom/triangle/RotateTriangle.ts
function RotateTriangle(triangle, angle) {
  const point = GetTriangleInCenter(triangle);
  return RotateTriangleAround(triangle, point.x, point.y, angle);
}

// src/geom/triangle/RotateTriangleAroundPoint.ts
function RotateTriangleAroundPoint(triangle, point, angle) {
  return RotateTriangleAround(triangle, point.x, point.y, angle);
}

// src/geom/triangle/TriangleContainsPoint.ts
function TriangleContainsPoint(triangle, point) {
  return TriangleContains(triangle, point.x, point.y);
}

// src/geom/triangle/TriangleEquals.ts
function TriangleEquals(src, dest) {
  return src.x1 === dest.x1 && src.y1 === dest.y1 && src.x2 === dest.x2 && src.y2 === dest.y2 && src.x3 === dest.x3 && src.y3 === dest.y3;
}

// src/input/index.ts
var input_exports2 = {};
__export(input_exports2, {
  Keyboard: () => keyboard_exports,
  Mouse: () => mouse_exports,
  SetInteractive: () => SetInteractive
});

// src/input/keyboard/index.ts
var keyboard_exports = {};
__export(keyboard_exports, {
  GetKeyDownDuration: () => GetKeyDownDuration,
  Key: () => Key,
  Keyboard: () => Keyboard,
  Keys: () => keys_exports,
  SetKeyRepeatRate: () => SetKeyRepeatRate
});

// src/input/keyboard/keys/index.ts
var keys_exports = {};
__export(keys_exports, {
  AKey: () => AKey,
  ArrowKeys: () => ArrowKeys,
  BKey: () => BKey,
  CKey: () => CKey,
  DKey: () => DKey,
  DownKey: () => DownKey,
  EKey: () => EKey,
  FKey: () => FKey,
  GKey: () => GKey,
  HKey: () => HKey,
  IKey: () => IKey,
  JKey: () => JKey,
  KKey: () => KKey,
  LKey: () => LKey,
  LeftKey: () => LeftKey,
  MKey: () => MKey,
  NKey: () => NKey,
  OKey: () => OKey,
  PKey: () => PKey,
  QKey: () => QKey,
  RKey: () => RKey,
  RightKey: () => RightKey,
  SKey: () => SKey,
  SpaceKey: () => SpaceKey,
  TKey: () => TKey,
  UKey: () => UKey,
  UpKey: () => UpKey,
  VKey: () => VKey,
  WASDKeys: () => WASDKeys,
  WKey: () => WKey,
  XKey: () => XKey,
  YKey: () => YKey,
  ZKey: () => ZKey
});

// src/input/keyboard/Key.ts
var Key = class {
  value;
  events;
  capture = true;
  isDown = false;
  enabled = true;
  repeatRate = 0;
  canRepeat = true;
  timeDown = 0;
  timeUpdated = 0;
  timeUp = 0;
  shiftKey;
  ctrlKey;
  altKey;
  downCallback;
  upCallback;
  constructor(value) {
    this.value = value;
    this.events = new Map();
  }
  getValue() {
    return this.value;
  }
  down(event) {
    if (!this.enabled) {
      return;
    }
    if (this.capture) {
      event.preventDefault();
    }
    this.shiftKey = event.shiftKey;
    this.ctrlKey = event.ctrlKey;
    this.altKey = event.altKey;
    if (this.isDown && this.canRepeat) {
      this.timeUpdated = event.timeStamp;
      const delay = this.timeUpdated - this.timeDown;
      if (delay >= this.repeatRate) {
        Emit(this, "keydown", this);
        if (this.downCallback) {
          this.downCallback(this);
        }
      }
    } else {
      this.isDown = true;
      this.timeDown = event.timeStamp;
      this.timeUpdated = event.timeStamp;
      Emit(this, "keydown", this);
      if (this.downCallback) {
        this.downCallback(this);
      }
    }
  }
  up(event) {
    if (!this.enabled) {
      return;
    }
    if (this.capture) {
      event.preventDefault();
    }
    this.shiftKey = event.shiftKey;
    this.ctrlKey = event.ctrlKey;
    this.altKey = event.altKey;
    if (this.isDown) {
      this.isDown = false;
      this.timeUp = event.timeStamp;
      this.timeUpdated = event.timeStamp;
      Emit(this, "keyup", this);
      if (this.upCallback) {
        this.upCallback(this);
      }
    }
  }
  reset() {
    this.isDown = false;
    this.timeUpdated = this.timeDown;
    this.timeUp = this.timeDown;
  }
  destroy() {
    this.downCallback = null;
    this.upCallback = null;
    this.events.clear();
  }
};

// src/input/keyboard/keys/AKey.ts
var AKey = class extends Key {
  constructor() {
    super("a");
  }
};

// src/input/keyboard/keys/ArrowKeys.ts
var ArrowKeys = class {
  left;
  right;
  up;
  down;
  space;
  constructor(keyboardManager, config) {
    const {
      left = true,
      right = true,
      up = true,
      down = true,
      space = true
    } = config;
    const keys = keyboardManager.keys;
    if (left) {
      this.left = new Key("ArrowLeft");
      keys.set(this.left.value, this.left);
    }
    if (right) {
      this.right = new Key("ArrowRight");
      keys.set(this.right.value, this.right);
    }
    if (up) {
      this.up = new Key("ArrowUp");
      keys.set(this.up.value, this.up);
    }
    if (down) {
      this.down = new Key("ArrowDown");
      keys.set(this.down.value, this.down);
    }
    if (space) {
      this.space = new Key(" ");
      keys.set(this.space.value, this.space);
    }
  }
};

// src/input/keyboard/keys/BKey.ts
var BKey = class extends Key {
  constructor() {
    super("b");
  }
};

// src/input/keyboard/keys/CKey.ts
var CKey = class extends Key {
  constructor() {
    super("c");
  }
};

// src/input/keyboard/keys/DKey.ts
var DKey = class extends Key {
  constructor() {
    super("d");
  }
};

// src/input/keyboard/keys/DownKey.ts
var DownKey = class extends Key {
  constructor() {
    super("ArrowDown");
  }
};

// src/input/keyboard/keys/EKey.ts
var EKey = class extends Key {
  constructor() {
    super("e");
  }
};

// src/input/keyboard/keys/FKey.ts
var FKey = class extends Key {
  constructor() {
    super("f");
  }
};

// src/input/keyboard/keys/GKey.ts
var GKey = class extends Key {
  constructor() {
    super("g");
  }
};

// src/input/keyboard/keys/HKey.ts
var HKey = class extends Key {
  constructor() {
    super("h");
  }
};

// src/input/keyboard/keys/IKey.ts
var IKey = class extends Key {
  constructor() {
    super("i");
  }
};

// src/input/keyboard/keys/JKey.ts
var JKey = class extends Key {
  constructor() {
    super("j");
  }
};

// src/input/keyboard/keys/KKey.ts
var KKey = class extends Key {
  constructor() {
    super("k");
  }
};

// src/input/keyboard/keys/LKey.ts
var LKey = class extends Key {
  constructor() {
    super("l");
  }
};

// src/input/keyboard/keys/LeftKey.ts
var LeftKey = class extends Key {
  constructor() {
    super("ArrowLeft");
  }
};

// src/input/keyboard/keys/MKey.ts
var MKey = class extends Key {
  constructor() {
    super("m");
  }
};

// src/input/keyboard/keys/NKey.ts
var NKey = class extends Key {
  constructor() {
    super("n");
  }
};

// src/input/keyboard/keys/OKey.ts
var OKey = class extends Key {
  constructor() {
    super("o");
  }
};

// src/input/keyboard/keys/PKey.ts
var PKey = class extends Key {
  constructor() {
    super("p");
  }
};

// src/input/keyboard/keys/QKey.ts
var QKey = class extends Key {
  constructor() {
    super("q");
  }
};

// src/input/keyboard/keys/RKey.ts
var RKey = class extends Key {
  constructor() {
    super("r");
  }
};

// src/input/keyboard/keys/RightKey.ts
var RightKey = class extends Key {
  constructor() {
    super("ArrowRight");
  }
};

// src/input/keyboard/keys/SKey.ts
var SKey = class extends Key {
  constructor() {
    super("s");
  }
};

// src/input/keyboard/keys/SpaceKey.ts
var SpaceKey = class extends Key {
  constructor() {
    super(" ");
  }
};

// src/input/keyboard/keys/TKey.ts
var TKey = class extends Key {
  constructor() {
    super("t");
  }
};

// src/input/keyboard/keys/UKey.ts
var UKey = class extends Key {
  constructor() {
    super("u");
  }
};

// src/input/keyboard/keys/UpKey.ts
var UpKey = class extends Key {
  constructor() {
    super("ArrowUp");
  }
};

// src/input/keyboard/keys/VKey.ts
var VKey = class extends Key {
  constructor() {
    super("v");
  }
};

// src/input/keyboard/keys/WASDKeys.ts
var WASDKeys = class {
  W;
  A;
  S;
  D;
  space;
  constructor(keyboardManager, config) {
    const {
      W = true,
      A = true,
      S = true,
      D = true,
      space = true
    } = config;
    const keys = keyboardManager.keys;
    if (W) {
      this.W = new Key("w");
      keys.set(this.W.value, this.W);
    }
    if (A) {
      this.A = new Key("a");
      keys.set(this.A.value, this.A);
    }
    if (S) {
      this.S = new Key("s");
      keys.set(this.S.value, this.S);
    }
    if (D) {
      this.D = new Key("d");
      keys.set(this.D.value, this.D);
    }
    if (space) {
      this.space = new Key(" ");
      keys.set(this.space.value, this.space);
    }
  }
};

// src/input/keyboard/keys/WKey.ts
var WKey = class extends Key {
  constructor() {
    super("w");
  }
};

// src/input/keyboard/keys/XKey.ts
var XKey = class extends Key {
  constructor() {
    super("x");
  }
};

// src/input/keyboard/keys/YKey.ts
var YKey = class extends Key {
  constructor() {
    super("y");
  }
};

// src/input/keyboard/keys/ZKey.ts
var ZKey = class extends Key {
  constructor() {
    super("z");
  }
};

// src/input/keyboard/GetKeyDownDuration.ts
function GetKeyDownDuration(key) {
  if (key.isDown) {
    return key.timeUpdated - key.timeDown;
  } else {
    return key.timeUp - key.timeDown;
  }
}

// src/input/keyboard/Keyboard.ts
var Keyboard = class extends EventEmitter {
  keys;
  keydownHandler;
  keyupHandler;
  blurHandler;
  keyConversion = {
    Up: "ArrowUp",
    Down: "ArrowDown",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Spacebar: " ",
    Win: "Meta",
    Scroll: "ScrollLock",
    Del: "Delete",
    Apps: "ContextMenu",
    Esc: "Escape",
    Add: "+",
    Subtract: "-",
    Multiply: "*",
    Decimal: ".",
    Divide: "/"
  };
  constructor() {
    super();
    this.keydownHandler = (event) => this.onKeyDown(event);
    this.keyupHandler = (event) => this.onKeyUp(event);
    this.blurHandler = () => this.onBlur();
    window.addEventListener("keydown", this.keydownHandler);
    window.addEventListener("keyup", this.keyupHandler);
    window.addEventListener("blur", this.blurHandler);
    this.keys = new Map();
  }
  addKeys(...keys) {
    keys.forEach((key) => {
      this.keys.set(key.getValue(), key);
    });
  }
  clearKeys() {
    this.keys.clear();
  }
  onBlur() {
    this.keys.forEach((key) => {
      key.reset();
    });
  }
  getKeyValue(key) {
    if (this.keyConversion.hasOwnProperty(key)) {
      return this.keyConversion[key];
    } else {
      return key;
    }
  }
  onKeyDown(event) {
    const value = this.getKeyValue(event.key);
    if (this.keys.has(value)) {
      const key = this.keys.get(value);
      key.down(event);
    }
    Emit(this, "keydown-" + value, event);
    Emit(this, "keydown", event);
  }
  onKeyUp(event) {
    const value = this.getKeyValue(event.key);
    if (this.keys.has(value)) {
      const key = this.keys.get(value);
      key.up(event);
    }
    Emit(this, "keyup-" + value, event);
    Emit(this, "keyup", event);
  }
  destroy() {
    window.removeEventListener("keydown", this.keydownHandler);
    window.removeEventListener("keyup", this.keyupHandler);
    window.removeEventListener("blur", this.blurHandler);
    Emit(this, "destroy");
  }
};

// src/input/keyboard/SetKeyRepeatRate.ts
function SetKeyRepeatRate(rate, ...keys) {
  keys.forEach((key) => {
    key.repeatRate = rate;
  });
  return keys;
}

// src/input/mouse/index.ts
var mouse_exports = {};
__export(mouse_exports, {
  Mouse: () => Mouse
});

// src/input/mouse/Mouse.ts
var Mouse = class extends EventEmitter {
  primaryDown = false;
  auxDown = false;
  secondaryDown = false;
  blockContextMenu = true;
  localPoint;
  hitPoint;
  target;
  resolution = 1;
  mousedownHandler;
  mouseupHandler;
  mousemoveHandler;
  mousewheelHandler;
  contextmenuHandler;
  blurHandler;
  transPoint;
  constructor(target) {
    super();
    this.mousedownHandler = (event) => this.onMouseDown(event);
    this.mouseupHandler = (event) => this.onMouseUp(event);
    this.mousemoveHandler = (event) => this.onMouseMove(event);
    this.mousewheelHandler = (event) => this.onMouseWheel(event);
    this.contextmenuHandler = (event) => this.onContextMenuEvent(event);
    this.blurHandler = () => this.onBlur();
    this.localPoint = new Vec2();
    this.hitPoint = new Vec2();
    this.transPoint = new Vec2();
    if (!target) {
      target = RendererInstance.get().canvas;
    }
    target.addEventListener("mousedown", this.mousedownHandler);
    target.addEventListener("mouseup", this.mouseupHandler);
    target.addEventListener("wheel", this.mousewheelHandler, { passive: false });
    target.addEventListener("contextmenu", this.contextmenuHandler);
    window.addEventListener("mouseup", this.mouseupHandler);
    window.addEventListener("mousemove", this.mousemoveHandler);
    window.addEventListener("blur", this.blurHandler);
    this.target = target;
  }
  onBlur() {
  }
  onMouseDown(event) {
    this.positionToPoint(event);
    this.primaryDown = event.button === 0;
    this.auxDown = event.button === 1;
    this.secondaryDown = event.button === 2;
    Emit(this, "pointerdown", this.localPoint.x, this.localPoint.y, event.button, event);
  }
  onMouseUp(event) {
    this.positionToPoint(event);
    this.primaryDown = !(event.button === 0);
    this.auxDown = !(event.button === 1);
    this.secondaryDown = !(event.button === 2);
    Emit(this, "pointerup", this.localPoint.x, this.localPoint.y, event.button, event);
  }
  onMouseMove(event) {
    this.positionToPoint(event);
    Emit(this, "pointermove", this.localPoint.x, this.localPoint.y, event);
  }
  onMouseWheel(event) {
    Emit(this, "wheel", event.deltaX, event.deltaY, event.deltaZ, event);
  }
  onContextMenuEvent(event) {
    if (this.blockContextMenu) {
      event.preventDefault();
    }
    Emit(this, "contextmenu", event);
  }
  positionToPoint(event) {
    return this.localPoint.set(event.offsetX, event.offsetY);
  }
  shutdown() {
    const target = this.target;
    target.removeEventListener("mousedown", this.mousedownHandler);
    target.removeEventListener("mouseup", this.mouseupHandler);
    target.removeEventListener("wheel", this.mousewheelHandler);
    target.removeEventListener("contextmenu", this.contextmenuHandler);
    window.removeEventListener("mouseup", this.mouseupHandler);
    window.removeEventListener("mousemove", this.mousemoveHandler);
    window.removeEventListener("blur", this.blurHandler);
  }
};

// src/input/SetInteractive.ts
function SetInteractive(...children) {
  children.forEach((child) => {
  });
  return children;
}

// src/loader/index.ts
var loader_exports = {};
__export(loader_exports, {
  File: () => File,
  Files: () => files_exports,
  Loader: () => Loader
});

// src/loader/files/index.ts
var files_exports = {};
__export(files_exports, {
  AtlasFile: () => AtlasFile,
  BinaryFile: () => BinaryFile,
  BitmapTextFile: () => BitmapTextFile,
  CSVFile: () => CSVFile,
  ImageFile: () => ImageFile,
  JSONFile: () => JSONFile,
  LoadAtlasFile: () => LoadAtlasFile,
  LoadBinaryFile: () => LoadBinaryFile,
  LoadBitmapTextFile: () => LoadBitmapTextFile,
  LoadCSVFile: () => LoadCSVFile,
  LoadImageFile: () => LoadImageFile,
  LoadJSONFile: () => LoadJSONFile,
  LoadOBJFile: () => LoadOBJFile,
  LoadSpriteSheetFile: () => LoadSpriteSheetFile,
  LoadTextureFile: () => LoadTextureFile,
  LoadXMLFile: () => LoadXMLFile,
  OBJFile: () => OBJFile,
  SpriteSheetFile: () => SpriteSheetFile,
  TextureFile: () => TextureFile,
  XMLFile: () => XMLFile
});

// src/loader/CreateFile.ts
function CreateFile(key, url, skipCache = false) {
  return {
    key,
    url,
    skipCache
  };
}

// src/loader/IsAbsoluteURI.ts
function IsAbsoluteURI(url) {
  return /^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/.test(url);
}

// src/loader/GetURL.ts
function GetURL(key, url, extension, loader) {
  if (!url) {
    url = `${key}.${extension}`;
  }
  if (IsAbsoluteURI(url)) {
    return url;
  } else if (loader) {
    return `${loader.baseURL}${loader.path}${url}`;
  } else {
    return url;
  }
}

// src/loader/RequestFile.ts
async function RequestFile(file, preload, onload, fileData) {
  if (!preload(file)) {
    return Promise.reject(file);
  }
  try {
    const request = new Request(file.url, fileData?.requestInit);
    file.response = await fetch(request);
    if (file.response.ok && await onload(file)) {
      return Promise.resolve(file);
    } else {
      return Promise.reject(file);
    }
  } catch (error) {
    file.error = error;
    return Promise.reject(file);
  }
}

// src/loader/files/ImageFile.ts
function ImageFile(key, url, fileData = {}) {
  return (loader) => {
    const file = CreateFile(key, GetURL(key, url, "png", loader), fileData?.skipCache);
    const textureManager = TextureManagerInstance.get();
    const preload = () => {
      return textureManager && (!textureManager.has(key) || !textureManager.get(key).locked);
    };
    const onload = async (file2) => {
      const blob = await file2.response.blob();
      let image;
      if (window && "createImageBitmap" in window && !fileData?.getImage) {
        image = await createImageBitmap(blob);
      } else {
        image = await new Promise((resolve, reject) => {
          const url2 = URL.createObjectURL(blob);
          const img = new Image();
          img.onload = () => {
            URL.revokeObjectURL(url2);
            resolve(img);
          };
          img.onerror = () => {
            reject();
          };
          img.src = url2;
          if (img.complete && img.width && img.height) {
            img.onload = null;
            img.onerror = null;
            resolve(img);
          }
        });
      }
      if (!image) {
        return false;
      }
      if (fileData.skipCache) {
        file2.data = image;
      } else if (textureManager.has(key)) {
        file2.data = textureManager.update(key, image, fileData?.glConfig);
      } else {
        file2.data = textureManager.add(key, image, fileData?.glConfig);
      }
      return true;
    };
    return RequestFile(file, preload, onload, fileData);
  };
}

// src/cache/Cache.ts
var caches = new Map();
var Cache = {
  get: (type) => {
    if (!caches.has(type)) {
      caches.set(type, new Map());
    }
    return caches.get(type);
  },
  getEntry: (cache, entry) => {
    if (caches.has(cache)) {
      return caches.get(cache).get(entry);
    }
  }
};

// src/loader/files/JSONFile.ts
function JSONFile(key, url, fileData = {}) {
  return (loader) => {
    const file = CreateFile(key, GetURL(key, url, "json", loader), fileData.skipCache);
    const cache = Cache.get("JSON");
    const preload = (file2) => {
      return cache && (!cache.has(key) || !file2.skipCache);
    };
    const onload = async (file2) => {
      file2.data = await file2.response.json();
      if (!file2.skipCache) {
        cache.set(key, file2.data);
      }
      return true;
    };
    return RequestFile(file, preload, onload, fileData);
  };
}

// src/loader/files/AtlasFile.ts
function AtlasFile(key, textureURL, atlasURL, fileData = {}) {
  return async (loader) => {
    try {
      const loadImage = ImageFile(key, textureURL, Object.assign({}, fileData, { skipCache: false }));
      const loadJSON = JSONFile(key, atlasURL, Object.assign({}, fileData, { skipCache: true }));
      const image = await loadImage(loader);
      const json = await loadJSON(loader);
      AtlasParser(GetTexture(key), json.data);
      return Promise.resolve(image);
    } catch (error) {
      return Promise.reject();
    }
  };
}

// src/loader/files/BinaryFile.ts
function BinaryFile(key, url, fileData = {}) {
  return (loader) => {
    const file = CreateFile(key, GetURL(key, url, "bin", loader), fileData.skipCache);
    const cache = Cache.get("Binary");
    const preload = (file2) => {
      return cache && (!cache.has(key) || !file2.skipCache);
    };
    const onload = async (file2) => {
      file2.data = await file2.response.arrayBuffer();
      if (!file2.skipCache) {
        cache.set(key, file2.data);
      }
      return true;
    };
    return RequestFile(file, preload, onload, fileData);
  };
}

// src/loader/files/XMLFile.ts
function XMLFile(key, url, fileData = {}) {
  return (loader) => {
    const file = CreateFile(key, GetURL(key, url, "xml", loader), fileData.skipCache);
    const cache = Cache.get("XML");
    const preload = (file2) => {
      return cache && (!cache.has(key) || !file2.skipCache);
    };
    const onload = async (file2) => {
      const data = await file2.response.text();
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
    };
    return RequestFile(file, preload, onload, fileData);
  };
}

// src/loader/files/BitmapTextFile.ts
function BitmapTextFile(key, textureURL, fontDataURL, fileData = {}) {
  return async (loader) => {
    try {
      const loadImage = ImageFile(key, textureURL, Object.assign({}, fileData, { skipCache: false }));
      const loadXML = XMLFile(key, fontDataURL, Object.assign({}, fileData, { skipCache: true }));
      const image = await loadImage(loader);
      const xml = await loadXML(loader);
      const texture = GetTexture(key);
      const fontData = BitmapTextParser(texture, xml.data);
      texture.data = fontData;
      return Promise.resolve(image);
    } catch (error) {
      return Promise.reject();
    }
  };
}

// src/loader/files/CSVFile.ts
function CSVFile(key, url, fileData = {}) {
  return (loader) => {
    const file = CreateFile(key, GetURL(key, url, "csv", loader), fileData.skipCache);
    const cache = Cache.get("CSV");
    const preload = (file2) => {
      return cache && (!cache.has(key) || !file2.skipCache);
    };
    const onload = async (file2) => {
      file2.data = await file2.response.text();
      if (!file2.skipCache) {
        cache.set(key, file2.data);
      }
      return true;
    };
    return RequestFile(file, preload, onload, fileData);
  };
}

// src/loader/files/LoadAtlasFile.ts
async function LoadAtlasFile(key, textureURL, atlasURL, fileData = {}) {
  const load = AtlasFile(key, textureURL, atlasURL, fileData);
  return load();
}

// src/loader/files/LoadBinaryFile.ts
async function LoadBinaryFile(key, url, fileData = {}) {
  const load = BinaryFile(key, url, fileData);
  return load();
}

// src/loader/files/LoadBitmapTextFile.ts
async function LoadBitmapTextFile(key, textureURL, fontDataURL, fileData = {}) {
  const load = BitmapTextFile(key, textureURL, fontDataURL, fileData);
  return load();
}

// src/loader/files/LoadCSVFile.ts
async function LoadCSVFile(key, url, fileData = {}) {
  const load = CSVFile(key, url, fileData);
  return load();
}

// src/loader/files/LoadImageFile.ts
async function LoadImageFile(key, url, fileData = {}) {
  const load = ImageFile(key, url, fileData);
  return load();
}

// src/loader/files/LoadJSONFile.ts
async function LoadJSONFile(key, url, fileData = {}) {
  const load = JSONFile(key, url, fileData);
  return load();
}

// src/loader/files/OBJFile.ts
function OBJFile(key, url, fileData = {}) {
  return (loader) => {
    const file = CreateFile(key, GetURL(key, url, "obj", loader), fileData.skipCache);
    const cache = Cache.get("OBJ");
    const preload = (file2) => {
      return cache && (!cache.has(key) || !file2.skipCache);
    };
    const onload = async (file2) => {
      file2.data = await file2.response.text();
      if (!file2.skipCache) {
        cache.set(key, file2.data);
      }
      return true;
    };
    return RequestFile(file, preload, onload, fileData);
  };
}

// src/loader/files/LoadOBJFile.ts
async function LoadOBJFile(key, url, fileData = {}) {
  const load = OBJFile(key, url, fileData);
  return load();
}

// src/loader/files/SpriteSheetFile.ts
function SpriteSheetFile(key, url, frameConfig, fileData = {}) {
  return async (loader) => {
    try {
      const load = ImageFile(key, url, Object.assign({}, fileData, { skipCache: false }));
      const file = await load(loader);
      const texture = GetTexture(key);
      if (texture) {
        SpriteSheetParser(texture, 0, 0, texture.width, texture.height, frameConfig);
      }
      return Promise.resolve(file);
    } catch (error) {
      return Promise.reject();
    }
  };
}

// src/loader/files/LoadSpriteSheetFile.ts
async function LoadSpriteSheetFile(key, url, frameConfig, fileData = {}) {
  const load = SpriteSheetFile(key, url, frameConfig, fileData);
  return load();
}

// src/renderer/webgl1/textures/GetCompressedTextureName.ts
function GetCompressedTextureName(baseFormat, format) {
  const renderer = WebGLRendererInstance.get();
  if (renderer) {
    const supportedFormats = renderer.compression[baseFormat.toUpperCase()];
    if (format in supportedFormats) {
      return supportedFormats[format];
    }
  }
}

// src/renderer/webgl1/textures/SupportsCompressedTexture.ts
function SupportsCompressedTexture(baseFormat, format) {
  const renderer = WebGLRendererInstance.get();
  if (renderer) {
    const supportedFormats = renderer.compression[baseFormat.toUpperCase()];
    if (supportedFormats) {
      if (format) {
        return format in supportedFormats;
      } else {
        return true;
      }
    }
  }
  return false;
}

// src/loader/files/TextureFile.ts
function TextureFile(key, urls, fileData = {}) {
  if (!fileData.glConfig) {
    fileData.glConfig = {};
  }
  const entry = {
    format: null,
    type: null,
    textureURL: null,
    atlasURL: null
  };
  for (const textureBaseFormat in urls) {
    if (SupportsCompressedTexture(textureBaseFormat)) {
      const urlEntry = urls[textureBaseFormat];
      if (typeof urlEntry === "string") {
        entry.textureURL = urlEntry;
      } else {
        Object.assign(entry, urlEntry);
      }
      entry.format = textureBaseFormat.toUpperCase();
      break;
    }
  }
  if (!entry) {
    console.warn(`TextureFile: ${key} = No supported format or IMG fallback`);
    return;
  }
  if (entry.format === "IMG") {
    if (entry.atlasURL) {
      return AtlasFile(key, entry.textureURL, entry.atlasURL, fileData);
    } else {
      return ImageFile(key, entry.textureURL, fileData);
    }
  }
  return async (loader) => {
    try {
      const loadImage = BinaryFile(key, entry.textureURL, Object.assign({}, fileData, { skipCache: true }));
      const image = await loadImage(loader);
      let json;
      if (entry.atlasURL) {
        const loadJSON = JSONFile(key, entry.atlasURL, Object.assign({}, fileData, { skipCache: true }));
        json = await loadJSON(loader);
      }
      if (!entry.type) {
        entry.type = image.url.endsWith(".ktx") ? "KTX" : "PVR";
      }
      let textureData;
      if (entry.type === "PVR") {
        textureData = PVRParser(image.data);
      } else if (entry.type === "KTX") {
        textureData = KTXParser(image.data);
      }
      if (textureData && SupportsCompressedTexture(entry.format, textureData.internalFormat)) {
        textureData.format = GetCompressedTextureName(entry.format, textureData.internalFormat);
        const texture = new Texture(null, textureData.width, textureData.height, Object.assign(fileData.glConfig, textureData));
        const textureManager = TextureManagerInstance.get();
        textureManager.add(key, texture);
        ProcessBindingQueue();
        if (json && json.data) {
          AtlasParser(texture, json.data);
        }
        return Promise.resolve(image);
      } else {
        return Promise.reject();
      }
    } catch (error) {
      return Promise.reject();
    }
  };
}

// src/loader/files/LoadTextureFile.ts
async function LoadTextureFile(key, urls, fileData = {}) {
  const load = TextureFile(key, urls, fileData);
  return load();
}

// src/loader/files/LoadXMLFile.ts
async function LoadXMLFile(key, url, fileData = {}) {
  const load = XMLFile(key, url, fileData);
  return load();
}

// src/loader/File.ts
var File = class {
  key;
  url;
  responseType = "text";
  crossOrigin = void 0;
  data;
  error;
  config;
  skipCache = false;
  hasLoaded = false;
  loader;
  load;
  constructor(key, url, config) {
    this.key = key;
    this.url = url;
    this.config = config;
  }
};

// src/loader/Loader.ts
var Loader = class extends EventEmitter {
  baseURL = "";
  path = "";
  crossOrigin = "anonymous";
  maxParallelDownloads = -1;
  isLoading = false;
  progress;
  queue;
  inflight;
  completed;
  onComplete;
  onError;
  constructor() {
    super();
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
};

// src/math/index.ts
var math_exports = {};
__export(math_exports, {
  Angle: () => angle_exports,
  Average: () => Average,
  Bernstein: () => Bernstein,
  Between: () => Between,
  Bezier: () => Bezier,
  CatmullRom: () => CatmullRom,
  CeilTo: () => CeilTo,
  Clamp: () => Clamp,
  DegToRad: () => DegToRad,
  Difference: () => Difference,
  Easing: () => easing_exports,
  Factorial: () => Factorial,
  FloatBetween: () => FloatBetween,
  FloorTo: () => FloorTo,
  FromPercent: () => FromPercent,
  Fuzzy: () => fuzzy_exports,
  GetSpeed: () => GetSpeed,
  Hermite: () => Hermite,
  Interpolation: () => interpolation_exports,
  Linear: () => Linear2,
  MATH_CONST: () => MATH_CONST,
  Matrix2D: () => mat2d_exports,
  Matrix4: () => mat4_exports,
  MaxAdd: () => MaxAdd,
  MinSub: () => MinSub,
  Percent: () => Percent,
  Pow2: () => pow2_exports,
  Quaternion: () => quaternion_exports,
  RadToDeg: () => RadToDeg,
  RoundAwayFromZero: () => RoundAwayFromZero,
  RoundTo: () => RoundTo,
  SinCosTableGenerator: () => SinCosTableGenerator,
  SmoothStep: () => SmoothStep,
  SmootherStep: () => SmootherStep,
  Snap: () => snap_exports,
  Vec2: () => vec2_exports,
  Vec3: () => vec3_exports,
  Vec4: () => vec4_exports,
  Within: () => Within,
  Wrap: () => Wrap
});

// src/math/angle/index.ts
var angle_exports = {};
__export(angle_exports, {
  AngleBetween: () => AngleBetween,
  AngleBetweenY: () => AngleBetweenY,
  CounterClockwise: () => CounterClockwise,
  NormalizeAngle: () => NormalizeAngle,
  ReverseAngle: () => ReverseAngle,
  RotateAngleTo: () => RotateAngleTo,
  ShortestAngleBetween: () => ShortestAngleBetween,
  WrapAngle: () => WrapAngle,
  WrapAngleDegrees: () => WrapAngleDegrees
});

// src/math/angle/AngleBetween.ts
function AngleBetween(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

// src/math/angle/AngleBetweenY.ts
function AngleBetweenY(x1, y1, x2, y2) {
  return Math.atan2(x2 - x1, y2 - y1);
}

// src/math/angle/CounterClockwise.ts
function CounterClockwise(angle) {
  if (angle > Math.PI) {
    angle -= MATH_CONST.PI2;
  }
  return Math.abs(((angle + MATH_CONST.HALF_PI) % MATH_CONST.PI2 - MATH_CONST.PI2) % MATH_CONST.PI2);
}

// src/math/angle/NormalizeAngle.ts
function NormalizeAngle(angle) {
  angle = angle % MATH_CONST.PI2;
  if (angle >= 0) {
    return angle;
  } else {
    return angle + MATH_CONST.PI2;
  }
}

// src/math/angle/ReverseAngle.ts
function ReverseAngle(angle) {
  return NormalizeAngle(angle + Math.PI);
}

// src/math/angle/RotateAngleTo.ts
function RotateAngleTo(currentAngle, targetAngle, lerp = 0.05) {
  if (currentAngle === targetAngle) {
    return currentAngle;
  }
  if (Math.abs(targetAngle - currentAngle) <= lerp || Math.abs(targetAngle - currentAngle) >= MATH_CONST.PI2 - lerp) {
    currentAngle = targetAngle;
  } else {
    if (Math.abs(targetAngle - currentAngle) > Math.PI) {
      if (targetAngle < currentAngle) {
        targetAngle += MATH_CONST.PI2;
      } else {
        targetAngle -= MATH_CONST.PI2;
      }
    }
    if (targetAngle > currentAngle) {
      currentAngle += lerp;
    } else if (targetAngle < currentAngle) {
      currentAngle -= lerp;
    }
  }
  return currentAngle;
}

// src/math/angle/ShortestAngleBetween.ts
function ShortestAngleBetween(angle1, angle2) {
  const difference = angle2 - angle1;
  if (difference === 0) {
    return 0;
  }
  const times = Math.floor((difference - -180) / 360);
  return difference - times * 360;
}

// src/math/angle/WrapAngle.ts
function WrapAngle(angle) {
  return Wrap(angle, -Math.PI, Math.PI);
}

// src/math/angle/WrapAngleDegrees.ts
function WrapAngleDegrees(angle) {
  return Wrap(angle, -180, 180);
}

// src/math/easing/index.ts
var easing_exports = {};
__export(easing_exports, {
  Back: () => back_exports,
  Bounce: () => bounce_exports,
  Circular: () => circular_exports,
  Cubic: () => cubic_exports,
  Elastic: () => elastic_exports,
  Expo: () => expo_exports,
  GetEase: () => GetEase_exports,
  Linear: () => Linear_exports,
  Quadratic: () => quadratic_exports,
  Quartic: () => quartic_exports,
  Quintic: () => quintic_exports,
  Sine: () => sine_exports,
  Stepped: () => Stepped_exports
});

// src/math/easing/back/index.ts
var back_exports = {};
__export(back_exports, {
  In: () => In,
  InOut: () => InOut,
  Out: () => Out
});

// src/math/easing/back/In.ts
function In(v, overshoot = 1.70158) {
  return v * v * ((overshoot + 1) * v - overshoot);
}

// src/math/easing/back/InOut.ts
function InOut(v, overshoot = 1.70158) {
  const s = overshoot * 1.525;
  if ((v *= 2) < 1) {
    return 0.5 * (v * v * ((s + 1) * v - s));
  } else {
    return 0.5 * ((v -= 2) * v * ((s + 1) * v + s) + 2);
  }
}

// src/math/easing/back/Out.ts
function Out(v, overshoot = 1.70158) {
  return --v * v * ((overshoot + 1) * v + overshoot) + 1;
}

// src/math/easing/bounce/index.ts
var bounce_exports = {};
__export(bounce_exports, {
  In: () => In2,
  InOut: () => InOut2,
  Out: () => Out2
});

// src/math/easing/bounce/In.ts
function In2(v) {
  v = 1 - v;
  if (v < 1 / 2.75) {
    return 1 - 7.5625 * v * v;
  } else if (v < 2 / 2.75) {
    return 1 - (7.5625 * (v -= 1.5 / 2.75) * v + 0.75);
  } else if (v < 2.5 / 2.75) {
    return 1 - (7.5625 * (v -= 2.25 / 2.75) * v + 0.9375);
  } else {
    return 1 - (7.5625 * (v -= 2.625 / 2.75) * v + 0.984375);
  }
}

// src/math/easing/bounce/InOut.ts
function InOut2(v) {
  let reverse = false;
  if (v < 0.5) {
    v = 1 - v * 2;
    reverse = true;
  } else {
    v = v * 2 - 1;
  }
  if (v < 1 / 2.75) {
    v = 7.5625 * v * v;
  } else if (v < 2 / 2.75) {
    v = 7.5625 * (v -= 1.5 / 2.75) * v + 0.75;
  } else if (v < 2.5 / 2.75) {
    v = 7.5625 * (v -= 2.25 / 2.75) * v + 0.9375;
  } else {
    v = 7.5625 * (v -= 2.625 / 2.75) * v + 0.984375;
  }
  if (reverse) {
    return (1 - v) * 0.5;
  } else {
    return v * 0.5 + 0.5;
  }
}

// src/math/easing/bounce/Out.ts
function Out2(v) {
  if (v < 1 / 2.75) {
    return 7.5625 * v * v;
  } else if (v < 2 / 2.75) {
    return 7.5625 * (v -= 1.5 / 2.75) * v + 0.75;
  } else if (v < 2.5 / 2.75) {
    return 7.5625 * (v -= 2.25 / 2.75) * v + 0.9375;
  } else {
    return 7.5625 * (v -= 2.625 / 2.75) * v + 0.984375;
  }
}

// src/math/easing/circular/index.ts
var circular_exports = {};
__export(circular_exports, {
  In: () => In3,
  InOut: () => InOut3,
  Out: () => Out3
});

// src/math/easing/circular/In.ts
function In3(v) {
  return 1 - Math.sqrt(1 - v * v);
}

// src/math/easing/circular/InOut.ts
function InOut3(v) {
  if ((v *= 2) < 1) {
    return -0.5 * (Math.sqrt(1 - v * v) - 1);
  } else {
    return 0.5 * (Math.sqrt(1 - (v -= 2) * v) + 1);
  }
}

// src/math/easing/circular/Out.ts
function Out3(v) {
  return Math.sqrt(1 - --v * v);
}

// src/math/easing/cubic/index.ts
var cubic_exports = {};
__export(cubic_exports, {
  In: () => In4,
  InOut: () => InOut4,
  Out: () => Out4
});

// src/math/easing/cubic/In.ts
function In4(v) {
  return v * v * v;
}

// src/math/easing/cubic/InOut.ts
function InOut4(v) {
  if ((v *= 2) < 1) {
    return 0.5 * v * v * v;
  } else {
    return 0.5 * ((v -= 2) * v * v + 2);
  }
}

// src/math/easing/cubic/Out.ts
function Out4(v) {
  return --v * v * v + 1;
}

// src/math/easing/elastic/index.ts
var elastic_exports = {};
__export(elastic_exports, {
  In: () => In5,
  InOut: () => InOut5,
  Out: () => Out5
});

// src/math/easing/elastic/In.ts
function In5(v, amplitude = 0.1, period = 0.1) {
  if (v === 0) {
    return 0;
  } else if (v === 1) {
    return 1;
  } else {
    let s = period / 4;
    if (amplitude < 1) {
      amplitude = 1;
    } else {
      s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
    }
    return -(amplitude * Math.pow(2, 10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period));
  }
}

// src/math/easing/elastic/InOut.ts
function InOut5(v, amplitude = 0.1, period = 0.1) {
  if (v === 0) {
    return 0;
  } else if (v === 1) {
    return 1;
  } else {
    let s = period / 4;
    if (amplitude < 1) {
      amplitude = 1;
    } else {
      s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
    }
    if ((v *= 2) < 1) {
      return -0.5 * (amplitude * Math.pow(2, 10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period));
    } else {
      return amplitude * Math.pow(2, -10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period) * 0.5 + 1;
    }
  }
}

// src/math/easing/elastic/Out.ts
function Out5(v, amplitude = 0.1, period = 0.1) {
  if (v === 0) {
    return 0;
  } else if (v === 1) {
    return 1;
  } else {
    let s = period / 4;
    if (amplitude < 1) {
      amplitude = 1;
    } else {
      s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
    }
    return amplitude * Math.pow(2, -10 * v) * Math.sin((v - s) * (2 * Math.PI) / period) + 1;
  }
}

// src/math/easing/expo/index.ts
var expo_exports = {};
__export(expo_exports, {
  In: () => In6,
  InOut: () => InOut6,
  Out: () => Out6
});

// src/math/easing/expo/In.ts
function In6(v) {
  return Math.pow(2, 10 * (v - 1)) - 1e-3;
}

// src/math/easing/expo/InOut.ts
function InOut6(v) {
  if (v == 0) {
    return 0;
  }
  if (v == 1) {
    return 1;
  }
  if ((v *= 2) < 1) {
    return 0.5 * Math.pow(2, 10 * (v - 1));
  } else {
    return 0.5 * (2 - Math.pow(2, -10 * (v - 1)));
  }
}

// src/math/easing/expo/Out.ts
function Out6(v) {
  return 1 - Math.pow(2, -10 * v);
}

// src/math/easing/GetEase.ts
var GetEase_exports = {};
__export(GetEase_exports, {
  GetEase: () => GetEase
});

// src/math/easing/quadratic/index.ts
var quadratic_exports = {};
__export(quadratic_exports, {
  In: () => In7,
  InOut: () => InOut7,
  Out: () => Out7
});

// src/math/easing/quadratic/In.ts
function In7(v) {
  return v * v;
}

// src/math/easing/quadratic/InOut.ts
function InOut7(v) {
  if ((v *= 2) < 1) {
    return 0.5 * v * v;
  } else {
    return -0.5 * (--v * (v - 2) - 1);
  }
}

// src/math/easing/quadratic/Out.ts
function Out7(v) {
  return v * (2 - v);
}

// src/math/easing/quartic/index.ts
var quartic_exports = {};
__export(quartic_exports, {
  In: () => In8,
  InOut: () => InOut8,
  Out: () => Out8
});

// src/math/easing/quartic/In.ts
function In8(v) {
  return v * v * v * v;
}

// src/math/easing/quartic/InOut.ts
function InOut8(v) {
  if ((v *= 2) < 1) {
    return 0.5 * v * v * v * v;
  } else {
    return -0.5 * ((v -= 2) * v * v * v - 2);
  }
}

// src/math/easing/quartic/Out.ts
function Out8(v) {
  return -(--v * v * v * v - 1);
}

// src/math/easing/quintic/index.ts
var quintic_exports = {};
__export(quintic_exports, {
  In: () => In9,
  InOut: () => InOut9,
  Out: () => Out9
});

// src/math/easing/quintic/In.ts
function In9(v) {
  return v * v * v * v * v;
}

// src/math/easing/quintic/InOut.ts
function InOut9(v) {
  if ((v *= 2) < 1) {
    return 0.5 * v * v * v * v * v;
  } else {
    return 0.5 * ((v -= 2) * v * v * v * v + 2);
  }
}

// src/math/easing/quintic/Out.ts
function Out9(v) {
  return (v = v - 1) * v * v * v * v + 1;
}

// src/math/easing/sine/index.ts
var sine_exports = {};
__export(sine_exports, {
  In: () => In10,
  InOut: () => InOut10,
  Out: () => Out10
});

// src/math/easing/sine/In.ts
function In10(v) {
  if (v === 0) {
    return 0;
  } else if (v === 1) {
    return 1;
  } else {
    return 1 - Math.cos(v * Math.PI / 2);
  }
}

// src/math/easing/sine/InOut.ts
function InOut10(v) {
  if (v === 0) {
    return 0;
  } else if (v === 1) {
    return 1;
  } else {
    return 0.5 * (1 - Math.cos(Math.PI * v));
  }
}

// src/math/easing/sine/Out.ts
function Out10(v) {
  if (v === 0) {
    return 0;
  } else if (v === 1) {
    return 1;
  } else {
    return Math.sin(v * Math.PI / 2);
  }
}

// src/math/easing/Linear.ts
var Linear_exports = {};
__export(Linear_exports, {
  Linear: () => Linear
});
function Linear(v) {
  return v;
}

// src/math/easing/Stepped.ts
var Stepped_exports = {};
__export(Stepped_exports, {
  Stepped: () => Stepped
});
function Stepped(v, steps = 1) {
  if (v <= 0) {
    return 0;
  } else if (v >= 1) {
    return 1;
  } else {
    return ((steps * v | 0) + 1) * (1 / steps);
  }
}

// src/math/easing/GetEase.ts
var EaseMap;
function GetEase(name) {
  if (!EaseMap) {
    EaseMap = new Map([
      ["power0", Linear],
      ["power1", Out7],
      ["power2", Out4],
      ["power3", Out8],
      ["power4", Out9],
      ["linear", Linear],
      ["quad", Out7],
      ["cubic", Out4],
      ["quart", Out8],
      ["quint", Out9],
      ["sine", Out10],
      ["expo", Out6],
      ["circ", Out3],
      ["elastic", Out5],
      ["back", Out],
      ["bounce", Out2],
      ["stepped", Stepped],
      ["quad.in", In7],
      ["cubic.in", In4],
      ["quart.in", In8],
      ["quint.in", In9],
      ["sine.in", In10],
      ["expo.in", In6],
      ["circ.in", In3],
      ["elastic.in", In5],
      ["back.in", In],
      ["bounce.in", In2],
      ["quad.out", Out7],
      ["cubic.out", Out4],
      ["quart.out", Out8],
      ["quint.out", Out9],
      ["sine.out", Out10],
      ["expo.out", Out6],
      ["circ.out", Out3],
      ["elastic.out", Out5],
      ["back.out", Out],
      ["bounce.out", Out2],
      ["quad.inout", InOut7],
      ["cubic.inout", InOut4],
      ["quart.inout", InOut8],
      ["quint.inout", InOut9],
      ["sine.inout", InOut10],
      ["expo.inout", InOut6],
      ["circ.inout", InOut3],
      ["elastic.inout", InOut5],
      ["back.inout", InOut],
      ["bounce.inout", InOut2]
    ]);
  }
  name = name.toLowerCase();
  name = name.replace("ease", "");
  if (EaseMap.has(name)) {
    return EaseMap.get(name);
  } else {
    return Linear;
  }
}

// src/math/fuzzy/index.ts
var fuzzy_exports = {};
__export(fuzzy_exports, {
  FuzzyCeil: () => FuzzyCeil,
  FuzzyEqual: () => FuzzyEqual,
  FuzzyFloor: () => FuzzyFloor,
  FuzzyGreaterThan: () => FuzzyGreaterThan,
  FuzzyLessThan: () => FuzzyLessThan
});

// src/math/fuzzy/FuzzyCeil.ts
function FuzzyCeil(value, epsilon = 1e-4) {
  return Math.ceil(value - epsilon);
}

// src/math/fuzzy/FuzzyEqual.ts
function FuzzyEqual(a, b, epsilon = 1e-4) {
  return Math.abs(a - b) < epsilon;
}

// src/math/fuzzy/FuzzyFloor.ts
function FuzzyFloor(value, epsilon = 1e-4) {
  return Math.floor(value + epsilon);
}

// src/math/fuzzy/FuzzyGreaterThan.ts
function FuzzyGreaterThan(a, b, epsilon = 1e-4) {
  return a > b - epsilon;
}

// src/math/fuzzy/FuzzyLessThan.ts
function FuzzyLessThan(a, b, epsilon = 1e-4) {
  return a < b + epsilon;
}

// src/math/interpolation/index.ts
var interpolation_exports = {};
__export(interpolation_exports, {
  BezierInterpolation: () => BezierInterpolation,
  CatmullRomInterpolation: () => CatmullRomInterpolation,
  CubicBezierInterpolation: () => CubicBezierInterpolation,
  LinearInterpolation: () => LinearInterpolation,
  QuadraticBezierInterpolation: () => QuadraticBezierInterpolation,
  SmoothStepInterpolation: () => SmoothStepInterpolation,
  SmootherStepInterpolation: () => SmootherStepInterpolation
});

// src/math/Factorial.ts
function Factorial(value) {
  if (value === 0) {
    return 1;
  }
  let res = value;
  while (--value) {
    res *= value;
  }
  return res;
}

// src/math/Bernstein.ts
function Bernstein(n, i) {
  return Factorial(n) / Factorial(i) / Factorial(n - i);
}

// src/math/interpolation/BezierInterpolation.ts
function BezierInterpolation(v, k) {
  let b = 0;
  const n = v.length - 1;
  for (let i = 0; i <= n; i++) {
    b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * Bernstein(n, i);
  }
  return b;
}

// src/math/CatmullRom.ts
function CatmullRom(t, p0, p1, p2, p3) {
  const v0 = (p2 - p0) * 0.5;
  const v1 = (p3 - p1) * 0.5;
  const t2 = t * t;
  const t3 = t * t2;
  return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
}

// src/math/interpolation/CatmullRomInterpolation.ts
function CatmullRomInterpolation(v, k) {
  const m = v.length - 1;
  let f = m * k;
  let i = Math.floor(f);
  if (v[0] === v[m]) {
    if (k < 0) {
      i = Math.floor(f = m * (1 + k));
    }
    return CatmullRom(f - i, v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m]);
  } else {
    if (k < 0) {
      return v[0] - (CatmullRom(-f, v[0], v[0], v[1], v[1]) - v[0]);
    }
    if (k > 1) {
      return v[m] - (CatmullRom(f - m, v[m], v[m], v[m - 1], v[m - 1]) - v[m]);
    }
    return CatmullRom(f - i, v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2]);
  }
}

// src/math/interpolation/CubicBezierInterpolation.ts
function P0(t, p) {
  const k = 1 - t;
  return k * k * k * p;
}
function P1(t, p) {
  const k = 1 - t;
  return 3 * k * k * t * p;
}
function P2(t, p) {
  return 3 * (1 - t) * t * t * p;
}
function P3(t, p) {
  return t * t * t * p;
}
function CubicBezierInterpolation(t, p0, p1, p2, p3) {
  return P0(t, p0) + P1(t, p1) + P2(t, p2) + P3(t, p3);
}

// src/math/Linear.ts
function Linear2(p0, p1, t) {
  return (p1 - p0) * t + p0;
}

// src/math/interpolation/LinearInterpolation.ts
function LinearInterpolation(v, k) {
  const m = v.length - 1;
  const f = m * k;
  const i = Math.floor(f);
  if (k < 0) {
    return Linear2(v[0], v[1], f);
  } else if (k > 1) {
    return Linear2(v[m], v[m - 1], m - f);
  } else {
    return Linear2(v[i], v[i + 1 > m ? m : i + 1], f - i);
  }
}

// src/math/interpolation/QuadraticBezierInterpolation.ts
function P02(t, p) {
  const k = 1 - t;
  return k * k * p;
}
function P12(t, p) {
  return 2 * (1 - t) * t * p;
}
function P22(t, p) {
  return t * t * p;
}
function QuadraticBezierInterpolation(t, p0, p1, p2) {
  return P02(t, p0) + P12(t, p1) + P22(t, p2);
}

// src/math/SmoothStep.ts
function SmoothStep(x, min, max) {
  if (x <= min) {
    return 0;
  }
  if (x >= max) {
    return 1;
  }
  x = (x - min) / (max - min);
  return x * x * (3 - 2 * x);
}

// src/math/interpolation/SmoothStepInterpolation.ts
function SmoothStepInterpolation(t, min, max) {
  return min + (max - min) * SmoothStep(t, 0, 1);
}

// src/math/SmootherStep.ts
function SmootherStep(x, min, max) {
  x = Math.max(0, Math.min(1, (x - min) / (max - min)));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

// src/math/interpolation/SmootherStepInterpolation.ts
function SmootherStepInterpolation(t, min, max) {
  return min + (max - min) * SmootherStep(t, 0, 1);
}

// src/math/mat2d/index.ts
var mat2d_exports = {};
__export(mat2d_exports, {
  GetMat2dDeterminant: () => GetMat2dDeterminant,
  GetMat2dFrobenius: () => GetMat2dFrobenius,
  Mat2dAdd: () => Mat2dAdd,
  Mat2dAppend: () => Mat2dAppend,
  Mat2dClone: () => Mat2dClone,
  Mat2dCopyFrom: () => Mat2dCopyFrom,
  Mat2dCopyToContext: () => Mat2dCopyToContext,
  Mat2dEquals: () => Mat2dEquals,
  Mat2dFromRotation: () => Mat2dFromRotation,
  Mat2dFromScaling: () => Mat2dFromScaling,
  Mat2dFromTranslation: () => Mat2dFromTranslation,
  Mat2dFuzzyEquals: () => Mat2dFuzzyEquals,
  Mat2dGlobalToLocal: () => Mat2dGlobalToLocal,
  Mat2dITRS: () => Mat2dITRS,
  Mat2dITRSS: () => Mat2dITRSS,
  Mat2dIdentity: () => Mat2dIdentity,
  Mat2dInvert: () => Mat2dInvert,
  Mat2dLocalToGlobal: () => Mat2dLocalToGlobal,
  Mat2dMultiply: () => Mat2dMultiply,
  Mat2dMultiplyScalar: () => Mat2dMultiplyScalar,
  Mat2dMultiplyScalarAndAdd: () => Mat2dMultiplyScalarAndAdd,
  Mat2dRotate: () => Mat2dRotate,
  Mat2dScale: () => Mat2dScale,
  Mat2dSetToContext: () => Mat2dSetToContext,
  Mat2dSkew: () => Mat2dSkew,
  Mat2dSubtract: () => Mat2dSubtract,
  Mat2dTranslate: () => Mat2dTranslate,
  Mat2dZero: () => Mat2dZero,
  Matrix2D: () => Matrix2D
});

// src/math/mat2d/GetMat2dDeterminant.ts
function GetMat2dDeterminant(src) {
  const { a, b, c, d } = src;
  return a * d - b * c;
}

// src/math/mat2d/GetMat2dFrobenius.ts
function GetMat2dFrobenius(src) {
  return Math.hypot(src.a, src.b, src.c, src.d, src.tx, src.ty, 1);
}

// src/math/mat2d/Matrix2D.ts
var Matrix2D = class {
  a;
  b;
  c;
  d;
  tx;
  ty;
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    this.set(a, b, c, d, tx, ty);
  }
  set(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
    return this;
  }
  identity() {
    return this.set();
  }
  toArray() {
    const { a, b, c, d, tx, ty } = this;
    return [a, b, c, d, tx, ty];
  }
  fromArray(src) {
    return this.set(src[0], src[1], src[2], src[3], src[4], src[5]);
  }
};

// src/math/mat2d/Mat2dAdd.ts
function Mat2dAdd(a, b, out = new Matrix2D()) {
  return out.set(a.a + b.a, a.b + b.b, a.c + b.c, a.d + b.d, a.tx + b.tx, a.ty + b.ty);
}

// src/math/mat2d/Mat2dAppend.ts
function Mat2dAppend(mat1, mat2, out = new Matrix2D()) {
  const { a: a1, b: b1, c: c1, d: d1, tx: tx1, ty: ty1 } = mat1;
  const { a: a2, b: b2, c: c2, d: d2, tx: tx2, ty: ty2 } = mat2;
  return out.set(a2 * a1 + b2 * c1, a2 * b1 + b2 * d1, c2 * a1 + d2 * c1, c2 * b1 + d2 * d1, tx2 * a1 + ty2 * c1 + tx1, tx2 * b1 + ty2 * d1 + ty1);
}

// src/math/mat2d/Mat2dClone.ts
function Mat2dClone(src) {
  return new Matrix2D(src.a, src.b, src.c, src.d, src.tx, src.ty);
}

// src/math/mat2d/Mat2dCopyFrom.ts
function Mat2dCopyFrom(src, target) {
  const { a, b, c, d, tx, ty } = src;
  return target.set(a, b, c, d, tx, ty);
}

// src/math/mat2d/Mat2dCopyToContext.ts
function Mat2dCopyToContext(src, context) {
  const { a, b, c, d, tx, ty } = src;
  context.transform(a, b, c, d, tx, ty);
  return context;
}

// src/math/mat2d/Mat2dEquals.ts
function Mat2dEquals(a, b) {
  return a.a === b.a && a.b === b.b && a.c === b.c && a.d === b.d && a.tx === b.tx && a.ty === b.ty;
}

// src/math/mat2d/Mat2dRotate.ts
function Mat2dRotate(target, angle, out = new Matrix2D()) {
  const { a, b, c, d, tx, ty } = target;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  return out.set(a * cos + c * sin, b * cos + d * sin, a * -sin + c * cos, b * -sin + d * cos, tx, ty);
}

// src/math/mat2d/Mat2dFromRotation.ts
function Mat2dFromRotation(angle) {
  const target = new Matrix2D();
  return Mat2dRotate(target, angle, target);
}

// src/math/mat2d/Mat2dScale.ts
function Mat2dScale(target, scaleX, scaleY, out = new Matrix2D()) {
  const { a, b, c, d, tx, ty } = target;
  return out.set(a * scaleX, b * scaleX, c * scaleY, d * scaleY, tx, ty);
}

// src/math/mat2d/Mat2dFromScaling.ts
function Mat2dFromScaling(scaleX, scaleY = scaleX) {
  const target = new Matrix2D();
  return Mat2dScale(target, scaleX, scaleY, target);
}

// src/math/mat2d/Mat2dTranslate.ts
function Mat2dTranslate(target, x, y, out = new Matrix2D()) {
  const { a, b, c, d, tx, ty } = target;
  out.tx = a * x + c * y + tx;
  out.ty = b * x + d * y + ty;
  return out;
}

// src/math/mat2d/Mat2dFromTranslation.ts
function Mat2dFromTranslation(x, y) {
  const target = new Matrix2D();
  return Mat2dTranslate(target, x, y, target);
}

// src/math/mat2d/Mat2dFuzzyEquals.ts
function Mat2dFuzzyEquals(a, b, epsilon = 1e-6) {
  const { a: a0, b: b0, c: c0, d: d0, tx: tx0, ty: ty0 } = a;
  const { a: a1, b: b1, c: c1, d: d1, tx: tx1, ty: ty1 } = b;
  return Math.abs(a0 - a1) <= epsilon * Math.max(1, Math.abs(a0), Math.abs(a1)) && Math.abs(b0 - b1) <= epsilon * Math.max(1, Math.abs(b0), Math.abs(b1)) && Math.abs(c0 - c1) <= epsilon * Math.max(1, Math.abs(c0), Math.abs(c1)) && Math.abs(d0 - d1) <= epsilon * Math.max(1, Math.abs(d0), Math.abs(d1)) && Math.abs(tx0 - tx1) <= epsilon * Math.max(1, Math.abs(tx0), Math.abs(tx1)) && Math.abs(ty0 - ty1) <= epsilon * Math.max(1, Math.abs(ty0), Math.abs(ty1));
}

// src/math/mat2d/Mat2dGlobalToLocal.ts
function Mat2dGlobalToLocal(mat, x, y, out = new Vec2()) {
  const { a, b, c, d, tx, ty } = mat;
  const id = 1 / (a * d + c * -b);
  return out.set(d * id * x + -c * id * y + (ty * c - tx * d) * id, a * id * y + -b * id * x + (-ty * a + tx * b) * id);
}

// src/math/mat2d/Mat2dITRS.ts
function Mat2dITRS(target, x, y, angle, scaleX, scaleY) {
  if (angle === 0) {
    return target.set(1, 0, 0, 1, x, y);
  } else {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    return target.set(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
  }
}

// src/math/mat2d/Mat2dITRSS.ts
function Mat2dITRSS(target, x, y, angle = 0, scaleX = 1, scaleY = 1, skewX = 0, skewY = 0) {
  if (angle === 0) {
    return target.set(1, 0, 0, 1, x, y);
  } else {
    return target.set(Math.cos(angle + skewY) * scaleX, Math.sin(angle + skewY) * scaleX, -Math.sin(angle - skewX) * scaleY, Math.cos(angle - skewX) * scaleY, x, y);
  }
}

// src/math/mat2d/Mat2dIdentity.ts
function Mat2dIdentity() {
  return new Matrix2D();
}

// src/math/mat2d/Mat2dInvert.ts
function Mat2dInvert(target, out = new Matrix2D()) {
  const { a, b, c, d, tx, ty } = target;
  let determinant = a * d - b * c;
  if (determinant) {
    determinant = 1 / determinant;
    out.set(d * determinant, -b * determinant, -c * determinant, a * determinant, (c * ty - d * tx) * determinant, (b * tx - a * ty) * determinant);
  }
  return out;
}

// src/math/mat2d/Mat2dLocalToGlobal.ts
function Mat2dLocalToGlobal(mat, x, y, out = new Vec2()) {
  const { a, b, c, d, tx, ty } = mat;
  return out.set(a * x + c * y + tx, b * x + d * y + ty);
}

// src/math/mat2d/Mat2dMultiply.ts
function Mat2dMultiply(target, src, out = new Matrix2D()) {
  const { a: a0, b: b0, c: c0, d: d0, tx: tx0, ty: ty0 } = target;
  const { a: a1, b: b1, c: c1, d: d1, tx: tx1, ty: ty1 } = src;
  return out.set(a0 * a1 + c0 * b1, b0 * a1 + d0 * b1, a0 * c1 + c0 * d1, b0 * c1 + d0 * d1, a0 * tx1 + c0 * ty1 + tx0, b0 * tx1 + d0 * ty1 + ty0);
}

// src/math/mat2d/Mat2dMultiplyScalar.ts
function Mat2dMultiplyScalar(target, scalar, out = new Matrix2D()) {
  const { a, b, c, d, tx, ty } = target;
  return out.set(a * scalar, b * scalar, c * scalar, d * scalar, tx * scalar, ty * scalar);
}

// src/math/mat2d/Mat2dMultiplyScalarAndAdd.ts
function Mat2dMultiplyScalarAndAdd(target, src, scalar, out = new Matrix2D()) {
  const { a, b, c, d, tx, ty } = src;
  const { a: ta, b: tb, c: tc, d: td, tx: ttx, ty: tty } = target;
  return out.set(ta + a * scalar, tb + b * scalar, tc + c * scalar, td + d * scalar, ttx + tx * scalar, tty + ty * scalar);
}

// src/math/mat2d/Mat2dSetToContext.ts
function Mat2dSetToContext(src, context) {
  const { a, b, c, d, tx, ty } = src;
  context.setTransform(a, b, c, d, tx, ty);
  return context;
}

// src/math/mat2d/Mat2dSkew.ts
function Mat2dSkew(target, angleX, angleY, out = new Matrix2D()) {
  const { a, b, c, d, tx, ty } = target;
  return out.set(a, b + Math.tan(angleX), c + Math.tan(angleY), d, tx, ty);
}

// src/math/mat2d/Mat2dSubtract.ts
function Mat2dSubtract(a, b, out = new Matrix2D()) {
  return out.set(a.a - b.a, a.b - b.b, a.c - b.c, a.d - b.d, a.tx - b.tx, a.ty - b.ty);
}

// src/math/mat2d/Mat2dZero.ts
function Mat2dZero(target) {
  return target.set(0, 0, 0, 0, 0, 0);
}

// src/math/mat4/index.ts
var mat4_exports = {};
__export(mat4_exports, {
  GetMat4Determinant: () => GetMat4Determinant,
  GetMat4Frobenius: () => GetMat4Frobenius,
  Mat4Add: () => Mat4Add,
  Mat4AddTranslationFromFloats: () => Mat4AddTranslationFromFloats,
  Mat4Adjoint: () => Mat4Adjoint,
  Mat4Clone: () => Mat4Clone,
  Mat4CopyFrom: () => Mat4CopyFrom,
  Mat4CopyPosition: () => Mat4CopyPosition,
  Mat4Equals: () => Mat4Equals,
  Mat4FromQuat: () => Mat4FromQuat,
  Mat4FromRotation: () => Mat4FromRotation,
  Mat4FromRotationTranslation: () => Mat4FromRotationTranslation,
  Mat4FromRotationTranslationScale: () => Mat4FromRotationTranslationScale,
  Mat4FromRotationTranslationScaleOrigin: () => Mat4FromRotationTranslationScaleOrigin,
  Mat4FromRotationXYTranslation: () => Mat4FromRotationXYTranslation,
  Mat4FromScaling: () => Mat4FromScaling,
  Mat4FromTranslation: () => Mat4FromTranslation,
  Mat4FromXRotation: () => Mat4FromXRotation,
  Mat4FromYRotation: () => Mat4FromYRotation,
  Mat4FromZRotation: () => Mat4FromZRotation,
  Mat4Frustum: () => Mat4Frustum,
  Mat4GetRotation: () => Mat4GetRotation,
  Mat4GetScaling: () => Mat4GetScaling,
  Mat4GetTranslation: () => Mat4GetTranslation,
  Mat4Identity: () => Mat4Identity,
  Mat4Invert: () => Mat4Invert,
  Mat4LookAt: () => Mat4LookAt,
  Mat4Multiply: () => Mat4Multiply,
  Mat4MultiplyScalar: () => Mat4MultiplyScalar,
  Mat4MultiplyScalarAndAdd: () => Mat4MultiplyScalarAndAdd,
  Mat4Ortho: () => Mat4Ortho,
  Mat4Perspective: () => Mat4Perspective,
  Mat4PerspectiveFromFieldOfView: () => Mat4PerspectiveFromFieldOfView,
  Mat4Rotate: () => Mat4Rotate,
  Mat4RotateX: () => Mat4RotateX,
  Mat4RotateY: () => Mat4RotateY,
  Mat4RotateZ: () => Mat4RotateZ,
  Mat4Scale: () => Mat4Scale,
  Mat4SetTranslation: () => Mat4SetTranslation,
  Mat4SetTranslationFromFloats: () => Mat4SetTranslationFromFloats,
  Mat4Subtract: () => Mat4Subtract,
  Mat4TargetTo: () => Mat4TargetTo,
  Mat4Translate: () => Mat4Translate,
  Mat4TranslateFromFloats: () => Mat4TranslateFromFloats,
  Mat4Transpose: () => Mat4Transpose,
  Mat4Zero: () => Mat4Zero,
  Matrix4: () => Matrix4
});

// src/math/mat4/GetMat4Determinant.ts
function GetMat4Determinant(matrix2) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33] = matrix2.data;
  const det22x33 = m22 * m33 - m32 * m23;
  const det21x33 = m21 * m33 - m31 * m23;
  const det21x32 = m21 * m32 - m31 * m22;
  const det20x33 = m20 * m33 - m30 * m23;
  const det20x32 = m20 * m32 - m22 * m30;
  const det20x31 = m20 * m31 - m30 * m21;
  const cofact00 = +(m11 * det22x33 - m12 * det21x33 + m13 * det21x32);
  const cofact01 = -(m10 * det22x33 - m12 * det20x33 + m13 * det20x32);
  const cofact02 = +(m10 * det21x33 - m11 * det20x33 + m13 * det20x31);
  const cofact03 = -(m10 * det21x32 - m11 * det20x32 + m12 * det20x31);
  return m00 * cofact00 + m01 * cofact01 + m02 * cofact02 + m03 * cofact03;
}

// src/math/mat4/GetMat4Frobenius.ts
function GetMat4Frobenius(matrix2) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33] = matrix2.data;
  return Math.hypot(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
}

// src/math/mat4/Mat4Add.ts
function Mat4Add(a, b, out = new Matrix4()) {
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = a.data;
  const [b00, b01, b02, b03, b10, b11, b12, b13, b20, b21, b22, b23, b30, b31, b32, b33] = b.data;
  return out.set(a00 + b00, a01 + b01, a02 + b02, a03 + b03, a10 + b10, a11 + b11, a12 + b12, a13 + b13, a20 + b20, a21 + b21, a22 + b22, a23 + b23, a30 + b30, a31 + b31, a32 + b32, a33 + b33);
}

// src/math/mat4/Mat4AddTranslationFromFloats.ts
function Mat4AddTranslationFromFloats(matrix2, x, y, z) {
  const data = matrix2.data;
  data[12] += x;
  data[13] += y;
  data[14] += z;
  matrix2.onChange(matrix2);
  return matrix2;
}

// src/math/mat4/Mat4Adjoint.ts
function Mat4Adjoint(matrix2, out = new Matrix4()) {
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = matrix2.data;
  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;
  return out.set(a11 * b11 - a12 * b10 + a13 * b09, a02 * b10 - a01 * b11 - a03 * b09, a31 * b05 - a32 * b04 + a33 * b03, a22 * b04 - a21 * b05 - a23 * b03, a12 * b08 - a10 * b11 - a13 * b07, a00 * b11 - a02 * b08 + a03 * b07, a32 * b02 - a30 * b05 - a33 * b01, a20 * b05 - a22 * b02 + a23 * b01, a10 * b10 - a11 * b08 + a13 * b06, a01 * b08 - a00 * b10 - a03 * b06, a30 * b04 - a31 * b02 + a33 * b00, a21 * b02 - a20 * b04 - a23 * b00, a11 * b07 - a10 * b09 - a12 * b06, a00 * b09 - a01 * b07 + a02 * b06, a31 * b01 - a30 * b03 - a32 * b00, a20 * b03 - a21 * b01 + a22 * b00);
}

// src/math/mat4/Mat4Clone.ts
function Mat4Clone(src) {
  return new Matrix4(src);
}

// src/math/mat4/Mat4CopyFrom.ts
function Mat4CopyFrom(src, dest) {
  return dest.fromArray(src.data);
}

// src/math/mat4/Mat4CopyPosition.ts
function Mat4CopyPosition(src, dest) {
  const srcData = src.data;
  const destData = dest.data;
  destData[12] = srcData[12];
  destData[13] = srcData[13];
  destData[14] = srcData[14];
  dest.onChange(dest);
  return dest;
}

// src/math/mat4/Mat4Equals.ts
function Mat4Equals(a, b) {
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = a.data;
  const [b00, b01, b02, b03, b10, b11, b12, b13, b20, b21, b22, b23, b30, b31, b32, b33] = b.data;
  return a00 === b00 && a01 === b01 && a02 === b02 && a03 === b03 && a10 === b10 && a11 === b11 && a12 === b12 && a13 === b13 && a20 === b20 && a21 === b21 && a22 === b22 && a23 === b23 && a30 === b30 && a31 === b31 && a32 === b32 && a33 === b33;
}

// src/math/mat4/Mat4FromQuat.ts
function Mat4FromQuat(q, out = new Matrix4()) {
  const { x, y, z, w } = q;
  const x2 = x + x;
  const y2 = y + y;
  const z2 = z + z;
  const xx = x * x2;
  const yx = y * x2;
  const yy = y * y2;
  const zx = z * x2;
  const zy = z * y2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;
  return out.set(1 - yy - zz, yx + wz, zx - wy, 0, yx - wz, 1 - xx - zz, zy + wx, 0, zx + wy, zy - wx, 1 - xx - yy, 0, 0, 0, 0, 1);
}

// src/math/mat4/Mat4FromRotation.ts
function Mat4FromRotation(angle, axis, out = new Matrix4()) {
  let { x, y, z } = axis;
  let len = Math.hypot(x, y, z);
  if (len < 1e-5) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  const t = 1 - c;
  return out.set(x * x * t + c, y * x * t + z * s, z * x * t - y * s, 0, x * y * t - z * s, y * y * t + c, z * y * t + x * s, 0, x * z * t + y * s, y * z * t - x * s, z * z * t + c, 0, 0, 0, 0, 1);
}

// src/math/mat4/Mat4FromRotationTranslation.ts
function Mat4FromRotationTranslation(q, v, out = new Matrix4()) {
  const { x, y, z, w } = q;
  const x2 = x + x;
  const y2 = y + y;
  const z2 = z + z;
  const xx = x * x2;
  const xy = x * y2;
  const xz = x * z2;
  const yy = y * y2;
  const yz = y * z2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;
  const { x: vx, y: vy, z: vz } = v;
  return out.set(1 - (yy + zz), xy + wz, xz - wy, 0, xy - wz, 1 - (xx + zz), yz + wx, 0, xz + wy, yz - wx, 1 - (xx + yy), 0, vx, vy, vz, 1);
}

// src/math/mat4/Mat4FromRotationTranslationScale.ts
function Mat4FromRotationTranslationScale(q, v, s, out = new Matrix4()) {
  const { x, y, z, w } = q;
  const x2 = x + x;
  const y2 = y + y;
  const z2 = z + z;
  const xx = x * x2;
  const xy = x * y2;
  const xz = x * z2;
  const yy = y * y2;
  const yz = y * z2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;
  const { x: sx, y: sy, z: sz } = s;
  const { x: vx, y: vy, z: vz } = v;
  return out.set((1 - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0, (xy - wz) * sy, (1 - (xx + zz)) * sy, (yz + wx) * sy, 0, (xz + wy) * sz, (yz - wx) * sz, (1 - (xx + yy)) * sz, 0, vx, vy, vz, 1);
}

// src/math/mat4/Mat4FromRotationTranslationScaleOrigin.ts
function Mat4FromRotationTranslationScaleOrigin(q, v, s, o, out = new Matrix4()) {
  const { x, y, z, w } = q;
  const x2 = x + x;
  const y2 = y + y;
  const z2 = z + z;
  const xx = x * x2;
  const xy = x * y2;
  const xz = x * z2;
  const yy = y * y2;
  const yz = y * z2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;
  const { x: sx, y: sy, z: sz } = s;
  const { x: ox, y: oy, z: oz } = o;
  const { x: vx, y: vy, z: vz } = v;
  const out0 = (1 - (yy + zz)) * sx;
  const out1 = (xy + wz) * sx;
  const out2 = (xz - wy) * sx;
  const out4 = (xy - wz) * sy;
  const out5 = (1 - (xx + zz)) * sy;
  const out6 = (yz + wx) * sy;
  const out8 = (xz + wy) * sz;
  const out9 = (yz - wx) * sz;
  const out10 = (1 - (xx + yy)) * sz;
  return out.set(out0, out1, out2, 0, out4, out5, out6, 0, out8, out9, out10, 0, vx + ox - (out0 * ox + out4 * oy + out8 * oz), vy + oy - (out1 * ox + out5 * oy + out9 * oz), vz + oz - (out2 * ox + out6 * oy + out10 * oz), 1);
}

// src/math/mat4/Mat4FromRotationXYTranslation.ts
function Mat4FromRotationXYTranslation(rotation, position, translateFirst = true, out = new Matrix4()) {
  const { x, y, z } = position;
  const sx = Math.sin(rotation.x);
  const cx = Math.cos(rotation.x);
  const sy = Math.sin(rotation.y);
  const cy = Math.cos(rotation.y);
  let a30 = x;
  let a31 = y;
  let a32 = z;
  const b21 = -sx;
  const c01 = 0 - b21 * sy;
  const c02 = 0 - cx * sy;
  const c21 = b21 * cy;
  const c22 = cx * cy;
  if (!translateFirst) {
    a30 = cy * x + sy * z;
    a31 = c01 * x + cx * y + c21 * z;
    a32 = c02 * x + sx * y + c22 * z;
  }
  return out.set(cy, c01, c02, 0, 0, cx, sx, 0, sy, c21, c22, 0, a30, a31, a32, 1);
}

// src/math/mat4/Mat4FromScaling.ts
function Mat4FromScaling(vec3, out = new Matrix4()) {
  const { x, y, z } = vec3;
  return out.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
}

// src/math/mat4/Mat4FromTranslation.ts
function Mat4FromTranslation(vec3, out = new Matrix4()) {
  const { x, y, z } = vec3;
  return out.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1);
}

// src/math/mat4/Mat4FromXRotation.ts
function Mat4FromXRotation(angle, out = new Matrix4()) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return out.set(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1);
}

// src/math/mat4/Mat4FromYRotation.ts
function Mat4FromYRotation(angle, out = new Matrix4()) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return out.set(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
}

// src/math/mat4/Mat4FromZRotation.ts
function Mat4FromZRotation(angle, out = new Matrix4()) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return out.set(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
}

// src/math/mat4/Mat4Frustum.ts
function Mat4Frustum(left, right, bottom, top, near, far, out = new Matrix4()) {
  const rl = 1 / (right - left);
  const tb = 1 / (top - bottom);
  const nf = 1 / (near - far);
  return out.set(near * 2 * rl, 0, 0, 0, 0, near * 2 * tb, 0, 0, (right + left) * rl, (top + bottom) * tb, (far + near) * nf, -1, 0, 0, far * near * 2 * nf, 0);
}

// src/math/vec3/Vec3.ts
var Vec3 = class {
  x;
  y;
  z;
  constructor(x = 0, y = 0, z = 0) {
    this.set(x, y, z);
  }
  set(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  toArray(dst = [], index = 0) {
    const { x, y, z } = this;
    dst[index] = x;
    dst[index + 1] = y;
    dst[index + 2] = z;
    return dst;
  }
  fromArray(src, index = 0) {
    return this.set(src[index], src[index + 1], src[index + 2]);
  }
  toString() {
    const { x, y, z } = this;
    return `{ x=${x}, y=${y}, z=${z} }`;
  }
};

// src/math/mat4/Mat4GetScaling.ts
function Mat4GetScaling(matrix2, out = new Vec3()) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22] = matrix2.data;
  return out.set(Math.hypot(m00, m01, m02), Math.hypot(m10, m11, m12), Math.hypot(m20, m21, m22));
}

// src/math/quaternion/Quaternion.ts
var Quaternion = class {
  _x;
  _y;
  _z;
  _w;
  onChange;
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
    this.onChange = NOOP;
  }
  set(x = 0, y = 0, z = 0, w = 1) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
    this.onChange(this);
    return this;
  }
  set x(value) {
    const prev = this._x;
    this._x = value;
    if (value !== prev) {
      this.onChange(this);
    }
  }
  get x() {
    return this._x;
  }
  set y(value) {
    const prev = this._y;
    this._y = value;
    if (value !== prev) {
      this.onChange(this);
    }
  }
  get y() {
    return this._y;
  }
  set z(value) {
    const prev = this._z;
    this._z = value;
    if (value !== prev) {
      this.onChange(this);
    }
  }
  get z() {
    return this._z;
  }
  set w(value) {
    const prev = this._w;
    this._w = value;
    if (value !== prev) {
      this.onChange(this);
    }
  }
  get w() {
    return this._w;
  }
  toArray(dst = [], index = 0) {
    const { x, y, z, w } = this;
    dst[index] = x;
    dst[index + 1] = y;
    dst[index + 2] = z;
    dst[index + 3] = w;
    return dst;
  }
  fromArray(src, index = 0) {
    return this.set(src[index], src[index + 1], src[index + 2], src[index + 3]);
  }
  destroy() {
    this.onChange = NOOP;
  }
  toString() {
    const { x, y, z, w } = this;
    return `{ x=${x}, y=${y}, z=${z}, w=${w} }`;
  }
};

// src/math/mat4/Mat4GetRotation.ts
function Mat4GetRotation(matrix2, out = new Quaternion()) {
  const scaling = Mat4GetScaling(matrix2);
  const is1 = 1 / scaling.x;
  const is2 = 1 / scaling.y;
  const is3 = 1 / scaling.z;
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22] = matrix2.data;
  const sm11 = m00 * is1;
  const sm12 = m01 * is2;
  const sm13 = m02 * is3;
  const sm21 = m10 * is1;
  const sm22 = m11 * is2;
  const sm23 = m12 * is3;
  const sm31 = m20 * is1;
  const sm32 = m21 * is2;
  const sm33 = m22 * is3;
  const trace = sm11 + sm22 + sm33;
  let S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1) * 2;
    return out.set((sm23 - sm32) / S, (sm31 - sm13) / S, (sm12 - sm21) / S, 0.25 * S);
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
    return out.set(0.25 * S, (sm12 + sm21) / S, (sm31 + sm13) / S, (sm23 - sm32) / S);
  } else if (sm22 > sm33) {
    S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
    return out.set((sm12 + sm21) / S, 0.25 * S, (sm23 + sm32) / S, (sm31 - sm13) / S);
  } else {
    S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
    return out.set((sm31 + sm13) / S, (sm23 + sm32) / S, 0.25 * S, (sm12 - sm21) / S);
  }
}

// src/math/mat4/Mat4GetTranslation.ts
function Mat4GetTranslation(matrix2, out = new Vec3()) {
  const data = matrix2.data;
  return out.set(data[12], data[13], data[14]);
}

// src/math/mat4/Mat4Identity.ts
function Mat4Identity(matrix2 = new Matrix4()) {
  return matrix2.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
}

// src/math/mat4/Mat4Invert.ts
function Mat4Invert(matrix2, out = new Matrix4()) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33] = matrix2.data;
  const det22x33 = m22 * m33 - m32 * m23;
  const det21x33 = m21 * m33 - m31 * m23;
  const det21x32 = m21 * m32 - m31 * m22;
  const det20x33 = m20 * m33 - m30 * m23;
  const det20x32 = m20 * m32 - m22 * m30;
  const det20x31 = m20 * m31 - m30 * m21;
  const cofact00 = +(m11 * det22x33 - m12 * det21x33 + m13 * det21x32);
  const cofact01 = -(m10 * det22x33 - m12 * det20x33 + m13 * det20x32);
  const cofact02 = +(m10 * det21x33 - m11 * det20x33 + m13 * det20x31);
  const cofact03 = -(m10 * det21x32 - m11 * det20x32 + m12 * det20x31);
  const det = m00 * cofact00 + m01 * cofact01 + m02 * cofact02 + m03 * cofact03;
  if (det === 0) {
    return out;
  }
  const detInv = 1 / det;
  const det12x33 = m12 * m33 - m32 * m13;
  const det11x33 = m11 * m33 - m31 * m13;
  const det11x32 = m11 * m32 - m31 * m12;
  const det10x33 = m10 * m33 - m30 * m13;
  const det10x32 = m10 * m32 - m30 * m12;
  const det10x31 = m10 * m31 - m30 * m11;
  const det12x23 = m12 * m23 - m22 * m13;
  const det11x23 = m11 * m23 - m21 * m13;
  const det11x22 = m11 * m22 - m21 * m12;
  const det10x23 = m10 * m23 - m20 * m13;
  const det10x22 = m10 * m22 - m20 * m12;
  const det10x21 = m10 * m21 - m20 * m11;
  const cofact10 = -(m01 * det22x33 - m02 * det21x33 + m03 * det21x32);
  const cofact11 = +(m00 * det22x33 - m02 * det20x33 + m03 * det20x32);
  const cofact12 = -(m00 * det21x33 - m01 * det20x33 + m03 * det20x31);
  const cofact13 = +(m00 * det21x32 - m01 * det20x32 + m02 * det20x31);
  const cofact20 = +(m01 * det12x33 - m02 * det11x33 + m03 * det11x32);
  const cofact21 = -(m00 * det12x33 - m02 * det10x33 + m03 * det10x32);
  const cofact22 = +(m00 * det11x33 - m01 * det10x33 + m03 * det10x31);
  const cofact23 = -(m00 * det11x32 - m01 * det10x32 + m02 * det10x31);
  const cofact30 = -(m01 * det12x23 - m02 * det11x23 + m03 * det11x22);
  const cofact31 = +(m00 * det12x23 - m02 * det10x23 + m03 * det10x22);
  const cofact32 = -(m00 * det11x23 - m01 * det10x23 + m03 * det10x21);
  const cofact33 = +(m00 * det11x22 - m01 * det10x22 + m02 * det10x21);
  return out.set(cofact00 * detInv, cofact10 * detInv, cofact20 * detInv, cofact30 * detInv, cofact01 * detInv, cofact11 * detInv, cofact21 * detInv, cofact31 * detInv, cofact02 * detInv, cofact12 * detInv, cofact22 * detInv, cofact32 * detInv, cofact03 * detInv, cofact13 * detInv, cofact23 * detInv, cofact33 * detInv);
}

// src/math/mat4/Mat4LookAt.ts
function Mat4LookAt(eye, center, up, out = new Matrix4()) {
  const { x: eyex, y: eyey, z: eyez } = eye;
  const { x: upx, y: upy, z: upz } = up;
  const { x: centerx, y: centery, z: centerz } = center;
  if (Math.abs(eyex - centerx) < 1e-5 && Math.abs(eyey - centery) < 1e-5 && Math.abs(eyez - centerz) < 1e-5) {
    return Mat4Identity(out);
  }
  let z0 = eyex - centerx;
  let z1 = eyey - centery;
  let z2 = eyez - centerz;
  let len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  let x0 = upy * z2 - upz * z1;
  let x1 = upz * z0 - upx * z2;
  let x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }
  let y0 = z1 * x2 - z2 * x1;
  let y1 = z2 * x0 - z0 * x2;
  let y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }
  return out.set(x0, y0, z0, 0, x1, y1, z1, 0, x2, y2, z2, 0, -(x0 * eyex + x1 * eyey + x2 * eyez), -(y0 * eyex + y1 * eyey + y2 * eyez), -(z0 * eyex + z1 * eyey + z2 * eyez), 1);
}

// src/math/mat4/Mat4Multiply.ts
function Mat4Multiply(a, b, out = new Matrix4()) {
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = a.data;
  const [b00, b01, b02, b03, b10, b11, b12, b13, b20, b21, b22, b23, b30, b31, b32, b33] = b.data;
  return out.set(b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30, b01 * a01 + b01 * a11 + b02 * a21 + b03 * a31, b02 * a02 + b01 * a12 + b02 * a22 + b03 * a32, b03 * a03 + b01 * a13 + b02 * a23 + b03 * a33, b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30, b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31, b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32, b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33, b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30, b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31, b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32, b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33, b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30, b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31, b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32, b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33);
}

// src/math/mat4/Mat4MultiplyScalar.ts
function Mat4MultiplyScalar(matrix2, scalar, out = new Matrix4()) {
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = matrix2.data;
  return out.set(a00 * scalar, a01 * scalar, a02 * scalar, a03 * scalar, a10 * scalar, a11 * scalar, a12 * scalar, a13 * scalar, a20 * scalar, a21 * scalar, a22 * scalar, a23 * scalar, a30 * scalar, a31 * scalar, a32 * scalar, a33 * scalar);
}

// src/math/mat4/Mat4MultiplyScalarAndAdd.ts
function Mat4MultiplyScalarAndAdd(a, b, scalar, out = new Matrix4()) {
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = a.data;
  const [b00, b01, b02, b03, b10, b11, b12, b13, b20, b21, b22, b23, b30, b31, b32, b33] = b.data;
  return out.set(a00 + b00 * scalar, a01 + b01 * scalar, a02 + b02 * scalar, a03 + b03 * scalar, a10 + b10 * scalar, a11 + b11 * scalar, a12 + b12 * scalar, a13 + b13 * scalar, a20 + b20 * scalar, a21 + b21 * scalar, a22 + b22 * scalar, a23 + b23 * scalar, a30 + b30 * scalar, a31 + b31 * scalar, a32 + b32 * scalar, a33 + b33 * scalar);
}

// src/math/mat4/Mat4Perspective.ts
function Mat4Perspective(fovY, aspect, near, far, out = new Matrix4()) {
  const f = 1 / Math.tan(fovY / 2);
  let m22 = -1;
  let m32 = -2 * near;
  if (far !== null && far !== Infinity) {
    const nf = 1 / (near - far);
    m22 = (far + near) * nf;
    m32 = 2 * far * near * nf;
  }
  return out.set(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, m22, -1, 0, 0, m32, 0);
}

// src/math/mat4/Mat4PerspectiveFromFieldOfView.ts
function Mat4PerspectiveFromFieldOfView(fov, near, far, out = new Matrix4()) {
  const upTan = Math.tan(fov.upDegrees * Math.PI / 180);
  const downTan = Math.tan(fov.downDegrees * Math.PI / 180);
  const leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
  const rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
  const xScale = 2 / (leftTan + rightTan);
  const yScale = 2 / (upTan + downTan);
  return out.set(xScale, 0, 0, 0, 0, yScale, 0, 0, -((leftTan - rightTan) * xScale * 0.5), (upTan - downTan) * yScale * 0.5, far / (near - far), -1, 0, 0, far * near / (near - far), 0);
}

// src/math/mat4/Mat4Rotate.ts
function Mat4Rotate(matrix2, angle, axis, out = new Matrix4()) {
  let { x, y, z } = axis;
  let len = Math.hypot(x, y, z);
  if (len < 1e-5) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  const t = 1 - c;
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = matrix2.data;
  const b00 = x * x * t + c;
  const b01 = y * x * t + z * s;
  const b02 = z * x * t - y * s;
  const b10 = x * y * t - z * s;
  const b11 = y * y * t + c;
  const b12 = z * y * t + x * s;
  const b20 = x * z * t + y * s;
  const b21 = y * z * t - x * s;
  const b22 = z * z * t + c;
  return out.set(a00 * b00 + a10 * b01 + a20 * b02, a01 * b00 + a11 * b01 + a21 * b02, a02 * b00 + a12 * b01 + a22 * b02, a03 * b00 + a13 * b01 + a23 * b02, a00 * b10 + a10 * b11 + a20 * b12, a01 * b10 + a11 * b11 + a21 * b12, a02 * b10 + a12 * b11 + a22 * b12, a03 * b10 + a13 * b11 + a23 * b12, a00 * b20 + a10 * b21 + a20 * b22, a01 * b20 + a11 * b21 + a21 * b22, a02 * b20 + a12 * b21 + a22 * b22, a03 * b20 + a13 * b21 + a23 * b22, a30, a31, a32, a33);
}

// src/math/mat4/Mat4RotateX.ts
function Mat4RotateX(matrix2, angle, out = new Matrix4()) {
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = matrix2.data;
  return out.set(a00, a01, a02, a03, a10 * c + a20 * s, a11 * c + a21 * s, a12 * c + a22 * s, a13 * c + a23 * s, a20 * c - a10 * s, a21 * c - a11 * s, a22 * c - a12 * s, a23 * c - a13 * s, a30, a31, a32, a33);
}

// src/math/mat4/Mat4RotateY.ts
function Mat4RotateY(matrix2, angle, out = new Matrix4()) {
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = matrix2.data;
  return out.set(a00 * c - a20 * s, a01 * c - a21 * s, a02 * c - a22 * s, a03 * c - a23 * s, a10, a11, a12, a13, a00 * s + a20 * c, a01 * s + a21 * c, a02 * s + a22 * c, a03 * s + a23 * c, a30, a31, a32, a33);
}

// src/math/mat4/Mat4RotateZ.ts
function Mat4RotateZ(matrix2, angle, out = new Matrix4()) {
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = matrix2.data;
  return out.set(a00 * c + a10 * s, a01 * c + a11 * s, a02 * c + a12 * s, a03 * c + a13 * s, a10 * c - a00 * s, a11 * c - a01 * s, a12 * c - a02 * s, a13 * c - a03 * s, a20, a21, a22, a23, a30, a31, a32, a33);
}

// src/math/mat4/Mat4Scale.ts
function Mat4Scale(matrix2, v, out = new Matrix4()) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33] = matrix2.data;
  const { x, y, z } = v;
  return out.set(m00 * x, m01 * x, m02 * x, m03 * x, m10 * y, m11 * y, m12 * y, m13 * y, m20 * z, m21 * z, m22 * z, m23 * z, m30, m31, m32, m33);
}

// src/math/mat4/Mat4SetTranslation.ts
function Mat4SetTranslation(matrix2, vec3) {
  const data = matrix2.data;
  const { x, y, z } = vec3;
  data[12] = x;
  data[13] = y;
  data[14] = z;
  matrix2.onChange(matrix2);
  return matrix2;
}

// src/math/mat4/Mat4SetTranslationFromFloats.ts
function Mat4SetTranslationFromFloats(matrix2, x, y, z) {
  const data = matrix2.data;
  data[12] = x;
  data[13] = y;
  data[14] = z;
  matrix2.onChange(matrix2);
  return matrix2;
}

// src/math/mat4/Mat4Subtract.ts
function Mat4Subtract(a, b, out = new Matrix4()) {
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = a.data;
  const [b00, b01, b02, b03, b10, b11, b12, b13, b20, b21, b22, b23, b30, b31, b32, b33] = b.data;
  return out.set(a00 - b00, a01 - b01, a02 - b02, a03 - b03, a10 - b10, a11 - b11, a12 - b12, a13 - b13, a20 - b20, a21 - b21, a22 - b22, a23 - b23, a30 - b30, a31 - b31, a32 - b32, a33 - b33);
}

// src/math/mat4/Mat4TargetTo.ts
function Mat4TargetTo(eye, target, up, out = new Matrix4()) {
  const { x: eyex, y: eyey, z: eyez } = eye;
  const { x: upx, y: upy, z: upz } = up;
  const { x: targetx, y: targety, z: targetz } = target;
  let z0 = eyex - targetx;
  let z1 = eyey - targety;
  let z2 = eyez - targetz;
  let len = z0 * z0 + z1 * z1 + z2 * z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }
  let x0 = upy * z2 - upz * z1;
  let x1 = upz * z0 - upx * z2;
  let x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }
  return out.set(x0, x1, x2, 0, z1 * x2 - z2 * x1, z2 * x0 - z0 * x2, z0 * x1 - z1 * x0, 0, z0, z1, z2, 0, eyex, eyey, eyez, 1);
}

// src/math/mat4/Mat4Translate.ts
function Mat4Translate(matrix2, vec3, out = new Matrix4()) {
  const { x, y, z } = vec3;
  const data = matrix2.data;
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = data;
  if (matrix2 === out) {
    data[12] = a00 * x + a10 * y + a20 * z + a30;
    data[13] = a01 * x + a11 * y + a21 * z + a31;
    data[14] = a02 * x + a12 * y + a22 * z + a32;
    data[15] = a03 * x + a13 * y + a23 * z + a33;
  } else {
    out.set(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a00 * x + a10 * y + a20 * z + a30, a01 * x + a11 * y + a21 * z + a31, a02 * x + a12 * y + a22 * z + a32, a03 * x + a13 * y + a23 * z + a33);
  }
  return out;
}

// src/math/mat4/Mat4TranslateFromFloats.ts
function Mat4TranslateFromFloats(matrix2, x, y, z, out = new Matrix4()) {
  const data = matrix2.data;
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = data;
  if (matrix2 === out) {
    data[12] = a00 * x + a10 * y + a20 * z + a30;
    data[13] = a01 * x + a11 * y + a21 * z + a31;
    data[14] = a02 * x + a12 * y + a22 * z + a32;
    data[15] = a03 * x + a13 * y + a23 * z + a33;
  } else {
    out.set(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a00 * x + a10 * y + a20 * z + a30, a01 * x + a11 * y + a21 * z + a31, a02 * x + a12 * y + a22 * z + a32, a03 * x + a13 * y + a23 * z + a33);
  }
  return out;
}

// src/math/mat4/Mat4Transpose.ts
function Mat4Transpose(matrix2, out = new Matrix4()) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33] = matrix2.data;
  return out.set(m00, m10, m20, m30, m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33);
}

// src/math/mat4/Mat4Zero.ts
function Mat4Zero(matrix2) {
  return matrix2.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
}

// src/math/pow2/index.ts
var pow2_exports = {};
__export(pow2_exports, {
  GetPowerOfTwo: () => GetPowerOfTwo,
  IsSizePowerOfTwo: () => IsSizePowerOfTwo,
  IsValuePowerOfTwo: () => IsValuePowerOfTwo
});

// src/math/pow2/GetPowerOfTwo.ts
function GetPowerOfTwo(value) {
  const index = Math.log(value) / 0.6931471805599453;
  return 1 << Math.ceil(index);
}

// src/math/pow2/IsValuePowerOfTwo.ts
function IsValuePowerOfTwo(value) {
  return value > 0 && (value & value - 1) === 0;
}

// src/math/quaternion/index.ts
var quaternion_exports = {};
__export(quaternion_exports, {
  GetQuatAngle: () => GetQuatAngle,
  GetQuatAngleTo: () => GetQuatAngleTo,
  GetQuatAreClose: () => GetQuatAreClose,
  GetQuatAxisAngle: () => GetQuatAxisAngle,
  GetQuatLength: () => GetQuatLength,
  GetQuatLengthSquared: () => GetQuatLengthSquared,
  QuatAdd: () => QuatAdd,
  QuatAddScalar: () => QuatAddScalar,
  QuatClone: () => QuatClone,
  QuatConjugate: () => QuatConjugate,
  QuatCopyFrom: () => QuatCopyFrom,
  QuatDot: () => QuatDot,
  QuatEquals: () => QuatEquals,
  QuatFromEulerAngles: () => QuatFromEulerAngles,
  QuatFromEulerVector: () => QuatFromEulerVector,
  QuatFromRotationAxis: () => QuatFromRotationAxis,
  QuatFromRotationMatrix: () => QuatFromRotationMatrix,
  QuatFuzzyEquals: () => QuatFuzzyEquals,
  QuatHermite: () => QuatHermite,
  QuatInvert: () => QuatInvert,
  QuatMultiply: () => QuatMultiply,
  QuatMultiplyByFloats: () => QuatMultiplyByFloats,
  QuatNormalize: () => QuatNormalize,
  QuatRotateTowards: () => QuatRotateTowards,
  QuatRotateX: () => QuatRotateX,
  QuatRotateY: () => QuatRotateY,
  QuatRotateZ: () => QuatRotateZ,
  QuatRotationAlphaBetaGamma: () => QuatRotationAlphaBetaGamma,
  QuatRotationYawPitchRoll: () => QuatRotationYawPitchRoll,
  QuatScale: () => QuatScale,
  QuatScaleAndAdd: () => QuatScaleAndAdd,
  QuatSetAxisAngle: () => QuatSetAxisAngle,
  QuatSetFromUnitVectors: () => QuatSetFromUnitVectors,
  QuatSlerp: () => QuatSlerp,
  QuatSubtract: () => QuatSubtract,
  QuatSubtractScalar: () => QuatSubtractScalar,
  QuatToEulerAngles: () => QuatToEulerAngles,
  QuatZero: () => QuatZero,
  Quaternion: () => Quaternion
});

// src/math/quaternion/QuatDot.ts
function QuatDot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
}

// src/math/quaternion/GetQuatAngle.ts
function GetQuatAngle(a, b) {
  const dot = QuatDot(a, b);
  return Math.acos(2 * dot * dot - 1);
}

// src/math/quaternion/GetQuatAngleTo.ts
function GetQuatAngleTo(a, b) {
  return 2 * Math.acos(Math.abs(Clamp(QuatDot(a, b), -1, 1)));
}

// src/math/quaternion/GetQuatAreClose.ts
function GetQuatAreClose(a, b) {
  return QuatDot(a, b) >= 0;
}

// src/math/quaternion/GetQuatAxisAngle.ts
function GetQuatAxisAngle(a, out = new Quaternion()) {
  const rad = Math.acos(a.w) * 2;
  const s = Math.sin(rad / 2);
  const epsilon = 1e-6;
  if (s > epsilon) {
    out.set(a.x / s, a.y / s, a.z / s);
  } else {
    out.set(1, 0, 0);
  }
  return rad;
}

// src/math/quaternion/GetQuatLength.ts
function GetQuatLength(a) {
  const { x, y, z, w } = a;
  return Math.sqrt(x * x + y * y + z * z + w * w);
}

// src/math/quaternion/GetQuatLengthSquared.ts
function GetQuatLengthSquared(a) {
  const { x, y, z, w } = a;
  return x * x + y * y + z * z + w * w;
}

// src/math/quaternion/QuatAdd.ts
function QuatAdd(a, b, out = new Quaternion()) {
  return out.set(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}

// src/math/quaternion/QuatAddScalar.ts
function QuatAddScalar(a, scalar, out = new Quaternion()) {
  return out.set(a.x + scalar, a.y + scalar, a.z + scalar, a.w + scalar);
}

// src/math/quaternion/QuatClone.ts
function QuatClone(source) {
  const { x, y, z, w } = source;
  return new Quaternion(x, y, z, w);
}

// src/math/quaternion/QuatConjugate.ts
function QuatConjugate(a, out = new Quaternion()) {
  const { x, y, z, w } = a;
  return out.set(x * -1, y * -1, z * -1, w);
}

// src/math/quaternion/QuatCopyFrom.ts
function QuatCopyFrom(source, dest) {
  const { x, y, z, w } = source;
  return dest.set(x, y, z, w);
}

// src/math/quaternion/QuatEquals.ts
function QuatEquals(a, b) {
  return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
}

// src/math/quaternion/QuatRotationYawPitchRoll.ts
function QuatRotationYawPitchRoll(yaw, pitch, roll, out = new Quaternion()) {
  const halfRoll = roll * 0.5;
  const halfPitch = pitch * 0.5;
  const halfYaw = yaw * 0.5;
  const sinRoll = Math.sin(halfRoll);
  const cosRoll = Math.cos(halfRoll);
  const sinPitch = Math.sin(halfPitch);
  const cosPitch = Math.cos(halfPitch);
  const sinYaw = Math.sin(halfYaw);
  const cosYaw = Math.cos(halfYaw);
  return out.set(cosYaw * sinPitch * cosRoll + sinYaw * cosPitch * sinRoll, sinYaw * cosPitch * cosRoll - cosYaw * sinPitch * sinRoll, cosYaw * cosPitch * sinRoll - sinYaw * sinPitch * cosRoll, cosYaw * cosPitch * cosRoll + sinYaw * sinPitch * sinRoll);
}

// src/math/quaternion/QuatFromEulerAngles.ts
function QuatFromEulerAngles(x, y, z, out = new Quaternion()) {
  return QuatRotationYawPitchRoll(y, x, z, out);
}

// src/math/quaternion/QuatFromEulerVector.ts
function QuatFromEulerVector(v, out = new Quaternion()) {
  return QuatRotationYawPitchRoll(v.y, v.x, v.z, out);
}

// src/math/vec3/Vec3Normalize.ts
function Vec3Normalize(a, out = new Vec3()) {
  const { x, y, z } = a;
  let len = x * x + y * y + z * z;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  return out.set(x * len, y * len, z * len);
}

// src/math/quaternion/QuatFromRotationAxis.ts
function QuatFromRotationAxis(axis, angle, out = new Quaternion()) {
  const sin = Math.sin(angle / 2);
  Vec3Normalize(axis, axis);
  const { x, y, z } = axis;
  return out.set(x * sin, y * sin, z * sin, Math.cos(angle / 2));
}

// src/math/quaternion/QuatFromRotationMatrix.ts
function QuatFromRotationMatrix(matrix2, out = new Quaternion()) {
  const [m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33] = matrix2.data;
  const trace = m11 + m22 + m33;
  let s;
  if (trace > 0) {
    s = 0.5 / Math.sqrt(trace + 1);
    return out.set((m32 - m23) * s, (m13 - m31) * s, (m21 - m12) * s, 0.25 / s);
  } else if (m11 > m22 && m11 > m33) {
    s = 2 * Math.sqrt(1 + m11 - m22 - m33);
    return out.set(0.25 * s, (m12 + m21) / s, (m13 + m31) / s, (m32 - m23) / s);
  } else if (m22 > m33) {
    s = 2 * Math.sqrt(1 + m22 - m11 - m33);
    return out.set((m12 + m21) / s, 0.25 * s, (m23 + m32) / s, (m13 - m31) / s);
  } else {
    s = 2 * Math.sqrt(1 + m33 - m11 - m22);
    return out.set((m13 + m31) / s, (m23 + m32) / s, 0.25 * s, (m21 - m12) / s);
  }
}

// src/math/quaternion/QuatFuzzyEquals.ts
function QuatFuzzyEquals(a, b, epsilon = 1e-4) {
  return FuzzyEqual(a.x, b.x, epsilon) && FuzzyEqual(a.y, b.y, epsilon) && FuzzyEqual(a.z, b.z, epsilon) && FuzzyEqual(a.w, b.w, epsilon);
}

// src/math/Hermite.ts
function Hermite(a, b, c, d, t) {
  const squared = t * t;
  const factor1 = squared * (2 * t - 3) + 1;
  const factor2 = squared * (t - 2) + t;
  const factor3 = squared * (t - 1);
  const factor4 = squared * (3 - 2 * t);
  return a * factor1 + b * factor2 + c * factor3 + d * factor4;
}

// src/math/quaternion/QuatHermite.ts
function QuatHermite(a, b, c, d, t, out = new Quaternion()) {
  return out.set(Hermite(t, a.x, b.x, c.x, d.x), Hermite(t, a.y, b.y, c.y, d.y), Hermite(t, a.z, b.z, c.z, d.z), Hermite(t, a.w, b.w, c.w, d.w));
}

// src/math/quaternion/QuatInvert.ts
function QuatInvert(a, out = new Quaternion()) {
  const { x, y, z, w } = a;
  const dot = x * x + y * y + z * z + w * w;
  const invDot = dot ? 1 / dot : 0;
  return out.set(-x * invDot, -y * invDot, -z * invDot, w * invDot);
}

// src/math/quaternion/QuatMultiply.ts
function QuatMultiply(a, b, out = new Quaternion()) {
  const { x: ax, y: ay, z: az, w: aw } = a;
  const { x: bx, y: by, z: bz, w: bw } = b;
  return out.set(ax * bw + aw * bx + ay * bz - az * by, ay * bw + aw * by + az * bx - ax * bz, az * bw + aw * bz + ax * by - ay * bx, aw * bw - ax * bx - ay * by - az * bz);
}

// src/math/quaternion/QuatMultiplyByFloats.ts
function QuatMultiplyByFloats(a, x, y, z, w, out = new Quaternion()) {
  return out.set(a.x * x, a.y * y, a.z * z, a.w * w);
}

// src/math/quaternion/QuatScale.ts
function QuatScale(a, scalar, out = new Quaternion()) {
  const { x, y, z, w } = a;
  return out.set(x * scalar, y * scalar, z * scalar, w * scalar);
}

// src/math/quaternion/QuatNormalize.ts
function QuatNormalize(a, out = new Quaternion()) {
  const length = GetQuatLength(a);
  if (length === 0) {
    return out.set(0, 0, 0, 1);
  } else {
    return QuatScale(a, length, out);
  }
}

// src/math/quaternion/QuatSlerp.ts
function QuatSlerp(a, b, t, out = new Quaternion()) {
  if (t === 0) {
    return QuatCopyFrom(a, out);
  } else if (t === 1) {
    return QuatCopyFrom(b, out);
  }
  const { x, y, z, w } = a;
  const { x: bx, y: by, z: bz, w: bw } = b;
  let cosHalfTheta = w * bw + x * bx + y * by + z * bz;
  if (cosHalfTheta < 0) {
    out.set(-bx, -by, -bz, -bw);
    cosHalfTheta = -cosHalfTheta;
  } else {
    QuatCopyFrom(b, out);
  }
  if (cosHalfTheta >= 1) {
    return out.set(x, y, z, w);
  }
  const sqrSinHalfTheta = 1 - cosHalfTheta * cosHalfTheta;
  if (sqrSinHalfTheta <= Number.EPSILON) {
    const s = 1 - t;
    out.set(s * x + t * out.x, s * y + t * out.y, s * z + t * out.z, s * w + t * out.w);
    return QuatNormalize(out, out);
  }
  const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
  const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
  const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
  const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
  return out.set(x * ratioA + out.x * ratioB, y * ratioA + out.y * ratioB, z * ratioA + out.z * ratioB, w * ratioA + out.w * ratioB);
}

// src/math/quaternion/QuatRotateTowards.ts
function QuatRotateTowards(a, b, step, out = new Quaternion()) {
  const angle = GetQuatAngle(a, b);
  if (angle === 0) {
    return QuatCopyFrom(a, out);
  }
  const t = Math.min(1, step / angle);
  return QuatSlerp(a, b, t, out);
}

// src/math/quaternion/QuatRotateX.ts
function QuatRotateX(a, angle, out = new Quaternion()) {
  angle *= 0.5;
  const { x, y, z, w } = a;
  const bx = Math.sin(angle);
  const bw = Math.cos(angle);
  return out.set(x * bw + w * bx, y * bw + z * bx, z * bw - y * bx, w * bw - x * bx);
}

// src/math/quaternion/QuatRotateY.ts
function QuatRotateY(a, angle, out = new Quaternion()) {
  angle *= 0.5;
  const { x, y, z, w } = a;
  const by = Math.sin(angle);
  const bw = Math.cos(angle);
  return out.set(x * bw - z * by, y * bw + w * by, z * bw + x * by, w * bw - y * by);
}

// src/math/quaternion/QuatRotateZ.ts
function QuatRotateZ(a, angle, out = new Quaternion()) {
  angle *= 0.5;
  const { x, y, z, w } = a;
  const bz = Math.sin(angle);
  const bw = Math.cos(angle);
  return out.set(x * bw + y * bz, y * bw - x * bz, z * bw + w * bz, w * bw - z * bz);
}

// src/math/quaternion/QuatRotationAlphaBetaGamma.ts
function QuatRotationAlphaBetaGamma(alpha, beta, gamma, out = new Quaternion()) {
  const halfGammaPlusAlpha = (gamma + alpha) * 0.5;
  const halfGammaMinusAlpha = (gamma - alpha) * 0.5;
  const halfBeta = beta * 0.5;
  return out.set(Math.cos(halfGammaMinusAlpha) * Math.sin(halfBeta), Math.sin(halfGammaMinusAlpha) * Math.sin(halfBeta), Math.sin(halfGammaPlusAlpha) * Math.cos(halfBeta), Math.cos(halfGammaPlusAlpha) * Math.cos(halfBeta));
}

// src/math/quaternion/QuatScaleAndAdd.ts
function QuatScaleAndAdd(a, b, scalar, out = new Quaternion()) {
  return out.set(a.x + b.x * scalar, a.y + b.y * scalar, a.z + b.z * scalar, a.w + b.w * scalar);
}

// src/math/quaternion/QuatSetAxisAngle.ts
function QuatSetAxisAngle(axis, angle, out = new Quaternion()) {
  const { x, y, z } = axis;
  angle *= 0.5;
  const s = Math.sin(angle);
  return out.set(x * s, y * s, z * s, Math.cos(angle));
}

// src/math/vec3/Vec3Dot.ts
function Vec3Dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

// src/math/quaternion/QuatSetFromUnitVectors.ts
function QuatSetFromUnitVectors(a, from, to, out = new Quaternion()) {
  const { x: fx, y: fy, z: fz } = from;
  const { x: tx, y: ty, z: tz } = to;
  const epsilon = 1e-6;
  let r = Vec3Dot(from, to) + 1;
  if (r < epsilon) {
    r = 0;
    if (Math.abs(fx) > Math.abs(fz)) {
      return out.set(-fy, fx, 0, r);
    } else {
      return out.set(0, -fz, fy, r);
    }
  } else {
    return out.set(fy * tz - fz * ty, fz * tx - fx * tz, fx * ty - fy * tx, r);
  }
}

// src/math/quaternion/QuatSubtract.ts
function QuatSubtract(a, b, out = new Quaternion()) {
  return out.set(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}

// src/math/quaternion/QuatSubtractScalar.ts
function QuatSubtractScalar(a, scalar, out = new Quaternion()) {
  const { x, y, z, w } = a;
  return out.set(x - scalar, y - scalar, z - scalar, w - scalar);
}

// src/math/quaternion/QuatToEulerAngles.ts
function QuatToEulerAngles(q, out = new Vec3()) {
  const { x, y, z, w } = q;
  const sqw = w * w;
  const sqz = z * z;
  const sqx = x * x;
  const sqy = y * y;
  const zAxisY = y * z - x * w;
  const limit = 0.4999999;
  if (zAxisY < -limit) {
    return out.set(Math.PI / 2, 2 * Math.atan2(y, w), 0);
  } else if (zAxisY > limit) {
    return out.set(-Math.PI / 2, 2 * Math.atan2(y, w), 0);
  } else {
    return out.set(Math.asin(-2 * (z * y - x * w)), Math.atan2(2 * (z * x + y * w), sqz - sqx - sqy + sqw), Math.atan2(2 * (x * y + z * w), -sqz - sqx + sqy + sqw));
  }
}

// src/math/quaternion/QuatZero.ts
function QuatZero() {
  return new Quaternion(0, 0, 0, 0);
}

// src/math/snap/index.ts
var snap_exports = {};
__export(snap_exports, {
  SnapCeil: () => SnapCeil,
  SnapFloor: () => SnapFloor,
  SnapTo: () => SnapTo
});

// src/math/snap/SnapCeil.ts
function SnapCeil(value, gap, start = 0, divide = false) {
  if (gap === 0) {
    return value;
  }
  value -= start;
  value = gap * Math.ceil(value / gap);
  return divide ? (start + value) / gap : start + value;
}

// src/math/snap/SnapFloor.ts
function SnapFloor(value, gap, start = 0, divide = false) {
  if (gap === 0) {
    return value;
  }
  value -= start;
  value = gap * Math.floor(value / gap);
  return divide ? (start + value) / gap : start + value;
}

// src/math/snap/SnapTo.ts
function SnapTo(value, gap, start = 0, divide = false) {
  if (gap === 0) {
    return value;
  }
  value -= start;
  value = gap * Math.round(value / gap);
  return divide ? (start + value) / gap : start + value;
}

// src/math/vec2/index.ts
var vec2_exports = {};
__export(vec2_exports, {
  GetChebyshevDistance: () => GetChebyshevDistance,
  GetDistanceFromSegment: () => GetDistanceFromSegment,
  GetVec2Angle: () => GetVec2Angle,
  GetVec2AngleY: () => GetVec2AngleY,
  GetVec2Distance: () => GetVec2Distance,
  GetVec2DistancePower: () => GetVec2DistancePower,
  GetVec2DistanceSquared: () => GetVec2DistanceSquared,
  GetVec2Length: () => GetVec2Length,
  GetVec2LengthSquared: () => GetVec2LengthSquared,
  GetVec2ManhattanDistance: () => GetVec2ManhattanDistance,
  GetVec2ManhattanLength: () => GetVec2ManhattanLength,
  Vec2: () => Vec2,
  Vec2Abs: () => Vec2Abs,
  Vec2Add: () => Vec2Add,
  Vec2AddScalar: () => Vec2AddScalar,
  Vec2Bezier: () => Vec2Bezier,
  Vec2Callback: () => Vec2Callback,
  Vec2CatmullRom: () => Vec2CatmullRom,
  Vec2Ceil: () => Vec2Ceil,
  Vec2Center: () => Vec2Center,
  Vec2Clamp: () => Vec2Clamp,
  Vec2ClampScalar: () => Vec2ClampScalar,
  Vec2Clone: () => Vec2Clone,
  Vec2CopyFrom: () => Vec2CopyFrom,
  Vec2Cross: () => Vec2Cross,
  Vec2Divide: () => Vec2Divide,
  Vec2DivideScalar: () => Vec2DivideScalar,
  Vec2Dot: () => Vec2Dot,
  Vec2Equals: () => Vec2Equals,
  Vec2Floor: () => Vec2Floor,
  Vec2Fract: () => Vec2Fract,
  Vec2FromArray: () => Vec2FromArray,
  Vec2FromGridIndex: () => Vec2FromGridIndex,
  Vec2FromTransform: () => Vec2FromTransform,
  Vec2FuzzyEquals: () => Vec2FuzzyEquals,
  Vec2Hermite: () => Vec2Hermite,
  Vec2Inverse: () => Vec2Inverse,
  Vec2Lerp: () => Vec2Lerp,
  Vec2Limit: () => Vec2Limit,
  Vec2Max: () => Vec2Max,
  Vec2Min: () => Vec2Min,
  Vec2Multiply: () => Vec2Multiply,
  Vec2MultiplyByFloats: () => Vec2MultiplyByFloats,
  Vec2Negate: () => Vec2Negate,
  Vec2Normalize: () => Vec2Normalize,
  Vec2One: () => Vec2One,
  Vec2PerpDot: () => Vec2PerpDot,
  Vec2Random: () => Vec2Random,
  Vec2Rotate: () => Vec2Rotate,
  Vec2Round: () => Vec2Round,
  Vec2RoundToZero: () => Vec2RoundToZero,
  Vec2Scale: () => Vec2Scale,
  Vec2ScaleAndAdd: () => Vec2ScaleAndAdd,
  Vec2SetLength: () => Vec2SetLength,
  Vec2Subtract: () => Vec2Subtract,
  Vec2SubtractScalar: () => Vec2SubtractScalar,
  Vec2ToArray: () => Vec2ToArray,
  Vec2Transform: () => Vec2Transform,
  Vec2TransformMat2d: () => Vec2TransformMat2d,
  Vec2TransformMat4: () => Vec2TransformMat4,
  Vec2Zero: () => Vec2Zero
});

// src/math/vec2/GetChebyshevDistance.ts
function GetChebyshevDistance(a, b) {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

// src/math/vec2/Vec2Add.ts
function Vec2Add(a, b, out = new Vec2()) {
  return out.set(a.x + b.x, a.y + b.y);
}

// src/math/vec2/Vec2Dot.ts
function Vec2Dot(a, b) {
  return a.x * b.x + a.y * b.y;
}

// src/math/vec2/Vec2MultiplyByFloats.ts
function Vec2MultiplyByFloats(a, x, y, out = new Vec2()) {
  return out.set(a.x * x, a.y * y);
}

// src/math/vec2/Vec2Subtract.ts
function Vec2Subtract(a, b, out = new Vec2()) {
  return out.set(a.x - b.x, a.y - b.y);
}

// src/math/vec2/GetDistanceFromSegment.ts
function GetDistanceFromSegment(p, a, b) {
  const d = GetVec2DistanceSquared(a, b);
  if (d === 0) {
    return GetVec2Distance(p, a);
  }
  const v = Vec2Subtract(b, a);
  Vec2Subtract(p, a, p);
  const t = Math.max(0, Math.min(1, Vec2Dot(p, v) / 12));
  const proj = Vec2Add(a, Vec2MultiplyByFloats(v, t, t, v));
  return GetVec2Distance(p, proj);
}

// src/math/vec2/GetVec2Angle.ts
function GetVec2Angle(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

// src/math/vec2/GetVec2AngleY.ts
function GetVec2AngleY(a, b) {
  return Math.atan2(b.x - a.x, b.y - a.y);
}

// src/math/vec2/GetVec2DistancePower.ts
function GetVec2DistancePower(a, b, pow = 2) {
  return Math.sqrt(Math.pow(b.x - a.x, pow) + Math.pow(b.y - a.y, pow));
}

// src/math/vec2/GetVec2Length.ts
function GetVec2Length(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
}

// src/math/vec2/GetVec2LengthSquared.ts
function GetVec2LengthSquared(a) {
  return a.x * a.x + a.y * a.y;
}

// src/math/vec2/GetVec2ManhattanDistance.ts
function GetVec2ManhattanDistance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// src/math/vec2/GetVec2ManhattanLength.ts
function GetVec2ManhattanLength(a) {
  return Math.abs(a.x) + Math.abs(a.y);
}

// src/math/vec2/Vec2Abs.ts
function Vec2Abs(a, out = new Vec2()) {
  return out.set(Math.abs(a.x), Math.abs(a.y));
}

// src/math/vec2/Vec2AddScalar.ts
function Vec2AddScalar(a, scalar, out = new Vec2()) {
  return out.set(a.x + scalar, a.y + scalar);
}

// src/math/Bezier.ts
function Bezier(a, b, c, d, t) {
  const inverseFactor = 1 - t;
  const inverseFactorTimesTwo = inverseFactor * inverseFactor;
  const factorTimes2 = t * t;
  const factor1 = inverseFactorTimesTwo * inverseFactor;
  const factor2 = 3 * t * inverseFactorTimesTwo;
  const factor3 = 3 * factorTimes2 * inverseFactor;
  const factor4 = factorTimes2 * t;
  return a * factor1 + b * factor2 + c * factor3 + d * factor4;
}

// src/math/vec2/Vec2Bezier.ts
function Vec2Bezier(a, b, c, d, t, out = new Vec2()) {
  return out.set(Bezier(a.x, b.x, c.x, d.x, t), Bezier(a.y, b.y, c.y, d.y, t));
}

// src/math/vec2/Vec2Callback.ts
var Vec2Callback = class {
  _x;
  _y;
  onChange;
  constructor(onChange, x = 0, y = 0) {
    this._x = x;
    this._y = y;
    this.onChange = onChange;
  }
  destroy() {
    this.onChange = NOOP;
  }
  set(x = 0, y = 0) {
    this._x = x;
    this._y = y;
    if (this.onChange) {
      this.onChange(this);
    }
    return this;
  }
  get x() {
    return this._x;
  }
  set x(value) {
    const prev = this._x;
    this._x = value;
    if (prev !== value) {
      this.onChange(this);
    }
  }
  get y() {
    return this._y;
  }
  set y(value) {
    const prev = this._y;
    this._y = value;
    if (prev !== value) {
      this.onChange(this);
    }
  }
  toArray(dst = [], index = 0) {
    const { x, y } = this;
    dst[index] = x;
    dst[index + 1] = y;
    return dst;
  }
  fromArray(src, index = 0) {
    return this.set(src[index], src[index + 1]);
  }
  toString() {
    const { x, y } = this;
    return `{ x=${x}, y=${y} }`;
  }
};

// src/math/vec2/Vec2CatmullRom.ts
function Vec2CatmullRom(p1, p2, p3, p4, t, out = new Vec2()) {
  return out.set(CatmullRom(t, p1.x, p2.x, p3.x, p4.x), CatmullRom(t, p1.y, p2.y, p3.y, p4.y));
}

// src/math/vec2/Vec2Ceil.ts
function Vec2Ceil(a, out = new Vec2()) {
  return out.set(Math.ceil(a.x), Math.ceil(a.y));
}

// src/math/vec2/Vec2Scale.ts
function Vec2Scale(a, scalar, out = new Vec2()) {
  return out.set(a.x * scalar, a.y * scalar);
}

// src/math/vec2/Vec2Center.ts
function Vec2Center(a, b, out = new Vec2()) {
  Vec2Add(a, b, out);
  return Vec2Scale(out, 0.5, out);
}

// src/math/vec2/Vec2Clamp.ts
function Vec2Clamp(a, min, max, out = new Vec2()) {
  return out.set(Clamp(a.x, min.x, max.x), Clamp(a.y, min.y, max.y));
}

// src/math/vec2/Vec2ClampScalar.ts
function Vec2ClampScalar(a, min, max, out = new Vec2()) {
  return out.set(Clamp(a.x, min, max), Clamp(a.y, min, max));
}

// src/math/vec2/Vec2Clone.ts
function Vec2Clone(source) {
  return new Vec2(source.x, source.y);
}

// src/math/vec2/Vec2CopyFrom.ts
function Vec2CopyFrom(source, dest) {
  return dest.set(source.x, source.y);
}

// src/math/vec2/Vec2Cross.ts
function Vec2Cross(a, b) {
  return a.x * b.y - a.y * b.x;
}

// src/math/vec2/Vec2Divide.ts
function Vec2Divide(a, b, out = new Vec2()) {
  return out.set(a.x / b.x, a.y / b.y);
}

// src/math/vec2/Vec2DivideScalar.ts
function Vec2DivideScalar(a, scalar, out = new Vec2()) {
  return out.set(a.x / scalar, a.y / scalar);
}

// src/math/vec2/Vec2Equals.ts
function Vec2Equals(a, b) {
  return a.x === b.x && a.y === b.y;
}

// src/math/vec2/Vec2Floor.ts
function Vec2Floor(a, out = new Vec2()) {
  return out.set(Math.floor(a.x), Math.floor(a.y));
}

// src/math/vec2/Vec2Fract.ts
function Vec2Fract(a, out = new Vec2()) {
  return out.set(a.x - Math.floor(a.x), a.y - Math.floor(a.y));
}

// src/math/vec2/Vec2FromGridIndex.ts
function Vec2FromGridIndex(index, width, height, out = new Vec2()) {
  let x = 0;
  let y = 0;
  const total = width * height;
  if (index > 0 && index <= total) {
    if (index > width - 1) {
      y = Math.floor(index / width);
      x = index - y * width;
    } else {
      x = index;
    }
    out.set(x, y);
  }
  return out;
}

// src/math/vec2/Vec2FromTransform.ts
function Vec2FromTransform(x, y, positionX, positionY, rotation, scaleX, scaleY, out = new Vec2()) {
  const sin = Math.sin(rotation);
  const cos = Math.cos(rotation);
  const a = cos * scaleX;
  const b = sin * scaleX;
  const c = -sin * scaleY;
  const d = cos * scaleY;
  const id = 1 / (a * d + c * -b);
  return out.set(d * id * x + -c * id * y + (positionY * c - positionX * d) * id, a * id * y + -b * id * x + (-positionY * a + positionX * b) * id);
}

// src/math/vec2/Vec2FuzzyEquals.ts
function Vec2FuzzyEquals(a, b, epsilon = 1e-4) {
  return FuzzyEqual(a.x, b.x, epsilon) && FuzzyEqual(a.y, b.y, epsilon);
}

// src/math/vec2/Vec2Hermite.ts
function Vec2Hermite(a, b, c, d, t, out = new Vec2()) {
  return out.set(Hermite(a.x, b.x, c.x, d.x, t), Hermite(a.y, b.y, c.y, d.y, t));
}

// src/math/vec2/Vec2Inverse.ts
function Vec2Inverse(a, out = new Vec2()) {
  return out.set(1 / a.x, 1 / a.y);
}

// src/math/vec2/Vec2Lerp.ts
function Vec2Lerp(a, b, t, out = new Vec2()) {
  const x = a.x;
  const y = a.y;
  return out.set(x + t * (b.x - x), y + t * (b.y - y));
}

// src/math/vec2/Vec2Limit.ts
function Vec2Limit(a, max, out = new Vec2()) {
  const length = GetVec2Length(a);
  if (length && length > max) {
    Vec2Scale(a, max / length, out);
  }
  return out;
}

// src/math/vec2/Vec2Max.ts
function Vec2Max(a, b, out = new Vec2()) {
  const { x: ax, y: ay } = a;
  const { x: bx, y: by } = b;
  return out.set(Math.max(ax, bx), Math.max(ay, by));
}

// src/math/vec2/Vec2Min.ts
function Vec2Min(a, b, out = new Vec2()) {
  const { x: ax, y: ay } = a;
  const { x: bx, y: by } = b;
  return out.set(Math.min(ax, bx), Math.min(ay, by));
}

// src/math/vec2/Vec2Multiply.ts
function Vec2Multiply(a, b, out = new Vec2()) {
  return out.set(a.x * b.x, a.y * b.y);
}

// src/math/vec2/Vec2Negate.ts
function Vec2Negate(a, out = new Vec2()) {
  return out.set(-a.x, -a.y);
}

// src/math/vec2/Vec2Normalize.ts
function Vec2Normalize(a, out = new Vec2()) {
  return Vec2DivideScalar(a, GetVec2Length(a) || 1, out);
}

// src/math/vec2/Vec2One.ts
function Vec2One() {
  return new Vec2(1, 1);
}

// src/math/vec2/Vec2PerpDot.ts
function Vec2PerpDot(a, b) {
  return a.x * b.y - a.y * b.x;
}

// src/math/vec2/Vec2Random.ts
function Vec2Random(a, scale = 1, out = new Vec2()) {
  const r = Math.random() * 2 * Math.PI;
  return out.set(Math.cos(r) * scale, Math.sin(r) * scale);
}

// src/math/vec2/Vec2Rotate.ts
function Vec2Rotate(a, origin, angle, out = new Vec2()) {
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  const x = a.x - origin.x;
  const y = a.y - origin.y;
  return out.set(x * c - y * s + origin.x, x * s + y * c + origin.y);
}

// src/math/vec2/Vec2Round.ts
function Vec2Round(a, out = new Vec2()) {
  return out.set(Math.round(a.x), Math.round(a.y));
}

// src/math/vec2/Vec2RoundToZero.ts
function Vec2RoundToZero(a, out = new Vec2()) {
  return out.set(a.x < 0 ? Math.ceil(a.x) : Math.floor(a.x), a.y < 0 ? Math.ceil(a.y) : Math.floor(a.y));
}

// src/math/vec2/Vec2ScaleAndAdd.ts
function Vec2ScaleAndAdd(a, b, scalar, out = new Vec2()) {
  return out.set(a.x + b.x * scalar, a.y + b.y * scalar);
}

// src/math/vec2/Vec2SetLength.ts
function Vec2SetLength(a, length, out = new Vec2()) {
  Vec2Normalize(a, out);
  return Vec2Scale(out, length, out);
}

// src/math/vec2/Vec2SubtractScalar.ts
function Vec2SubtractScalar(a, scalar, out = new Vec2()) {
  return out.set(a.x - scalar, a.y - scalar);
}

// src/math/vec2/Vec2Transform.ts
function Vec2Transform(v, positionX, positionY, rotation, scaleX, scaleY, out = new Vec2()) {
  return Vec2FromTransform(v.x, v.y, positionX, positionY, rotation, scaleX, scaleY, out);
}

// src/math/vec2/Vec2TransformMat2d.ts
function Vec2TransformMat2d(v, m, out = new Vec2()) {
  const { a, b, c, d, tx, ty } = m;
  return out.set(a * v.x + c * v.y + tx, b * v.x + d * v.y + ty);
}

// src/math/vec2/Vec2TransformMat4.ts
function Vec2TransformMat4(v, m, out = new Vec2()) {
  const data = m.data;
  return out.set(data[0] * v.x + data[4] * v.y + data[12], data[1] * v.x + data[5] * v.y + data[13]);
}

// src/math/vec2/Vec2Zero.ts
function Vec2Zero() {
  return new Vec2(0, 0);
}

// src/math/vec3/index.ts
var vec3_exports = {};
__export(vec3_exports, {
  GetVec3Angle: () => GetVec3Angle,
  GetVec3Distance: () => GetVec3Distance,
  GetVec3DistanceSquared: () => GetVec3DistanceSquared,
  GetVec3Length: () => GetVec3Length,
  GetVec3LengthSquared: () => GetVec3LengthSquared,
  GetVec3ManhattanDistance: () => GetVec3ManhattanDistance,
  GetVec3ManhattanLength: () => GetVec3ManhattanLength,
  RGBCallback: () => RGBCallback,
  Vec3: () => Vec3,
  Vec3Abs: () => Vec3Abs,
  Vec3Add: () => Vec3Add,
  Vec3AddScalar: () => Vec3AddScalar,
  Vec3Backward: () => Vec3Backward,
  Vec3Bezier: () => Vec3Bezier,
  Vec3Callback: () => Vec3Callback,
  Vec3CatmullRom: () => Vec3CatmullRom,
  Vec3Ceil: () => Vec3Ceil,
  Vec3Center: () => Vec3Center,
  Vec3Clamp: () => Vec3Clamp,
  Vec3ClampLength: () => Vec3ClampLength,
  Vec3ClampScalar: () => Vec3ClampScalar,
  Vec3Clone: () => Vec3Clone,
  Vec3CopyFrom: () => Vec3CopyFrom,
  Vec3Cross: () => Vec3Cross,
  Vec3CrossNormalize: () => Vec3CrossNormalize,
  Vec3Divide: () => Vec3Divide,
  Vec3DivideScalar: () => Vec3DivideScalar,
  Vec3Dot: () => Vec3Dot,
  Vec3Down: () => Vec3Down,
  Vec3Equals: () => Vec3Equals,
  Vec3Floor: () => Vec3Floor,
  Vec3Forward: () => Vec3Forward,
  Vec3Fract: () => Vec3Fract,
  Vec3FromCylindricalCoords: () => Vec3FromCylindricalCoords,
  Vec3FromSphericalCoords: () => Vec3FromSphericalCoords,
  Vec3FuzzyEquals: () => Vec3FuzzyEquals,
  Vec3Hermite: () => Vec3Hermite,
  Vec3Inverse: () => Vec3Inverse,
  Vec3IsNonUniform: () => Vec3IsNonUniform,
  Vec3Left: () => Vec3Left,
  Vec3Lerp: () => Vec3Lerp,
  Vec3Max: () => Vec3Max,
  Vec3Min: () => Vec3Min,
  Vec3Multiply: () => Vec3Multiply,
  Vec3MultiplyByFloats: () => Vec3MultiplyByFloats,
  Vec3Negate: () => Vec3Negate,
  Vec3Normalize: () => Vec3Normalize,
  Vec3One: () => Vec3One,
  Vec3Project: () => Vec3Project,
  Vec3Random: () => Vec3Random,
  Vec3Reflect: () => Vec3Reflect,
  Vec3Right: () => Vec3Right,
  Vec3RotateX: () => Vec3RotateX,
  Vec3RotateY: () => Vec3RotateY,
  Vec3RotateZ: () => Vec3RotateZ,
  Vec3Round: () => Vec3Round,
  Vec3RoundToZero: () => Vec3RoundToZero,
  Vec3Scale: () => Vec3Scale,
  Vec3ScaleAndAdd: () => Vec3ScaleAndAdd,
  Vec3SetLength: () => Vec3SetLength,
  Vec3Subtract: () => Vec3Subtract,
  Vec3SubtractScalar: () => Vec3SubtractScalar,
  Vec3TransformMat4: () => Vec3TransformMat4,
  Vec3TransformMat4Zero: () => Vec3TransformMat4Zero,
  Vec3TransformQuat: () => Vec3TransformQuat,
  Vec3Unproject: () => Vec3Unproject,
  Vec3Up: () => Vec3Up,
  Vec3Zero: () => Vec3Zero
});

// src/math/vec3/GetVec3Angle.ts
function GetVec3Angle(a, b) {
  const { x: ax, y: ay, z: az } = a;
  const { x: bx, y: by, z: bz } = b;
  const mag1 = Math.sqrt(ax * ax + ay * ay + az * az);
  const mag2 = Math.sqrt(bx * bx + by * by + bz * bz);
  const mag = mag1 * mag2;
  const c = mag && Vec3Dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(c, -1), 1));
}

// src/math/vec3/GetVec3DistanceSquared.ts
function GetVec3DistanceSquared(a, b) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  const z = a.z - b.z;
  return x * x + y * y + z * z;
}

// src/math/vec3/GetVec3Distance.ts
function GetVec3Distance(a, b) {
  return Math.sqrt(GetVec3DistanceSquared(a, b));
}

// src/math/vec3/GetVec3Length.ts
function GetVec3Length(a) {
  const { x, y, z } = a;
  return Math.sqrt(x * x + y * y + z * z);
}

// src/math/vec3/GetVec3LengthSquared.ts
function GetVec3LengthSquared(a) {
  const { x, y, z } = a;
  return x * x + y * y + z * z;
}

// src/math/vec3/GetVec3ManhattanDistance.ts
function GetVec3ManhattanDistance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

// src/math/vec3/GetVec3ManhattanLength.ts
function GetVec3ManhattanLength(a) {
  return Math.abs(a.x) + Math.abs(a.y) + Math.abs(a.z);
}

// src/math/vec3/Vec3Callback.ts
var Vec3Callback = class {
  _x;
  _y;
  _z;
  onChange;
  constructor(onChange, x = 0, y = 0, z = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
    this.onChange = onChange;
  }
  destroy() {
    this.onChange = NOOP;
  }
  set(x = 0, y = 0, z = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
    if (this.onChange) {
      this.onChange(this);
    }
    return this;
  }
  get x() {
    return this._x;
  }
  set x(value) {
    const prev = this._x;
    this._x = value;
    if (prev !== value) {
      this.onChange(this);
    }
  }
  get y() {
    return this._y;
  }
  set y(value) {
    const prev = this._y;
    this._y = value;
    if (prev !== value) {
      this.onChange(this);
    }
  }
  get z() {
    return this._z;
  }
  set z(value) {
    const prev = this._z;
    this._z = value;
    if (prev !== value) {
      this.onChange(this);
    }
  }
  toArray(dst = [], index = 0) {
    const { x, y, z } = this;
    dst[index] = x;
    dst[index + 1] = y;
    dst[index + 2] = z;
    return dst;
  }
  fromArray(src, index = 0) {
    return this.set(src[index], src[index + 1], src[index + 2]);
  }
  toString() {
    const { x, y, z } = this;
    return `{ x=${x}, y=${y}, z=${z} }`;
  }
};

// src/math/vec3/RGBCallback.ts
var RGBCallback = class extends Vec3Callback {
  constructor(onChange, r = 0, g = 0, b = 0) {
    super(onChange, r, g, b);
  }
  set r(value) {
    this.x = value;
  }
  get r() {
    return this.x;
  }
  set g(value) {
    this.y = value;
  }
  get g() {
    return this.y;
  }
  set b(value) {
    this.z = value;
  }
  get b() {
    return this.z;
  }
  toString() {
    const { x, y, z } = this;
    return `[ r=${x}, g=${y}, b=${z} ]`;
  }
};

// src/math/vec3/Vec3Abs.ts
function Vec3Abs(a, out = new Vec3()) {
  return out.set(Math.abs(a.x), Math.abs(a.y), Math.abs(a.z));
}

// src/math/vec3/Vec3Add.ts
function Vec3Add(a, b, out = new Vec3()) {
  return out.set(a.x + b.x, a.y + b.y, a.z + b.z);
}

// src/math/vec3/Vec3AddScalar.ts
function Vec3AddScalar(a, scalar, out = new Vec3()) {
  return out.set(a.x + scalar, a.y + scalar, a.z + scalar);
}

// src/math/vec3/Vec3Backward.ts
function Vec3Backward() {
  return new Vec3(0, 0, -1);
}

// src/math/vec3/Vec3Bezier.ts
function Vec3Bezier(a, b, c, d, t, out = new Vec3()) {
  return out.set(Bezier(a.x, b.x, c.x, d.x, t), Bezier(a.y, b.y, c.y, d.y, t), Bezier(a.z, b.z, c.z, d.z, t));
}

// src/math/vec3/Vec3CatmullRom.ts
function Vec3CatmullRom(p1, p2, p3, p4, t, out = new Vec3()) {
  return out.set(CatmullRom(t, p1.x, p2.x, p3.x, p4.x), CatmullRom(t, p1.y, p2.y, p3.y, p4.y), CatmullRom(t, p1.z, p2.z, p3.z, p4.z));
}

// src/math/vec3/Vec3Ceil.ts
function Vec3Ceil(a, out = new Vec3()) {
  return out.set(Math.ceil(a.x), Math.ceil(a.y), Math.ceil(a.z));
}

// src/math/vec3/Vec3Scale.ts
function Vec3Scale(a, scalar, out = new Vec3()) {
  return out.set(a.x * scalar, a.y * scalar, a.z * scalar);
}

// src/math/vec3/Vec3Center.ts
function Vec3Center(a, b, out = new Vec3()) {
  Vec3Add(a, b, out);
  return Vec3Scale(out, 0.5, out);
}

// src/math/vec3/Vec3Clamp.ts
function Vec3Clamp(a, min, max, out = new Vec3()) {
  return out.set(Clamp(a.x, min.x, max.x), Clamp(a.y, min.y, max.y), Clamp(a.z, min.z, max.z));
}

// src/math/vec3/Vec3DivideScalar.ts
function Vec3DivideScalar(a, scalar, out = new Vec3()) {
  const { x, y, z } = a;
  return out.set(x / scalar, y / scalar, z / scalar);
}

// src/math/vec3/Vec3ClampLength.ts
function Vec3ClampLength(a, min, max, out = new Vec3()) {
  const length = GetVec3Length(a);
  Vec3DivideScalar(a, length || 1, out);
  return Vec3Scale(out, Clamp(length, min, max), out);
}

// src/math/vec3/Vec3ClampScalar.ts
function Vec3ClampScalar(a, min, max, out = new Vec3()) {
  return out.set(Clamp(a.x, min, max), Clamp(a.y, min, max), Clamp(a.z, min, max));
}

// src/math/vec3/Vec3Clone.ts
function Vec3Clone(source) {
  const { x, y, z } = source;
  return new Vec3(x, y, z);
}

// src/math/vec3/Vec3CopyFrom.ts
function Vec3CopyFrom(source, dest) {
  const { x, y, z } = source;
  return dest.set(x, y, z);
}

// src/math/vec3/Vec3Cross.ts
function Vec3Cross(a, b, out = new Vec3()) {
  const { x: ax, y: ay, z: az } = a;
  const { x: bx, y: by, z: bz } = b;
  return out.set(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
}

// src/math/vec3/Vec3CrossNormalize.ts
function Vec3CrossNormalize(a, b, out = new Vec3()) {
  const { x: ax, y: ay, z: az } = a;
  const { x: bx, y: by, z: bz } = b;
  const x = ay * bz - az * by;
  const y = az * bx - ax * bz;
  const z = ax * by - ay * bx;
  let len = x * x + y * y + z * z;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  return out.set(x * len, y * len, z * len);
}

// src/math/vec3/Vec3Divide.ts
function Vec3Divide(a, b, out = new Vec3()) {
  return out.set(a.x / b.x, a.y / b.y, a.z / b.z);
}

// src/math/vec3/Vec3Down.ts
function Vec3Down() {
  return new Vec3(0, -1, 0);
}

// src/math/vec3/Vec3Equals.ts
function Vec3Equals(a, b) {
  return a.x === b.x && a.y === b.y && a.z === b.z;
}

// src/math/vec3/Vec3Floor.ts
function Vec3Floor(a, out = new Vec3()) {
  return out.set(Math.floor(a.x), Math.floor(a.y), Math.floor(a.z));
}

// src/math/vec3/Vec3Forward.ts
function Vec3Forward() {
  return new Vec3(0, 0, 1);
}

// src/math/vec3/Vec3Fract.ts
function Vec3Fract(a, out = new Vec3()) {
  return out.set(a.x - Math.floor(a.x), a.y - Math.floor(a.y), a.z - Math.floor(a.z));
}

// src/math/vec3/Vec3FromCylindricalCoords.ts
function Vec3FromCylindricalCoords(radius, theta, y, out = new Vec3()) {
  return out.set(radius * Math.sin(theta), y, radius * Math.cos(theta));
}

// src/math/vec3/Vec3FromSphericalCoords.ts
function Vec3FromSphericalCoords(radius, phi, theta, out = new Vec3()) {
  const sinPhiRadius = Math.sin(phi) * radius;
  return out.set(sinPhiRadius * Math.sin(theta), Math.cos(phi) * radius, sinPhiRadius * Math.cos(theta));
}

// src/math/vec3/Vec3FuzzyEquals.ts
function Vec3FuzzyEquals(a, b, epsilon = 1e-4) {
  return FuzzyEqual(a.x, b.x, epsilon) && FuzzyEqual(a.y, b.y, epsilon) && FuzzyEqual(a.z, b.z, epsilon);
}

// src/math/vec3/Vec3Hermite.ts
function Vec3Hermite(a, b, c, d, t, out = new Vec3()) {
  return out.set(Hermite(a.x, b.x, c.x, d.x, t), Hermite(a.y, b.y, c.y, d.y, t), Hermite(a.z, b.z, c.z, d.z, t));
}

// src/math/vec3/Vec3Inverse.ts
function Vec3Inverse(a, out = new Vec3()) {
  return out.set(1 / a.x, 1 / a.y, 1 / a.z);
}

// src/math/vec3/Vec3IsNonUniform.ts
function Vec3IsNonUniform(a) {
  const absX = Math.abs(a.x);
  const absY = Math.abs(a.y);
  const absZ = Math.abs(a.z);
  return absX !== absY || absX !== absZ || absY !== absZ;
}

// src/math/vec3/Vec3Left.ts
function Vec3Left() {
  return new Vec3(-1, 0, 0);
}

// src/math/vec3/Vec3Lerp.ts
function Vec3Lerp(a, b, t, out = new Vec3()) {
  const { x, y, z } = a;
  return out.set(x + t * (b.x - x), y + t * (b.y - y), z + t * (b.z - z));
}

// src/math/vec3/Vec3Max.ts
function Vec3Max(a, b, out = new Vec3()) {
  const { x: ax, y: ay, z: az } = a;
  const { x: bx, y: by, z: bz } = b;
  return out.set(Math.max(ax, bx), Math.max(ay, by), Math.max(az, bz));
}

// src/math/vec3/Vec3Min.ts
function Vec3Min(a, b, out = new Vec3()) {
  const { x: ax, y: ay, z: az } = a;
  const { x: bx, y: by, z: bz } = b;
  return out.set(Math.min(ax, bx), Math.min(ay, by), Math.min(az, bz));
}

// src/math/vec3/Vec3Multiply.ts
function Vec3Multiply(a, b, out = new Vec3()) {
  return out.set(a.x * b.x, a.y * b.y, a.z * b.z);
}

// src/math/vec3/Vec3MultiplyByFloats.ts
function Vec3MultiplyByFloats(a, x, y, z, out = new Vec3()) {
  return out.set(a.x * x, a.y * y, a.z * z);
}

// src/math/vec3/Vec3Negate.ts
function Vec3Negate(a, out = new Vec3()) {
  return out.set(-a.x, -a.y, -a.z);
}

// src/math/vec3/Vec3One.ts
function Vec3One() {
  return new Vec3(1, 1, 1);
}

// src/math/vec3/Vec3TransformMat4.ts
function Vec3TransformMat4(a, m, out = new Vec3()) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33] = m.data;
  const { x, y, z } = a;
  let w = m03 * x + m13 * y + m23 * z + m33;
  w = w || 1;
  return out.set((m00 * x + m10 * y + m20 * z + m30) / w, (m01 * x + m11 * y + m21 * z + m31) / w, (m02 * x + m12 * y + m22 * z + m32) / w);
}

// src/math/vec3/Vec3Project.ts
var tempMatrix1 = new Matrix4();
var tempMatrix2 = new Matrix4();
function Vec3Project(v, world2, transform, viewport, out = new Vec3()) {
  const { x, y, width, height } = viewport;
  tempMatrix1.set(width / 2, 0, 0, 0, 0, -height / 2, 0, 0, 0, 0, 0.5, 0, x + width / 2, height / 2 + y, 0.5, 1);
  Mat4Multiply(world2, transform, tempMatrix2);
  Mat4Multiply(tempMatrix2, tempMatrix1, tempMatrix2);
  return Vec3TransformMat4(v, tempMatrix2, out);
}

// src/math/vec3/Vec3Random.ts
function Vec3Random(a, scale = 1, out = new Vec3()) {
  const r = Math.random() * 2 * Math.PI;
  const z = Math.random() * 2 - 1;
  const zScale = Math.sqrt(1 - z * z) * scale;
  return out.set(Math.cos(r) * zScale, Math.sin(r) * zScale, z * scale);
}

// src/math/vec3/Vec3Subtract.ts
function Vec3Subtract(a, b, out = new Vec3()) {
  return out.set(a.x - b.x, a.y - b.y, a.z - b.z);
}

// src/math/vec3/Vec3Reflect.ts
function Vec3Reflect(a, normal, out = new Vec3()) {
  Vec3Scale(normal, 2 * Vec3Dot(a, normal), out);
  return Vec3Subtract(a, out, out);
}

// src/math/vec3/Vec3Right.ts
function Vec3Right() {
  return new Vec3(1, 0, 0);
}

// src/math/vec3/Vec3RotateX.ts
function Vec3RotateX(a, origin, angle, out = new Vec3()) {
  const { x: ax, y: ay, z: az } = a;
  const { x: bx, y: by, z: bz } = origin;
  const px = ax - bx;
  const py = ay - by;
  const pz = az - bz;
  const rx = px;
  const ry = py * Math.cos(angle) - pz * Math.sin(angle);
  const rz = py * Math.sin(angle) + pz * Math.cos(angle);
  return out.set(rx + bx, ry + by, rz + bz);
}

// src/math/vec3/Vec3RotateY.ts
function Vec3RotateY(a, origin, angle, out = new Vec3()) {
  const { x: ax, y: ay, z: az } = a;
  const { x: bx, y: by, z: bz } = origin;
  const px = ax - bx;
  const py = ay - by;
  const pz = az - bz;
  const rx = pz * Math.sin(angle) + px * Math.cos(angle);
  const ry = py;
  const rz = pz * Math.cos(angle) - px * Math.sin(angle);
  return out.set(rx + bx, ry + by, rz + bz);
}

// src/math/vec3/Vec3RotateZ.ts
function Vec3RotateZ(a, origin, angle, out = new Vec3()) {
  const { x: ax, y: ay, z: az } = a;
  const { x: bx, y: by, z: bz } = origin;
  const px = ax - bx;
  const py = ay - by;
  const pz = az - bz;
  const rx = px * Math.cos(angle) - py * Math.sin(angle);
  const ry = px * Math.sin(angle) + py * Math.cos(angle);
  const rz = pz;
  return out.set(rx + bx, ry + by, rz + bz);
}

// src/math/vec3/Vec3Round.ts
function Vec3Round(a, out = new Vec3()) {
  return out.set(Math.round(a.x), Math.round(a.y), Math.round(a.z));
}

// src/math/vec3/Vec3RoundToZero.ts
function Vec3RoundToZero(a, out = new Vec3()) {
  return out.set(a.x < 0 ? Math.ceil(a.x) : Math.floor(a.x), a.y < 0 ? Math.ceil(a.y) : Math.floor(a.y), a.z < 0 ? Math.ceil(a.z) : Math.floor(a.z));
}

// src/math/vec3/Vec3ScaleAndAdd.ts
function Vec3ScaleAndAdd(a, b, scalar, out = new Vec3()) {
  return out.set(a.x + b.x * scalar, a.y + b.y * scalar, a.z + b.z * scalar);
}

// src/math/vec3/Vec3SetLength.ts
function Vec3SetLength(a, length, out = new Vec3()) {
  Vec3Normalize(a, out);
  return Vec3Scale(out, length, out);
}

// src/math/vec3/Vec3SubtractScalar.ts
function Vec3SubtractScalar(a, scalar, out = new Vec3()) {
  return out.set(a.x - scalar, a.y - scalar, a.z - scalar);
}

// src/math/vec3/Vec3TransformMat4Zero.ts
function Vec3TransformMat4Zero(a, m, out = new Vec3()) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22] = m.data;
  const { x, y, z } = a;
  return out.set(m00 * x + m10 * y + m20 * z, m01 * x + m11 * y + m21 * z, m02 * x + m12 * y + m22 * z);
}

// src/math/vec3/Vec3TransformQuat.ts
function Vec3TransformQuat(a, q, out = new Vec3()) {
  const { x: qx, y: qy, z: qz, w: qw } = q;
  const { x, y, z } = a;
  let uvx = qy * z - qz * y;
  let uvy = qz * x - qx * z;
  let uvz = qx * y - qy * x;
  let uuvx = qy * uvz - qz * uvy;
  let uuvy = qz * uvx - qx * uvz;
  let uuvz = qx * uvy - qy * uvx;
  const w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  return out.set(x + uvx + uuvx, y + uvy + uuvy, z + uvz + uuvz);
}

// src/math/vec3/Vec3Unproject.ts
var matrix = new Matrix4();
var screenSource = new Vec3();
function Vec3Unproject(v, viewportWidth, viewportHeight, world2, view, projection, out = new Vec3()) {
  Mat4Multiply(world2, view, matrix);
  Mat4Multiply(matrix, projection, matrix);
  Mat4Invert(matrix, matrix);
  const { x, y, z } = v;
  screenSource.set(x / viewportWidth * 2 - 1, -(y / viewportHeight * 2 - 1), 2 * z - 1);
  Vec3TransformMat4(screenSource, matrix, out);
  const data = matrix.data;
  const num = screenSource.x * data[3] + screenSource.y * data[7] + screenSource.z * data[11] + data[15];
  return Vec3Scale(out, 1 / num, out);
}

// src/math/vec3/Vec3Up.ts
function Vec3Up() {
  return new Vec3(0, 1, 0);
}

// src/math/vec3/Vec3Zero.ts
function Vec3Zero() {
  return new Vec3(0, 0, 0);
}

// src/math/vec4/index.ts
var vec4_exports = {};
__export(vec4_exports, {
  GetVec4Distance: () => GetVec4Distance,
  GetVec4DistanceSquared: () => GetVec4DistanceSquared,
  GetVec4Length: () => GetVec4Length,
  GetVec4LengthSquared: () => GetVec4LengthSquared,
  GetVec4ManhattanDistance: () => GetVec4ManhattanDistance,
  GetVec4ManhattanLength: () => GetVec4ManhattanLength,
  RGBACallback: () => RGBACallback,
  Vec4: () => Vec4,
  Vec4Abs: () => Vec4Abs,
  Vec4Add: () => Vec4Add,
  Vec4AddScalar: () => Vec4AddScalar,
  Vec4Bezier: () => Vec4Bezier,
  Vec4Callback: () => Vec4Callback,
  Vec4CatmullRom: () => Vec4CatmullRom,
  Vec4Ceil: () => Vec4Ceil,
  Vec4Center: () => Vec4Center,
  Vec4Clamp: () => Vec4Clamp,
  Vec4ClampLength: () => Vec4ClampLength,
  Vec4ClampScalar: () => Vec4ClampScalar,
  Vec4Clone: () => Vec4Clone,
  Vec4CopyFrom: () => Vec4CopyFrom,
  Vec4Cross: () => Vec4Cross,
  Vec4Divide: () => Vec4Divide,
  Vec4DivideScalar: () => Vec4DivideScalar,
  Vec4Dot: () => Vec4Dot,
  Vec4Equals: () => Vec4Equals,
  Vec4Floor: () => Vec4Floor,
  Vec4Fract: () => Vec4Fract,
  Vec4FuzzyEquals: () => Vec4FuzzyEquals,
  Vec4Hermite: () => Vec4Hermite,
  Vec4Lerp: () => Vec4Lerp,
  Vec4Max: () => Vec4Max,
  Vec4Min: () => Vec4Min,
  Vec4Multiply: () => Vec4Multiply,
  Vec4MultiplyByFloats: () => Vec4MultiplyByFloats,
  Vec4Negate: () => Vec4Negate,
  Vec4Normalize: () => Vec4Normalize,
  Vec4One: () => Vec4One,
  Vec4Random: () => Vec4Random,
  Vec4Round: () => Vec4Round,
  Vec4RoundToZero: () => Vec4RoundToZero,
  Vec4Scale: () => Vec4Scale,
  Vec4ScaleAndAdd: () => Vec4ScaleAndAdd,
  Vec4SetLength: () => Vec4SetLength,
  Vec4Subtract: () => Vec4Subtract,
  Vec4SubtractScalar: () => Vec4SubtractScalar,
  Vec4TransformMat4: () => Vec4TransformMat4,
  Vec4Zero: () => Vec4Zero
});

// src/math/vec4/GetVec4DistanceSquared.ts
function GetVec4DistanceSquared(a, b) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  const z = a.z - b.z;
  const w = a.w - b.w;
  return x * x + y * y + z * z + w * w;
}

// src/math/vec4/GetVec4Distance.ts
function GetVec4Distance(a, b) {
  return Math.sqrt(GetVec4DistanceSquared(a, b));
}

// src/math/vec4/GetVec4Length.ts
function GetVec4Length(a) {
  const { x, y, z, w } = a;
  return Math.sqrt(x * x + y * y + z * z + w * w);
}

// src/math/vec4/GetVec4LengthSquared.ts
function GetVec4LengthSquared(a) {
  const { x, y, z, w } = a;
  return x * x + y * y + z * z + w * w;
}

// src/math/vec4/GetVec4ManhattanDistance.ts
function GetVec4ManhattanDistance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) + Math.abs(a.w - b.w);
}

// src/math/vec4/GetVec4ManhattanLength.ts
function GetVec4ManhattanLength(a) {
  const { x, y, z, w } = a;
  return Math.abs(x) + Math.abs(y) + Math.abs(z) + Math.abs(w);
}

// src/math/vec4/Vec4Callback.ts
var Vec4Callback = class {
  _x;
  _y;
  _z;
  _w;
  onChange;
  constructor(onChange, x = 0, y = 0, z = 0, w = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
    this.onChange = onChange;
  }
  destroy() {
    this.onChange = NOOP;
  }
  set(x = 0, y = 0, z = 0, w = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
    if (this.onChange) {
      this.onChange(this);
    }
    return this;
  }
  get x() {
    return this._x;
  }
  set x(value) {
    const prev = this._x;
    this._x = value;
    if (prev !== value) {
      this.onChange(this);
    }
  }
  get y() {
    return this._y;
  }
  set y(value) {
    const prev = this._y;
    this._y = value;
    if (prev !== value) {
      this.onChange(this);
    }
  }
  get z() {
    return this._z;
  }
  set z(value) {
    const prev = this._z;
    this._z = value;
    if (prev !== value) {
      this.onChange(this);
    }
  }
  get w() {
    return this._w;
  }
  set w(value) {
    const prev = this._w;
    this._w = value;
    if (prev !== value) {
      this.onChange(this);
    }
  }
  toArray(dst = [], index = 0) {
    const { x, y, z, w } = this;
    dst[index] = x;
    dst[index + 1] = y;
    dst[index + 2] = z;
    dst[index + 3] = w;
    return dst;
  }
  fromArray(src, index = 0) {
    return this.set(src[index], src[index + 1], src[index + 2], src[index + 3]);
  }
  toString() {
    const { x, y, z, w } = this;
    return `{ x=${x}, y=${y}, z=${z}, w=${w} }`;
  }
};

// src/math/vec4/RGBACallback.ts
var RGBACallback = class extends Vec4Callback {
  constructor(onChange, r = 0, g = 0, b = 0, a = 1) {
    super(onChange, r, g, b, a);
  }
  set r(value) {
    this.x = value;
  }
  get r() {
    return this.x;
  }
  set g(value) {
    this.y = value;
  }
  get g() {
    return this.y;
  }
  set b(value) {
    this.z = value;
  }
  get b() {
    return this.z;
  }
  set a(value) {
    this.w = value;
  }
  get a() {
    return this.w;
  }
  toString() {
    const { x, y, z, w } = this;
    return `[ r=${x}, g=${y}, b=${z}, a=${w} ]`;
  }
};

// src/math/vec4/Vec4.ts
var Vec4 = class {
  x;
  y;
  z;
  w;
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.set(x, y, z, w);
  }
  set(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }
  toArray(dst = [], index = 0) {
    const { x, y, z, w } = this;
    dst[index] = x;
    dst[index + 1] = y;
    dst[index + 2] = z;
    dst[index + 3] = w;
    return dst;
  }
  fromArray(src, index = 0) {
    return this.set(src[index], src[index + 1], src[index + 2], src[index + 3]);
  }
  toString() {
    const { x, y, z, w } = this;
    return `{ x=${x}, y=${y}, z=${z}, w=${w} }`;
  }
};

// src/math/vec4/Vec4Abs.ts
function Vec4Abs(a, out = new Vec4()) {
  return out.set(Math.abs(a.x), Math.abs(a.y), Math.abs(a.z), Math.abs(a.w));
}

// src/math/vec4/Vec4Add.ts
function Vec4Add(a, b, out = new Vec4()) {
  return out.set(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}

// src/math/vec4/Vec4AddScalar.ts
function Vec4AddScalar(a, scalar, out = new Vec4()) {
  return out.set(a.x + scalar, a.y + scalar, a.z + scalar, a.w + scalar);
}

// src/math/vec4/Vec4Bezier.ts
function Vec4Bezier(a, b, c, d, t, out = new Vec4()) {
  return out.set(Bezier(t, a.x, b.x, c.x, d.x), Bezier(t, a.y, b.y, c.y, d.y), Bezier(t, a.z, b.z, c.z, d.z), Bezier(t, a.w, b.w, c.w, d.w));
}

// src/math/vec4/Vec4CatmullRom.ts
function Vec4CatmullRom(p1, p2, p3, p4, t, out = new Vec4()) {
  return out.set(CatmullRom(t, p1.x, p2.x, p3.x, p4.x), CatmullRom(t, p1.y, p2.y, p3.y, p4.y), CatmullRom(t, p1.z, p2.z, p3.z, p4.z), CatmullRom(t, p1.w, p2.w, p3.w, p4.w));
}

// src/math/vec4/Vec4Ceil.ts
function Vec4Ceil(a, out = new Vec4()) {
  const { x, y, z, w } = a;
  return out.set(Math.ceil(x), Math.ceil(y), Math.ceil(z), Math.ceil(w));
}

// src/math/vec4/Vec4Scale.ts
function Vec4Scale(a, scalar, out = new Vec4()) {
  const { x, y, z, w } = a;
  return out.set(x * scalar, y * scalar, z * scalar, w * scalar);
}

// src/math/vec4/Vec4Center.ts
function Vec4Center(a, b, out = new Vec4()) {
  Vec4Add(a, b, out);
  return Vec4Scale(out, 0.5, out);
}

// src/math/vec4/Vec4Clamp.ts
function Vec4Clamp(a, min, max, out = new Vec4()) {
  return out.set(Clamp(a.x, min.x, max.x), Clamp(a.y, min.y, max.y), Clamp(a.z, min.z, max.z), Clamp(a.w, min.w, max.w));
}

// src/math/vec4/Vec4DivideScalar.ts
function Vec4DivideScalar(a, scalar, out = new Vec4()) {
  const { x, y, z, w } = a;
  return out.set(x / scalar, y / scalar, z / scalar, w / scalar);
}

// src/math/vec4/Vec4ClampLength.ts
function Vec4ClampLength(a, min, max, out = new Vec4()) {
  const length = GetVec4Length(a);
  Vec4DivideScalar(a, length || 1, out);
  return Vec4Scale(out, Clamp(min, max, length), out);
}

// src/math/vec4/Vec4ClampScalar.ts
function Vec4ClampScalar(a, min, max, out = new Vec4()) {
  return out.set(Clamp(a.x, min, max), Clamp(a.y, min, max), Clamp(a.z, min, max), Clamp(a.w, min, max));
}

// src/math/vec4/Vec4Clone.ts
function Vec4Clone(source) {
  const { x, y, z, w } = source;
  return new Vec4(x, y, z, w);
}

// src/math/vec4/Vec4CopyFrom.ts
function Vec4CopyFrom(source, dest) {
  const { x, y, z, w } = source;
  return dest.set(x, y, z, w);
}

// src/math/vec4/Vec4Cross.ts
function Vec4Cross(u, v, w, out = new Vec4()) {
  const { x: ux, y: uy, z: uz, w: uw } = u;
  const { x: vx, y: vy, z: vz, w: vw } = v;
  const { x: wx, y: wy, z: wz, w: ww } = w;
  const A = vx * wy - vy * wx;
  const B = vx * wz - vz * wx;
  const C = vx * ww - vw * wx;
  const D = vy * wz - vz * wy;
  const E = vy * ww - vw * wy;
  const F = vz * ww - vw * wz;
  const G = ux;
  const H = uy;
  const I = uz;
  const J = uw;
  return out.set(H * F - I * E + J * D, -(G * F) + I * C - J * B, G * E - H * C + J * A, -(G * D) + H * B - I * A);
}

// src/math/vec4/Vec4Divide.ts
function Vec4Divide(a, b, out = new Vec4()) {
  return out.set(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);
}

// src/math/vec4/Vec4Dot.ts
function Vec4Dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
}

// src/math/vec4/Vec4Equals.ts
function Vec4Equals(a, b) {
  return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
}

// src/math/vec4/Vec4Floor.ts
function Vec4Floor(a, out = new Vec4()) {
  const { x, y, z, w } = a;
  return out.set(Math.floor(x), Math.floor(y), Math.floor(z), Math.floor(w));
}

// src/math/vec4/Vec4Fract.ts
function Vec4Fract(a, out = new Vec4()) {
  return out.set(a.x - Math.floor(a.x), a.y - Math.floor(a.y), a.z - Math.floor(a.z), a.w - Math.floor(a.w));
}

// src/math/vec4/Vec4FuzzyEquals.ts
function Vec4FuzzyEquals(a, b, epsilon = 1e-4) {
  return FuzzyEqual(a.x, b.x, epsilon) && FuzzyEqual(a.y, b.y, epsilon) && FuzzyEqual(a.z, b.z, epsilon) && FuzzyEqual(a.w, b.w, epsilon);
}

// src/math/vec4/Vec4Hermite.ts
function Vec4Hermite(a, b, c, d, t, out = new Vec4()) {
  return out.set(Hermite(t, a.x, b.x, c.x, d.x), Hermite(t, a.y, b.y, c.y, d.y), Hermite(t, a.z, b.z, c.z, d.z), Hermite(t, a.w, b.w, c.w, d.w));
}

// src/math/vec4/Vec4Lerp.ts
function Vec4Lerp(a, b, t, out = new Vec4()) {
  const { x, y, z, w } = a;
  return out.set(x + t * (b.x - x), y + t * (b.y - y), z + t * (b.z - z), w + t * (b.w - w));
}

// src/math/vec4/Vec4Max.ts
function Vec4Max(a, b, out = new Vec4()) {
  const { x: ax, y: ay, z: az, w: aw } = a;
  const { x: bx, y: by, z: bz, w: bw } = b;
  return out.set(Math.max(ax, bx), Math.max(ay, by), Math.max(az, bz), Math.max(aw, bw));
}

// src/math/vec4/Vec4Min.ts
function Vec4Min(a, b, out = new Vec4()) {
  const { x: ax, y: ay, z: az, w: aw } = a;
  const { x: bx, y: by, z: bz, w: bw } = b;
  return out.set(Math.min(ax, bx), Math.min(ay, by), Math.min(az, bz), Math.min(aw, bw));
}

// src/math/vec4/Vec4Multiply.ts
function Vec4Multiply(a, b, out = new Vec4()) {
  return out.set(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
}

// src/math/vec4/Vec4MultiplyByFloats.ts
function Vec4MultiplyByFloats(a, x, y, z, w, out = new Vec4()) {
  return out.set(a.x * x, a.y * y, a.z * z, a.w * w);
}

// src/math/vec4/Vec4Negate.ts
function Vec4Negate(a, out = new Vec4()) {
  return out.set(-a.x, -a.y, -a.z, -a.w);
}

// src/math/vec4/Vec4Normalize.ts
function Vec4Normalize(a, out = new Vec4()) {
  return Vec4DivideScalar(a, GetVec4Length(a) || 1, out);
}

// src/math/vec4/Vec4One.ts
function Vec4One() {
  return new Vec4(1, 1, 1, 1);
}

// src/math/vec4/Vec4Random.ts
function Vec4Random(a, scale = 1, out = new Vec4()) {
  let v1;
  let v2;
  let v3;
  let v4;
  let s1;
  let s2;
  do {
    v1 = Math.random() * 2 - 1;
    v2 = Math.random() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);
  do {
    v3 = Math.random() * 2 - 1;
    v4 = Math.random() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);
  const d = Math.sqrt((1 - s1) / s2);
  return out.set(scale * v1, scale * v2, scale * v3 * d, scale * v4 * d);
}

// src/math/vec4/Vec4Round.ts
function Vec4Round(a, out = new Vec4()) {
  const { x, y, z, w } = a;
  return out.set(Math.round(x), Math.round(y), Math.round(z), Math.round(w));
}

// src/math/vec4/Vec4RoundToZero.ts
function Vec4RoundToZero(a, out = new Vec4()) {
  const { x, y, z, w } = a;
  return out.set(x < 0 ? Math.ceil(x) : Math.floor(x), y < 0 ? Math.ceil(y) : Math.floor(y), z < 0 ? Math.ceil(z) : Math.floor(z), w < 0 ? Math.ceil(w) : Math.floor(w));
}

// src/math/vec4/Vec4ScaleAndAdd.ts
function Vec4ScaleAndAdd(a, b, scalar, out = new Vec4()) {
  return out.set(a.x + b.x * scalar, a.y + b.y * scalar, a.z + b.z * scalar, a.w + b.w * scalar);
}

// src/math/vec4/Vec4SetLength.ts
function Vec4SetLength(a, length, out = new Vec4()) {
  Vec4Normalize(a, out);
  return Vec4Scale(out, length, out);
}

// src/math/vec4/Vec4Subtract.ts
function Vec4Subtract(a, b, out = new Vec4()) {
  return out.set(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}

// src/math/vec4/Vec4SubtractScalar.ts
function Vec4SubtractScalar(a, scalar, out = new Vec4()) {
  const { x, y, z, w } = a;
  return out.set(x - scalar, y - scalar, z - scalar, w - scalar);
}

// src/math/vec4/Vec4TransformMat4.ts
function Vec4TransformMat4(a, m, out = new Vec4()) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33] = m.data;
  const { x, y, z, w } = a;
  return out.set(m00 * x + m10 * y + m20 * z + m30 * w, m01 * x + m11 * y + m21 * z + m31 * w, m02 * x + m12 * y + m22 * z + m32 * w, m03 * x + m13 * y + m23 * z + m33 * w);
}

// src/math/vec4/Vec4Zero.ts
function Vec4Zero() {
  return new Vec4(0, 0, 0, 0);
}

// src/math/Average.ts
function Average(values) {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += +values[i];
  }
  return sum / values.length;
}

// src/math/CeilTo.ts
function CeilTo(value, place = 0, base = 10) {
  const p = Math.pow(base, -place);
  return Math.ceil(value * p) / p;
}

// src/math/Difference.ts
function Difference(a, b) {
  return Math.abs(a - b);
}

// src/math/FloatBetween.ts
function FloatBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// src/math/FloorTo.ts
function FloorTo(value, place = 0, base = 10) {
  const p = Math.pow(base, -place);
  return Math.floor(value * p) / p;
}

// src/math/GetSpeed.ts
function GetSpeed(distance, time) {
  return distance / time / 1e3;
}

// src/math/MaxAdd.ts
function MaxAdd(value, amount, max) {
  return Math.min(value + amount, max);
}

// src/math/MinSub.ts
function MinSub(value, amount, min) {
  return Math.max(value - amount, min);
}

// src/math/Percent.ts
function Percent(value, min, max, upperMax) {
  if (max === void 0) {
    max = min + 1;
  }
  let percentage = (value - min) / (max - min);
  if (percentage > 1) {
    if (upperMax !== void 0) {
      percentage = (upperMax - value) / (upperMax - max);
      if (percentage < 0) {
        percentage = 0;
      }
    } else {
      percentage = 1;
    }
  } else if (percentage < 0) {
    percentage = 0;
  }
  return percentage;
}

// src/math/RadToDeg.ts
function RadToDeg(radians) {
  return radians * MATH_CONST.RAD_TO_DEG;
}

// src/math/RoundAwayFromZero.ts
function RoundAwayFromZero(value) {
  return value > 0 ? Math.ceil(value) : Math.floor(value);
}

// src/math/RoundTo.ts
function RoundTo(value, place = 0, base = 10) {
  const p = Math.pow(base, -place);
  return Math.round(value * p) / p;
}

// src/math/SinCosTableGenerator.ts
function SinCosTableGenerator(length, sinAmp = 1, cosAmp = 1, frequency = 1) {
  frequency *= Math.PI / length;
  const cos = [];
  const sin = [];
  for (let c = 0; c < length; c++) {
    cosAmp -= sinAmp * frequency;
    sinAmp += cosAmp * frequency;
    cos[c] = cosAmp;
    sin[c] = sinAmp;
  }
  return {
    sin,
    cos,
    length
  };
}

// src/math/Within.ts
function Within(a, b, tolerance) {
  return Math.abs(a - b) <= tolerance;
}

// src/scenes/index.ts
var scenes_exports = {};
__export(scenes_exports, {
  CreateSceneManager: () => CreateSceneManager,
  GetConfigValue: () => GetConfigValue,
  Install: () => Install,
  RenderStats: () => RenderStats,
  Scene: () => Scene,
  SceneManager: () => SceneManager,
  SceneManagerInstance: () => SceneManagerInstance
});

// src/config/scenes/GetScenes.ts
function GetScenes() {
  return ConfigStore.get(CONFIG_DEFAULTS.SCENES);
}

// src/scenes/SceneManagerInstance.ts
var instance7;
var SceneManagerInstance = {
  get: () => {
    return instance7;
  },
  set: (manager) => {
    if (instance7) {
      throw new Error("Cannot instantiate SceneManager more than once");
    }
    instance7 = manager;
  }
};

// src/world/WorldList.ts
var WorldList = new Map();

// src/scenes/SceneManager.ts
var SceneManager = class {
  id = addEntity(GameObjectWorld);
  game;
  scenes = new Map();
  sceneIndex = 0;
  flush;
  constructor() {
    SceneManagerInstance.set(this);
    this.game = GameInstance.get();
    Once(this.game, "boot", () => this.boot());
  }
  boot() {
    const scenes = GetScenes();
    if (scenes) {
      scenes.forEach((scene) => new scene());
    }
  }
  update() {
    const time = this.game.time;
    const delta = time.delta;
    const now = time.lastTick;
    for (const scene of this.scenes.values()) {
      const worlds2 = WorldList.get(scene);
      for (const world2 of worlds2) {
        world2.beforeUpdate(delta, now);
      }
      if (scene.update) {
        scene.update(delta, now);
      }
      for (const world2 of worlds2) {
        world2.update(delta, now);
      }
      for (const world2 of worlds2) {
        world2.afterUpdate(delta, now);
      }
    }
  }
  preRender() {
    const gameFrame = this.game.time.frame;
    for (const scene of this.scenes.values()) {
      const worlds2 = WorldList.get(scene);
      for (const world2 of worlds2) {
        if (world2.preRender(gameFrame)) {
          this.flush = true;
        }
      }
    }
  }
  render(renderPass) {
    for (const scene of this.scenes.values()) {
      const worlds2 = WorldList.get(scene);
      for (const world2 of worlds2) {
        world2.renderGL(renderPass);
      }
    }
    this.flush = false;
  }
};

// src/scenes/CreateSceneManager.ts
function CreateSceneManager() {
  new SceneManager();
}

// src/scenes/GetConfigValue.ts
function GetConfigValue(config, property, defaultValue) {
  if (Object.prototype.hasOwnProperty.call(config, property)) {
    return config[property];
  } else {
    return defaultValue;
  }
}

// src/scenes/Install.ts
function Install(scene, config = {}) {
  const sceneManager = SceneManagerInstance.get();
  const size = sceneManager.scenes.size;
  const sceneIndex = sceneManager.sceneIndex;
  const firstScene = size === 0;
  if (typeof config === "string") {
    scene.key = config;
  } else if (config || !config && firstScene) {
    scene.key = GetConfigValue(config, "key", "scene" + sceneIndex.toString());
  }
  if (sceneManager.scenes.has(scene.key)) {
    console.warn("Scene key already in use: " + scene.key);
  } else {
    sceneManager.scenes.set(scene.key, scene);
    sceneManager.flush = true;
    sceneManager.sceneIndex++;
  }
  WorldList.set(scene, []);
}

// src/scenes/RenderStats.ts
var RenderStats = {
  fps: 0,
  delta: 0,
  gameFrame: 0,
  numScenes: 0,
  numWorlds: 0,
  numGameObjects: 0,
  numGameObjectsRendered: 0,
  numDirtyLocalTransforms: 0,
  numDirtyWorldTransforms: 0,
  numDirtyVertices: 0,
  numDirtyWorldLists: 0,
  numDirtyCameras: 0
};

// src/scenes/Scene.ts
var Scene = class {
  key;
  game;
  events;
  constructor(config) {
    this.game = GameInstance.get();
    this.events = new Map();
    Install(this, config);
  }
};

// src/time/index.ts
var time_exports = {};
__export(time_exports, {
  AddDelayedCall: () => AddDelayedCall,
  AddTimer: () => AddTimer,
  Clock: () => Clock,
  NOOP: () => NOOP2
});

// src/time/NOOP.ts
function NOOP2() {
}

// src/time/AddTimer.ts
function AddTimer(clock, config) {
  const {
    duration = 0,
    repeat = 0,
    delay = -1,
    onStart = NOOP2,
    onUpdate = NOOP2,
    onRepeat = NOOP2,
    onComplete = NOOP2
  } = config;
  const timer = {
    elapsed: duration,
    duration,
    repeat,
    delay,
    update: null,
    onStart,
    onUpdate,
    onRepeat,
    onComplete
  };
  timer.update = (delta) => {
    if (timer.delay > 0) {
      timer.delay -= delta;
      if (timer.delay < 0) {
        timer.delay = 0;
      } else {
        return false;
      }
    }
    if (timer.delay === 0) {
      timer.onStart();
      timer.delay = -1;
    }
    if (timer.delay === -1) {
      timer.elapsed -= delta;
      timer.onUpdate(delta, timer.elapsed / timer.duration);
      if (timer.elapsed <= 0) {
        if (timer.repeat > 0) {
          timer.repeat--;
          timer.elapsed = timer.duration;
          timer.onRepeat(timer.repeat);
        } else {
          timer.elapsed = 0;
          timer.onComplete();
        }
      }
    }
    return timer.elapsed === 0;
  };
  clock.events.add(timer);
}

// src/time/AddDelayedCall.ts
function AddDelayedCall(clock, delay, callback) {
  AddTimer(clock, {
    duration: 0,
    delay,
    onComplete: callback
  });
}

// src/time/Clock.ts
var Clock = class {
  world;
  now;
  timeScale;
  events;
  constructor(world2) {
    this.world = world2;
    this.timeScale = 1;
    this.events = new Set();
  }
  update(delta, time) {
    this.now = time;
    delta *= this.timeScale;
    this.events.forEach((timer) => {
      if (timer.update(delta)) {
        this.events.delete(timer);
      }
    });
  }
};

// src/world/index.ts
var world_exports = {};
__export(world_exports, {
  BaseWorld: () => BaseWorld,
  CreateWorldRenderData: () => CreateWorldRenderData,
  Events: () => events_exports2,
  PreRenderWorld: () => PreRenderWorld,
  ProcessNode: () => ProcessNode,
  RenderGLNode: () => RenderGLNode,
  RenderGLWorld: () => RenderGLWorld,
  ResetWorldRenderData: () => ResetWorldRenderData,
  StaticWorld: () => StaticWorld,
  UpdateNode: () => UpdateNode,
  UpdateWorld: () => UpdateWorld,
  World: () => World,
  WorldList: () => WorldList
});

// src/world/events/index.ts
var events_exports2 = {};
__export(events_exports2, {
  WorldAfterUpdateEvent: () => WorldAfterUpdateEvent,
  WorldBeforeUpdateEvent: () => WorldBeforeUpdateEvent,
  WorldPostRenderEvent: () => WorldPostRenderEvent,
  WorldPreRenderEvent: () => WorldPreRenderEvent,
  WorldRenderEvent: () => WorldRenderEvent,
  WorldShutdownEvent: () => WorldShutdownEvent,
  WorldUpdateEvent: () => WorldUpdateEvent
});

// src/world/events/WorldAfterUpdateEvent.ts
var WorldAfterUpdateEvent = "afterupdate";

// src/world/events/WorldBeforeUpdateEvent.ts
var WorldBeforeUpdateEvent = "beforeupdate";

// src/world/events/WorldPostRenderEvent.ts
var WorldPostRenderEvent = "postrender";

// src/world/events/WorldPreRenderEvent.ts
var WorldPreRenderEvent = "prerender";

// src/world/events/WorldRenderEvent.ts
var WorldRenderEvent = "render";

// src/world/events/WorldShutdownEvent.ts
var WorldShutdownEvent = "shutdown";

// src/world/events/WorldUpdateEvent.ts
var WorldUpdateEvent = "update";

// src/world/CreateWorldRenderData.ts
function CreateWorldRenderData() {
  return {
    gameFrame: 0,
    dirtyLocal: 0,
    dirtyWorld: 0,
    dirtyQuad: 0,
    dirtyColor: 0,
    dirtyView: 0,
    numChildren: 0,
    rendered: 0,
    renderMs: 0,
    preRenderMs: 0,
    updated: 0,
    updateMs: 0,
    fps: 0,
    delta: 0,
    processed: 0
  };
}

// src/world/ResetWorldRenderData.ts
function ResetWorldRenderData(renderData) {
  renderData.rendered = 0;
  renderData.dirtyColor = 0;
  renderData.dirtyLocal = 0;
  renderData.dirtyView = 0;
  renderData.dirtyWorld = 0;
  renderData.dirtyQuad = 0;
  renderData.processed = 0;
  renderData.renderMs = 0;
  renderData.preRenderMs = 0;
  renderData.updated = 0;
  renderData.updateMs = 0;
}

// src/scenes/events/SceneDestroyEvent.ts
var SceneDestroyEvent = "destroy";

// src/world/UpdateWorld.ts
function UpdateWorld(world2, delta, time) {
  if (!WillUpdate(world2.id)) {
    return;
  }
  const start = performance.now();
  let next = GetFirstChildID(world2.id);
  let total = 0;
  while (next > 0) {
    if (WillUpdate(next)) {
      GameObjectCache.get(next).update(delta, time);
      total++;
    }
    next = MoveNextUpdatable(next);
  }
  world2.renderData.updated = total;
  world2.renderData.updateMs = performance.now() - start;
  Emit(world2, WorldUpdateEvent, delta, time);
}

// src/world/BaseWorld.ts
var BaseWorld = class extends GameObject {
  type = "BaseWorld";
  tag = defineComponent();
  scene;
  camera;
  is3D = false;
  updateDisplayList = true;
  color;
  renderData;
  stack;
  totalChildren = 0;
  totalChildrenQuery;
  constructor(scene) {
    super();
    const id = this.id;
    const tag = this.tag;
    this.scene = scene;
    this.totalChildrenQuery = defineQuery([tag]);
    SetWorldID(id, id);
    WorldList.get(scene).push(this);
    this.color = new Color2(id);
    this.events = new Map();
    this.renderData = CreateWorldRenderData();
    this.stack = new Uint32Array(256);
    SetWillTransformChildren(id, false);
    SetWillCacheChildren(id, false);
    Once(scene, SceneDestroyEvent, () => this.destroy());
  }
  getNumChildren() {
    if (this.updateDisplayList) {
      this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
      this.updateDisplayList = false;
    }
    return this.totalChildren;
  }
  beforeUpdate(delta, time) {
    ResetWorldRenderData(this.renderData);
    Emit(this, WorldBeforeUpdateEvent, delta, time, this);
  }
  update(delta, time) {
    UpdateWorld(this, delta, time);
  }
  afterUpdate(delta, time) {
    Emit(this, WorldAfterUpdateEvent, delta, time, this);
  }
  preRender(gameFrame) {
    return true;
  }
  renderGL(renderPass) {
  }
  shutdown() {
    RemoveChildren(this);
    Emit(this, WorldShutdownEvent, this);
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.shutdown();
    if (this.camera) {
      this.camera.destroy();
    }
    this.camera = null;
  }
};

// src/world/ProcessNode.ts
function ProcessNode(node, cameraUpdated, isDisplayList) {
  if (isDisplayList) {
    return HasDirtyDisplayList(node);
  } else if (HasChildren(node) && (cameraUpdated || WillUpdateTransform(node))) {
    return true;
  }
  return false;
}

// src/world/UpdateNode.ts
function UpdateNode(id, parentID, checkColor, checkTransform, cx, cy, cright, cbottom, forceUpdate, parentIsDisplayList, renderData) {
  renderData.dirtyQuad++;
  if (checkColor && HasDirtyColor(id)) {
    const r = ColorComponent.r[id] / 255;
    const g = ColorComponent.g[id] / 255;
    const b = ColorComponent.b[id] / 255;
    const a = ColorComponent.a[id];
    SetQuadColor(id, r, g, b, a);
    ClearDirtyColor(id);
    renderData.dirtyColor++;
  }
  if (checkTransform) {
    let hasUpdated = false;
    if (HasDirtyTransform(id)) {
      UpdateTransforms(id, cx, cy, cright, cbottom, forceUpdate, parentIsDisplayList);
      hasUpdated = true;
      renderData.dirtyLocal++;
    } else if (HasDirtyWorldTransform(parentID)) {
      UpdateWorldTransform(id, parentID, cx, cy, cright, cbottom, forceUpdate, parentIsDisplayList);
      hasUpdated = true;
      renderData.dirtyWorld++;
    } else if (forceUpdate) {
      SetInViewFromBounds(id, cx, cy, cright, cbottom);
      renderData.dirtyView++;
    }
    if (hasUpdated && parentIsDisplayList) {
      GameObjectCache.get(parentID).onUpdateChild(id);
    }
  }
}

// src/world/PreRenderWorld.ts
function PreRenderWorld(world2, gameFrame) {
  const start = performance.now();
  const id = world2.id;
  const renderData = world2.renderData;
  renderData.gameFrame = gameFrame;
  const camera = world2.camera;
  const cameraUpdated = camera.preRender();
  Emit(world2, WorldPreRenderEvent, world2);
  const checkColor = HasDirtyChildColor(id);
  const checkTransform = HasDirtyChildTransform(id) || cameraUpdated;
  if (!checkColor && !checkTransform) {
    return false;
  }
  const cx = camera.getBoundsX();
  const cy = camera.getBoundsY();
  const cright = camera.getBoundsRight();
  const cbottom = camera.getBoundsBottom();
  const stack = world2.stack;
  stack[0] = id;
  let stackIndex = 1;
  let parentNode = id;
  let node = GetFirstChildID(id);
  let isDisplayList = HasCustomDisplayList(node);
  stackBlock: {
    while (stackIndex > 0) {
      UpdateNode(node, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated, isDisplayList, renderData);
      while (ProcessNode(node, cameraUpdated, isDisplayList)) {
        stack[stackIndex++] = node;
        parentNode = node;
        isDisplayList = HasCustomDisplayList(node);
        node = GetFirstChildID(node);
        UpdateNode(node, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated, isDisplayList, renderData);
      }
      let next = GetNextSiblingID(node);
      let climb = true;
      while (next && climb) {
        if (ProcessNode(next, cameraUpdated, isDisplayList)) {
          climb = false;
          break;
        } else {
          UpdateNode(next, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated, isDisplayList, renderData);
          next = GetNextSiblingID(next);
        }
      }
      if (climb) {
        while (next === 0) {
          node = stack[--stackIndex];
          if (!node) {
            break stackBlock;
          }
          next = GetNextSiblingID(node);
        }
        parentNode = stack[stackIndex - 1];
        isDisplayList = HasCustomDisplayList(parentNode);
      }
      node = next;
    }
  }
  ClearDirtyChildColor(id);
  ClearDirtyChildTransform(id);
  world2.getNumChildren();
  renderData.preRenderMs = performance.now() - start;
  return true;
}

// src/world/RenderGLNode.ts
var RENDER_LIST = [];
var RENDER_CHILD_TOTAL = 0;
var PROCESS_TOTAL = 0;
function GetRenderList() {
  return RENDER_LIST;
}
function GetRenderChildTotal() {
  return RENDER_CHILD_TOTAL;
}
function GetProcessTotal() {
  return PROCESS_TOTAL;
}
function ResetRenderChildTotal() {
  RENDER_CHILD_TOTAL = 0;
  PROCESS_TOTAL = 0;
  RENDER_LIST.length = 0;
}
function RenderGLNode(renderPass, id) {
  const inView = IsInView(id) || WillCacheChildren(id);
  let gameObject;
  PROCESS_TOTAL++;
  if (inView) {
    gameObject = GameObjectCache.get(id);
    gameObject.renderGL(renderPass);
    RENDER_CHILD_TOTAL++;
  }
  if (HasCustomDisplayList(id)) {
    gameObject = GameObjectCache.get(id);
    gameObject.renderGL(renderPass);
    RENDER_CHILD_TOTAL++;
    const children = gameObject.getChildren(renderPass);
    const numChildren = children.length;
    for (let i = 0; i < numChildren; i++) {
      const childGameObject = children[i];
      const childID = childGameObject.id;
      PROCESS_TOTAL++;
      if (WillRender(childID)) {
        if (GetNumChildren(childID)) {
          RenderGLNode(renderPass, childID);
        } else {
          childGameObject.renderGL(renderPass);
          childGameObject.postRenderGL(renderPass);
          RENDER_CHILD_TOTAL++;
        }
      }
    }
    gameObject.postRenderGL(renderPass);
  } else {
    const numChildren = HasRenderableChildren(id, renderPass.isCameraDirty());
    if (numChildren) {
      let childID = GetFirstChildID(id);
      for (let i = 0; i < numChildren; i++) {
        PROCESS_TOTAL++;
        if (WillRender(childID)) {
          if (GetNumChildren(childID)) {
            RenderGLNode(renderPass, childID);
          } else if (IsInView(childID)) {
            const childGameObject = GameObjectCache.get(childID);
            childGameObject.renderGL(renderPass);
            childGameObject.postRenderGL(renderPass);
            RENDER_CHILD_TOTAL++;
          }
        }
        childID = GetNextSiblingID(childID);
      }
    }
  }
  if (inView) {
    gameObject.postRenderGL(renderPass);
  }
  ClearDirtyChildTransform(id);
  ClearDirtyWorldTransform(id);
}

// src/world/RenderGLWorld.ts
function RenderGLWorld(world2, renderPass) {
  SetColor(renderPass, world2.color);
  Emit(world2, WorldRenderEvent, renderPass, world2);
  const camera = world2.camera;
  const renderData = world2.renderData;
  const start = performance.now();
  Begin(renderPass, camera);
  ResetRenderChildTotal();
  let id = GetFirstChildID(world2.id);
  while (id > 0) {
    if (WillRender(id)) {
      RenderGLNode(renderPass, id);
    }
    id = GetNextSiblingID(id);
  }
  PopColor(renderPass, world2.color);
  renderData.renderMs = performance.now() - start;
  renderData.numChildren = world2.getNumChildren();
  renderData.rendered = GetRenderChildTotal();
  renderData.processed = GetProcessTotal();
  const gameStats = world2.scene.game.renderStats;
  gameStats.rendered += renderData.rendered;
  gameStats.dirtyColor += renderData.dirtyColor;
  gameStats.dirtyLocal += renderData.dirtyLocal;
  gameStats.dirtyView += renderData.dirtyView;
  gameStats.dirtyWorld += renderData.dirtyWorld;
  gameStats.dirtyQuad += renderData.dirtyQuad;
  gameStats.processed += renderData.processed;
  gameStats.renderMs += renderData.renderMs;
  gameStats.numChildren = renderData.numChildren;
  gameStats.preRenderMs += renderData.preRenderMs;
  gameStats.updated += renderData.updated;
  gameStats.updateMs += renderData.updateMs;
  camera.postRender();
  Emit(world2, WorldPostRenderEvent, renderPass, world2);
}

// src/world/StaticWorld.ts
var StaticWorld = class extends BaseWorld {
  type = "StaticWorld";
  constructor(scene) {
    super(scene);
    const renderer = RendererInstance.get();
    this.camera = new StaticCamera(renderer.width, renderer.height);
  }
  preRender(gameFrame) {
    return PreRenderWorld(this, gameFrame);
  }
  renderGL(renderPass) {
    RenderGLWorld(this, renderPass);
  }
  getRenderList() {
    return GetRenderList();
  }
};

// src/world/World.ts
var World = class extends BaseWorld {
  type = "World";
  constructor(scene) {
    super(scene);
    const renderer = RendererInstance.get();
    this.camera = new WorldCamera(renderer.width, renderer.height);
  }
  preRender(gameFrame) {
    return PreRenderWorld(this, gameFrame);
  }
  renderGL(renderPass) {
    RenderGLWorld(this, renderPass);
  }
  getRenderList() {
    return GetRenderList();
  }
};

// src/config/banner/AddBanner.ts
function AddBanner() {
  const { title, version, url, color, background } = ConfigStore.get(CONFIG_DEFAULTS.BANNER);
  if (title !== "") {
    const str = `${title} ${version}`.trimEnd();
    console.log(`%c${str}%c ${url}`, `padding: 4px 16px; color: ${color}; background: ${background}`, "");
  }
}

// src/config/globalvar/AddGlobalVar.ts
function AddGlobalVar(game) {
  const globalVar = ConfigStore.get(CONFIG_DEFAULTS.GLOBAL_VAR);
  if (globalVar && window) {
    window[globalVar] = game;
  }
}

// src/config/parent/AddToParent.ts
function AddToParent() {
  const parent = ConfigStore.get(CONFIG_DEFAULTS.PARENT);
  const canvas = RendererInstance.get().canvas;
  if (parent && canvas) {
    AddToDOM(canvas, parent);
  }
}

// src/config/renderer/CreateRenderer.ts
function CreateRenderer() {
  const renderer = ConfigStore.get(CONFIG_DEFAULTS.RENDERER);
  if (renderer) {
    new renderer();
  }
}

// src/config/SetConfigDefaults.ts
function SetConfigDefaults() {
  SetBackgroundColor(0);
  SetBatchSize(2048);
  SetBanner("Phaser", "4.0.0", "https://phaser4.io");
  SetMaxTextures(0);
  SetDefaultOrigin(0.5, 0.5);
  SetSize(800, 600, 1);
  SetWebGLContext({
    antialias: true,
    desynchronized: true,
    preserveDrawingBuffer: true
  });
}

// src/components/timer/Time.ts
var Time = class {
  lastTick = 0;
  elapsed = 0;
  delta = 0;
  fps = 60;
  fpsCount = 0;
  frame = 0;
  ms = 0;
  prevFrame = 0;
  constructor() {
    const now = performance.now();
    this.lastTick = now;
    this.prevFrame = now;
  }
  update(time) {
    this.ms = time - this.lastTick;
  }
  updateDelta(time) {
    const now = performance.now();
    const elapsed2 = now - time;
    this.fpsCount++;
    if (now >= this.prevFrame + 1e3) {
      this.fps = this.fpsCount * 1e3 / (now - this.prevFrame);
      this.prevFrame = now;
      this.fpsCount = 0;
    }
    this.lastTick = now;
    this.elapsed += elapsed2;
    this.delta = 1e3 / this.fps;
    this.frame++;
    GameInstance.setFrame(this.frame);
    RenderStats.fps = this.fps;
    RenderStats.delta = 1e3 / this.fps;
    return this.frame;
  }
  resetLastTick() {
    this.lastTick = performance.now();
  }
};

// src/Game.ts
var Game = class extends EventEmitter {
  id = addEntity(GameObjectWorld);
  time;
  isBooted = false;
  isPaused = false;
  willUpdate = true;
  willRender = true;
  renderStats;
  constructor(...settings) {
    super();
    this.time = new Time();
    GameInstance.set(this);
    SetConfigDefaults();
    DOMContentLoaded(() => this.boot(settings));
  }
  boot(settings) {
    settings.forEach((setting) => setting());
    CreateRenderer();
    CreateTextureManager();
    CreateSceneManager();
    AddBanner();
    AddGlobalVar(this);
    AddToParent();
    this.isBooted = true;
    this.renderStats = CreateWorldRenderData();
    Emit(this, "boot");
    requestAnimationFrame((now) => this.step(now));
  }
  pause() {
    this.isPaused = true;
  }
  resume() {
    this.isPaused = false;
    this.time.resetLastTick();
  }
  update(delta, time) {
  }
  render(renderPass, delta, time) {
  }
  step(now) {
    const renderer = RendererInstance.get();
    const sceneManager = SceneManagerInstance.get();
    const time = this.time;
    ResetWorldRenderData(this.renderStats);
    time.update(now);
    if (!this.isPaused) {
      const delta = time.delta;
      if (this.willUpdate) {
        sceneManager.update();
        this.update(delta, now);
        Emit(this, "update", delta, now);
      }
      if (this.willRender) {
        sceneManager.preRender();
        renderer.begin(sceneManager.flush);
        const renderPass = renderer.renderPass;
        sceneManager.render(renderPass);
        this.render(renderPass, delta, now);
        Emit(this, "render", renderPass, delta, now);
        renderer.end();
      }
    }
    time.updateDelta(now);
    Emit(this, "step");
    this.renderStats.fps = time.fps;
    this.renderStats.delta = time.delta;
    requestAnimationFrame((now2) => this.step(now2));
  }
  destroy() {
  }
};

// src/CreateGame.ts
function CreateGame(...settings) {
  const game = new Game(...settings);
  return new Promise((resolve) => {
    if (game.isBooted) {
      resolve(game);
    } else {
      Once(game, "boot", () => {
        resolve(game);
      });
    }
  });
}
export {
  animation_exports as Animation,
  camera_exports as Camera,
  color_exports as Color,
  config_exports as Config,
  CreateGame,
  dom_exports as DOM,
  device_exports as Device,
  display_exports as Display,
  events_exports as Events,
  Game,
  gameobjects_exports as GameObjects,
  geom_exports as Geom,
  input_exports2 as Input,
  loader_exports as Loader,
  math_exports as Math,
  Scene,
  scenes_exports as Scenes,
  textures_exports as Textures,
  time_exports as Time,
  webgl1_exports as WebGL1,
  world_exports as World
};
/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Florian Mertens
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
