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
  let prevFrame;
  for (const frame2 of animation.frames.values()) {
    if (!prevFrame) {
      frame2.isFirst = true;
      animation.firstFrame = frame2;
      firstFrame = frame2;
    } else {
      prevFrame.nextFrame = frame2;
      frame2.prevFrame = prevFrame;
    }
    prevFrame = frame2;
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
    instance = manager;
  }
};

// src/textures/GetTexture.ts
function GetTexture(key) {
  return TextureManagerInstance.get().get(key);
}

// src/textures/index.ts
var textures_exports = {};
__export(textures_exports, {
  CreateCanvas: () => CreateCanvas,
  Frame: () => Frame,
  GetFrames: () => GetFrames,
  GetFramesInRange: () => GetFramesInRange,
  Palettes: () => palettes_exports,
  Parsers: () => parsers_exports,
  SetFilter: () => SetFilter,
  Texture: () => Texture,
  TextureManager: () => TextureManager,
  Types: () => types_exports
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
  SpriteSheetParser: () => SpriteSheetParser
});

// src/textures/parsers/AtlasParser.ts
function AtlasParser(texture, data) {
  let frames;
  if (Array.isArray(data.textures)) {
    frames = data.textures[0].frames;
  } else if (Array.isArray(data.frames)) {
    frames = data.frames;
  } else if (data.hasOwnProperty("frames")) {
    frames = Object.values(data.frames);
  } else {
    console.warn("Invalid Texture Atlas JSON");
  }
  if (frames) {
    let newFrame;
    for (let i = 0; i < frames.length; i++) {
      const src = frames[i];
      newFrame = texture.addFrame(src.filename, src.frame.x, src.frame.y, src.frame.w, src.frame.h);
      if (src.trimmed) {
        newFrame.setTrim(src.sourceSize.w, src.sourceSize.h, src.spriteSourceSize.x, src.spriteSourceSize.y, src.spriteSourceSize.w, src.spriteSourceSize.h);
      } else {
        newFrame.setSourceSize(src.sourceSize.w, src.sourceSize.h);
      }
      if (src.rotated) {
      }
      if (src.anchor) {
        newFrame.setPivot(src.anchor.x, src.anchor.y);
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

// src/textures/parsers/SpriteSheetParser.ts
function SpriteSheetParser(texture, x, y, width, height, frameConfig) {
  const {
    frameWidth = null,
    endFrame = -1,
    margin = 0,
    spacing = 0
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
  const row = Math.floor((width - margin + spacing) / (frameWidth + spacing));
  const column = Math.floor((height - margin + spacing) / (frameHeight + spacing));
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
    fx += frameWidth + spacing;
    if (fx + frameWidth > width) {
      fx = margin;
      fy += frameHeight + spacing;
    }
  }
}

// src/textures/types/index.ts
var types_exports = {};
__export(types_exports, {
  CanvasTexture: () => CanvasTexture,
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

// node_modules/bitecs/dist/index.es.js
var TYPES_ENUM = {
  i8: "i8",
  ui8: "ui8",
  ui8c: "ui8c",
  i16: "i16",
  ui16: "ui16",
  i32: "i32",
  ui32: "ui32",
  f32: "f32",
  f64: "f64"
};
var TYPES_NAMES = {
  i8: "Int8",
  ui8: "Uint8",
  ui8c: "Uint8Clamped",
  i16: "Int16",
  ui16: "Uint16",
  i32: "Int32",
  ui32: "Uint32",
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
  f64: Float64Array
};
var UNSIGNED_MAX = {
  uint8: 2 ** 8,
  uint16: 2 ** 16,
  uint32: 2 ** 32
};
var $storeRef = Symbol("storeRef");
var $storeSize = Symbol("storeSize");
var $storeMaps = Symbol("storeMaps");
var $storeFlattened = Symbol("storeFlattened");
var $storeBase = Symbol("storeBase");
var $storeType = Symbol("storeType");
var $storeArrayCounts = Symbol("storeArrayCount");
var $storeSubarrays = Symbol("storeSubarrays");
var $storeCursor = Symbol("storeCursor");
var $subarrayCursors = Symbol("subarrayCursors");
var $subarray = Symbol("subarray");
var $parentArray = Symbol("subStore");
var $tagStore = Symbol("tagStore");
var $queryShadow = Symbol("queryShadow");
var $serializeShadow = Symbol("serializeShadow");
var $indexType = Symbol("indexType");
var $indexBytes = Symbol("indexBytes");
var stores = {};
var resize = (ta, size) => {
  const newBuffer = new ArrayBuffer(size * ta.BYTES_PER_ELEMENT);
  const newTa = new ta.constructor(newBuffer);
  newTa.set(ta, 0);
  return newTa;
};
var resizeSubarray = (metadata, store, size) => {
  const cursors = metadata[$subarrayCursors];
  const type = store[$storeType];
  const length = store[0].length;
  const indexType = length <= UNSIGNED_MAX.uint8 ? "ui8" : length <= UNSIGNED_MAX.uint16 ? "ui16" : "ui32";
  const arrayCount = metadata[$storeArrayCounts][type];
  const summedLength = Array(arrayCount).fill(0).reduce((a, p) => a + length, 0);
  const array = new TYPES[type](summedLength * size);
  array.set(metadata[$storeSubarrays][type]);
  metadata[$storeSubarrays][type] = array;
  metadata[$storeSubarrays][type][$queryShadow] = array.slice(0);
  metadata[$storeSubarrays][type][$serializeShadow] = array.slice(0);
  array[$indexType] = TYPES_NAMES[indexType];
  array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
  const start = cursors[type];
  let end = 0;
  for (let eid = 0; eid < size; eid++) {
    const from = cursors[type] + eid * length;
    const to = from + length;
    store[eid] = metadata[$storeSubarrays][type].subarray(from, to);
    store[eid].from = from;
    store[eid].to = to;
    store[eid][$queryShadow] = metadata[$storeSubarrays][type][$queryShadow].subarray(from, to);
    store[eid][$serializeShadow] = metadata[$storeSubarrays][type][$serializeShadow].subarray(from, to);
    store[eid][$subarray] = true;
    store[eid][$indexType] = array[$indexType];
    store[eid][$indexBytes] = array[$indexBytes];
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
      store[key][$queryShadow] = resize(ta[$queryShadow], size);
      store[key][$serializeShadow] = resize(ta[$serializeShadow], size);
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
  return new TYPES[type](buffer);
};
var createArrayStore = (metadata, type, length) => {
  const size = metadata[$storeSize];
  const store = Array(size).fill(0);
  store[$storeType] = type;
  const cursors = metadata[$subarrayCursors];
  const indexType = length < UNSIGNED_MAX.uint8 ? "ui8" : length < UNSIGNED_MAX.uint16 ? "ui16" : "ui32";
  if (!length)
    throw new Error("\u274C Must define a length for component array.");
  if (!TYPES[type])
    throw new Error(`\u274C Invalid component array property type ${type}.`);
  if (!metadata[$storeSubarrays][type]) {
    const arrayCount = metadata[$storeArrayCounts][type];
    const summedLength = Array(arrayCount).fill(0).reduce((a, p) => a + length, 0);
    const array = new TYPES[type](summedLength * size);
    metadata[$storeSubarrays][type] = array;
    metadata[$storeSubarrays][type][$queryShadow] = array.slice(0);
    metadata[$storeSubarrays][type][$serializeShadow] = array.slice(0);
    array[$indexType] = TYPES_NAMES[indexType];
    array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
  }
  const start = cursors[type];
  let end = 0;
  for (let eid = 0; eid < size; eid++) {
    const from = cursors[type] + eid * length;
    const to = from + length;
    store[eid] = metadata[$storeSubarrays][type].subarray(from, to);
    store[eid].from = from;
    store[eid].to = to;
    store[eid][$queryShadow] = metadata[$storeSubarrays][type][$queryShadow].subarray(from, to);
    store[eid][$serializeShadow] = metadata[$storeSubarrays][type][$serializeShadow].subarray(from, to);
    store[eid][$subarray] = true;
    store[eid][$indexType] = TYPES_NAMES[indexType];
    store[eid][$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    end = to;
  }
  cursors[type] = end;
  store[$parentArray] = metadata[$storeSubarrays][type].subarray(start, end);
  return store;
};
var createShadows = (store) => {
  store[$queryShadow] = store.slice(0);
  store[$serializeShadow] = store.slice(0);
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
    [$storeCursor]: 0,
    [$subarrayCursors]: Object.keys(TYPES).reduce((a, type) => ({
      ...a,
      [type]: 0
    }), {}),
    [$storeFlattened]: [],
    [$storeArrayCounts]: arrayCounts
  };
  if (schema instanceof Object && Object.keys(schema).length) {
    const recursiveTransform = (a, k) => {
      if (typeof a[k] === "string") {
        a[k] = createTypeStore(a[k], size);
        createShadows(a[k]);
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
var resized = false;
var setSerializationResized = (v) => {
  resized = v;
};
var newEntities = new Map();
var $entityMasks = Symbol("entityMasks");
var $entityEnabled = Symbol("entityEnabled");
var $entityArray = Symbol("entityArray");
var $entityIndices = Symbol("entityIndices");
var NONE$1 = 2 ** 32 - 1;
var defaultSize = 1e5;
var globalEntityCursor = 0;
var globalSize = defaultSize;
var resizeThreshold = () => globalSize - globalSize / 5;
var getGlobalSize = () => globalSize;
var removed = [];
var getDefaultSize = () => defaultSize;
var getEntityCursor = () => globalEntityCursor;
var eidToWorld = new Map();
var addEntity = (world3) => {
  const enabled = world3[$entityEnabled];
  const eid = removed.length > 0 ? removed.shift() : globalEntityCursor++;
  enabled[eid] = 1;
  world3[$entityIndices][eid] = world3[$entityArray].push(eid) - 1;
  eidToWorld.set(eid, world3);
  if (globalEntityCursor >= resizeThreshold()) {
    const size = globalSize;
    const amount = Math.ceil(size / 2 / 4) * 4;
    const newSize = size + amount;
    globalSize = newSize;
    resizeWorlds(newSize);
    resizeComponents(newSize);
    setSerializationResized(true);
    console.info(`\u{1F47E} bitECS - resizing all worlds from ${size} to ${size + amount}`);
  }
  return eid;
};
function Changed(c) {
  return function QueryChanged() {
    return c;
  };
}
var $queries = Symbol("queries");
var $queryMap = Symbol("queryMap");
var $dirtyQueries = Symbol("$dirtyQueries");
var $queryComponents = Symbol("queryComponents");
var NONE = 2 ** 32 - 1;
var registerQuery = (world3, query) => {
  let components2 = [];
  let notComponents = [];
  let changedComponents = [];
  query[$queryComponents].forEach((c) => {
    if (typeof c === "function") {
      if (c.name === "QueryNot") {
        notComponents.push(c());
      }
      if (c.name === "QueryChanged") {
        changedComponents.push(c());
        components2.push(c());
      }
    } else {
      components2.push(c);
    }
  });
  const mapComponents = (c) => world3[$componentMap].get(c);
  const size = components2.concat(notComponents).reduce((a, c) => c[$storeSize] > a ? c[$storeSize] : a, 0);
  const entities3 = [];
  const changed = [];
  const indices = new Uint32Array(size).fill(NONE);
  const enabled = new Uint8Array(size);
  const generations = components2.concat(notComponents).map((c) => {
    if (!world3[$componentMap].has(c))
      registerComponent(world3, c);
    return c;
  }).map(mapComponents).map((c) => c.generationId).reduce((a, v) => {
    if (a.includes(v))
      return a;
    a.push(v);
    return a;
  }, []);
  const reduceBitmasks = (a, c) => {
    if (!a[c.generationId])
      a[c.generationId] = 0;
    a[c.generationId] |= c.bitflag;
    return a;
  };
  const masks = components2.map(mapComponents).reduce(reduceBitmasks, {});
  const notMasks = notComponents.map(mapComponents).reduce((a, c) => {
    if (!a[c.generationId]) {
      a[c.generationId] = 0;
      a[c.generationId] |= c.bitflag;
    }
    return a;
  }, {});
  const flatProps = components2.map((c) => Object.getOwnPropertySymbols(c).includes($storeFlattened) ? c[$storeFlattened] : [c]).reduce((a, v) => a.concat(v), []);
  const toRemove = [];
  const entered = [];
  const exited = [];
  world3[$queryMap].set(query, {
    entities: entities3,
    changed,
    enabled,
    components: components2,
    notComponents,
    changedComponents,
    masks,
    notMasks,
    generations,
    indices,
    flatProps,
    toRemove,
    entered,
    exited
  });
  world3[$queries].add(query);
  for (let eid = 0; eid < getEntityCursor(); eid++) {
    if (!world3[$entityEnabled][eid])
      continue;
    if (queryCheckEntity(world3, query, eid)) {
      queryAddEntity(world3, query, eid);
    }
  }
};
var diff = (q, clearDiff) => {
  if (clearDiff)
    q.changed.length = 0;
  const flat = q.flatProps;
  for (let i = 0; i < q.entities.length; i++) {
    const eid = q.entities[i];
    let dirty = false;
    for (let pid = 0; pid < flat.length; pid++) {
      const prop = flat[pid];
      if (ArrayBuffer.isView(prop[eid])) {
        for (let i2 = 0; i2 < prop[eid].length; i2++) {
          if (prop[eid][i2] !== prop[eid][$queryShadow][i2]) {
            dirty = true;
            prop[eid][$queryShadow][i2] = prop[eid][i2];
          }
        }
      } else {
        if (prop[eid] !== prop[$queryShadow][eid]) {
          dirty = true;
          prop[$queryShadow][eid] = prop[eid];
        }
      }
    }
    if (dirty)
      q.changed.push(eid);
  }
  return q.changed;
};
var defineQuery = (components2) => {
  if (components2 === void 0 || components2[$componentMap] !== void 0) {
    return (world3) => world3 ? world3[$entityArray] : components2[$entityArray];
  }
  const query = function(world3, clearDiff = true) {
    if (!world3[$queryMap].has(query))
      registerQuery(world3, query);
    const q = world3[$queryMap].get(query);
    queryCommitRemovals(world3, q);
    if (q.changedComponents.length)
      return diff(q, clearDiff);
    return q.entities;
  };
  query[$queryComponents] = components2;
  return query;
};
var queryCheckEntity = (world3, query, eid) => {
  const {
    masks,
    notMasks,
    generations
  } = world3[$queryMap].get(query);
  for (let i = 0; i < generations.length; i++) {
    const generationId = generations[i];
    const qMask = masks[generationId];
    const qNotMask = notMasks[generationId];
    const eMask = world3[$entityMasks][generationId][eid];
    if (qNotMask && (eMask & qNotMask) !== 0) {
      return false;
    }
    if (qMask && (eMask & qMask) !== qMask) {
      return false;
    }
  }
  return true;
};
var queryCheckComponent = (world3, query, component) => {
  const {
    generationId,
    bitflag
  } = world3[$componentMap].get(component);
  const {
    masks
  } = world3[$queryMap].get(query);
  const mask = masks[generationId];
  return (mask & bitflag) === bitflag;
};
var queryAddEntity = (world3, query, eid) => {
  const q = world3[$queryMap].get(query);
  if (q.enabled[eid])
    return;
  q.enabled[eid] = true;
  q.entities.push(eid);
  q.indices[eid] = q.entities.length - 1;
  q.entered.push(eid);
};
var queryCommitRemovals = (world3, q) => {
  while (q.toRemove.length) {
    const eid = q.toRemove.pop();
    const index = q.indices[eid];
    if (index === NONE)
      continue;
    const swapped = q.entities.pop();
    if (swapped !== eid) {
      q.entities[index] = swapped;
      q.indices[swapped] = index;
    }
    q.indices[eid] = NONE;
  }
  world3[$dirtyQueries].delete(q);
};
var commitRemovals = (world3) => {
  world3[$dirtyQueries].forEach((q) => {
    queryCommitRemovals(world3, q);
  });
};
var $componentMap = Symbol("componentMap");
var components = [];
var resizeComponents = (size) => {
  components.forEach((component) => resizeStore(component, size));
};
var defineComponent = (schema) => {
  const component = createStore(schema, getDefaultSize());
  if (schema && Object.keys(schema).length)
    components.push(component);
  return component;
};
var incrementBitflag = (world3) => {
  world3[$bitflag] *= 2;
  if (world3[$bitflag] >= 2 ** 32) {
    world3[$bitflag] = 1;
    world3[$entityMasks].push(new Uint32Array(world3[$size]));
  }
};
var registerComponent = (world3, component) => {
  world3[$componentMap].set(component, {
    generationId: world3[$entityMasks].length - 1,
    bitflag: world3[$bitflag],
    store: component
  });
  if (component[$storeSize] < world3[$size]) {
    resizeStore(component, world3[$size]);
  }
  incrementBitflag(world3);
};
var hasComponent = (world3, component, eid) => {
  const registeredComponent = world3[$componentMap].get(component);
  if (!registeredComponent)
    return;
  const {
    generationId,
    bitflag
  } = registeredComponent;
  const mask = world3[$entityMasks][generationId][eid];
  return (mask & bitflag) === bitflag;
};
var addComponent = (world3, component, eid, reset = false) => {
  if (!Number.isInteger(eid)) {
    component = world3;
    world3 = eidToWorld.get(eid);
    reset = eid || reset;
  }
  if (!world3[$componentMap].has(component))
    registerComponent(world3, component);
  if (hasComponent(world3, component, eid))
    return;
  const {
    generationId,
    bitflag
  } = world3[$componentMap].get(component);
  world3[$entityMasks][generationId][eid] |= bitflag;
  world3[$queries].forEach((query) => {
    if (!queryCheckComponent(world3, query, component))
      return;
    const match = queryCheckEntity(world3, query, eid);
    if (match)
      queryAddEntity(world3, query, eid);
  });
  if (reset)
    resetStoreFor(component, eid);
};
var $size = Symbol("size");
var $resizeThreshold = Symbol("resizeThreshold");
var $bitflag = Symbol("bitflag");
var worlds = [];
var resizeWorlds = (size) => {
  worlds.forEach((world3) => {
    world3[$size] = size;
    world3[$queryMap].forEach((q) => {
      q.indices = resize(q.indices, size);
      q.enabled = resize(q.enabled, size);
    });
    world3[$entityEnabled] = resize(world3[$entityEnabled], size);
    world3[$entityIndices] = resize(world3[$entityIndices], size);
    for (let i = 0; i < world3[$entityMasks].length; i++) {
      const masks = world3[$entityMasks][i];
      world3[$entityMasks][i] = resize(masks, size);
    }
    world3[$resizeThreshold] = world3[$size] - world3[$size] / 5;
  });
};
var createWorld = () => {
  const world3 = {};
  const size = getGlobalSize();
  world3[$size] = size;
  world3[$entityEnabled] = new Uint8Array(size);
  world3[$entityMasks] = [new Uint32Array(size)];
  world3[$entityArray] = [];
  world3[$entityIndices] = new Uint32Array(size);
  world3[$bitflag] = 1;
  world3[$componentMap] = new Map();
  world3[$queryMap] = new Map();
  world3[$queries] = new Set();
  world3[$dirtyQueries] = new Set();
  worlds.push(world3);
  return world3;
};
var defineSystem = (fn1, fn2) => {
  const update = fn2 !== void 0 ? fn2 : fn1;
  const create = fn2 !== void 0 ? fn1 : void 0;
  const init = new Set();
  const system = (world3, ...args) => {
    if (create && !init.has(world3)) {
      create(world3, ...args);
      init.add(world3);
    }
    update(world3, ...args);
    commitRemovals(world3);
    return world3;
  };
  Object.defineProperty(system, "name", {
    value: (update.name || "AnonymousSystem") + "_internal",
    configurable: true
  });
  return system;
};
var Types = TYPES_ENUM;

// src/components/vertices/QuadVertexComponent.ts
var QuadVertex = defineComponent({
  v1: Types.ui32,
  v2: Types.ui32,
  v3: Types.ui32,
  v4: Types.ui32
});
var QuadVertexComponent = QuadVertex;

// src/components/transform/Extent2DComponent.ts
var Extent2D = defineComponent({
  x: Types.f32,
  y: Types.f32,
  width: Types.f32,
  height: Types.f32,
  right: Types.f32,
  bottom: Types.f32
});
var Extent2DComponent = Extent2D;

// src/components/dirty/index.ts
var dirty_exports = {};
__export(dirty_exports, {
  AddDirtyComponent: () => AddDirtyComponent,
  ClearDirtyDisplayList: () => ClearDirtyDisplayList,
  DirtyComponent: () => DirtyComponent,
  GetDirtyFrame: () => GetDirtyFrame,
  HasDirtyAlpha: () => HasDirtyAlpha,
  HasDirtyBounds: () => HasDirtyBounds,
  HasDirtyChild: () => HasDirtyChild,
  HasDirtyChildCache: () => HasDirtyChildCache,
  HasDirtyDisplayList: () => HasDirtyDisplayList,
  HasDirtyPostRender: () => HasDirtyPostRender,
  HasDirtyTexture: () => HasDirtyTexture,
  HasDirtyTextureFrame: () => HasDirtyTextureFrame,
  HasDirtyTransform: () => HasDirtyTransform,
  HasDirtyUpdate: () => HasDirtyUpdate,
  HasDirtyVertexColors: () => HasDirtyVertexColors,
  IsDirtyFrame: () => IsDirtyFrame,
  SetDirtyAlpha: () => SetDirtyAlpha,
  SetDirtyBounds: () => SetDirtyBounds,
  SetDirtyChild: () => SetDirtyChild,
  SetDirtyChildCache: () => SetDirtyChildCache,
  SetDirtyDisplayList: () => SetDirtyDisplayList,
  SetDirtyFrame: () => SetDirtyFrame,
  SetDirtyPostRender: () => SetDirtyPostRender,
  SetDirtyTexture: () => SetDirtyTexture,
  SetDirtyTextureFrame: () => SetDirtyTextureFrame,
  SetDirtyTransform: () => SetDirtyTransform,
  SetDirtyUpdate: () => SetDirtyUpdate,
  SetDirtyVertexColors: () => SetDirtyVertexColors
});

// src/components/dirty/DirtyComponent.ts
var Dirty = defineComponent({
  frame: Types.ui32,
  transform: Types.ui32,
  update: Types.ui32,
  childCache: Types.ui32,
  postRender: Types.ui32,
  vertexColors: Types.ui32,
  bounds: Types.ui32,
  texture: Types.ui32,
  textureFrame: Types.ui32,
  alpha: Types.ui32,
  child: Types.ui32,
  displayList: Types.ui32
});
var DirtyComponent = Dirty;

// src/GameObjectWorld.ts
var world = createWorld();
var GameObjectWorld = world;

// src/components/dirty/AddDirtyComponent.ts
function AddDirtyComponent(id) {
  addComponent(GameObjectWorld, DirtyComponent, id);
  DirtyComponent.frame[id] = 0;
  DirtyComponent.transform[id] = 1;
  DirtyComponent.update[id] = 1;
  DirtyComponent.childCache[id] = 0;
  DirtyComponent.postRender[id] = 0;
  DirtyComponent.vertexColors[id] = 1;
  DirtyComponent.bounds[id] = 1;
  DirtyComponent.texture[id] = 0;
  DirtyComponent.textureFrame[id] = 0;
  DirtyComponent.alpha[id] = 0;
  DirtyComponent.child[id] = 0;
  DirtyComponent.displayList[id] = 0;
}

// src/components/dirty/ClearDirtyDisplayList.ts
function ClearDirtyDisplayList(id) {
  DirtyComponent.displayList[id] = 0;
}

// src/components/dirty/GetDirtyFrame.ts
function GetDirtyFrame(id) {
  return DirtyComponent.frame[id];
}

// src/components/dirty/HasDirtyAlpha.ts
function HasDirtyAlpha(id) {
  return Boolean(DirtyComponent.alpha[id]);
}

// src/components/dirty/HasDirtyBounds.ts
function HasDirtyBounds(id) {
  return Boolean(DirtyComponent.bounds[id]);
}

// src/components/dirty/HasDirtyChild.ts
function HasDirtyChild(id) {
  return Boolean(DirtyComponent.child[id]);
}

// src/components/dirty/HasDirtyChildCache.ts
function HasDirtyChildCache(id) {
  return Boolean(DirtyComponent.childCache[id]);
}

// src/components/dirty/HasDirtyDisplayList.ts
function HasDirtyDisplayList(id) {
  return Boolean(DirtyComponent.displayList[id]);
}

// src/components/dirty/HasDirtyPostRender.ts
function HasDirtyPostRender(id) {
  return Boolean(DirtyComponent.postRender[id]);
}

// src/components/dirty/HasDirtyTexture.ts
function HasDirtyTexture(id) {
  return Boolean(DirtyComponent.texture[id]);
}

// src/components/dirty/HasDirtyTextureFrame.ts
function HasDirtyTextureFrame(id) {
  return Boolean(DirtyComponent.textureFrame[id]);
}

// src/components/dirty/HasDirtyTransform.ts
function HasDirtyTransform(id) {
  return Boolean(DirtyComponent.transform[id]);
}

// src/components/dirty/HasDirtyUpdate.ts
function HasDirtyUpdate(id) {
  return Boolean(DirtyComponent.update[id]);
}

// src/components/dirty/HasDirtyVertexColors.ts
function HasDirtyVertexColors(id) {
  return Boolean(DirtyComponent.vertexColors[id]);
}

// src/components/dirty/IsDirtyFrame.ts
function IsDirtyFrame(id, gameFrame) {
  return DirtyComponent.frame[id] >= gameFrame;
}

// src/components/dirty/SetDirtyAlpha.ts
function SetDirtyAlpha(id) {
  DirtyComponent.alpha[id] = 1;
}

// src/components/dirty/SetDirtyBounds.ts
function SetDirtyBounds(id) {
  DirtyComponent.bounds[id] = 1;
}

// src/components/dirty/SetDirtyChild.ts
function SetDirtyChild(id) {
  DirtyComponent.child[id] = 1;
}

// src/components/dirty/SetDirtyChildCache.ts
function SetDirtyChildCache(id) {
  DirtyComponent.childCache[id] = 1;
}

// src/components/dirty/SetDirtyDisplayList.ts
function SetDirtyDisplayList(id) {
  DirtyComponent.displayList[id] = 1;
}

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

// src/components/dirty/SetDirtyFrame.ts
function SetDirtyFrame(id) {
  DirtyComponent.frame[id] = GameInstance.getFrame();
}

// src/components/dirty/SetDirtyPostRender.ts
function SetDirtyPostRender(id) {
  DirtyComponent.postRender[id] = 1;
}

// src/components/dirty/SetDirtyTexture.ts
function SetDirtyTexture(id) {
  DirtyComponent.texture[id] = 1;
}

// src/components/dirty/SetDirtyTextureFrame.ts
function SetDirtyTextureFrame(id) {
  DirtyComponent.textureFrame[id] = 1;
}

// src/components/dirty/SetDirtyTransform.ts
function SetDirtyTransform(id) {
  DirtyComponent.transform[id] = 1;
}

// src/components/dirty/SetDirtyUpdate.ts
function SetDirtyUpdate(id) {
  DirtyComponent.update[id] = 1;
}

// src/components/dirty/SetDirtyVertexColors.ts
function SetDirtyVertexColors(id) {
  DirtyComponent.vertexColors[id] = 1;
}

// src/components/transform/SetExtent.ts
function SetExtent(id, x, y, width, height) {
  Extent2DComponent.x[id] = x;
  Extent2DComponent.y[id] = y;
  Extent2DComponent.width[id] = width;
  Extent2DComponent.height[id] = height;
  Extent2DComponent.right[id] = x + width;
  Extent2DComponent.bottom[id] = y + height;
  SetDirtyTransform(id);
}

// src/components/vertices/VertexComponent.ts
var Vertex = defineComponent({
  x: Types.f32,
  y: Types.f32,
  z: Types.f32,
  u: Types.f32,
  v: Types.f32,
  texture: Types.ui8,
  tint: Types.ui32,
  alpha: Types.f32,
  color: Types.ui32,
  offset: Types.f32
});
var VertexComponent = Vertex;

// src/components/vertices/SetUV.ts
function SetUV(id, u, v) {
  VertexComponent.u[id] = u;
  VertexComponent.v[id] = v;
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
    this.updateUVs();
  }
  setPivot(x, y) {
    this.pivot = { x, y };
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.sourceSizeWidth = width;
    this.sourceSizeHeight = height;
    this.updateUVs();
  }
  setSourceSize(width, height) {
    this.sourceSizeWidth = width;
    this.sourceSizeHeight = height;
  }
  setTrim(width, height, x, y, w, h) {
    this.trimmed = true;
    this.sourceSizeWidth = width;
    this.sourceSizeHeight = height;
    this.spriteSourceSizeX = x;
    this.spriteSourceSizeY = y;
    this.spriteSourceSizeWidth = w;
    this.spriteSourceSizeHeight = h;
  }
  getExtent(originX, originY) {
    const sourceSizeWidth = this.sourceSizeWidth;
    const sourceSizeHeight = this.sourceSizeHeight;
    let left;
    let right;
    let top;
    let bottom;
    if (this.trimmed) {
      left = this.spriteSourceSizeX - originX * sourceSizeWidth;
      right = left + this.spriteSourceSizeWidth;
      top = this.spriteSourceSizeY - originY * sourceSizeHeight;
      bottom = top + this.spriteSourceSizeHeight;
    } else {
      left = -originX * sourceSizeWidth;
      right = left + sourceSizeWidth;
      top = -originY * sourceSizeHeight;
      bottom = top + sourceSizeHeight;
    }
    return { left, right, top, bottom };
  }
  copyToExtent(child) {
    const originX = child.originX;
    const originY = child.originY;
    const sourceSizeWidth = this.sourceSizeWidth;
    const sourceSizeHeight = this.sourceSizeHeight;
    let x;
    let y;
    let width;
    let height;
    if (this.trimmed) {
      x = this.spriteSourceSizeX - originX * sourceSizeWidth;
      y = this.spriteSourceSizeY - originY * sourceSizeHeight;
      width = this.spriteSourceSizeWidth;
      height = this.spriteSourceSizeHeight;
    } else {
      x = -originX * sourceSizeWidth;
      y = -originY * sourceSizeHeight;
      width = sourceSizeWidth;
      height = sourceSizeHeight;
    }
    SetExtent(child.id, x, y, width, height);
    return this;
  }
  copyToVertices(id) {
    const { u0, u1, v0, v1 } = this;
    SetUV(QuadVertexComponent.v1[id], u0, v0);
    SetUV(QuadVertexComponent.v2[id], u0, v1);
    SetUV(QuadVertexComponent.v3[id], u1, v1);
    SetUV(QuadVertexComponent.v4[id], u1, v0);
    return this;
  }
  updateUVs() {
    const { x, y, width, height } = this;
    const baseTextureWidth = this.texture.width;
    const baseTextureHeight = this.texture.height;
    this.u0 = x / baseTextureWidth;
    this.v0 = y / baseTextureHeight;
    this.u1 = (x + width) / baseTextureWidth;
    this.v1 = (y + height) / baseTextureHeight;
  }
  destroy() {
    this.texture = null;
  }
};

// src/textures/Texture.ts
var Texture = class {
  key = "";
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
    frame2.setSize(width, height);
  }
  destroy() {
    if (this.binding) {
      this.binding.destroy();
    }
    this.frames.clear();
    this.data = null;
    this.image = null;
    this.firstFrame = null;
  }
};

// src/textures/types/CanvasTexture.ts
function CanvasTexture(width = 32, height = 32) {
  const ctx = CreateCanvas(width, height);
  return new Texture(ctx.canvas);
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

// src/textures/TextureManager.ts
var TextureManager = class {
  textures;
  constructor() {
    this.textures = new Map();
    this.createDefaultTextures();
    TextureManagerInstance.set(this);
  }
  createDefaultTextures() {
    this.add("__BLANK", new Texture(CreateCanvas(32, 32).canvas));
    const missing = CreateCanvas(32, 32);
    missing.strokeStyle = "#0f0";
    missing.moveTo(0, 0);
    missing.lineTo(32, 32);
    missing.stroke();
    missing.strokeRect(0.5, 0.5, 31, 31);
    this.add("__MISSING", new Texture(missing.canvas));
    const white = CreateCanvas(32, 32);
    white.fillStyle = "#fff";
    white.fillRect(0, 0, 32, 32);
    this.add("__WHITE", new Texture(white.canvas));
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
    const textures = this.textures;
    if (!textures.has(key)) {
      if (source instanceof Texture) {
        texture = source;
      } else {
        texture = new Texture(source, 0, 0, glConfig);
      }
      texture.key = key;
      textures.set(key, texture);
    }
    return texture;
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
  Camera: () => Camera,
  StaticCamera: () => StaticCamera
});

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

// src/math/RoundAwayFromZero.ts
function RoundAwayFromZero(value) {
  return value > 0 ? Math.ceil(value) : Math.floor(value);
}

// src/utils/base64/Base64ToArrayBuffer.ts
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
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
    const data = this.data;
    data[0] = m00;
    data[1] = m01;
    data[2] = m02;
    data[3] = m03;
    data[4] = m10;
    data[5] = m11;
    data[6] = m12;
    data[7] = m13;
    data[8] = m20;
    data[9] = m21;
    data[10] = m22;
    data[11] = m23;
    data[12] = m30;
    data[13] = m31;
    data[14] = m32;
    data[15] = m33;
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

// src/math/mat4/Mat4Ortho.ts
function Mat4Ortho(left, right, bottom, top, near, far, out = new Matrix4()) {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  const nf = 1 / (near - far);
  return out.set(-2 * lr, 0, 0, 0, 0, -2 * bt, 0, 0, 0, 0, 2 * nf, 0, (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1);
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

// src/math/Wrap.ts
function Wrap(value, min, max) {
  const range = max - min;
  return min + ((value - min) % range + range) % range;
}

// src/math/angle/WrapAngle.ts
function WrapAngle(angle) {
  return Wrap(angle, -Math.PI, Math.PI);
}

// src/math/angle/WrapAngleDegrees.ts
function WrapAngleDegrees(angle) {
  return Wrap(angle, -180, 180);
}

// src/camera/Camera.ts
var Camera = class {
  world;
  matrix;
  renderer;
  type;
  width;
  height;
  bounds;
  dirtyRender;
  worldTransform;
  position;
  scale;
  origin;
  _rotation = 0;
  constructor() {
    this.dirtyRender = true;
    const game = GameInstance.get();
    this.renderer = game.renderer;
    this.matrix = Mat4Identity();
    this.bounds = new Rectangle();
    this.worldTransform = new Matrix2D();
    this.position = new Vec2Callback(() => this.updateTransform(), 0, 0);
    this.scale = new Vec2Callback(() => this.updateTransform(), 1, 1);
    this.origin = new Vec2Callback(() => this.updateTransform(), 0.5, 0.5);
    this.reset();
  }
  updateTransform() {
    const matrix2 = this.matrix.data;
    const px = this.position.x;
    const py = this.position.y;
    const sx = this.scale.x;
    const sy = this.scale.y;
    const ox = -px + this.width * this.origin.x;
    const oy = -py + this.height * this.origin.y;
    const z = Math.sin(this.rotation);
    const w = Math.cos(this.rotation);
    const z2 = z + z;
    const zz = z * z2;
    const wz = w * z2;
    const out0 = (1 - zz) * sx;
    const out1 = wz * sx;
    const out4 = -wz * sy;
    const out5 = (1 - zz) * sy;
    matrix2[0] = out0;
    matrix2[1] = out1;
    matrix2[4] = out4;
    matrix2[5] = out5;
    matrix2[12] = px + ox - (out0 * ox + out4 * oy);
    matrix2[13] = py + oy - (out1 * ox + out5 * oy);
    this.worldTransform.set(w * sx, z * sx, -z * sy, w * sy, -px, -py);
    const bw = this.width * (1 / sx);
    const bh = this.height * (1 / sy);
    this.bounds.set(ox - bw / 2, oy - bh / 2, bw, bh);
    this.dirtyRender = true;
  }
  reset() {
    const width = this.renderer.width;
    const height = this.renderer.height;
    this.width = width;
    this.height = height;
    this.bounds.set(0, 0, width, height);
  }
  set rotation(value) {
    if (value !== this._rotation) {
      this._rotation = WrapAngle(value);
      this.updateTransform();
    }
  }
  get rotation() {
    return this._rotation;
  }
  destroy() {
    this.position.destroy();
    this.scale.destroy();
    this.origin.destroy();
    this.world = null;
    this.worldTransform = null;
    this.renderer = null;
    this.matrix = null;
    this.bounds = null;
  }
};

// src/camera/StaticCamera.ts
var StaticCamera = class {
  world;
  matrix;
  renderer;
  type;
  width;
  height;
  bounds;
  dirtyRender;
  worldTransform;
  constructor() {
    this.dirtyRender = true;
    const game = GameInstance.get();
    this.renderer = game.renderer;
    this.matrix = Mat4Identity();
    this.bounds = new Rectangle();
    this.worldTransform = new Matrix2D();
    this.reset();
  }
  reset() {
    const renderer = this.renderer;
    if (renderer) {
      const width = renderer.width;
      const height = renderer.height;
      this.width = width;
      this.height = height;
    }
    this.bounds.set(0, 0, this.width, this.height);
  }
  destroy() {
    this.world = null;
    this.worldTransform = null;
    this.renderer = null;
    this.matrix = null;
    this.bounds = null;
  }
};

// src/camera3d/index.ts
var camera3d_exports = {};
__export(camera3d_exports, {
  Camera3D: () => Camera3D
});

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

// src/math/Clamp.ts
function Clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
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

// src/math/vec3/index.ts
var vec3_exports = {};
__export(vec3_exports, {
  BACKWARD: () => BACKWARD,
  DOWN: () => DOWN,
  FORWARD: () => FORWARD,
  GetVec3Angle: () => GetVec3Angle,
  GetVec3Distance: () => GetVec3Distance,
  GetVec3DistanceSquared: () => GetVec3DistanceSquared,
  GetVec3Length: () => GetVec3Length,
  GetVec3LengthSquared: () => GetVec3LengthSquared,
  GetVec3ManhattanDistance: () => GetVec3ManhattanDistance,
  GetVec3ManhattanLength: () => GetVec3ManhattanLength,
  LEFT: () => LEFT,
  RGBCallback: () => RGBCallback,
  RIGHT: () => RIGHT,
  UP: () => UP,
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
  Vec3Zero: () => Vec3Zero,
  ZERO: () => ZERO
});

// src/math/vec3/Vec3Backward.ts
function Vec3Backward() {
  return new Vec3(0, 0, -1);
}

// src/math/vec3/Vec3Down.ts
function Vec3Down() {
  return new Vec3(0, -1, 0);
}

// src/math/vec3/Vec3Forward.ts
function Vec3Forward() {
  return new Vec3(0, 0, 1);
}

// src/math/vec3/Vec3Left.ts
function Vec3Left() {
  return new Vec3(-1, 0, 0);
}

// src/math/vec3/Vec3Right.ts
function Vec3Right() {
  return new Vec3(1, 0, 0);
}

// src/math/vec3/Vec3Up.ts
function Vec3Up() {
  return new Vec3(0, 1, 0);
}

// src/math/vec3/Vec3Zero.ts
function Vec3Zero() {
  return new Vec3(0, 0, 0);
}

// src/math/vec3/const.ts
var UP = Vec3Up();
var DOWN = Vec3Down();
var LEFT = Vec3Left();
var RIGHT = Vec3Right();
var FORWARD = Vec3Forward();
var BACKWARD = Vec3Backward();
var ZERO = Vec3Zero();

// src/math/vec3/Vec3Dot.ts
function Vec3Dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

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

// src/math/vec3/Vec3Bezier.ts
function Vec3Bezier(a, b, c, d, t, out = new Vec3()) {
  return out.set(Bezier(a.x, b.x, c.x, d.x, t), Bezier(a.y, b.y, c.y, d.y, t), Bezier(a.z, b.z, c.z, d.z, t));
}

// src/math/CatmullRom.ts
function CatmullRom(t, p0, p1, p2, p3) {
  const v0 = (p2 - p0) * 0.5;
  const v1 = (p3 - p1) * 0.5;
  const t2 = t * t;
  const t3 = t * t2;
  return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
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

// src/math/vec3/Vec3Equals.ts
function Vec3Equals(a, b) {
  return a.x === b.x && a.y === b.y && a.z === b.z;
}

// src/math/vec3/Vec3Floor.ts
function Vec3Floor(a, out = new Vec3()) {
  return out.set(Math.floor(a.x), Math.floor(a.y), Math.floor(a.z));
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

// src/math/fuzzy/FuzzyEqual.ts
function FuzzyEqual(a, b, epsilon = 1e-4) {
  return Math.abs(a - b) < epsilon;
}

// src/math/vec3/Vec3FuzzyEquals.ts
function Vec3FuzzyEquals(a, b, epsilon = 1e-4) {
  return FuzzyEqual(a.x, b.x, epsilon) && FuzzyEqual(a.y, b.y, epsilon) && FuzzyEqual(a.z, b.z, epsilon);
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

// src/math/vec3/Vec3Normalize.ts
function Vec3Normalize(a, out = new Vec3()) {
  const { x, y, z } = a;
  let len = x * x + y * y + z * z;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  return out.set(x * len, y * len, z * len);
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
function Vec3Project(v, world3, transform, viewport, out = new Vec3()) {
  const { x, y, width, height } = viewport;
  tempMatrix1.set(width / 2, 0, 0, 0, 0, -height / 2, 0, 0, 0, 0, 0.5, 0, x + width / 2, height / 2 + y, 0.5, 1);
  Mat4Multiply(world3, transform, tempMatrix2);
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
function Vec3Unproject(v, viewportWidth, viewportHeight, world3, view, projection, out = new Vec3()) {
  Mat4Multiply(world3, view, matrix);
  Mat4Multiply(matrix, projection, matrix);
  Mat4Invert(matrix, matrix);
  const { x, y, z } = v;
  screenSource.set(x / viewportWidth * 2 - 1, -(y / viewportHeight * 2 - 1), 2 * z - 1);
  Vec3TransformMat4(screenSource, matrix, out);
  const data = matrix.data;
  const num = screenSource.x * data[3] + screenSource.y * data[7] + screenSource.z * data[11] + data[15];
  return Vec3Scale(out, 1 / num, out);
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
var EaseMap = new Map([
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
function GetEase(name) {
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

// src/math/pow2/IsSizePowerOfTwo.ts
function IsSizePowerOfTwo(width, height) {
  if (width < 1 || height < 1) {
    return false;
  }
  return (width & width - 1) === 0 && (height & height - 1) === 0;
}

// src/math/pow2/IsValuePowerOfTwo.ts
function IsValuePowerOfTwo(value) {
  return value > 0 && (value & value - 1) === 0;
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
  Vec2Transform: () => Vec2Transform,
  Vec2TransformMat2d: () => Vec2TransformMat2d,
  Vec2TransformMat4: () => Vec2TransformMat4,
  Vec2Zero: () => Vec2Zero
});

// src/math/vec2/GetChebyshevDistance.ts
function GetChebyshevDistance(a, b) {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
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

// src/math/vec2/Vec2Bezier.ts
function Vec2Bezier(a, b, c, d, t, out = new Vec2()) {
  return out.set(Bezier(a.x, b.x, c.x, d.x, t), Bezier(a.y, b.y, c.y, d.y, t));
}

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

// src/math/Between.ts
function Between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// src/math/CeilTo.ts
function CeilTo(value, place = 0, base = 10) {
  const p = Math.pow(base, -place);
  return Math.ceil(value * p) / p;
}

// src/math/DegToRad.ts
function DegToRad(degrees) {
  return degrees * MATH_CONST.DEG_TO_RAD;
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

// src/math/FromPercent.ts
function FromPercent(percent, min, max) {
  percent = Clamp(percent, 0, 1);
  return (max - min) * percent;
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

// src/camera3d/Camera3D.ts
var Camera3D = class {
  type;
  renderer;
  position;
  direction;
  up;
  left;
  aspectRatio;
  viewMatrix;
  projectionMatrix;
  dirtyRender = true;
  _lookAtPosition;
  _lookAtView;
  _axis;
  _fov;
  _near;
  _far;
  constructor(x = 0, y = 0, z = 0, fov = 45, near = 0.1, far = 1e3) {
    const game = GameInstance.get();
    this.renderer = game.renderer;
    this.position = new Vec3Callback(() => this.update(), x, y, z);
    this.direction = new Vec3Callback(() => this.update(), 0, 1, 0);
    this._lookAtPosition = new Vec3();
    this._lookAtView = new Matrix4();
    this._axis = new Quaternion();
    this.up = Vec3Up();
    this.left = Vec3Left();
    this._fov = fov;
    this._near = near;
    this._far = far;
    this.aspectRatio = this.renderer.width / this.renderer.height;
    this.viewMatrix = new Matrix4();
    this.projectionMatrix = Mat4Perspective(DegToRad(fov), this.aspectRatio, near, far);
    this.lookAt(new Vec3());
  }
  updateProjectionMatrix() {
    Mat4Perspective(DegToRad(this._fov), this.aspectRatio, this._near, this._far, this.projectionMatrix);
    return this;
  }
  lookAt(point) {
    const pos = this.position;
    const dir = this.direction;
    const left = this.left;
    Vec3Subtract(point, pos, dir);
    Vec3Normalize(dir, dir);
    Vec3CrossNormalize(UP, dir, left);
    Vec3CrossNormalize(dir, left, this.up);
    return this.update();
  }
  rotateOnAxis(axisVec, angle) {
    const dir = this.direction;
    const left = this.left;
    const up = this.up;
    const q = QuatSetAxisAngle(axisVec, angle, this._axis);
    Vec3TransformQuat(dir, q, dir);
    Vec3TransformQuat(left, q, left);
    Vec3TransformQuat(up, q, up);
    Vec3Normalize(up, up);
    Vec3Normalize(left, left);
    Vec3Normalize(dir, dir);
    return this.update();
  }
  yaw(angle) {
    return this.rotateOnAxis(this.up, angle);
  }
  pitch(angle) {
    return this.rotateOnAxis(this.left, angle);
  }
  roll(angle) {
    return this.rotateOnAxis(this.direction, angle);
  }
  forward(s) {
    const pos = this.position;
    const { x: px, y: py, z: pz } = pos;
    const { x: dx, y: dy, z: dz } = this.direction;
    pos.set(px - s * dx, py - s * dy, pz - s * dz);
    return this.update();
  }
  update() {
    const lookPosition = this._lookAtPosition;
    const lookView = this._lookAtView;
    const pos = this.position;
    Vec3Add(pos, this.direction, lookPosition);
    Mat4LookAt(pos, lookPosition, this.up, lookView);
    Mat4TranslateFromFloats(lookView, -pos.x, -pos.y, -pos.z, this.viewMatrix);
    return this;
  }
  reset() {
  }
  destroy() {
    this.position.destroy();
    this.direction.destroy();
    this.up = null;
    this.left = null;
    this.viewMatrix = null;
    this.projectionMatrix = null;
    this._lookAtPosition = null;
    this._lookAtView = null;
    this._axis = null;
  }
  get fov() {
    return this._fov;
  }
  set fov(value) {
    if (value > 0 && value < 180) {
      this._fov = value;
      this.updateProjectionMatrix();
    }
  }
  get near() {
    return this._near;
  }
  set near(value) {
    if (value > 0) {
      this._near = value;
      this.updateProjectionMatrix();
    }
  }
  get far() {
    return this._far;
  }
  set far(value) {
    if (value > 0) {
      this._far = value;
      this.updateProjectionMatrix();
    }
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
  constructor(red = 0, green = 0, blue = 0, alpha = 1) {
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
    colors.push(GetColorFromRGB(r, i, b));
  }
  g = 255;
  for (i = range; i >= 0; i--) {
    colors.push(GetColorFromRGB(i, g, b));
  }
  r = 0;
  for (i = 0; i <= range; i++, g--) {
    colors.push(GetColorFromRGB(r, g, i));
  }
  g = 0;
  b = 255;
  for (i = 0; i <= range; i++, b--, r++) {
    colors.push(GetColorFromRGB(r, g, b));
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
  Size: () => Size,
  WebGL: () => WebGL,
  WebGLContext: () => WebGLContext,
  WorldSize: () => WorldSize
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
  WORLD_SIZE: "WorldSize"
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

// src/config/size/SetSize.ts
function SetSize(width = 800, height = 600, resolution = 1) {
  if (resolution === 0) {
    resolution = window.devicePixelRatio;
  }
  ConfigStore.set(CONFIG_DEFAULTS.SIZE, { width, height, resolution });
}

// src/config/size/Size.ts
function Size(width = 800, height = 600, resolution = 1) {
  return () => {
    SetSize(width, height, resolution);
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
  render(renderData) {
    BindingQueue.clear();
    const ctx = this.ctx;
    if (this.optimizeRedraw && renderData.numDirtyFrames === 0 && renderData.numDirtyCameras === 0) {
      return;
    }
    this.reset();
    if (this.clearBeforeRender) {
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.fillStyle = this.clearColor;
      ctx.fillRect(0, 0, this.width, this.height);
    }
    const worlds2 = renderData.worldData;
    for (let i = 0; i < worlds2.length; i++) {
      const { numRendered, world: world3 } = worlds2[i];
      const camera = worlds2[i].camera;
      const { a, b, c, d, tx, ty } = camera.worldTransform;
      ctx.setTransform(a, b, c, d, tx, ty);
      for (let s = 0; s < numRendered; s++) {
        const entry = world3.renderList[s];
        entry.node.renderCanvas(this);
        entry.node.postRenderCanvas(this);
      }
    }
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

// src/renderer/webgl1/renderpass/AddViewport.ts
function AddViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
  const viewport = new Rectangle(x, y, width, height);
  renderPass.viewportStack.push(viewport);
  return viewport;
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
function BindViewport(renderPass, viewport) {
  if (!viewport) {
    viewport = renderPass.currentViewport;
    if (!viewport) {
      return;
    }
  }
  const glv = gl.getParameter(gl.VIEWPORT);
  if (glv[0] !== viewport.x || glv[1] !== viewport.y || glv[2] !== viewport.width || glv[3] !== viewport.height) {
    gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
  }
}

// src/renderer/webgl1/renderpass/SetViewport.ts
function SetViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
  const entry = AddViewport(renderPass, x, y, width, height);
  BindViewport(renderPass, entry);
  renderPass.currentViewport = entry;
}

// src/renderer/webgl1/renderpass/BindFramebuffer.ts
function BindFramebuffer(renderPass, clear = true, entry) {
  if (!entry) {
    entry = renderPass.currentFramebuffer;
  }
  const { framebuffer, viewport } = entry;
  if (renderPass.currentFramebuffer.framebuffer !== framebuffer) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  }
  if (clear) {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
  if (viewport) {
    SetViewport(renderPass, viewport.x, viewport.y, viewport.width, viewport.height);
  }
}

// src/renderer/webgl1/renderpass/PopViewport.ts
function PopViewport(renderPass) {
  const stack = renderPass.viewportStack;
  if (stack.length > 1) {
    stack.pop();
  }
  renderPass.currentViewport = stack[stack.length - 1];
  BindViewport(renderPass);
}

// src/renderer/webgl1/renderpass/PopFramebuffer.ts
function PopFramebuffer(renderPass) {
  const stack = renderPass.framebufferStack;
  if (stack.length > 1) {
    if (renderPass.currentFramebuffer.viewport) {
      PopViewport(renderPass);
    }
    stack.pop();
  }
  renderPass.currentFramebuffer = stack[stack.length - 1];
  BindFramebuffer(renderPass, false);
}

// src/renderer/webgl1/renderpass/AddFramebuffer.ts
function AddFramebuffer(renderPass, framebuffer, viewport) {
  const entry = { framebuffer, viewport };
  renderPass.framebufferStack.push(entry);
  return entry;
}

// src/renderer/webgl1/renderpass/SetFramebuffer.ts
function SetFramebuffer(renderPass, framebuffer, clear = true, viewport) {
  const entry = AddFramebuffer(renderPass, framebuffer, viewport);
  BindFramebuffer(renderPass, clear, entry);
  renderPass.currentFramebuffer = entry;
}

// src/renderer/webgl1/renderpass/Draw.ts
function Draw(renderPass) {
  const count = renderPass.count;
  if (count === 0) {
    return;
  }
  const currentBuffer = renderPass.currentVertexBuffer;
  const currentShader = renderPass.currentShader;
  const renderToFramebuffer = currentShader.shader.renderToFramebuffer;
  if (renderToFramebuffer) {
    SetFramebuffer(renderPass, currentShader.shader.framebuffer, true);
  }
  if (count === currentBuffer.batchSize) {
    const type = currentBuffer.isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
    gl.bufferData(gl.ARRAY_BUFFER, currentBuffer.data, type);
  } else {
    const subsize = currentBuffer.indexed ? count * currentBuffer.entryElementSize : count * currentBuffer.vertexElementSize;
    const view = currentBuffer.vertexViewF32.subarray(0, subsize);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
  }
  if (currentBuffer.indexed) {
    gl.drawElements(gl.TRIANGLES, count * currentBuffer.entryIndexSize, gl.UNSIGNED_SHORT, 0);
  } else {
    gl.drawArrays(gl.TRIANGLES, 0, count);
  }
  if (renderToFramebuffer) {
    PopFramebuffer(renderPass);
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
  renderPass.prevCount = count;
  renderPass.count = 0;
  renderPass.flushTotal++;
  return true;
}

// src/renderer/webgl1/renderpass/End.ts
function End(renderPass) {
  Flush(renderPass);
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

// src/renderer/webgl1/textures/CreateGLTexture.ts
function CreateGLTexture(binding) {
  const { parent, flipY, unpackPremultiplyAlpha, minFilter, magFilter, wrapS, wrapT, generateMipmap, isPOT } = binding;
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
  index = 0;
  indexCounter = -1;
  dirtyIndex = true;
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
      texture = null,
      framebuffer = null,
      depthbuffer = null,
      unpackPremultiplyAlpha = true,
      minFilter = this.isPOT ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR,
      magFilter = gl.LINEAR,
      wrapS = gl.CLAMP_TO_EDGE,
      wrapT = gl.CLAMP_TO_EDGE,
      generateMipmap = this.isPOT,
      flipY = false
    } = config;
    this.minFilter = minFilter;
    this.magFilter = magFilter;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.generateMipmap = generateMipmap;
    this.flipY = flipY;
    this.unpackPremultiplyAlpha = unpackPremultiplyAlpha;
    if (framebuffer) {
      this.framebuffer = framebuffer;
    }
    if (depthbuffer) {
      this.depthbuffer = depthbuffer;
    }
    if (texture) {
      this.texture = texture;
    } else {
      CreateGLTexture(this);
    }
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
  setIndex(index) {
    this.dirtyIndex = index !== this.index;
    this.index = index;
  }
  destroy() {
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

// src/config/maxtextures/GetMaxTextures.ts
function GetMaxTextures() {
  return ConfigStore.get(CONFIG_DEFAULTS.MAX_TEXTURES);
}

// src/renderer/webgl1/shaders/CheckShaderMaxIfStatements.ts
var fragTemplate = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}"
].join("\n");
function GenerateSrc(maxIfs) {
  let src = "";
  for (let i = 0; i < maxIfs; ++i) {
    if (i > 0) {
      src += "\nelse ";
    }
    if (i < maxIfs - 1) {
      src += `if(test == ${i}.0){}`;
    }
  }
  return src;
}
function CheckShaderMaxIfStatements(maxIfs) {
  const shader = gl.createShader(gl.FRAGMENT_SHADER);
  while (true) {
    const fragmentSrc = fragTemplate.replace(/%forloop%/gi, GenerateSrc(maxIfs));
    gl.shaderSource(shader, fragmentSrc);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      maxIfs = maxIfs / 2 | 0;
    } else {
      break;
    }
  }
  return maxIfs;
}

// src/renderer/webgl1/renderpass/CreateTempTextures.ts
function CreateTempTextures(renderPass) {
  let maxGPUTextures = CheckShaderMaxIfStatements(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
  const maxConfigTextures = GetMaxTextures();
  if (maxConfigTextures === 0 || maxConfigTextures > 0 && maxConfigTextures > maxGPUTextures) {
    SetMaxTextures(maxGPUTextures);
  } else if (maxConfigTextures > 0 && maxConfigTextures < maxGPUTextures) {
    maxGPUTextures = Math.max(8, maxConfigTextures);
  }
  const tempTextures = renderPass.tempTextures;
  if (tempTextures.length) {
    tempTextures.forEach((texture) => {
      gl.deleteTexture(texture);
    });
  }
  const index = [];
  for (let texturesIndex = 0; texturesIndex < maxGPUTextures; texturesIndex++) {
    const tempTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + texturesIndex);
    gl.bindTexture(gl.TEXTURE_2D, tempTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    tempTextures[texturesIndex] = tempTexture;
    index.push(texturesIndex);
  }
  renderPass.maxTextures = maxGPUTextures;
  renderPass.textureIndex = index;
  renderPass.currentActiveTexture = 1;
}

// src/config/batchsize/GetBatchSize.ts
function GetBatchSize() {
  return ConfigStore.get(CONFIG_DEFAULTS.BATCH_SIZE);
}

// src/renderer/webgl1/buffers/DeleteGLBuffer.ts
function DeleteGLBuffer(buffer) {
  if (gl.isBuffer(buffer)) {
    gl.deleteBuffer(buffer);
  }
}

// src/renderer/webgl1/buffers/VertexBuffer.ts
var VertexBuffer = class {
  batchSize;
  dataSize;
  vertexElementSize;
  vertexByteSize;
  entryByteSize;
  bufferByteSize;
  data;
  vertexViewF32;
  vertexViewU32;
  vertexBuffer;
  indexed = false;
  isDynamic = false;
  count = 0;
  offset = 0;
  elementsPerEntry;
  isBound = false;
  constructor(config = {}) {
    const {
      batchSize = 1,
      dataSize = 4,
      isDynamic = true,
      elementsPerEntry = 4,
      vertexElementSize = 6
    } = config;
    this.batchSize = batchSize;
    this.dataSize = dataSize;
    this.vertexElementSize = vertexElementSize;
    this.isDynamic = isDynamic;
    this.elementsPerEntry = elementsPerEntry;
    this.vertexByteSize = vertexElementSize * dataSize;
    this.entryByteSize = this.vertexByteSize * elementsPerEntry;
    this.bufferByteSize = batchSize * this.entryByteSize;
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
    this.vertexViewU32 = new Uint32Array(data);
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
    this.vertexViewU32 = null;
    this.vertexBuffer = null;
  }
};

// src/renderer/webgl1/buffers/IndexedVertexBuffer.ts
var IndexedVertexBuffer = class extends VertexBuffer {
  indexSize;
  entryElementSize;
  entryIndexSize;
  index;
  indexBuffer;
  indexLayout;
  constructor(config = {}) {
    super(config);
    const {
      indexSize = 4,
      entryIndexSize = 6,
      indexLayout = null
    } = config;
    this.indexed = true;
    this.indexSize = indexSize;
    this.entryIndexSize = entryIndexSize;
    this.entryElementSize = this.vertexElementSize * this.elementsPerEntry;
    const seededIndexBuffer = [];
    if (indexLayout) {
      this.indexLayout = indexLayout;
      for (let i = 0; i < this.batchSize * indexSize; i += indexSize) {
        for (let c = 0; c < indexLayout.length; c++) {
          seededIndexBuffer.push(i + indexLayout[c]);
        }
      }
    }
    this.create();
    this.createIndexBuffer(seededIndexBuffer);
  }
  createIndexBuffer(seededIndex) {
    this.index = new Uint16Array(seededIndex);
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    seededIndex = [];
  }
  bind() {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  }
  destroy() {
    super.destroy();
    DeleteGLBuffer(this.indexBuffer);
    this.index = null;
    this.indexLayout = null;
    this.indexBuffer = null;
  }
};

// src/renderer/webgl1/shaders/CreateAttributes.ts
function CreateAttributes(program, config) {
  const attributes = new Map();
  const defaultSettings = {
    size: 1,
    type: gl.FLOAT,
    normalized: false,
    stride: 0,
    offset: 0
  };
  const total = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < total; i++) {
    const attrib = gl.getActiveAttrib(program, i);
    if (!attrib) {
      break;
    }
    const name = attrib.name;
    const index = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(index);
    const setting = config.hasOwnProperty(name) ? config[name] : {};
    const {
      size = defaultSettings.size,
      type = defaultSettings.type,
      normalized = defaultSettings.normalized,
      stride = defaultSettings.stride,
      offset = defaultSettings.offset
    } = setting;
    attributes.set(name, { index, size, type, normalized, stride, offset });
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

// src/renderer/webgl1/shaders/CreateShader.ts
function CreateShader(source, type) {
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
    const location = gl.getUniformLocation(program, uniform.name);
    if (location) {
      let isArray = false;
      if (name.substr(-3) === "[0]") {
        name = name.substr(0, name.length - 3);
        isArray = uniform.size > 1;
      }
      uniforms.set(name, CreateUniformSetter(uniform, location, isArray));
    }
  }
  return uniforms;
}

// src/renderer/webgl1/GL_CONST.ts
var UNSIGNED_BYTE = 5121;
var FLOAT = 5126;

// src/renderer/webgl1/shaders/DefaultQuadAttributes.ts
var DefaultQuadAttributes = {
  aVertexPosition: { size: 2, type: FLOAT, normalized: false, offset: 0 },
  aTextureCoord: { size: 2, type: FLOAT, normalized: false, offset: 8 },
  aTextureId: { size: 1, type: FLOAT, normalized: false, offset: 16 },
  aTintColor: { size: 4, type: UNSIGNED_BYTE, normalized: true, offset: 20 }
};

// src/renderer/webgl1/shaders/DefaultQuadUniforms.ts
var DefaultQuadUniforms = {
  uProjectionMatrix: new Float32Array(),
  uCameraMatrix: new Float32Array(),
  uTexture: 0
};

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

// src/renderer/webgl1/glsl/SINGLE_QUAD_FRAG.ts
var SINGLE_QUAD_FRAG = `#define SHADER_NAME SINGLE_QUAD_FRAG

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);
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
  constructor(config) {
    if (config) {
      this.fromConfig(config);
    }
  }
  fromConfig(config) {
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
    this.create(fragmentShader, vertexShader, uniforms, attributes);
    if (renderToFramebuffer) {
      this.renderToFramebuffer = true;
      const texture = new Texture(null, width * resolution, height * resolution);
      const binding = new GLTextureBinding(texture);
      texture.binding = binding;
      binding.framebuffer = CreateFramebuffer(binding.texture);
      if (renderToDepthbuffer) {
        this.renderToDepthbuffer = true;
        binding.depthbuffer = CreateDepthBuffer(binding.framebuffer, texture.width, texture.height);
      }
      this.texture = texture;
      this.framebuffer = binding.framebuffer;
    }
  }
  create(fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
    const fragmentShader = CreateShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    const vertexShader = CreateShader(vertexShaderSource, gl.VERTEX_SHADER);
    if (!fragmentShader || !vertexShader) {
      return;
    }
    const program = CreateProgram(fragmentShader, vertexShader);
    if (!program) {
      return;
    }
    const currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(program);
    this.program = program;
    this.uniformSetters = CreateUniforms(program);
    this.uniforms = new Map();
    for (const [key, value] of Object.entries(uniforms)) {
      this.uniforms.set(key, value);
    }
    this.attributes = CreateAttributes(program, attribs);
    gl.useProgram(currentProgram);
    this.isActive = false;
  }
  updateUniforms(renderPass) {
  }
  bind(renderPass) {
    const uniforms = this.uniforms;
    uniforms.set("uProjectionMatrix", renderPass.projectionMatrix.data);
    uniforms.set("uCameraMatrix", renderPass.cameraMatrix.data);
    this.updateUniforms(renderPass);
    return this.setUniforms(renderPass);
  }
  setUniform(key, value) {
    const uniforms = this.uniforms;
    if (uniforms.has(key)) {
      uniforms.set(key, value);
      const setter = this.uniformSetters.get(key);
      setter(value);
    }
  }
  setUniforms(renderPass) {
    if (!this.program) {
      return false;
    }
    gl.useProgram(this.program);
    this.isActive = true;
    const uniforms = this.uniforms;
    for (const [name, setter] of this.uniformSetters.entries()) {
      setter(uniforms.get(name));
    }
    return true;
  }
  setAttributes(renderPass) {
    if (this.program) {
      const stride = renderPass.currentVertexBuffer.vertexByteSize;
      this.attributes.forEach((attrib) => {
        gl.vertexAttribPointer(attrib.index, attrib.size, attrib.type, attrib.normalized, stride, attrib.offset);
      });
    }
  }
  destroy() {
    DeleteShaders(this.program);
    DeleteGLTexture(this.texture);
    DeleteFramebuffer(this.framebuffer);
    this.uniforms.clear();
    this.uniformSetters.clear();
    this.attributes.clear();
    this.program = null;
    this.texture = null;
    this.framebuffer = null;
  }
};

// src/renderer/webgl1/shaders/QuadShader.ts
var QuadShader = class extends Shader {
  constructor(config = {}) {
    const shaderConfig = config;
    shaderConfig.attributes = !shaderConfig.attributes ? DefaultQuadAttributes : shaderConfig.attributes;
    super(shaderConfig);
  }
  bind(renderPass) {
    const uniforms = this.uniforms;
    uniforms.set("uProjectionMatrix", renderPass.projectionMatrix.data);
    uniforms.set("uCameraMatrix", renderPass.cameraMatrix.data);
    return super.bind(renderPass);
  }
};

// src/renderer/webgl1/glsl/MULTI_QUAD_FRAG.ts
var MULTI_QUAD_FRAG = `#define SHADER_NAME MULTI_QUAD_FRAG

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture[%count%];

void main (void)
{
    vec4 color;

    %forloop%

    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);
}`;

// src/renderer/webgl1/shaders/MultiTextureQuadShader.ts
var MultiTextureQuadShader = class extends QuadShader {
  constructor(config = {}) {
    if (!config.fragmentShader) {
      config.fragmentShader = MULTI_QUAD_FRAG;
    }
    super(config);
  }
  create(fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
    const maxTextures = GetMaxTextures();
    let src = "";
    for (let i = 1; i < maxTextures; i++) {
      if (i > 1) {
        src += "\n	else ";
      }
      if (i < maxTextures - 1) {
        src += `if (vTextureId < ${i}.5)`;
      }
      src += "\n	{";
      src += `
		color = texture2D(uTexture[${i}], vTextureCoord);`;
      src += "\n	}";
    }
    fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);
    fragmentShaderSource = fragmentShaderSource.replace(/%forloop%/gi, src);
    super.create(fragmentShaderSource, vertexShaderSource, uniforms, attribs);
  }
  bind(renderPass) {
    this.uniforms.set("uTexture", renderPass.textureIndex);
    return super.bind(renderPass);
  }
};

// src/renderer/webgl1/renderpass/SetDefaultBlendMode.ts
function SetDefaultBlendMode(renderPass, enable, sfactor, dfactor) {
  const entry = { enable, sfactor, dfactor };
  renderPass.blendModeStack[0] = entry;
  renderPass.currentBlendMode = entry;
  renderPass.defaultBlendMode = entry;
}

// src/renderer/webgl1/renderpass/SetDefaultFramebuffer.ts
function SetDefaultFramebuffer(renderPass, framebuffer = null, viewport) {
  const entry = { framebuffer, viewport };
  renderPass.framebufferStack[0] = entry;
  renderPass.currentFramebuffer = entry;
  renderPass.defaultFramebuffer = entry;
}

// src/renderer/webgl1/renderpass/SetDefaultShader.ts
function SetDefaultShader(renderPass, shader, textureID) {
  const entry = { shader, textureID };
  renderPass.shaderStack[0] = entry;
  renderPass.currentShader = entry;
  renderPass.defaultShader = entry;
}

// src/renderer/webgl1/renderpass/SetDefaultVertexBuffer.ts
function SetDefaultVertexBuffer(renderPass, buffer) {
  renderPass.vertexBufferStack[0] = buffer;
  renderPass.currentVertexBuffer = buffer;
  renderPass.defaultVertexBuffer = buffer;
}

// src/renderer/webgl1/renderpass/SetDefaultViewport.ts
function SetDefaultViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
  const entry = new Rectangle(x, y, width, height);
  renderPass.viewportStack[0] = entry;
  renderPass.currentViewport = entry;
  renderPass.defaultViewport = entry;
}

// src/renderer/webgl1/renderpass/RenderPass.ts
var RenderPass = class {
  renderer;
  projectionMatrix;
  cameraMatrix;
  count = 0;
  prevCount = 0;
  flushTotal = 0;
  maxTextures = 0;
  currentActiveTexture = 0;
  startActiveTexture = 0;
  tempTextures = [];
  textureIndex = [];
  framebufferStack = [];
  currentFramebuffer = null;
  defaultFramebuffer = null;
  vertexBufferStack = [];
  currentVertexBuffer = null;
  defaultVertexBuffer = null;
  shaderStack = [];
  currentShader = null;
  defaultShader = null;
  viewportStack = [];
  currentViewport = null;
  defaultViewport = null;
  blendModeStack = [];
  currentBlendMode = null;
  defaultBlendMode = null;
  quadShader;
  quadBuffer;
  quadCamera;
  current2DCamera;
  constructor(renderer) {
    this.renderer = renderer;
    this.projectionMatrix = new Matrix4();
    this.reset();
  }
  reset() {
    const gl2 = this.renderer.gl;
    const indexLayout = [0, 1, 2, 2, 3, 0];
    this.quadShader = new QuadShader();
    this.quadBuffer = new IndexedVertexBuffer({ isDynamic: false, indexLayout });
    this.quadCamera = new StaticCamera();
    CreateTempTextures(this);
    SetDefaultFramebuffer(this);
    SetDefaultBlendMode(this, true, gl2.ONE, gl2.ONE_MINUS_SRC_ALPHA);
    SetDefaultVertexBuffer(this, new IndexedVertexBuffer({ batchSize: GetBatchSize(), indexLayout }));
    SetDefaultShader(this, new MultiTextureQuadShader());
  }
  resize(width, height) {
    Mat4Ortho(0, width, height, 0, -1e3, 1e3, this.projectionMatrix);
    this.quadCamera.reset();
    SetDefaultViewport(this, 0, 0, width, height);
  }
};

// src/renderer/webgl1/renderpass/AddShader.ts
function AddShader(renderPass, shader, textureID) {
  const stackEntry = { shader, textureID };
  renderPass.shaderStack.push(stackEntry);
  return stackEntry;
}

// src/renderer/webgl1/renderpass/AddVertexBuffer.ts
function AddVertexBuffer(renderPass, buffer) {
  renderPass.vertexBufferStack.push(buffer);
  return buffer;
}

// src/renderer/webgl1/renderpass/BindShader.ts
function BindShader(renderPass, entry) {
  let prevShader;
  if (!entry) {
    entry = renderPass.currentShader;
  } else {
    prevShader = renderPass.currentShader.shader;
  }
  if (!entry.shader.isActive) {
    const success = entry.shader.bind(renderPass, entry.textureID);
    if (success) {
      entry.shader.setAttributes(renderPass);
      if (prevShader && prevShader !== entry.shader) {
        prevShader.isActive = false;
      }
    }
  }
}

// src/renderer/webgl1/renderpass/Begin.ts
function Begin(renderPass, camera2D) {
  renderPass.current2DCamera = camera2D;
  renderPass.cameraMatrix = camera2D.matrix;
  BindShader(renderPass);
}

// src/renderer/webgl1/renderpass/BindBlendMode.ts
function BindBlendMode(renderPass, entry) {
  if (!entry) {
    entry = renderPass.currentBlendMode;
  }
  if (entry.enable) {
    if (!gl.isEnabled(gl.BLEND) || (renderPass.currentBlendMode.sfactor !== entry.sfactor || renderPass.currentBlendMode.dfactor !== entry.dfactor)) {
      gl.enable(gl.BLEND);
      gl.blendFunc(entry.sfactor, entry.dfactor);
    }
  } else {
    gl.disable(gl.BLEND);
  }
}

// src/renderer/webgl1/renderpass/BindTexture.ts
function BindTexture(texture, index = 0) {
  const binding = texture.binding;
  binding.setIndex(index);
  gl.activeTexture(gl.TEXTURE0 + index);
  gl.bindTexture(gl.TEXTURE_2D, binding.texture);
}

// src/renderer/webgl1/renderpass/BindVertexBuffer.ts
function BindVertexBuffer(renderPass, buffer) {
  if (buffer) {
    buffer.isBound = false;
  } else {
    buffer = renderPass.currentVertexBuffer;
  }
  if (!buffer.isBound) {
    const indexBuffer = buffer.indexed ? buffer.indexBuffer : null;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexBuffer);
    buffer.isBound = true;
  }
}

// src/renderer/webgl1/renderpass/PopVertexBuffer.ts
function PopVertexBuffer(renderPass) {
  const stack = renderPass.vertexBufferStack;
  if (stack.length > 1) {
    stack.pop();
  }
  renderPass.currentVertexBuffer = stack[stack.length - 1];
  BindVertexBuffer(renderPass);
}

// src/renderer/webgl1/renderpass/SetVertexBuffer.ts
function SetVertexBuffer(renderPass, buffer) {
  const entry = AddVertexBuffer(renderPass, buffer);
  BindVertexBuffer(renderPass, entry);
  renderPass.currentVertexBuffer = entry;
}

// src/renderer/webgl1/renderpass/FlushBuffer.ts
function FlushBuffer(renderPass, buffer) {
  SetVertexBuffer(renderPass, buffer);
  renderPass.currentShader.shader.setAttributes(renderPass);
  const result = Flush(renderPass, buffer.count);
  PopVertexBuffer(renderPass);
  return result;
}

// src/renderer/webgl1/renderpass/GetVertexBufferEntry.ts
function GetVertexBufferEntry(renderPass, addToCount = 0) {
  const buffer = renderPass.currentVertexBuffer;
  if (renderPass.count + addToCount >= buffer.batchSize) {
    Flush(renderPass);
  }
  const offset = buffer.indexed ? renderPass.count * buffer.entryElementSize : renderPass.count * buffer.vertexElementSize;
  renderPass.count += addToCount;
  return {
    buffer,
    F32: buffer.vertexViewF32,
    U32: buffer.vertexViewU32,
    offset
  };
}

// src/renderer/webgl1/renderpass/PopShader.ts
function PopShader(renderPass) {
  const stack = renderPass.shaderStack;
  if (stack.length > 1) {
    stack.pop();
  }
  renderPass.currentShader = stack[stack.length - 1];
  BindShader(renderPass);
}

// src/renderer/webgl1/renderpass/SetShader.ts
function SetShader(renderPass, shader, textureID) {
  const entry = AddShader(renderPass, shader, textureID);
  BindShader(renderPass, entry);
  renderPass.currentShader = entry;
}

// src/renderer/webgl1/renderpass/SetTexture.ts
function SetTexture(renderPass, texture) {
  const binding = texture.binding;
  const currentActiveTexture = renderPass.currentActiveTexture;
  if (binding.indexCounter < renderPass.startActiveTexture) {
    binding.indexCounter = renderPass.startActiveTexture;
    if (currentActiveTexture < renderPass.maxTextures) {
      binding.setIndex(currentActiveTexture);
      gl.activeTexture(gl.TEXTURE0 + currentActiveTexture);
      gl.bindTexture(gl.TEXTURE_2D, binding.texture);
      renderPass.currentActiveTexture++;
    } else {
      Flush(renderPass);
      renderPass.startActiveTexture++;
      binding.indexCounter = renderPass.startActiveTexture;
      binding.setIndex(1);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, binding.texture);
      renderPass.currentActiveTexture = 2;
    }
  }
  return binding.index;
}

// src/renderer/webgl1/renderpass/Start.ts
function Start(renderPass) {
  renderPass.current2DCamera = renderPass.quadCamera;
  renderPass.cameraMatrix = renderPass.quadCamera.matrix;
  renderPass.count = 0;
  renderPass.flushTotal = 0;
  BindFramebuffer(renderPass, false, renderPass.defaultFramebuffer);
  BindBlendMode(renderPass, renderPass.defaultBlendMode);
  BindViewport(renderPass, renderPass.defaultViewport);
  BindVertexBuffer(renderPass, renderPass.defaultVertexBuffer);
}

// src/renderer/webgl1/renderpass/UnbindTexture.ts
function UnbindTexture(renderPass, index = 0) {
  gl.activeTexture(gl.TEXTURE0 + index);
  gl.bindTexture(gl.TEXTURE_2D, renderPass.tempTextures[index]);
  if (index > 0) {
    renderPass.startActiveTexture++;
  }
}

// src/renderer/webgl1/WebGLRendererInstance.ts
var instance3;
var WebGLRendererInstance = {
  get: () => {
    return instance3;
  },
  set: (renderer) => {
    instance3 = renderer;
  }
};

// src/world/WorldList.ts
var WorldList = new Map();

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
  }
  initContext() {
    const gl2 = this.canvas.getContext("webgl", GetWebGLContext());
    GL.set(gl2);
    this.gl = gl2;
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
  render(willRedraw, scenes) {
    if (this.contextLost) {
      return;
    }
    const gl2 = this.gl;
    const renderPass = this.renderPass;
    gl2.getContextAttributes();
    ProcessBindingQueue();
    if (this.optimizeRedraw && !willRedraw) {
    }
    if (this.clearBeforeRender) {
      const cls = this.clearColor;
      gl2.clearColor(cls[0], cls[1], cls[2], cls[3]);
      gl2.clear(gl2.COLOR_BUFFER_BIT);
    }
    Start(renderPass);
    for (const scene of scenes.values()) {
      const worlds2 = WorldList.get(scene);
      for (const world3 of worlds2) {
        if (world3.runRender) {
          world3.renderGL(renderPass);
          world3.postRenderGL(renderPass);
        }
      }
    }
    End(renderPass);
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

// src/config/worldsize/SetWorldSize.ts
function SetWorldSize(size) {
  ConfigStore.set(CONFIG_DEFAULTS.WORLD_SIZE, size);
}

// src/config/worldsize/WorldSize.ts
function WorldSize(size) {
  return () => {
    SetWorldSize(size);
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
  DepthFirstSearchRecursiveNested: () => DepthFirstSearchRecursiveNested,
  DestroyChildren: () => DestroyChildren,
  FindChildByName: () => FindChildByName,
  FindChildrenByName: () => FindChildrenByName,
  GetAllChildren: () => GetAllChildren,
  GetBounds: () => GetBounds,
  GetChildAt: () => GetChildAt,
  GetChildIndex: () => GetChildIndex,
  GetChildren: () => GetChildren2,
  GetClosestChild: () => GetClosestChild,
  GetFirstChild: () => GetFirstChild,
  GetFurthestChild: () => GetFurthestChild,
  GetLastChild: () => GetLastChild,
  GetParents: () => GetParents,
  GetRandomChild: () => GetRandomChild,
  MoveChildDown: () => MoveChildDown,
  MoveChildTo: () => MoveChildTo,
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
  SetBounds: () => SetBounds,
  SetChildrenValue: () => SetChildrenValue,
  SetName: () => SetName,
  SetOrigin: () => SetOrigin,
  SetParent: () => SetParent2,
  SetPosition: () => SetPosition,
  SetRotation: () => SetRotation,
  SetScale: () => SetScale,
  SetSize: () => SetSize2,
  SetSkew: () => SetSkew,
  SetValue: () => SetValue,
  SetVisible: () => SetVisible,
  SetWorld: () => SetWorld,
  ShuffleChildren: () => ShuffleChildren,
  SwapChildren: () => SwapChildren
});

// src/components/hierarchy/index.ts
var hierarchy_exports = {};
__export(hierarchy_exports, {
  AddHierarchyComponent: () => AddHierarchyComponent,
  ClearWorldAndParentID: () => ClearWorldAndParentID,
  GetChildren: () => GetChildren,
  GetDepth: () => GetDepth,
  GetNumChildren: () => GetNumChildren,
  GetParentGameObject: () => GetParentGameObject,
  GetParentID: () => GetParentID,
  GetWorldID: () => GetWorldID,
  HierarchyComponent: () => HierarchyComponent,
  SetDepth: () => SetDepth,
  SetNumChildren: () => SetNumChildren,
  SetParentID: () => SetParentID,
  SetWorldAndParentID: () => SetWorldAndParentID,
  SetWorldID: () => SetWorldID,
  UpdateNumChildren: () => UpdateNumChildren
});

// src/components/hierarchy/HierarchyComponent.ts
var Hierarchy = defineComponent({
  worldID: Types.ui32,
  parentID: Types.ui32,
  numChildren: Types.ui32,
  depth: Types.ui32
});
var HierarchyComponent = Hierarchy;

// src/components/hierarchy/AddHierarchyComponent.ts
function AddHierarchyComponent(id) {
  addComponent(GameObjectWorld, HierarchyComponent, id);
}

// src/components/hierarchy/ClearWorldAndParentID.ts
function ClearWorldAndParentID(id) {
  HierarchyComponent.worldID[id] = 0;
  HierarchyComponent.parentID[id] = 0;
}

// src/gameobjects/GameObjectCache.ts
var GameObjectCache = new Map();

// src/gameobjects/GameObjectTree.ts
var GameObjectTree = new Map();

// src/components/hierarchy/GetChildren.ts
function GetChildren(id) {
  const out = [];
  GameObjectTree.get(id).forEach((childID) => {
    out.push(GameObjectCache.get(childID));
  });
  return out;
}

// src/components/hierarchy/GetDepth.ts
function GetDepth(id) {
  return HierarchyComponent.depth[id];
}

// src/components/hierarchy/GetNumChildren.ts
function GetNumChildren(id) {
  return HierarchyComponent.numChildren[id];
}

// src/components/hierarchy/GetParentGameObject.ts
function GetParentGameObject(id) {
  return GameObjectCache.get(HierarchyComponent.parentID[id]);
}

// src/components/hierarchy/GetParentID.ts
function GetParentID(id) {
  return HierarchyComponent.parentID[id];
}

// src/components/hierarchy/GetWorldID.ts
function GetWorldID(id) {
  return HierarchyComponent.worldID[id];
}

// src/components/hierarchy/SetDepth.ts
function SetDepth(id, depth) {
  HierarchyComponent.depth[id] = depth;
}

// src/components/hierarchy/SetNumChildren.ts
function SetNumChildren(id) {
  HierarchyComponent.numChildren[id] = GameObjectTree.get(id).length;
}

// src/components/hierarchy/SetParentID.ts
function SetParentID(childID, parentID) {
  HierarchyComponent.parentID[childID] = parentID;
}

// src/components/hierarchy/SetWorldAndParentID.ts
function SetWorldAndParentID(id, worldID, parentID) {
  HierarchyComponent.worldID[id] = worldID;
  HierarchyComponent.parentID[id] = parentID;
}

// src/components/hierarchy/SetWorldID.ts
function SetWorldID(id, worldID) {
  HierarchyComponent.worldID[id] = worldID;
}

// src/components/hierarchy/UpdateNumChildren.ts
function UpdateNumChildren(id) {
  HierarchyComponent.numChildren[id] = GameObjectTree.get(id).length;
}

// src/gameobjects/index.ts
var gameobjects_exports = {};
__export(gameobjects_exports, {
  AnimatedSprite: () => AnimatedSprite,
  Components: () => components_exports,
  Container: () => Container,
  EffectLayer: () => EffectLayer,
  GameObject: () => GameObject,
  GameObjectCache: () => GameObjectCache,
  GameObjectTree: () => GameObjectTree,
  Layer: () => Layer,
  Rectangle: () => Rectangle2,
  RenderLayer: () => RenderLayer,
  Sprite: () => Sprite,
  SpriteBatch: () => SpriteBatch,
  Text: () => Text
});

// src/components/index.ts
var components_exports = {};
__export(components_exports, {
  Bounds: () => bounds_exports,
  Dirty: () => dirty_exports,
  Hierarchy: () => hierarchy_exports,
  Input: () => input_exports,
  Permissions: () => permissions_exports,
  Transform: () => transform_exports,
  Vertex: () => Vertex2,
  Vertices: () => vertices_exports
});

// src/components/bounds/index.ts
var bounds_exports = {};
__export(bounds_exports, {
  BoundsComponent: () => BoundsComponent
});

// src/gameobjects/DIRTY_CONST.ts
var DIRTY_CONST = {
  CLEAR: 0,
  TRANSFORM: 1,
  UPDATE: 2,
  CHILD_CACHE: 4,
  POST_RENDER: 8,
  COLORS: 16,
  BOUNDS: 32,
  TEXTURE: 64,
  FRAME: 128,
  ALPHA: 256,
  CHILD: 512,
  DEFAULT: 1 + 2 + 16 + 32,
  USER1: 536870912,
  USER2: 1073741824,
  USER3: 2147483648,
  USER4: 4294967296
};

// src/components/transform/GetVertices.ts
function GetVertices(worldTransform, transformExtent) {
  const { a, b, c, d, tx, ty } = worldTransform;
  const { x, y, right, bottom } = transformExtent;
  const x0 = x * a + y * c + tx;
  const y0 = x * b + y * d + ty;
  const x1 = x * a + bottom * c + tx;
  const y1 = x * b + bottom * d + ty;
  const x2 = right * a + bottom * c + tx;
  const y2 = right * b + bottom * d + ty;
  const x3 = right * a + y * c + tx;
  const y3 = right * b + y * d + ty;
  return { x0, y0, x1, y1, x2, y2, x3, y3 };
}

// src/components/bounds/BoundsComponent.ts
var BoundsComponent = class {
  entity;
  area;
  fixed = false;
  includeChildren = true;
  visibleOnly = true;
  constructor(entity) {
    this.entity = entity;
    this.area = new Rectangle();
  }
  set(x, y, width, height) {
    this.area.set(x, y, width, height);
  }
  get() {
    if (this.entity.isDirty(DIRTY_CONST.BOUNDS) && !this.fixed) {
      this.update();
    }
    return this.area;
  }
  updateLocal() {
    const { x0, y0, x1, y1, x2, y2, x3, y3 } = GetVertices(this.entity.worldTransform, this.entity.transformExtent);
    const x = Math.min(x0, x1, x2, x3);
    const y = Math.min(y0, y1, y2, y3);
    const right = Math.max(x0, x1, x2, x3);
    const bottom = Math.max(y0, y1, y2, y3);
    return this.area.set(x, y, right - x, bottom - y);
  }
  update() {
    const bounds = this.updateLocal();
    this.entity.clearDirty(DIRTY_CONST.BOUNDS);
    if (!this.includeChildren || !this.entity.numChildren) {
      return bounds;
    }
    const visibleOnly = this.visibleOnly;
    const children = this.entity.children;
    let x = bounds.x;
    let y = bounds.y;
    let right = bounds.right;
    let bottom = bounds.bottom;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (!child || visibleOnly && !child.visible) {
        continue;
      }
      const childBounds = child.bounds.get();
      if (childBounds.x < x) {
        x = childBounds.x;
      }
      if (childBounds.y < y) {
        y = childBounds.y;
      }
      if (childBounds.right > right) {
        right = childBounds.right;
      }
      if (childBounds.bottom > bottom) {
        bottom = childBounds.bottom;
      }
    }
    return bounds.set(x, y, right - x, bottom - y);
  }
  destroy() {
    this.entity = null;
    this.area = null;
  }
};

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
  PermissionsComponent: () => PermissionsComponent,
  SetWillCacheChildren: () => SetWillCacheChildren,
  SetWillRender: () => SetWillRender,
  SetWillRenderChildren: () => SetWillRenderChildren,
  SetWillUpdate: () => SetWillUpdate,
  SetWillUpdateChildren: () => SetWillUpdateChildren,
  WillCacheChildren: () => WillCacheChildren,
  WillRender: () => WillRender,
  WillRenderChildren: () => WillRenderChildren,
  WillUpdate: () => WillUpdate,
  WillUpdateChildren: () => WillUpdateChildren
});

// src/components/permissions/PermissionsComponent.ts
var Permissions = defineComponent({
  visible: Types.ui8,
  visibleChildren: Types.ui8,
  willUpdate: Types.ui8,
  willUpdateChildren: Types.ui8,
  willRender: Types.ui8,
  willRenderChildren: Types.ui8,
  willCacheChildren: Types.ui8,
  willTransformChildren: Types.ui8
});
var PermissionsComponent = Permissions;

// src/components/permissions/AddPermissionsComponent.ts
function AddPermissionsComponent(id) {
  addComponent(GameObjectWorld, PermissionsComponent, id);
  PermissionsComponent.visible[id] = 1;
  PermissionsComponent.visibleChildren[id] = 1;
  PermissionsComponent.willUpdate[id] = 1;
  PermissionsComponent.willUpdateChildren[id] = 1;
  PermissionsComponent.willRender[id] = 1;
  PermissionsComponent.willRenderChildren[id] = 1;
  PermissionsComponent.willCacheChildren[id] = 0;
  PermissionsComponent.willTransformChildren[id] = 1;
}

// src/components/permissions/SetWillCacheChildren.ts
function SetWillCacheChildren(value, ...children) {
  children.forEach((child) => {
    PermissionsComponent.willCacheChildren[child.id] = Number(value);
  });
  return children;
}

// src/components/permissions/SetWillRender.ts
function SetWillRender(value, ...children) {
  children.forEach((child) => {
    PermissionsComponent.willRender[child.id] = Number(value);
  });
  return children;
}

// src/components/permissions/SetWillRenderChildren.ts
function SetWillRenderChildren(value, ...children) {
  children.forEach((child) => {
    PermissionsComponent.willRenderChildren[child.id] = Number(value);
  });
  return children;
}

// src/components/permissions/SetWillUpdate.ts
function SetWillUpdate(value, ...children) {
  children.forEach((child) => {
    PermissionsComponent.willUpdate[child.id] = Number(value);
  });
  return children;
}

// src/components/permissions/SetWillUpdateChildren.ts
function SetWillUpdateChildren(value, ...children) {
  children.forEach((child) => {
    PermissionsComponent.willUpdateChildren[child.id] = Number(value);
  });
  return children;
}

// src/components/permissions/WillCacheChildren.ts
function WillCacheChildren(id) {
  return Boolean(PermissionsComponent.willCacheChildren[id]);
}

// src/components/permissions/WillRender.ts
function WillRender(id) {
  return Boolean(PermissionsComponent.visible[id]) && Boolean(PermissionsComponent.willRender[id]);
}

// src/components/permissions/WillRenderChildren.ts
function WillRenderChildren(id) {
  return Boolean(PermissionsComponent.visibleChildren[id]) && Boolean(PermissionsComponent.willRenderChildren[id]);
}

// src/components/permissions/WillUpdate.ts
function WillUpdate(id) {
  return Boolean(PermissionsComponent.willUpdate[id]);
}

// src/components/permissions/WillUpdateChildren.ts
function WillUpdateChildren(id) {
  return Boolean(PermissionsComponent.willUpdateChildren[id]);
}

// src/components/transform/index.ts
var transform_exports = {};
__export(transform_exports, {
  AddTransform2DComponent: () => AddTransform2DComponent,
  Extent2DComponent: () => Extent2DComponent,
  GetVertices: () => GetVertices,
  GetVerticesFromValues: () => GetVerticesFromValues,
  GlobalToLocal: () => GlobalToLocal,
  LocalMatrix2DComponent: () => LocalMatrix2DComponent,
  LocalToGlobal: () => LocalToGlobal,
  PreRenderVertices: () => PreRenderVertices,
  SetExtent: () => SetExtent,
  Transform2DComponent: () => Transform2DComponent,
  UpdateExtent: () => UpdateExtent,
  UpdateLocalTransform2DSystem: () => UpdateLocalTransform2DSystem,
  UpdateVertices: () => UpdateVertices,
  UpdateWorldTransform: () => UpdateWorldTransform,
  UpdateWorldTransform2DSystem: () => UpdateWorldTransform2DSystem,
  WorldMatrix2DComponent: () => WorldMatrix2DComponent
});

// src/components/transform/LocalMatrix2DComponent.ts
var LocalMatrix2D = defineComponent({
  a: Types.f32,
  b: Types.f32,
  c: Types.f32,
  d: Types.f32,
  tx: Types.f32,
  ty: Types.f32
});
var LocalMatrix2DComponent = LocalMatrix2D;

// src/components/transform/Transform2DComponent.ts
var Transform2D = defineComponent({
  x: Types.f32,
  y: Types.f32,
  rotation: Types.f32,
  scaleX: Types.f32,
  scaleY: Types.f32,
  skewX: Types.f32,
  skewY: Types.f32,
  originX: Types.f32,
  originY: Types.f32
});
var Transform2DComponent = Transform2D;

// src/components/transform/WorldMatrix2DComponent.ts
var WorldMatrix2D = defineComponent({
  a: Types.f32,
  b: Types.f32,
  c: Types.f32,
  d: Types.f32,
  tx: Types.f32,
  ty: Types.f32
});
var WorldMatrix2DComponent = WorldMatrix2D;

// src/components/transform/AddTransform2DComponent.ts
function AddTransform2DComponent(id, x = 0, y = 0, originX = 0, originY = 0) {
  addComponent(GameObjectWorld, Transform2DComponent, id);
  addComponent(GameObjectWorld, Extent2DComponent, id);
  addComponent(GameObjectWorld, LocalMatrix2DComponent, id);
  addComponent(GameObjectWorld, WorldMatrix2DComponent, id);
  Transform2DComponent.x[id] = x;
  Transform2DComponent.y[id] = y;
  Transform2DComponent.scaleX[id] = 1;
  Transform2DComponent.scaleY[id] = 1;
  Transform2DComponent.originX[id] = originX;
  Transform2DComponent.originY[id] = originY;
  LocalMatrix2DComponent.a[id] = 1;
  LocalMatrix2DComponent.d[id] = 1;
  LocalMatrix2DComponent.tx[id] = x;
  LocalMatrix2DComponent.ty[id] = y;
  WorldMatrix2DComponent.a[id] = 1;
  WorldMatrix2DComponent.d[id] = 1;
  WorldMatrix2DComponent.tx[id] = x;
  WorldMatrix2DComponent.ty[id] = y;
}

// src/components/transform/GetVerticesFromValues.ts
function GetVerticesFromValues(left, right, top, bottom, x, y, rotation = 0, scaleX = 1, scaleY = 1, skewX = 0, skewY = 0) {
  const a = Math.cos(rotation + skewY) * scaleX;
  const b = Math.sin(rotation + skewY) * scaleX;
  const c = -Math.sin(rotation - skewX) * scaleY;
  const d = Math.cos(rotation - skewX) * scaleY;
  const x0 = left * a + top * c + x;
  const y0 = left * b + top * d + y;
  const x1 = left * a + bottom * c + x;
  const y1 = left * b + bottom * d + y;
  const x2 = right * a + bottom * c + x;
  const y2 = right * b + bottom * d + y;
  const x3 = right * a + top * c + x;
  const y3 = right * b + top * d + y;
  return { x0, y0, x1, y1, x2, y2, x3, y3 };
}

// src/components/transform/GlobalToLocal.ts
function GlobalToLocal(worldTransform, x, y, out = new Vec2()) {
  const { a, b, c, d, tx, ty } = worldTransform;
  const id = 1 / (a * d + c * -b);
  out.x = d * id * x + -c * id * y + (ty * c - tx * d) * id;
  out.y = a * id * y + -b * id * x + (-ty * a + tx * b) * id;
  return out;
}

// src/components/transform/LocalToGlobal.ts
function LocalToGlobal(worldTransform, x, y, out = new Vec2()) {
  const { a, b, c, d, tx, ty } = worldTransform;
  out.x = a * x + c * y + tx;
  out.y = b * x + d * y + ty;
  return out;
}

// src/renderer/webgl1/colors/PackColors.ts
function PackColors(vertices) {
  vertices.forEach((vertex) => {
    vertex.packColor();
  });
}

// src/components/transform/UpdateVertices.ts
function UpdateVertices(vertices, worldTransform, transformExtent) {
  const { x0, y0, x1, y1, x2, y2, x3, y3 } = GetVertices(worldTransform, transformExtent);
  vertices[0].setPosition(x0, y0);
  vertices[1].setPosition(x1, y1);
  vertices[2].setPosition(x2, y2);
  vertices[3].setPosition(x3, y3);
}

// src/components/transform/PreRenderVertices.ts
function PreRenderVertices(gameObject) {
  const vertices = gameObject.vertices;
  if (gameObject.isDirty(DIRTY_CONST.COLORS)) {
    PackColors(vertices);
    gameObject.clearDirty(DIRTY_CONST.COLORS);
  }
  if (gameObject.isDirty(DIRTY_CONST.TRANSFORM)) {
    UpdateVertices(vertices, gameObject.worldTransform, gameObject.transformExtent);
    gameObject.clearDirty(DIRTY_CONST.TRANSFORM);
  }
  return gameObject;
}

// src/components/transform/UpdateExtent.ts
function UpdateExtent(id, width, height) {
  const x = -Transform2DComponent.originX[id] * width;
  const y = -Transform2DComponent.originY[id] * height;
  Extent2DComponent.x[id] = x;
  Extent2DComponent.y[id] = y;
  Extent2DComponent.width[id] = width;
  Extent2DComponent.height[id] = height;
  Extent2DComponent.right[id] = x + width;
  Extent2DComponent.bottom[id] = y + height;
  SetDirtyTransform(id);
}

// src/components/transform/UpdateLocalTransform2DSystem.ts
var changedLocalTransformQuery = defineQuery([Changed(Transform2DComponent)]);
var entities;
var updateLocalTransformSystem = defineSystem((world3) => {
  for (let i = 0; i < entities.length; i++) {
    const id = entities[i];
    const x = Transform2DComponent.x[id];
    const y = Transform2DComponent.y[id];
    const rotation = Transform2DComponent.rotation[id];
    const scaleX = Transform2DComponent.scaleX[id];
    const scaleY = Transform2DComponent.scaleY[id];
    const skewX = Transform2DComponent.skewX[id];
    const skewY = Transform2DComponent.skewY[id];
    LocalMatrix2DComponent.a[id] = Math.cos(rotation + skewY) * scaleX;
    LocalMatrix2DComponent.b[id] = Math.sin(rotation + skewY) * scaleX;
    LocalMatrix2DComponent.c[id] = -Math.sin(rotation - skewX) * scaleY;
    LocalMatrix2DComponent.d[id] = Math.cos(rotation - skewX) * scaleY;
    LocalMatrix2DComponent.tx[id] = x;
    LocalMatrix2DComponent.ty[id] = y;
  }
  return world3;
});
var UpdateLocalTransform2DSystem = (world3) => {
  entities = changedLocalTransformQuery(world3);
  updateLocalTransformSystem(world3);
  return entities;
};

// src/components/transform/CopyLocalToWorld.ts
function CopyLocalToWorld(source, target) {
  WorldMatrix2DComponent.a[target] = LocalMatrix2DComponent.a[source];
  WorldMatrix2DComponent.b[target] = LocalMatrix2DComponent.b[source];
  WorldMatrix2DComponent.c[target] = LocalMatrix2DComponent.c[source];
  WorldMatrix2DComponent.d[target] = LocalMatrix2DComponent.d[source];
  WorldMatrix2DComponent.tx[target] = LocalMatrix2DComponent.tx[source];
  WorldMatrix2DComponent.ty[target] = LocalMatrix2DComponent.ty[source];
}

// src/components/transform/CopyWorldToWorld.ts
function CopyWorldToWorld(source, target) {
  WorldMatrix2DComponent.a[target] = WorldMatrix2DComponent.a[source];
  WorldMatrix2DComponent.b[target] = WorldMatrix2DComponent.b[source];
  WorldMatrix2DComponent.c[target] = WorldMatrix2DComponent.c[source];
  WorldMatrix2DComponent.d[target] = WorldMatrix2DComponent.d[source];
  WorldMatrix2DComponent.tx[target] = WorldMatrix2DComponent.tx[source];
  WorldMatrix2DComponent.ty[target] = WorldMatrix2DComponent.ty[source];
}

// src/components/transform/MultiplyLocalWithWorld.ts
function MultiplyLocalWithWorld(parentID, id) {
  const pa = WorldMatrix2DComponent.a[parentID];
  const pb = WorldMatrix2DComponent.b[parentID];
  const pc = WorldMatrix2DComponent.c[parentID];
  const pd = WorldMatrix2DComponent.d[parentID];
  const ptx = WorldMatrix2DComponent.tx[parentID];
  const pty = WorldMatrix2DComponent.ty[parentID];
  const a = LocalMatrix2DComponent.a[id];
  const b = LocalMatrix2DComponent.b[id];
  const c = LocalMatrix2DComponent.c[id];
  const d = LocalMatrix2DComponent.d[id];
  const tx = LocalMatrix2DComponent.tx[id];
  const ty = LocalMatrix2DComponent.ty[id];
  WorldMatrix2DComponent.a[id] = a * pa + b * pc;
  WorldMatrix2DComponent.b[id] = a * pb + b * pd;
  WorldMatrix2DComponent.c[id] = c * pa + d * pc;
  WorldMatrix2DComponent.d[id] = c * pb + d * pd;
  WorldMatrix2DComponent.tx[id] = tx * pa + ty * pc + ptx;
  WorldMatrix2DComponent.ty[id] = tx * pb + ty * pd + pty;
}

// src/world/RenderDataComponent.ts
var RenderData = defineComponent({
  gameFrame: Types.ui32,
  dirtyFrame: Types.ui32,
  numRendered: Types.ui32,
  numRenderable: Types.ui32
});
var RenderDataComponent = RenderData;

// src/world/ResetWorldRenderData.ts
var numWorldTransforms = 0;
function ResetWorldRenderData(id, gameFrame) {
  numWorldTransforms = 0;
  RenderDataComponent.gameFrame[id] = gameFrame;
  RenderDataComponent.dirtyFrame[id] = 0;
  RenderDataComponent.numRendered[id] = 0;
  RenderDataComponent.numRenderable[id] = 0;
}
function UpdateNumWorldTransforms() {
  numWorldTransforms++;
}
function GetNumWorldTransforms() {
  return numWorldTransforms;
}

// src/components/permissions/WillTransformChildren.ts
function WillTransformChildren(id) {
  return Boolean(PermissionsComponent.willTransformChildren[id]);
}

// src/components/transform/UpdateWorldTransform.ts
function UpdateWorldTransform(id) {
  const parentID = GetParentID(id);
  if (parentID === 0) {
    CopyLocalToWorld(id, id);
  } else if (!WillTransformChildren(id)) {
    CopyWorldToWorld(parentID, id);
  } else {
    MultiplyLocalWithWorld(parentID, id);
  }
  UpdateNumWorldTransforms();
}

// src/components/transform/UpdateWorldTransform2DSystem.ts
var changedWorldTransformQuery = defineQuery([Changed(LocalMatrix2DComponent)]);
var updateWorldTransformSystem = defineSystem((world3) => {
  const entities3 = changedWorldTransformQuery(world3);
  for (let i = 0; i < entities3.length; i++) {
    const id = entities3[i];
    const gameObject = GameObjectCache.get(id);
    const parent = gameObject.parent;
    if (!parent) {
      CopyLocalToWorld(id, id);
    } else if (!WillTransformChildren(id)) {
      CopyWorldToWorld(parent.id, id);
    } else {
      MultiplyLocalWithWorld(parent.id, id);
    }
  }
});
var UpdateWorldTransform2DSystem = updateWorldTransformSystem;

// src/components/vertices/index.ts
var vertices_exports = {};
__export(vertices_exports, {
  AddVertex: () => AddVertex,
  QuadVertexComponent: () => QuadVertexComponent,
  SetUV: () => SetUV,
  UpdateVertexPositionSystem: () => UpdateVertexPositionSystem,
  VertexComponent: () => VertexComponent,
  VertexWorld: () => VertexWorld
});

// src/components/vertices/VertexWorld.ts
var world2 = createWorld();
var VertexWorld = world2;

// src/components/vertices/AddVertex.ts
function AddVertex() {
  const vertexID = addEntity(VertexWorld);
  addComponent(VertexWorld, VertexComponent, vertexID);
  VertexComponent.alpha[vertexID] = 1;
  VertexComponent.tint[vertexID] = 16777215;
  VertexComponent.color[vertexID] = 4294967295;
  return vertexID;
}

// src/components/vertices/UpdateVertexPositionSystem.ts
var changedWorldExtentQuery = defineQuery([
  Changed(WorldMatrix2DComponent),
  Changed(Extent2DComponent)
]);
var entities2;
var updateVertexPositionSystem = defineSystem((world3) => {
  for (let i = 0; i < entities2.length; i++) {
    const id = entities2[i];
    const a = WorldMatrix2DComponent.a[id];
    const b = WorldMatrix2DComponent.b[id];
    const c = WorldMatrix2DComponent.c[id];
    const d = WorldMatrix2DComponent.d[id];
    const tx = WorldMatrix2DComponent.tx[id];
    const ty = WorldMatrix2DComponent.ty[id];
    const x = Extent2DComponent.x[id];
    const y = Extent2DComponent.y[id];
    const right = Extent2DComponent.right[id];
    const bottom = Extent2DComponent.bottom[id];
    const v1 = QuadVertexComponent.v1[id];
    const v2 = QuadVertexComponent.v2[id];
    const v3 = QuadVertexComponent.v3[id];
    const v4 = QuadVertexComponent.v4[id];
    VertexComponent.x[v1] = x * a + y * c + tx;
    VertexComponent.y[v1] = x * b + y * d + ty;
    VertexComponent.x[v2] = x * a + bottom * c + tx;
    VertexComponent.y[v2] = x * b + bottom * d + ty;
    VertexComponent.x[v3] = right * a + bottom * c + tx;
    VertexComponent.y[v3] = right * b + bottom * d + ty;
    VertexComponent.x[v4] = right * a + y * c + tx;
    VertexComponent.y[v4] = right * b + y * d + ty;
  }
  return world3;
});
var UpdateVertexPositionSystem = (world3) => {
  entities2 = changedWorldExtentQuery(world3);
  updateVertexPositionSystem(world3);
  return entities2;
};

// src/renderer/webgl1/colors/PackColor.ts
function PackColor(rgb, alpha) {
  const ua = (alpha * 255 | 0) & 255;
  return (ua << 24 | rgb) >>> 0;
}

// src/components/Vertex.ts
var Vertex2 = class {
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

// src/renderer/webgl1/draw/AddVertexToBatch.ts
function AddVertexToBatch(id, offset, textureIndex, F32, U32) {
  VertexComponent.offset[id] = offset;
  F32[offset + 0] = VertexComponent.x[id];
  F32[offset + 1] = VertexComponent.y[id];
  F32[offset + 2] = VertexComponent.u[id];
  F32[offset + 3] = VertexComponent.v[id];
  F32[offset + 4] = textureIndex;
  U32[offset + 5] = VertexComponent.color[id];
  return offset + 6;
}

// src/renderer/webgl1/draw/BatchTexturedQuad.ts
function BatchTexturedQuad(texture, id, renderPass) {
  const { F32, U32, offset } = GetVertexBufferEntry(renderPass, 1);
  const textureIndex = SetTexture(renderPass, texture);
  let vertOffset = AddVertexToBatch(QuadVertexComponent.v1[id], offset, textureIndex, F32, U32);
  vertOffset = AddVertexToBatch(QuadVertexComponent.v2[id], vertOffset, textureIndex, F32, U32);
  vertOffset = AddVertexToBatch(QuadVertexComponent.v3[id], vertOffset, textureIndex, F32, U32);
  AddVertexToBatch(QuadVertexComponent.v4[id], vertOffset, textureIndex, F32, U32);
}

// src/config/defaultorigin/GetDefaultOriginX.ts
function GetDefaultOriginX() {
  return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).x;
}

// src/config/defaultorigin/GetDefaultOriginY.ts
function GetDefaultOriginY() {
  return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).y;
}

// src/display/RemoveChildrenBetween.ts
function RemoveChildrenBetween(parent, beginIndex = 0, endIndex) {
  const children = parent.children;
  if (endIndex === void 0) {
    endIndex = children.length;
  }
  const range = endIndex - beginIndex;
  if (range > 0 && range <= endIndex) {
    const removed2 = children.splice(beginIndex, range);
    removed2.forEach((child) => {
      child.parent = null;
    });
    return removed2;
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
}

// src/gameobjects/events/DestroyEvent.ts
var DestroyEvent = "destroy";

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

// src/display/DepthFirstSearch.ts
function DepthFirstSearch(parent) {
  const stack = [parent];
  const output = [];
  while (stack.length > 0) {
    const node = stack.shift();
    output.push(node);
    const numChildren = node.numChildren;
    if (numChildren > 0) {
      for (let i = numChildren - 1; i >= 0; i--) {
        stack.unshift(node.children[i]);
      }
    }
  }
  output.shift();
  return output;
}

// src/display/GetChildIndex.ts
function GetChildIndex(parent, child) {
  return GameObjectTree.get(parent.id).indexOf(child.id);
}

// src/display/RemoveChildAt.ts
function RemoveChildAt(parent, index) {
  const children = GameObjectTree.get(parent.id);
  if (index >= 0 && index < children.length) {
    const removedID = children.splice(index, 1)[0];
    if (removedID) {
      const worldID = GetWorldID(removedID);
      SetDirtyDisplayList(worldID);
      ClearWorldAndParentID(removedID);
      UpdateNumChildren(parent.id);
      return GameObjectCache.get(removedID);
    }
  }
}

// src/display/RemoveChild.ts
function RemoveChild(parent, child) {
  if (child.hasParent()) {
    RemoveChildAt(parent, GetChildIndex(parent, child));
  }
  return child;
}

// src/display/SetWorld.ts
function SetWorld(world3, ...children) {
  children.forEach((child) => {
    addComponent(GameObjectWorld, world3.tag, child.id);
  });
  return children;
}

// src/display/SetParent.ts
function SetParent2(parent, ...children) {
  children.forEach((child) => {
    if (child.parent) {
      RemoveChild(child.parent, child);
    }
    child.parent = parent;
  });
  const parentWorld = parent.world;
  if (parentWorld) {
    SetWorld(parentWorld, ...DepthFirstSearch(parent));
  }
  return children;
}

// src/display/ReparentChildren.ts
function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
  const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
  SetParent2(newParent, ...moved);
  moved.forEach((child) => {
    child.updateWorldTransform();
  });
  return moved;
}

// src/gameobjects/GameObject.ts
var GameObject = class {
  id = addEntity(GameObjectWorld);
  name = "";
  events;
  constructor() {
    const id = this.id;
    AddHierarchyComponent(id);
    AddPermissionsComponent(id);
    AddDirtyComponent(id);
    GameObjectCache.set(id, this);
    GameObjectTree.set(id, []);
    this.events = new Map();
  }
  isRenderable() {
    return WillRender(this.id);
  }
  beforeUpdate(delta, time) {
  }
  update(delta, time) {
    this.beforeUpdate(delta, time);
    if (WillUpdateChildren(this.id)) {
      const children = GameObjectTree.get(this.id);
      for (let i = 0; i < children.length; i++) {
        const childID = children[i];
        if (WillUpdate(childID)) {
          GameObjectCache.get(childID).update(delta, time);
        }
      }
    }
    this.afterUpdate(delta, time);
  }
  afterUpdate(delta, time) {
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
    PermissionsComponent.visible[this.id] = Number(value);
  }
  get visible() {
    return Boolean(PermissionsComponent.visible[this.id]);
  }
  set visibleChildren(value) {
    PermissionsComponent.visibleChildren[this.id] = Number(value);
  }
  get visibleChildren() {
    return Boolean(PermissionsComponent.visibleChildren[this.id]);
  }
  set depth(value) {
    HierarchyComponent.depth[this.id] = value;
  }
  get depth() {
    return HierarchyComponent.depth[this.id];
  }
  hasParent() {
    return HierarchyComponent.parentID[this.id] > 0;
  }
  getParent() {
    return GetParentGameObject(this.id);
  }
  getChildren() {
    return GetChildren(this.id);
  }
  getNumChildren() {
    return GetNumChildren(this.id);
  }
  destroy(reparentChildren) {
    if (reparentChildren) {
      ReparentChildren(this, reparentChildren);
    } else {
      DestroyChildren(this);
    }
    Emit(this, DestroyEvent, this);
    this.events.clear();
    this.events = null;
  }
};

// src/gameobjects/container/Container.ts
var Container = class extends GameObject {
  _alpha = 1;
  constructor(x = 0, y = 0) {
    super();
    AddTransform2DComponent(this.id, x, y, GetDefaultOriginX(), GetDefaultOriginY());
  }
  updateWorldTransform() {
  }
  getBounds() {
    return this.bounds.get();
  }
  setSize(width, height = width) {
    UpdateExtent(this.id, width, height);
    return this;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  setSkew(x, y = x) {
    this.skewX = x;
    this.skewY = y;
    return this;
  }
  setScale(x, y = x) {
    this.scaleX = x;
    this.scaleY = y;
    return this;
  }
  setRotation(value) {
    this.rotation = value;
    return this;
  }
  setOrigin(x, y = x) {
    const id = this.id;
    Transform2DComponent.originX[id] = x;
    Transform2DComponent.originY[id] = y;
    UpdateExtent(id, this.width, this.height);
    return this;
  }
  getSize(out = new Vec2()) {
    return out.set(Extent2DComponent.width[this.id], Extent2DComponent.height[this.id]);
  }
  getPosition(out = new Vec2()) {
    return out.set(this.x, this.y);
  }
  getOrigin(out = new Vec2()) {
    return out.set(this.originX, this.originY);
  }
  getSkew(out = new Vec2()) {
    return out.set(this.skewX, this.skewY);
  }
  getScale(out = new Vec2()) {
    return out.set(this.scaleX, this.scaleY);
  }
  getRotation() {
    return this.rotation;
  }
  set width(value) {
    UpdateExtent(this.id, value, this.height);
  }
  get width() {
    return Extent2DComponent.width[this.id];
  }
  set height(value) {
    UpdateExtent(this.id, this.width, value);
  }
  get height() {
    return Extent2DComponent.height[this.id];
  }
  set x(value) {
    Transform2DComponent.x[this.id] = value;
  }
  get x() {
    return Transform2DComponent.x[this.id];
  }
  set y(value) {
    Transform2DComponent.y[this.id] = value;
  }
  get y() {
    return Transform2DComponent.y[this.id];
  }
  set originX(value) {
    Transform2DComponent.originX[this.id] = value;
    UpdateExtent(this.id, this.width, this.height);
  }
  get originX() {
    return Transform2DComponent.originX[this.id];
  }
  set originY(value) {
    Transform2DComponent.originY[this.id] = value;
    UpdateExtent(this.id, this.width, this.height);
  }
  get originY() {
    return Transform2DComponent.originY[this.id];
  }
  set skewX(value) {
    Transform2DComponent.skewX[this.id] = value;
  }
  get skewX() {
    return Transform2DComponent.skewX[this.id];
  }
  set skewY(value) {
    Transform2DComponent.skewY[this.id] = value;
  }
  get skewY() {
    return Transform2DComponent.skewY[this.id];
  }
  set scaleX(value) {
    Transform2DComponent.scaleX[this.id] = value;
  }
  get scaleX() {
    return Transform2DComponent.scaleX[this.id];
  }
  set scaleY(value) {
    Transform2DComponent.scaleY[this.id] = value;
  }
  get scaleY() {
    return Transform2DComponent.scaleY[this.id];
  }
  set rotation(value) {
    Transform2DComponent.rotation[this.id] = value;
  }
  get rotation() {
    return Transform2DComponent.rotation[this.id];
  }
  get alpha() {
    return this._alpha;
  }
  set alpha(value) {
    this._alpha = value;
    SetDirtyAlpha(this.id);
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
  }
};

// src/renderer/canvas/draw/DrawImage.ts
function DrawImage(frame2, alpha, worldTransform, transformExtent, renderer) {
  if (!frame2) {
    return;
  }
  const ctx = renderer.ctx;
  const { a, b, c, d, tx, ty } = worldTransform;
  const { x, y } = transformExtent;
  ctx.save();
  ctx.setTransform(a, b, c, d, tx, ty);
  ctx.globalAlpha = alpha;
  ctx.drawImage(frame2.texture.image, frame2.x, frame2.y, frame2.width, frame2.height, x, y, frame2.width, frame2.height);
  ctx.restore();
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
      child.setOrigin(pivot.x, pivot.y);
    }
    frame2.copyToExtent(child);
    frame2.copyToVertices(child.id);
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
  texture;
  frame;
  hasTexture = false;
  _tint = 16777215;
  constructor(x, y, texture, frame2) {
    super(x, y);
    const id = this.id;
    addComponent(GameObjectWorld, QuadVertexComponent, id);
    QuadVertexComponent.v1[id] = AddVertex();
    QuadVertexComponent.v2[id] = AddVertex();
    QuadVertexComponent.v3[id] = AddVertex();
    QuadVertexComponent.v4[id] = AddVertex();
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
    BatchTexturedQuad(this.texture, this.id, renderPass);
  }
  renderCanvas(renderer) {
    PreRenderVertices(this);
    DrawImage(this.frame, this.alpha, this.worldTransform, this.transformExtent, renderer);
  }
  get tint() {
    return this._tint;
  }
  set tint(value) {
    if (value !== this._tint) {
      this._tint = value;
      SetDirtyVertexColors(this.id);
    }
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.texture = null;
    this.frame = null;
    this.hasTexture = false;
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
    this.currentAnimation;
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

// src/renderer/webgl1/draw/BatchSingleQuad.ts
function BatchSingleQuad(renderPass, x, y, width, height, u0, v0, u1, v1, textureIndex = 0, packedColor = 4294967295) {
  const { F32, U32, offset } = GetVertexBufferEntry(renderPass, 1);
  F32[offset + 0] = x;
  F32[offset + 1] = y;
  F32[offset + 2] = u0;
  F32[offset + 3] = v1;
  F32[offset + 4] = textureIndex;
  U32[offset + 5] = packedColor;
  F32[offset + 6] = x;
  F32[offset + 7] = y + height;
  F32[offset + 8] = u0;
  F32[offset + 9] = v0;
  F32[offset + 10] = textureIndex;
  U32[offset + 11] = packedColor;
  F32[offset + 12] = x + width;
  F32[offset + 13] = y + height;
  F32[offset + 14] = u1;
  F32[offset + 15] = v0;
  F32[offset + 16] = textureIndex;
  U32[offset + 17] = packedColor;
  F32[offset + 18] = x + width;
  F32[offset + 19] = y;
  F32[offset + 20] = u1;
  F32[offset + 21] = v1;
  F32[offset + 22] = textureIndex;
  U32[offset + 23] = packedColor;
}

// src/renderer/webgl1/draw/DrawTexturedQuad.ts
function DrawTexturedQuad(renderPass, texture, shader) {
  if (!shader) {
    shader = renderPass.quadShader;
  }
  const { u0, v0, u1, v1 } = texture.firstFrame;
  BindTexture(texture, 0);
  SetVertexBuffer(renderPass, renderPass.quadBuffer);
  SetShader(renderPass, shader, 0);
  BatchSingleQuad(renderPass, 0, 0, texture.width, texture.height, u0, v0, u1, v1, 0);
  Flush(renderPass);
  PopVertexBuffer(renderPass);
  PopShader(renderPass);
  UnbindTexture(renderPass);
}

// src/gameobjects/layer/Layer.ts
var Layer = class extends GameObject {
  constructor() {
    super();
    this.passthru = true;
    this.willRender = false;
  }
};

// src/gameobjects/renderlayer/RenderLayer.ts
var RenderLayer = class extends Layer {
  texture;
  framebuffer;
  constructor() {
    super();
    this.willRender = true;
    this.willRenderChildren = true;
    this.willCacheChildren = true;
    this.setDirty(DIRTY_CONST.CHILD_CACHE);
    const width = GetWidth();
    const height = GetHeight();
    const resolution = GetResolution();
    const texture = new Texture(null, width * resolution, height * resolution);
    const binding = new GLTextureBinding(texture);
    texture.binding = binding;
    binding.framebuffer = CreateFramebuffer(binding.texture);
    this.texture = texture;
    this.framebuffer = binding.framebuffer;
  }
  renderGL(renderPass) {
    if (this.numChildren > 0) {
      Flush(renderPass);
      if (!this.willCacheChildren || this.isDirty(DIRTY_CONST.CHILD_CACHE)) {
        SetFramebuffer(renderPass, this.framebuffer, true);
        this.clearDirty(DIRTY_CONST.CHILD_CACHE);
      } else {
        SetFramebuffer(renderPass, this.framebuffer, false);
        this.postRenderGL(renderPass);
      }
    }
  }
  postRenderGL(renderPass) {
    Flush(renderPass);
    PopFramebuffer(renderPass);
    DrawTexturedQuad(renderPass, this.texture);
    this.clearDirty(DIRTY_CONST.TRANSFORM);
  }
};

// src/gameobjects/effectlayer/EffectLayer.ts
var EffectLayer = class extends RenderLayer {
  shaders = [];
  constructor(...shaders) {
    super();
    if (Array.isArray(shaders)) {
      this.shaders = shaders;
    }
  }
  postRenderGL(renderPass) {
    const shaders = this.shaders;
    const texture = this.texture;
    Flush(renderPass);
    PopFramebuffer(renderPass);
    if (shaders.length === 0) {
      DrawTexturedQuad(renderPass, texture);
    } else {
      let prevTexture = texture;
      for (let i = 0; i < shaders.length; i++) {
        const shader = shaders[i];
        DrawTexturedQuad(renderPass, prevTexture, shader);
        prevTexture = shader.texture;
      }
      DrawTexturedQuad(renderPass, prevTexture);
    }
    this.clearDirty(DIRTY_CONST.TRANSFORM);
  }
};

// src/gameobjects/rectangle/Rectangle.ts
var Rectangle2 = class extends Container {
  texture;
  frame;
  _color = 16777215;
  constructor(x, y, width = 64, height = 64, color = 16777215) {
    super(x, y);
    this.vertices = [new Vertex2(), new Vertex2(), new Vertex2(), new Vertex2()];
    this.color = color;
    this.setWhiteTexture();
    this.setSize(width, height);
  }
  setWhiteTexture() {
    this.texture = TextureManagerInstance.get().get("__WHITE");
    this.frame = this.texture.getFrame();
    this.frame.copyToExtent(this);
    this.frame.copyToVertices(this.vertices);
  }
  setColor(color) {
    this.color = color;
    return this;
  }
  isRenderable() {
    return this.visible && this.willRender && this.alpha > 0;
  }
  renderGL(renderPass) {
    PreRenderVertices(this);
    BatchTexturedQuad(this.texture, this.vertices, renderPass);
  }
  renderCanvas(renderer) {
    PreRenderVertices(this);
    DrawImage(this.frame, this.alpha, this.worldTransform, this.transformExtent, renderer);
  }
  get color() {
    return this._color;
  }
  set color(value) {
    if (value !== this._color) {
      this._color = value;
      this.vertices.forEach((vertex) => {
        vertex.setTint(value);
      });
      this.setDirty(DIRTY_CONST.COLORS);
    }
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.texture = null;
    this.frame = null;
  }
};

// src/renderer/webgl1/draw/BatchTexturedQuadBuffer.ts
function BatchTexturedQuadBuffer(batch, renderPass) {
}

// src/gameobjects/spritebatch/SpriteBatch.ts
var SpriteBatch = class extends Layer {
  data;
  vertexViewF32;
  vertexViewU32;
  index;
  vertexBuffer;
  indexBuffer;
  count;
  maxSize;
  glTextureIndex = 0;
  texture;
  hasTexture = false;
  constructor(maxSize, texture) {
    super();
    this.willRender = true;
    this.setTexture(texture);
    this.setMaxSize(maxSize);
  }
  resetBuffers() {
    let ibo = [];
    for (let i = 0; i < this.maxSize * 4; i += 4) {
      ibo.push(i + 0, i + 1, i + 2, i + 2, i + 3, i + 0);
    }
    this.data = new ArrayBuffer(this.maxSize * 96);
    this.index = new Uint16Array(ibo);
    this.vertexViewF32 = new Float32Array(this.data);
    this.vertexViewU32 = new Uint32Array(this.data);
    if (gl) {
      DeleteFramebuffer(this.vertexBuffer);
      DeleteFramebuffer(this.indexBuffer);
      this.vertexBuffer = gl.createBuffer();
      this.indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
    ibo = [];
    this.count = 0;
  }
  setMaxSize(value) {
    this.maxSize = Clamp(value, 0, 65535);
    this.resetBuffers();
    return this;
  }
  setTexture(key) {
    let texture;
    if (key instanceof Texture) {
      texture = key;
    } else {
      texture = TextureManagerInstance.get().get(key);
    }
    if (!texture) {
      console.warn(`Invalid Texture key: ${key}`);
    } else {
      this.texture = texture;
      this.hasTexture = true;
      this.glTextureIndex = -1;
    }
    return this;
  }
  isRenderable() {
    return this.visible && this.willRender && this.hasTexture && this.count > 0;
  }
  clear() {
    this.count = 0;
    return this;
  }
  addToBatch(frame2, color, x0, y0, x1, y1, x2, y2, x3, y3) {
    if (this.count >= this.maxSize) {
      console.warn("SpriteBatch full");
      return this;
    }
    const { u0, u1, v0, v1 } = frame2;
    const F32 = this.vertexViewF32;
    const U32 = this.vertexViewU32;
    const offset = this.count * 24;
    const textureIndex = this.texture.binding ? this.texture.binding.index : 0;
    F32[offset + 0] = x0;
    F32[offset + 1] = y0;
    F32[offset + 2] = u0;
    F32[offset + 3] = v0;
    F32[offset + 4] = textureIndex;
    U32[offset + 5] = color;
    F32[offset + 6] = x1;
    F32[offset + 7] = y1;
    F32[offset + 8] = u0;
    F32[offset + 9] = v1;
    F32[offset + 10] = textureIndex;
    U32[offset + 11] = color;
    F32[offset + 12] = x2;
    F32[offset + 13] = y2;
    F32[offset + 14] = u1;
    F32[offset + 15] = v1;
    F32[offset + 16] = textureIndex;
    U32[offset + 17] = color;
    F32[offset + 18] = x3;
    F32[offset + 19] = y3;
    F32[offset + 20] = u1;
    F32[offset + 21] = v0;
    F32[offset + 22] = textureIndex;
    U32[offset + 23] = color;
    this.setDirty(DIRTY_CONST.TRANSFORM);
    this.count++;
    return this;
  }
  add(config) {
    const {
      frame: frame2 = null,
      x = 0,
      y = 0,
      rotation = 0,
      scaleX = 1,
      scaleY = 1,
      skewX = 0,
      skewY = 0,
      originX = 0,
      originY = 0,
      alpha = 1,
      tint = 16777215
    } = config;
    const textureFrame = this.texture.getFrame(frame2);
    const { left, right, top, bottom } = textureFrame.getExtent(originX, originY);
    const { x0, y0, x1, y1, x2, y2, x3, y3 } = GetVerticesFromValues(left, right, top, bottom, x, y, rotation, scaleX, scaleY, skewX, skewY);
    const packedColor = PackColor(tint, alpha);
    return this.addToBatch(textureFrame, packedColor, x0, y0, x1, y1, x2, y2, x3, y3);
  }
  addXY(x, y, frame2) {
    const textureFrame = this.texture.getFrame(frame2);
    const { left, right, top, bottom } = textureFrame.getExtent(0, 0);
    const { x0, y0, x1, y1, x2, y2, x3, y3 } = GetVerticesFromValues(left, right, top, bottom, x, y);
    return this.addToBatch(textureFrame, 4294967295, x0, y0, x1, y1, x2, y2, x3, y3);
  }
  updateTextureIndex() {
    const textureIndex = this.texture.binding.index;
    if (textureIndex === this.glTextureIndex) {
      return;
    }
    const F32 = this.vertexViewF32;
    this.glTextureIndex = textureIndex;
    for (let i = 0; i < this.count; i++) {
      F32[i * 24 + 4] = textureIndex;
      F32[i * 24 + 10] = textureIndex;
      F32[i * 24 + 16] = textureIndex;
      F32[i * 24 + 22] = textureIndex;
    }
  }
  renderGL(renderPass) {
    BatchTexturedQuadBuffer(this, renderPass);
  }
  destroy() {
    super.destroy();
    DeleteFramebuffer(this.vertexBuffer);
    DeleteFramebuffer(this.indexBuffer);
    this.data = null;
    this.vertexViewF32 = null;
    this.vertexViewU32 = null;
    this.index = null;
    this.texture = null;
    this.hasTexture = false;
  }
};

// src/gameobjects/text/Text.ts
var Text = class extends Sprite {
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
    const game = GameInstance.get();
    this.resolution = game.renderer.resolution;
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
      this.setSize(displayWidth, displayHeight);
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
    this.setDirty(DIRTY_CONST.TEXTURE);
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

// src/display/IsValidParent.ts
function IsValidParent(parent, child) {
  return !(child.id === parent.id || parent.id === GetParentID(child.id));
}

// src/display/AddChild.ts
function AddChild(parent, child) {
  const childID = child.id;
  const parentID = parent.id;
  const worldID = GetWorldID(parentID);
  const world3 = GameObjectCache.get(worldID);
  if (IsValidParent(parent, child)) {
    RemoveChild(child.getParent(), child);
    GameObjectTree.get(parentID).push(childID);
    SetWorldAndParentID(childID, worldID, parentID);
    SetParentID(childID, parentID);
    SetWorld(world3, child);
    SetDirtyDisplayList(worldID);
    UpdateNumChildren(parentID);
  }
  return child;
}

// src/display/AddChildAt.ts
function AddChildAt(parent, index, child) {
  const children = parent.children;
  if (index >= 0 && index <= children.length) {
    SetParent2(parent, child);
    children.splice(index, 0, child);
    child.updateWorldTransform();
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
  const parentChildren = parent.children;
  if (index >= 0 && index <= parentChildren.length) {
    children.reverse().forEach((child) => {
      children.splice(index, 0, child);
      SetParent2(parent, child);
      child.updateWorldTransform();
    });
  }
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
    child.scaleX += scaleX;
    child.scaleY += scaleY;
  });
  return children;
}

// src/display/AddSkew.ts
function AddSkew(skewX, skewY, ...children) {
  children.forEach((child) => {
    child.skewX += skewX;
    child.skewY += skewY;
  });
  return children;
}

// src/display/BringChildToTop.ts
function BringChildToTop(parent, child) {
  const parentChildren = parent.children;
  const currentIndex = GetChildIndex(parent, child);
  if (currentIndex !== -1 && currentIndex < parentChildren.length) {
    parentChildren.splice(currentIndex, 1);
    parentChildren.push(child);
    child.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
}

// src/display/DepthFirstSearchRecursiveNested.ts
function DepthFirstSearchRecursiveNested(parent, output = []) {
  for (let i = 0; i < parent.numChildren; i++) {
    const node = parent.children[i];
    const children = [];
    output.push({ node, children });
    if (node.numChildren > 0) {
      DepthFirstSearchRecursiveNested(node, children);
    }
  }
  return output;
}

// src/display/ConsoleTreeChildren.ts
function GetInfo(entry) {
  const legend = entry.numChildren > 0 ? "Parent" : "Child";
  return `${legend} [ type=${typeof entry}, name=${entry.name} ]`;
}
function LogChildren(entry) {
  console.group(GetInfo(entry.node));
  entry.children.forEach((child) => {
    if (child.children.length > 0) {
      LogChildren(child);
    } else {
      console.log(GetInfo(child.node));
    }
  });
  console.groupEnd();
}
function ConsoleTreeChildren(parent) {
  const entries = DepthFirstSearchRecursiveNested(parent);
  if (parent.world === parent) {
    console.group("World");
  } else {
    console.group(GetInfo(parent));
  }
  entries.forEach((entry) => {
    if (entry.children.length) {
      LogChildren(entry);
    } else {
      console.log(GetInfo(entry.node));
    }
  });
  console.groupEnd();
}

// src/display/CountMatchingChildren.ts
function CountMatchingChildren(parent, property, value) {
  const children = parent.children;
  let total = 0;
  children.forEach((child) => {
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor && (value === void 0 || value === descriptor.value)) {
      total++;
    }
  });
  return total;
}

// src/display/DepthFirstSearchRecursive.ts
function DepthFirstSearchRecursive(parent, output = []) {
  for (let i = 0; i < parent.numChildren; i++) {
    const child = parent.children[i];
    output.push(child);
    if (child.numChildren > 0) {
      DepthFirstSearchRecursive(child, output);
    }
  }
  return output;
}

// src/display/FindChildByName.ts
function FindChildByName(parent, searchString) {
  const children = DepthFirstSearch(parent);
  const regex = RegExp(searchString);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (regex.test(child.name)) {
      return child;
    }
  }
}

// src/display/FindChildrenByName.ts
function FindChildrenByName(parent, searchString) {
  const children = DepthFirstSearch(parent);
  const regex = RegExp(searchString);
  const results = [];
  children.forEach((child) => {
    if (regex.test(child.name)) {
      results.push(child);
    }
  });
  return results;
}

// src/display/GetAllChildren.ts
function GetAllChildren(parent, property, value) {
  const children = DepthFirstSearch(parent);
  if (!property) {
    return children;
  }
  const results = [];
  children.forEach((child) => {
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor && (value === void 0 || value === descriptor.value)) {
      results.push(child);
    }
  });
  return results;
}

// src/display/GetBounds.ts
function GetBounds(...children) {
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  children.forEach((child) => {
    const { x, y, right, bottom } = child.bounds.get();
    if (x < minX) {
      minX = x;
    }
    if (y < minY) {
      minY = y;
    }
    if (right > maxX) {
      maxX = right;
    }
    if (bottom > maxY) {
      maxY = bottom;
    }
  });
  return new Rectangle(minX, minY, maxX, maxY);
}

// src/display/GetChildAt.ts
function GetChildAt(parent, index) {
  const children = parent.children;
  if (index < 0 || index > children.length) {
    throw new Error(`Index out of bounds: ${index}`);
  }
  return children[index];
}

// src/display/GetChildren.ts
function GetChildren2(parent, property, value) {
  const children = parent.children;
  if (!property) {
    return [...children];
  }
  const results = [];
  children.forEach((child) => {
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor && (value === void 0 || value === descriptor.value)) {
      results.push(child);
    }
  });
  return results;
}

// src/display/GetClosestChild.ts
function GetClosestChild(parent, point) {
  const children = parent.children;
  let closest = null;
  let distance = 0;
  children.forEach((child) => {
    const childDistance = GetVec2Distance(point, child.getPosition());
    if (!closest || childDistance < distance) {
      closest = child;
      distance = childDistance;
    }
  });
  return closest;
}

// src/display/GetFirstChild.ts
function GetFirstChild(parent, property, value) {
  const children = parent.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor && (value === void 0 || value === descriptor.value)) {
      return child;
    }
  }
}

// src/display/GetFurthestChild.ts
function GetFurthestChild(parent, point) {
  const children = parent.children;
  let furthest = null;
  let distance = 0;
  children.forEach((child) => {
    const childDistance = GetVec2Distance(point, child.getPosition());
    if (!furthest || childDistance > distance) {
      furthest = child;
      distance = childDistance;
    }
  });
  return furthest;
}

// src/display/GetLastChild.ts
function GetLastChild(parent, property, value) {
  const children = parent.children;
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor && (value === void 0 || value === descriptor.value)) {
      return child;
    }
  }
}

// src/display/GetParents.ts
function GetParents(child) {
  const parents = [];
  while (child.parent) {
    parents.push(child.parent);
    child = child.parent;
  }
  return parents;
}

// src/display/GetRandomChild.ts
function GetRandomChild(parent, startIndex = 0, length) {
  const children = parent.children;
  if (!length) {
    length = children.length;
  }
  const randomIndex = startIndex + Math.floor(Math.random() * length);
  return children[randomIndex];
}

// src/display/MoveChildDown.ts
function MoveChildDown(parent, child) {
  const parentChildren = parent.children;
  const currentIndex = GetChildIndex(parent, child);
  if (currentIndex > 0) {
    const child2 = parentChildren[currentIndex - 1];
    const index2 = parentChildren.indexOf(child2);
    parentChildren[currentIndex] = child2;
    parentChildren[index2] = child;
    child.setDirty(DIRTY_CONST.TRANSFORM);
    child2.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
}

// src/display/MoveChildTo.ts
function MoveChildTo(parent, child, index) {
  const parentChildren = parent.children;
  const currentIndex = GetChildIndex(parent, child);
  if (currentIndex === -1 || index < 0 || index >= parentChildren.length) {
    throw new Error("Index out of bounds");
  }
  if (currentIndex !== index) {
    parentChildren.splice(currentIndex, 1);
    parentChildren.splice(index, 0, child);
    child.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
}

// src/display/MoveChildUp.ts
function MoveChildUp(parent, child) {
  const parentChildren = parent.children;
  const currentIndex = GetChildIndex(parent, child);
  if (currentIndex !== -1 && currentIndex > 0) {
    const child2 = parentChildren[currentIndex + 1];
    const index2 = parentChildren.indexOf(child2);
    parentChildren[currentIndex] = child2;
    parentChildren[index2] = child;
    child.setDirty(DIRTY_CONST.TRANSFORM);
    child2.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
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
  const sourceBounds = source.getBounds();
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (target === source) {
      continue;
    }
    if (RectangleToRectangle(sourceBounds, target.getBounds())) {
      return true;
    }
  }
  return false;
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

// src/display/RotateChildrenLeft.ts
function RotateChildrenLeft(parent, total = 1) {
  const parentChildren = parent.children;
  let child = null;
  for (let i = 0; i < total; i++) {
    child = parentChildren.shift();
    parentChildren.push(child);
    child.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
}

// src/display/RotateChildrenRight.ts
function RotateChildrenRight(parent, total = 1) {
  const parentChildren = parent.children;
  let child = null;
  for (let i = 0; i < total; i++) {
    child = parentChildren.pop();
    parentChildren.unshift(child);
    child.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
}

// src/display/SendChildToBack.ts
function SendChildToBack(parent, child) {
  const parentChildren = parent.children;
  const currentIndex = GetChildIndex(parent, child);
  if (currentIndex !== -1 && currentIndex > 0) {
    parentChildren.splice(currentIndex, 1);
    parentChildren.unshift(child);
    child.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
}

// src/display/SetBounds.ts
function SetBounds(x, y, width, height, ...children) {
  children.forEach((child) => {
    child.bounds.set(x, y, width, height);
  });
  return children;
}

// src/display/SetChildrenValue.ts
function SetChildrenValue(parent, property, value) {
  const children = DepthFirstSearch(parent);
  children.forEach((child) => {
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor) {
      descriptor.set(value);
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
    child.setOrigin(originX, originY);
  });
  return children;
}

// src/display/SetPosition.ts
function SetPosition(x, y, ...children) {
  children.forEach((child) => {
    child.setPosition(x, y);
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
    child.setScale(scaleX, scaleY);
  });
  return children;
}

// src/display/SetSize.ts
function SetSize2(width, height, ...children) {
  children.forEach((child) => {
    child.setSize(width, height);
  });
  return children;
}

// src/display/SetSkew.ts
function SetSkew(skewX, skewY, ...children) {
  children.forEach((child) => {
    child.setSkew(skewX, skewY);
  });
  return children;
}

// src/display/SetValue.ts
function SetValue(property, value, ...children) {
  children.forEach((child) => {
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor) {
      descriptor.set(value);
    }
  });
  return children;
}

// src/display/SetVisible.ts
function SetVisible(visible, ...children) {
  children.forEach((child) => {
    child.visible = visible;
  });
  return children;
}

// src/display/ShuffleChildren.ts
function ShuffleChildren(parent) {
  const children = parent.children;
  for (let i = children.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = children[i];
    children[i] = children[j];
    children[j] = temp;
    temp.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return children;
}

// src/display/SwapChildren.ts
function SwapChildren(child1, child2) {
  if (child1.parent === child2.parent) {
    const children = child1.parent.children;
    const index1 = GetChildIndex(child1.parent, child1);
    const index2 = GetChildIndex(child2.parent, child2);
    if (index1 !== index2) {
      children[index1] = child2;
      children[index2] = child1;
    }
  }
}

// src/display3d/index.ts
var display3d_exports = {};
__export(display3d_exports, {
  AddChild3D: () => AddChild3D,
  AddChild3DAt: () => AddChild3DAt,
  AddChildren3D: () => AddChildren3D,
  AddChildren3DAt: () => AddChildren3DAt,
  ConsoleTreeChildren3D: () => ConsoleTreeChildren3D,
  CountMatchingChildren3D: () => CountMatchingChildren3D,
  DepthFirstSearch3D: () => DepthFirstSearch3D,
  DepthFirstSearchRecursive3D: () => DepthFirstSearchRecursive3D,
  DepthFirstSearchRecursiveNested3D: () => DepthFirstSearchRecursiveNested3D,
  DestroyChildren3D: () => DestroyChildren3D,
  FindChild3DByName: () => FindChild3DByName,
  FindChildren3DByName: () => FindChildren3DByName,
  GetAllChildren3D: () => GetAllChildren3D,
  GetChild3DAt: () => GetChild3DAt,
  GetChild3DIndex: () => GetChild3DIndex,
  GetChildren3D: () => GetChildren3D,
  GetFirstChild3D: () => GetFirstChild3D,
  GetLastChild3D: () => GetLastChild3D,
  GetParents3D: () => GetParents3D,
  GetRandomChild3D: () => GetRandomChild3D,
  MoveChild3DTo: () => MoveChild3DTo,
  RemoveChild3D: () => RemoveChild3D,
  RemoveChild3DAt: () => RemoveChild3DAt,
  RemoveChildren3D: () => RemoveChildren3D,
  RemoveChildren3DAt: () => RemoveChildren3DAt,
  RemoveChildren3DBetween: () => RemoveChildren3DBetween,
  ReparentChildren3D: () => ReparentChildren3D,
  ReplaceChild3D: () => ReplaceChild3D,
  SetChildren3DValue: () => SetChildren3DValue,
  SetParent3D: () => SetParent3D,
  SetWorld3D: () => SetWorld3D,
  SwapChildren3D: () => SwapChildren3D
});

// src/display3d/DepthFirstSearch3D.ts
function DepthFirstSearch3D(parent) {
  const stack = [parent];
  const output = [];
  while (stack.length > 0) {
    const node = stack.shift();
    output.push(node);
    const numChildren = node.numChildren;
    if (numChildren > 0) {
      for (let i = numChildren - 1; i >= 0; i--) {
        stack.unshift(node.children[i]);
      }
    }
  }
  output.shift();
  return output;
}

// src/display3d/GetChild3DIndex.ts
function GetChild3DIndex(parent, child) {
  return parent.children.indexOf(child);
}

// src/display3d/RemoveChild3DAt.ts
function RemoveChild3DAt(parent, index) {
  const children = parent.children;
  let child;
  if (index >= 0 && index < children.length) {
    const removed2 = children.splice(index, 1);
    if (removed2[0]) {
      child = removed2[0];
      child.parent = null;
    }
  }
  return child;
}

// src/display3d/RemoveChild3D.ts
function RemoveChild3D(parent, child) {
  const currentIndex = GetChild3DIndex(parent, child);
  if (currentIndex > -1) {
    RemoveChild3DAt(parent, currentIndex);
  }
  return child;
}

// src/gameobjects/events/AddedToWorldEvent.ts
var AddedToWorldEvent = "addedtoworld";

// src/gameobjects/events/RemovedFromWorldEvent.ts
var RemovedFromWorldEvent = "removedfromworld";

// src/gameobjects/events/UpdateEvent.ts
var UpdateEvent = "update";

// src/display3d/SetWorld3D.ts
function SetWorld3D(world3, ...children) {
  children.forEach((child) => {
    if (child.world) {
      Emit(child.world, RemovedFromWorldEvent, child, child.world);
      Emit(child, RemovedFromWorldEvent, child, child.world);
    }
    child.world = world3;
    Emit(world3, AddedToWorldEvent, child, world3);
    Emit(child, AddedToWorldEvent, child, world3);
  });
  return children;
}

// src/display3d/SetParent3D.ts
function SetParent3D(parent, ...children) {
  children.forEach((child) => {
    if (child.parent) {
      RemoveChild3D(child.parent, child);
    }
    child.parent = parent;
  });
  const parentWorld = parent.world;
  if (parentWorld) {
    SetWorld3D(parentWorld, ...DepthFirstSearch3D(parent));
  }
  return children;
}

// src/display3d/AddChild3D.ts
function AddChild3D(parent, child) {
  parent.children.push(child);
  SetParent3D(parent, child);
  return child;
}

// src/display3d/AddChild3DAt.ts
function AddChild3DAt(parent, index, child) {
  const children = parent.children;
  if (index >= 0 && index <= children.length) {
    SetParent3D(parent, child);
    children.splice(index, 0, child);
  }
  return child;
}

// src/display3d/AddChildren3D.ts
function AddChildren3D(parent, ...children) {
  children.forEach((child) => {
    AddChild3D(parent, child);
  });
  return children;
}

// src/display3d/AddChildren3DAt.ts
function AddChildren3DAt(parent, index, ...children) {
  const parentChildren = parent.children;
  if (index >= 0 && index <= parentChildren.length) {
    children.reverse().forEach((child) => {
      children.splice(index, 0, child);
      SetParent3D(parent, child);
    });
  }
  return children;
}

// src/display3d/DepthFirstSearchRecursiveNested3D.ts
function DepthFirstSearchRecursiveNested3D(parent, output = []) {
  for (let i = 0; i < parent.numChildren; i++) {
    const node = parent.children[i];
    const children = [];
    output.push({ node, children });
    if (node.numChildren > 0) {
      DepthFirstSearchRecursiveNested3D(node, children);
    }
  }
  return output;
}

// src/display3d/ConsoleTreeChildren3D.ts
function GetInfo2(entry) {
  const legend = entry.numChildren > 0 ? "Parent" : "Child";
  return `${legend} [ type=${entry.type}, name=${entry.name} ]`;
}
function LogChildren2(entry) {
  console.group(GetInfo2(entry.node));
  entry.children.forEach((child) => {
    if (child.children.length > 0) {
      LogChildren2(child);
    } else {
      console.log(GetInfo2(child.node));
    }
  });
  console.groupEnd();
}
function ConsoleTreeChildren3D(parent) {
  const entries = DepthFirstSearchRecursiveNested3D(parent);
  if (parent.world === parent) {
    console.group("World");
  } else {
    console.group(GetInfo2(parent));
  }
  entries.forEach((entry) => {
    if (entry.children.length) {
      LogChildren2(entry);
    } else {
      console.log(GetInfo2(entry.node));
    }
  });
  console.groupEnd();
}

// src/display3d/CountMatchingChildren3D.ts
function CountMatchingChildren3D(parent, property, value) {
  const children = parent.children;
  let total = 0;
  children.forEach((child) => {
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor && (value === void 0 || value === descriptor.value)) {
      total++;
    }
  });
  return total;
}

// src/display3d/DepthFirstSearchRecursive3D.ts
function DepthFirstSearchRecursive3D(parent, output = []) {
  for (let i = 0; i < parent.numChildren; i++) {
    const child = parent.children[i];
    output.push(child);
    if (child.numChildren > 0) {
      DepthFirstSearchRecursive3D(child, output);
    }
  }
  return output;
}

// src/display3d/RemoveChildren3DBetween.ts
function RemoveChildren3DBetween(parent, beginIndex = 0, endIndex) {
  const children = parent.children;
  if (endIndex === void 0) {
    endIndex = children.length;
  }
  const range = endIndex - beginIndex;
  if (range > 0 && range <= endIndex) {
    const removed2 = children.splice(beginIndex, range);
    removed2.forEach((child) => {
      child.parent = null;
    });
    return removed2;
  } else {
    return [];
  }
}

// src/display3d/DestroyChildren3D.ts
function DestroyChildren3D(parent, beginIndex = 0, endIndex) {
  const removed2 = RemoveChildren3DBetween(parent, beginIndex, endIndex);
  removed2.forEach((child) => {
    child.destroy();
  });
}

// src/display3d/FindChild3DByName.ts
function FindChild3DByName(parent, searchString) {
  const children = DepthFirstSearch3D(parent);
  const regex = RegExp(searchString);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (regex.test(child.name)) {
      return child;
    }
  }
}

// src/display3d/FindChildren3DByName.ts
function FindChildren3DByName(parent, searchString) {
  const children = DepthFirstSearch3D(parent);
  const regex = RegExp(searchString);
  const results = [];
  children.forEach((child) => {
    if (regex.test(child.name)) {
      results.push(child);
    }
  });
  return results;
}

// src/display3d/GetAllChildren3D.ts
function GetAllChildren3D(parent, property, value) {
  const children = DepthFirstSearch3D(parent);
  if (!property) {
    return children;
  }
  const results = [];
  children.forEach((child) => {
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor && (value === void 0 || value === descriptor.value)) {
      results.push(child);
    }
  });
  return results;
}

// src/display3d/GetChild3DAt.ts
function GetChild3DAt(parent, index) {
  const children = parent.children;
  if (index < 0 || index > children.length) {
    throw new Error(`Index out of bounds: ${index}`);
  }
  return children[index];
}

// src/display3d/GetChildren3D.ts
function GetChildren3D(parent, property, value) {
  const children = parent.children;
  if (!property) {
    return [...children];
  }
  const results = [];
  children.forEach((child) => {
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor && (value === void 0 || value === descriptor.value)) {
      results.push(child);
    }
  });
  return results;
}

// src/display3d/GetFirstChild3D.ts
function GetFirstChild3D(parent, property, value) {
  const children = parent.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor && (value === void 0 || value === descriptor.value)) {
      return child;
    }
  }
}

// src/display3d/GetLastChild3D.ts
function GetLastChild3D(parent, property, value) {
  const children = parent.children;
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor && (value === void 0 || value === descriptor.value)) {
      return child;
    }
  }
}

// src/display3d/GetParents3D.ts
function GetParents3D(child) {
  const parents = [];
  while (child.parent) {
    parents.push(child.parent);
    child = child.parent;
  }
  return parents;
}

// src/display3d/GetRandomChild3D.ts
function GetRandomChild3D(parent, startIndex = 0, length) {
  const children = parent.children;
  if (!length) {
    length = children.length;
  }
  const randomIndex = startIndex + Math.floor(Math.random() * length);
  return children[randomIndex];
}

// src/display3d/MoveChild3DTo.ts
function MoveChild3DTo(parent, child, index) {
  const parentChildren = parent.children;
  const currentIndex = GetChild3DIndex(parent, child);
  if (currentIndex === -1 || index < 0 || index >= parentChildren.length) {
    throw new Error("Index out of bounds");
  }
  if (currentIndex !== index) {
    parentChildren.splice(currentIndex, 1);
    parentChildren.splice(index, 0, child);
    child.setDirty(DIRTY_CONST.TRANSFORM);
  }
  return child;
}

// src/display3d/RemoveChildren3D.ts
function RemoveChildren3D(parent, ...children) {
  children.forEach((child) => {
    RemoveChild3D(parent, child);
  });
  return children;
}

// src/display3d/RemoveChildren3DAt.ts
function RemoveChildren3DAt(parent, ...index) {
  const removed2 = [];
  index.sort((a, b) => a - b);
  index.reverse().forEach((i) => {
    const child = RemoveChild3DAt(parent, i);
    if (child) {
      removed2.push(child);
    }
  });
  return removed2;
}

// src/display3d/ReparentChildren3D.ts
function ReparentChildren3D(parent, newParent, beginIndex = 0, endIndex) {
  const moved = RemoveChildren3DBetween(parent, beginIndex, endIndex);
  SetParent3D(newParent, ...moved);
  moved.forEach((child) => {
  });
  return moved;
}

// src/display3d/ReplaceChild3D.ts
function ReplaceChild3D(target, source) {
  const targetParent = target.parent;
  const sourceParent = source.parent;
  const targetIndex = GetChild3DIndex(targetParent, target);
  if (targetParent === sourceParent) {
    MoveChild3DTo(targetParent, source, targetIndex);
    RemoveChild3D(targetParent, target);
  } else {
    RemoveChild3D(targetParent, target);
    RemoveChild3D(sourceParent, source);
    AddChild3DAt(targetParent, targetIndex, source);
  }
  return target;
}

// src/display3d/SetChildren3DValue.ts
function SetChildren3DValue(parent, property, value) {
  const children = DepthFirstSearch3D(parent);
  children.forEach((child) => {
    const descriptor = Object.getOwnPropertyDescriptor(child, property);
    if (descriptor) {
      descriptor.set(value);
    }
  });
  return children;
}

// src/display3d/SwapChildren3D.ts
function SwapChildren3D(child1, child2) {
  if (child1.parent === child2.parent) {
    const children = child1.parent.children;
    const index1 = GetChild3DIndex(child1.parent, child1);
    const index2 = GetChild3DIndex(child2.parent, child2);
    if (index1 !== index2) {
      children[index1] = child2;
      children[index2] = child1;
    }
  }
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

// src/gameobjects3d/index.ts
var gameobjects3d_exports = {};
__export(gameobjects3d_exports, {
  Box: () => Box,
  Components: () => components_exports2,
  Cone: () => Cone,
  GameObject3D: () => GameObject3D,
  Geometry: () => geometry_exports,
  Light: () => Light,
  Material: () => Material,
  Mesh: () => Mesh,
  Plane: () => Plane,
  RenderLayer3D: () => RenderLayer3D,
  Sphere: () => Sphere
});

// src/gameobjects3d/components/index.ts
var components_exports2 = {};
__export(components_exports2, {
  Transform3DComponent: () => Transform3DComponent
});

// src/gameobjects3d/components/transform3d/Transform3DComponent.ts
var Transform3DComponent = class {
  entity;
  local;
  world;
  normal;
  position;
  scale;
  origin;
  rotation;
  forward;
  up;
  right;
  passthru = false;
  constructor(entity, x = 0, y = 0, z = 0) {
    this.entity = entity;
    this.local = new Matrix4();
    this.world = new Matrix4();
    this.normal = new Matrix4();
    this.position = new Vec3Callback(() => this.update(), x, y, z);
    this.scale = new Vec3Callback(() => this.update(), 1, 1, 1);
    this.origin = new Vec3Callback(() => this.update());
    this.rotation = new Quaternion();
    this.rotation.onChange = () => this.update();
    this.forward = Vec3Forward();
    this.up = Vec3Up();
    this.right = Vec3Right();
    this.update();
  }
  rotateX(angle) {
    QuatRotateX(this.rotation, angle, this.rotation);
  }
  rotateY(angle) {
    QuatRotateY(this.rotation, angle, this.rotation);
  }
  rotateZ(angle) {
    QuatRotateZ(this.rotation, angle, this.rotation);
  }
  update() {
    const model = this.local;
    const normal = this.normal;
    Mat4FromRotationTranslationScale(this.rotation, this.position, this.scale, model);
    Mat4Invert(model, normal);
    Mat4Transpose(normal, normal);
  }
  updateLocal() {
    this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
  }
  updateWorld() {
    const entity = this.entity;
    entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    if (entity.numChildren) {
      this.updateChildren();
    }
  }
  updateChildren() {
    const children = this.entity.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
    }
  }
  destroy() {
    this.position.destroy();
    this.scale.destroy();
    this.origin.destroy();
    this.rotation.destroy();
    this.entity = null;
    this.local = null;
    this.world = null;
    this.position = null;
    this.scale = null;
    this.origin = null;
    this.rotation = null;
  }
};

// src/gameobjects3d/geometry/index.ts
var geometry_exports = {};
__export(geometry_exports, {
  CreateVertexSet: () => CreateVertexSet,
  FaceUVNormalTexture: () => FaceUVNormalTexture,
  Geometry: () => Geometry,
  GetBufferFromObj: () => GetBufferFromObj,
  GetBufferFromVertexSet: () => GetBufferFromVertexSet,
  GetFacesFromVertexSet: () => GetFacesFromVertexSet,
  ParseObj: () => ParseObj
});

// src/gameobjects3d/geometry/CreateVertexSet.ts
function CreateVertexSet() {
  return {
    vertices: [],
    normals: [],
    uvs: [],
    indices: [],
    numberOfVertices: 0
  };
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

// src/gameobjects3d/geometry/FaceUVNormalTexture.ts
var FaceUVNormalTexture = class {
  vertex1;
  vertex2;
  vertex3;
  normal1;
  normal2;
  normal3;
  color = 16777215;
  alpha = 1;
  size = 30;
  _packedColor;
  constructor(v1, v2, v3, n1, n2, n3, uv1, uv2, uv3, scale = 1) {
    this.vertex1 = new Vertex2(v1.x * scale, v1.y * scale, v1.z * scale);
    this.vertex2 = new Vertex2(v2.x * scale, v2.y * scale, v2.z * scale);
    this.vertex3 = new Vertex2(v3.x * scale, v3.y * scale, v3.z * scale);
    this.vertex1.setUV(uv1.x, uv1.y);
    this.vertex2.setUV(uv2.x, uv2.y);
    this.vertex3.setUV(uv3.x, uv3.y);
    this.normal1 = n1;
    this.normal2 = n2;
    this.normal3 = n3;
    this._packedColor = PackColor(this.color, this.alpha);
  }
  setColor(color, alpha = 1) {
    this.color = color;
    this.alpha = alpha;
    this._packedColor = PackColor(color, alpha);
  }
  addToBuffer(F32, U32, textureID, offset) {
    const v1 = this.vertex1;
    const v2 = this.vertex2;
    const v3 = this.vertex3;
    const n1 = this.normal1;
    const n2 = this.normal2;
    const n3 = this.normal3;
    const color = this._packedColor;
    F32[offset++] = v1.x;
    F32[offset++] = v1.y;
    F32[offset++] = v1.z;
    F32[offset++] = n1.x;
    F32[offset++] = n1.y;
    F32[offset++] = n1.z;
    F32[offset++] = v1.u;
    F32[offset++] = v1.v;
    F32[offset++] = textureID;
    U32[offset++] = color;
    F32[offset++] = v2.x;
    F32[offset++] = v2.y;
    F32[offset++] = v2.z;
    F32[offset++] = n2.x;
    F32[offset++] = n2.y;
    F32[offset++] = n2.z;
    F32[offset++] = v2.u;
    F32[offset++] = v2.v;
    F32[offset++] = textureID;
    U32[offset++] = color;
    F32[offset++] = v3.x;
    F32[offset++] = v3.y;
    F32[offset++] = v3.z;
    F32[offset++] = n3.x;
    F32[offset++] = n3.y;
    F32[offset++] = n3.z;
    F32[offset++] = v3.u;
    F32[offset++] = v3.v;
    F32[offset++] = textureID;
    U32[offset++] = color;
    return offset;
  }
};

// src/gameobjects3d/geometry/GetBufferFromVertexSet.ts
function GetVec3(data, index) {
  const x = data[index * 3 + 0];
  const y = data[index * 3 + 1];
  const z = data[index * 3 + 2];
  return [x, y, z];
}
function GetVec2(data, index) {
  const x = data[index * 2 + 0];
  const y = data[index * 2 + 1];
  return [x, y];
}
function CreateNonIndexedVertexBuffer(data) {
  const {
    vertices,
    normals,
    uvs
  } = data;
  const total = vertices.length;
  const count = total / 3;
  const batchSize = count / 3;
  const buffer = new VertexBuffer({ batchSize, isDynamic: false, vertexElementSize: 8, elementsPerEntry: 3 });
  const F32 = buffer.vertexViewF32;
  let offset = 0;
  let uvIndex = 0;
  for (let i = 0; i < total; i += 3) {
    F32[offset++] = vertices[i + 0];
    F32[offset++] = vertices[i + 1];
    F32[offset++] = vertices[i + 2];
    F32[offset++] = normals[i + 0];
    F32[offset++] = normals[i + 1];
    F32[offset++] = normals[i + 2];
    F32[offset++] = uvs[uvIndex + 0];
    F32[offset++] = uvs[uvIndex + 1];
    uvIndex += 2;
  }
  buffer.count = count;
  return buffer;
}
function CreateVertexBuffer(data) {
  const {
    vertices,
    normals,
    uvs,
    indices
  } = data;
  const buffer = new VertexBuffer({ batchSize: indices.length / 3, isDynamic: false, vertexElementSize: 8, elementsPerEntry: 3 });
  const F32 = buffer.vertexViewF32;
  let offset = 0;
  for (let i = 0; i < indices.length; i += 3) {
    const i1 = indices[i + 0];
    const i2 = indices[i + 1];
    const i3 = indices[i + 2];
    const v1 = GetVec3(vertices, i1);
    const v2 = GetVec3(vertices, i2);
    const v3 = GetVec3(vertices, i3);
    const n1 = GetVec3(normals, i1);
    const n2 = GetVec3(normals, i2);
    const n3 = GetVec3(normals, i3);
    const uv1 = GetVec2(uvs, i1);
    const uv2 = GetVec2(uvs, i2);
    const uv3 = GetVec2(uvs, i3);
    F32[offset++] = v1[0];
    F32[offset++] = v1[1];
    F32[offset++] = v1[2];
    F32[offset++] = n1[0];
    F32[offset++] = n1[1];
    F32[offset++] = n1[2];
    F32[offset++] = uv1[0];
    F32[offset++] = uv1[1];
    F32[offset++] = v2[0];
    F32[offset++] = v2[1];
    F32[offset++] = v2[2];
    F32[offset++] = n2[0];
    F32[offset++] = n2[1];
    F32[offset++] = n2[2];
    F32[offset++] = uv2[0];
    F32[offset++] = uv2[1];
    F32[offset++] = v3[0];
    F32[offset++] = v3[1];
    F32[offset++] = v3[2];
    F32[offset++] = n3[0];
    F32[offset++] = n3[1];
    F32[offset++] = n3[2];
    F32[offset++] = uv3[0];
    F32[offset++] = uv3[1];
  }
  buffer.count = indices.length;
  return buffer;
}
function GetBufferFromVertexSet(data) {
  if (data.indices && data.indices.length > 0) {
    return CreateVertexBuffer(data);
  } else {
    return CreateNonIndexedVertexBuffer(data);
  }
}

// src/gameobjects3d/geometry/Geometry.ts
var Geometry = class {
  buffer;
  constructor(data) {
    if (data) {
      if (data.hasOwnProperty("vertices")) {
        this.buffer = GetBufferFromVertexSet(data);
      } else {
        this.buffer = data;
      }
    }
  }
  destroy() {
    this.buffer.destroy();
  }
};

// src/gameobjects3d/geometry/ParseObj.ts
var ParseObj = class {
  fileContents;
  defaultModelName;
  currentMaterial = "";
  currentGroup = "";
  smoothingGroup = 0;
  result = {
    materialLibraries: [],
    models: []
  };
  flipUVs;
  constructor(fileContents, flipUVs = true, defaultModelName = "untitled") {
    this.fileContents = fileContents;
    this.defaultModelName = defaultModelName;
    this.flipUVs = flipUVs;
  }
  parseAsync() {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.parse());
      } catch (theError) {
        reject(theError);
      }
    });
  }
  parse() {
    const stripComments = (line) => {
      const commentIndex = line.indexOf("#");
      if (commentIndex > -1) {
        return line.substring(0, commentIndex);
      }
      return line;
    };
    const lines = this.fileContents.split("\n");
    for (const line of lines) {
      const strippedline = stripComments(line);
      const lineItems = strippedline.replace(/\s\s+/g, " ").trim().split(" ");
      switch (lineItems[0].toLowerCase()) {
        case "o":
          this.parseObject(lineItems);
          break;
        case "g":
          this.parseGroup(lineItems);
          break;
        case "v":
          this.parseVertexCoords(lineItems);
          break;
        case "vt":
          this.parseTextureCoords(lineItems);
          break;
        case "vn":
          this.parseVertexNormal(lineItems);
          break;
        case "s":
          this.parseSmoothShadingStatement(lineItems);
          break;
        case "f":
          this.parsePolygon(lineItems);
          break;
        case "mtllib":
          this.parseMtlLib(lineItems);
          break;
        case "usemtl":
          this.parseUseMtl(lineItems);
          break;
      }
    }
    this.fileContents = "";
    return this.result;
  }
  currentModel() {
    if (this.result.models.length === 0) {
      this.result.models.push({
        faces: [],
        name: this.defaultModelName,
        textureCoords: [],
        vertexNormals: [],
        vertices: []
      });
      this.currentGroup = "";
      this.smoothingGroup = 0;
    }
    return this.result.models[this.result.models.length - 1];
  }
  parseObject(lineItems) {
    const modelName = lineItems.length >= 2 ? lineItems[1] : this.defaultModelName;
    this.result.models.push({
      faces: [],
      name: modelName,
      textureCoords: [],
      vertexNormals: [],
      vertices: []
    });
    this.currentGroup = "";
    this.smoothingGroup = 0;
  }
  parseGroup(lineItems) {
    if (lineItems.length !== 2) {
      throw "Group statements must have exactly 1 argument (eg. g group_1)";
    }
    this.currentGroup = lineItems[1];
  }
  parseVertexCoords(lineItems) {
    const len = lineItems.length;
    const x = len >= 2 ? parseFloat(lineItems[1]) : 0;
    const y = len >= 3 ? parseFloat(lineItems[2]) : 0;
    const z = len >= 4 ? parseFloat(lineItems[3]) : 0;
    this.currentModel().vertices.push({ x, y, z });
  }
  parseTextureCoords(lineItems) {
    const len = lineItems.length;
    let u = len >= 2 ? parseFloat(lineItems[1]) : 0;
    let v = len >= 3 ? parseFloat(lineItems[2]) : 0;
    let w = len >= 4 ? parseFloat(lineItems[3]) : 0;
    if (isNaN(u)) {
      u = 0;
    }
    if (isNaN(v)) {
      v = 0;
    }
    if (isNaN(w)) {
      w = 0;
    }
    if (this.flipUVs) {
      v = 1 - v;
    }
    this.currentModel().textureCoords.push({ u, v, w });
  }
  parseVertexNormal(lineItems) {
    const len = lineItems.length;
    const x = len >= 2 ? parseFloat(lineItems[1]) : 0;
    const y = len >= 3 ? parseFloat(lineItems[2]) : 0;
    const z = len >= 4 ? parseFloat(lineItems[3]) : 0;
    this.currentModel().vertexNormals.push({ x, y, z });
  }
  parsePolygon(lineItems) {
    const totalVertices = lineItems.length - 1;
    if (totalVertices < 3) {
      throw "Face < 3 vertices";
    }
    const face = {
      group: this.currentGroup,
      material: this.currentMaterial,
      smoothingGroup: this.smoothingGroup,
      vertices: []
    };
    for (let i = 0; i < totalVertices; i++) {
      const vertexString = lineItems[i + 1];
      const vertexValues = vertexString.split("/");
      const vvLen = vertexValues.length;
      if (vvLen < 1 || vvLen > 3) {
        throw "Too many / values for single vertex";
      }
      let vertexIndex = 0;
      let textureCoordsIndex = 0;
      let vertexNormalIndex = 0;
      vertexIndex = parseInt(vertexValues[0], 10);
      if (vvLen > 1 && vertexValues[1] !== "") {
        textureCoordsIndex = parseInt(vertexValues[1], 10);
      }
      if (vvLen > 2) {
        vertexNormalIndex = parseInt(vertexValues[2], 10);
      }
      if (vertexIndex === 0) {
        throw "Faces uses invalid vertex index of 0";
      }
      if (vertexIndex < 0) {
        vertexIndex = this.currentModel().vertices.length + 1 + vertexIndex;
      }
      textureCoordsIndex -= 1;
      vertexIndex -= 1;
      vertexNormalIndex -= 1;
      face.vertices.push({
        textureCoordsIndex,
        vertexIndex,
        vertexNormalIndex
      });
    }
    this.currentModel().faces.push(face);
  }
  parseMtlLib(lineItems) {
    if (lineItems.length >= 2) {
      this.result.materialLibraries.push(lineItems[1]);
    }
  }
  parseUseMtl(lineItems) {
    if (lineItems.length >= 2) {
      this.currentMaterial = lineItems[1];
    }
  }
  parseSmoothShadingStatement(lineItems) {
    if (lineItems.length !== 2) {
      throw "Smoothing group statements must have exactly 1 argument (eg. s <number|off>)";
    }
    const groupNumber = lineItems[1].toLowerCase() === "off" ? 0 : parseInt(lineItems[1], 10);
    this.smoothingGroup = groupNumber;
  }
};

// src/gameobjects3d/geometry/GetBufferFromObj.ts
function GetBufferFromObj(data, flipUVs = true) {
  const parser = new ParseObj(data, flipUVs);
  const result = parser.parse();
  const output = [];
  result.models.forEach((model) => {
    const {
      faces,
      textureCoords,
      vertexNormals,
      vertices
    } = model;
    let totalFaces = 0;
    for (let i = 0; i < faces.length; i++) {
      totalFaces += faces[i].vertices.length === 4 ? 6 : 3;
    }
    const buffer = new VertexBuffer({ batchSize: totalFaces, isDynamic: false, vertexElementSize: 8, elementsPerEntry: 3 });
    const F32 = buffer.vertexViewF32;
    let offset = 0;
    for (let i = 0; i < faces.length; i++) {
      const face = faces[i];
      const i1 = face.vertices[0];
      const i2 = face.vertices[1];
      const i3 = face.vertices[2];
      const v1 = vertices[i1.vertexIndex];
      const v2 = vertices[i2.vertexIndex];
      const v3 = vertices[i3.vertexIndex];
      const n1 = vertexNormals[i1.vertexNormalIndex];
      const n2 = vertexNormals[i2.vertexNormalIndex];
      const n3 = vertexNormals[i3.vertexNormalIndex];
      const uv1 = textureCoords[i1.textureCoordsIndex];
      const uv2 = textureCoords[i2.textureCoordsIndex];
      const uv3 = textureCoords[i3.textureCoordsIndex];
      F32[offset++] = v1.x;
      F32[offset++] = v1.y;
      F32[offset++] = v1.z;
      F32[offset++] = n1.x;
      F32[offset++] = n1.y;
      F32[offset++] = n1.z;
      F32[offset++] = uv1.u;
      F32[offset++] = uv1.v;
      F32[offset++] = v2.x;
      F32[offset++] = v2.y;
      F32[offset++] = v2.z;
      F32[offset++] = n2.x;
      F32[offset++] = n2.y;
      F32[offset++] = n2.z;
      F32[offset++] = uv2.u;
      F32[offset++] = uv2.v;
      F32[offset++] = v3.x;
      F32[offset++] = v3.y;
      F32[offset++] = v3.z;
      F32[offset++] = n3.x;
      F32[offset++] = n3.y;
      F32[offset++] = n3.z;
      F32[offset++] = uv3.u;
      F32[offset++] = uv3.v;
      buffer.count += 3;
      if (face.vertices.length === 4) {
        const i4 = face.vertices[3];
        const v4 = vertices[i4.vertexIndex];
        const n4 = vertexNormals[i4.vertexNormalIndex];
        const uv4 = textureCoords[i4.textureCoordsIndex];
        F32[offset++] = v1.x;
        F32[offset++] = v1.y;
        F32[offset++] = v1.z;
        F32[offset++] = n1.x;
        F32[offset++] = n1.y;
        F32[offset++] = n1.z;
        F32[offset++] = uv1.u;
        F32[offset++] = uv1.v;
        F32[offset++] = v3.x;
        F32[offset++] = v3.y;
        F32[offset++] = v3.z;
        F32[offset++] = n3.x;
        F32[offset++] = n3.y;
        F32[offset++] = n3.z;
        F32[offset++] = uv3.u;
        F32[offset++] = uv3.v;
        F32[offset++] = v4.x;
        F32[offset++] = v4.y;
        F32[offset++] = v4.z;
        F32[offset++] = n4.x;
        F32[offset++] = n4.y;
        F32[offset++] = n4.z;
        F32[offset++] = uv4.u;
        F32[offset++] = uv4.v;
        buffer.count += 3;
      }
    }
    output.push({ name: model.name, buffer });
  });
  return output;
}

// src/gameobjects3d/geometry/GetFacesFromVertexSet.ts
function GetVec32(data, index) {
  const x = data[index * 3 + 0];
  const y = data[index * 3 + 1];
  const z = data[index * 3 + 2];
  return [x, y, z];
}
function GetVec22(data, index) {
  const x = data[index * 2 + 0];
  const y = data[index * 2 + 1];
  return [x, y];
}
function GetFacesFromVertexSet(data) {
  const {
    vertices,
    normals,
    uvs,
    indices
  } = data;
  const faces = [];
  for (let i = 0; i < indices.length; i += 3) {
    const i1 = indices[i + 0];
    const i2 = indices[i + 1];
    const i3 = indices[i + 2];
    const v1 = GetVec32(vertices, i1);
    const v2 = GetVec32(vertices, i2);
    const v3 = GetVec32(vertices, i3);
    const n1 = GetVec32(normals, i1);
    const n2 = GetVec32(normals, i2);
    const n3 = GetVec32(normals, i3);
    const uv1 = GetVec22(uvs, i1);
    const uv2 = GetVec22(uvs, i2);
    const uv3 = GetVec22(uvs, i3);
    const f = new FaceUVNormalTexture({ x: v1[0], y: v1[1], z: v1[2] }, { x: v2[0], y: v2[1], z: v2[2] }, { x: v3[0], y: v3[1], z: v3[2] }, { x: n1[0], y: n1[1], z: n1[2] }, { x: n2[0], y: n2[1], z: n2[2] }, { x: n3[0], y: n3[1], z: n3[2] }, { x: uv1[0], y: uv1[1] }, { x: uv2[0], y: uv2[1] }, { x: uv3[0], y: uv3[1] }, 1);
    faces.push(f);
  }
  return faces;
}

// src/geom3d/PlaneGeometry.ts
function PlaneGeometry(data, x = 0, y = 0, z = 0, u = 0, v = 1, w = 2, udir = 1, vdir = -1, width = 1, height = 1, depth = 1, gridX = 1, gridY = 1) {
  if (!data) {
    data = CreateVertexSet();
  }
  const {
    vertices,
    normals,
    uvs,
    indices,
    numberOfVertices
  } = data;
  const segmentWidth = width / gridX;
  const segmentHeight = height / gridY;
  const widthHalf = width / 2;
  const heightHalf = height / 2;
  const depthHalf = depth / 2;
  const gridX1 = gridX + 1;
  const gridY1 = gridY + 1;
  let vertexCounter = 0;
  const vector = [];
  for (let iy = 0; iy < gridY1; iy++) {
    const by = iy * segmentHeight - heightHalf;
    for (let ix = 0; ix < gridX1; ix++) {
      const bx = ix * segmentWidth - widthHalf;
      vector[u] = bx * udir;
      vector[v] = by * vdir;
      vector[w] = depthHalf;
      vertices.push(x + vector[0], y + vector[1], z + vector[2]);
      vector[u] = 0;
      vector[v] = 0;
      vector[w] = depth > 0 ? 1 : -1;
      normals.push(vector[0], vector[1], vector[2]);
      uvs.push(ix / gridX);
      uvs.push(1 - iy / gridY);
      vertexCounter += 1;
    }
  }
  for (let iy = 0; iy < gridY; iy++) {
    for (let ix = 0; ix < gridX; ix++) {
      const a = numberOfVertices + ix + gridX1 * iy;
      const b = numberOfVertices + ix + gridX1 * (iy + 1);
      const c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
      const d = numberOfVertices + (ix + 1) + gridX1 * iy;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }
  data.numberOfVertices += vertexCounter;
  return data;
}

// src/geom3d/BoxGeometry.ts
function BoxGeometry(x = 0, y = 0, z = 0, width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {
  const data = CreateVertexSet();
  PlaneGeometry(data, x, y, z, 2, 1, 0, -1, -1, depth, height, width, depthSegments, heightSegments);
  PlaneGeometry(data, x, y, z, 2, 1, 0, 1, -1, depth, height, -width, depthSegments, heightSegments);
  PlaneGeometry(data, x, y, z, 0, 2, 1, 1, 1, width, depth, height, widthSegments, depthSegments);
  PlaneGeometry(data, x, y, z, 0, 2, 1, 1, -1, width, depth, -height, widthSegments, depthSegments);
  PlaneGeometry(data, x, y, z, 0, 1, 2, 1, -1, width, height, depth, widthSegments, heightSegments);
  PlaneGeometry(data, x, y, z, 0, 1, 2, -1, -1, width, height, -depth, widthSegments, heightSegments);
  return data;
}

// src/gameobjects3d/GameObject3D.ts
var GameObject3D = class {
  type = "GameObject3D";
  name = "";
  world;
  parent;
  children;
  events;
  willUpdate = true;
  willUpdateChildren = true;
  willRender = true;
  willRenderChildren = true;
  willCacheChildren = false;
  dirty = 0;
  dirtyFrame = 0;
  transform;
  visible = true;
  constructor(x = 0, y = 0, z = 0) {
    this.children = [];
    this.events = new Map();
    this.transform = new Transform3DComponent(this, x, y, z);
    this.dirty = DIRTY_CONST.DEFAULT;
  }
  isRenderable() {
    return this.visible && this.willRender;
  }
  isDirty(flag) {
    return (this.dirty & flag) !== 0;
  }
  clearDirty(flag) {
    if (this.isDirty(flag)) {
      this.dirty ^= flag;
    }
    return this;
  }
  setDirty(flag, flag2) {
    if (!this.isDirty(flag)) {
      this.dirty ^= flag;
      this.dirtyFrame = GameInstance.getFrame();
    }
    if (!this.isDirty(flag2)) {
      this.dirty ^= flag2;
    }
    return this;
  }
  update(delta, time) {
    if (this.willUpdateChildren) {
      const children = this.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child && child.willUpdate) {
          child.update(delta, time);
        }
      }
    }
    this.postUpdate(delta, time);
  }
  postUpdate(delta, time) {
  }
  renderGL(renderPass) {
  }
  postRenderGL(renderPass) {
  }
  get numChildren() {
    return this.children.length;
  }
  destroy(reparentChildren) {
    if (reparentChildren) {
    } else {
    }
    Emit(this, DestroyEvent, this);
    this.transform.destroy();
    this.events.clear();
    this.world = null;
    this.parent = null;
    this.children = null;
  }
};

// src/gameobjects3d/material/Material.ts
var Material = class {
  ambient;
  diffuse;
  specular;
  isDirty = false;
  _shine;
  constructor(config = {}) {
    const {
      ambient = [1, 1, 1],
      diffuse = [1, 1, 1],
      specular = [1, 1, 1],
      shine = 0.25
    } = config;
    const onChange = () => this.update();
    this.ambient = new RGBCallback(onChange).fromArray(ambient);
    this.diffuse = new RGBCallback(onChange).fromArray(diffuse);
    this.specular = new RGBCallback(onChange).fromArray(specular);
    this._shine = shine;
  }
  get shine() {
    return this._shine;
  }
  set shine(value) {
    this._shine = Clamp(value, 0, 1);
    this.isDirty = true;
  }
  update() {
    this.isDirty = true;
  }
  setUniforms(shader) {
    shader.setUniform("uMaterialAmbient", this.ambient.toArray());
    shader.setUniform("uMaterialDiffuse", this.diffuse.toArray());
    shader.setUniform("uMaterialSpecular", this.specular.toArray());
    shader.setUniform("uMaterialShine", this._shine * 256);
  }
  destroy() {
    this.ambient.destroy();
    this.diffuse.destroy();
    this.specular.destroy();
  }
};

// src/gameobjects3d/mesh/SetFrame.ts
function SetFrame2(texture, key, ...children) {
  const frame2 = texture.getFrame(key);
  children.forEach((child) => {
    if (!child || frame2 === child.frame) {
      return;
    }
    child.frame = frame2;
    child.hasTexture = true;
  });
  return children;
}

// src/gameobjects3d/mesh/SetTexture.ts
function SetTexture3(key, frame2, ...children) {
  if (!key) {
    children.forEach((child) => {
      child.texture = null;
      child.frame = null;
      child.hasTexture = false;
    });
  } else {
    let texture;
    if (key instanceof Texture) {
      texture = key;
    } else {
      texture = TextureManagerInstance.get().get(key);
    }
    if (!texture) {
      console.warn(`Invalid Texture key: ${key}`);
    } else {
      children.forEach((child) => {
        child.texture = texture;
      });
      SetFrame2(texture, frame2, ...children);
    }
  }
  return children;
}

// src/gameobjects3d/mesh/Mesh.ts
var Mesh = class extends GameObject3D {
  texture;
  frame;
  hasTexture = false;
  geometry;
  material;
  cullFaces = true;
  constructor(x = 0, y = 0, z = 0, geometry, material = new Material()) {
    super(x, y, z);
    this.geometry = geometry;
    this.material = material;
    this.setTexture("__WHITE");
  }
  setTexture(key, frame2) {
    SetTexture3(key, frame2, this);
    return this;
  }
  setFrame(key) {
    SetFrame2(this.texture, key, this);
    return this;
  }
  setMaterial(material) {
    this.material = material;
    return this;
  }
  renderGL(renderPass) {
    const shader = renderPass.currentShader.shader;
    shader.setUniform("uModelMatrix", this.transform.local.data);
    shader.setUniform("uNormalMatrix", this.transform.normal.data);
    if (this.hasTexture) {
      const textureIndex = SetTexture(renderPass, this.texture);
      shader.setUniform("uTexture", textureIndex);
    }
    this.material.setUniforms(shader);
    FlushBuffer(renderPass, this.geometry.buffer);
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.geometry = null;
    this.material = null;
    this.texture = null;
    this.frame = null;
    this.hasTexture = false;
  }
};

// src/gameobjects3d/box/Box.ts
var Box = class extends Mesh {
  constructor(x = 0, y = 0, z = 0, width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {
    const data = BoxGeometry(0, 0, 0, width, height, depth, widthSegments, heightSegments, depthSegments);
    const geometry = new Geometry(data);
    super(x, y, z, geometry);
  }
};

// src/geom3d/CylinderGeometry.ts
function GenerateCap(top, data, index, halfHeight, radiusTop, radiusBottom, radialSegments, thetaStart, thetaLength) {
  const {
    vertices,
    normals,
    uvs,
    indices
  } = data;
  const uv = new Vec2();
  const vertex = new Vec3();
  const radius = top === true ? radiusTop : radiusBottom;
  const sign = top === true ? 1 : -1;
  const centerIndexStart = index;
  for (let x = 1; x <= radialSegments; x++) {
    vertices.push(0, halfHeight * sign, 0);
    normals.push(0, sign, 0);
    uvs.push(0.5, 0.5);
    index++;
  }
  const centerIndexEnd = index;
  for (let x = 0; x <= radialSegments; x++) {
    const u = x / radialSegments;
    const theta = u * thetaLength + thetaStart;
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
    vertex.x = radius * sinTheta;
    vertex.y = halfHeight * sign;
    vertex.z = radius * cosTheta;
    vertices.push(vertex.x, vertex.y, vertex.z);
    normals.push(0, sign, 0);
    uv.x = cosTheta * 0.5 + 0.5;
    uv.y = sinTheta * 0.5 * sign + 0.5;
    uvs.push(uv.x, uv.y);
    index++;
  }
  for (let x = 0; x < radialSegments; x++) {
    const c = centerIndexStart + x;
    const i = centerIndexEnd + x;
    if (top) {
      indices.push(i, i + 1, c);
    } else {
      indices.push(i + 1, i, c);
    }
  }
  return index;
}
function CylinderGeometry(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 8, heightSegments = 1, openEnded = false, thetaStart = 0, thetaLength = Math.PI * 2) {
  const data = CreateVertexSet();
  const {
    vertices,
    normals,
    uvs,
    indices
  } = data;
  let index = 0;
  const indexArray = [];
  const halfHeight = height / 2;
  const normal = new Vec3();
  const vertex = new Vec3();
  const slope = (radiusBottom - radiusTop) / height;
  for (let y = 0; y <= heightSegments; y++) {
    const indexRow = [];
    const v = y / heightSegments;
    const radius = v * (radiusBottom - radiusTop) + radiusTop;
    for (let x = 0; x <= radialSegments; x++) {
      const u = x / radialSegments;
      const theta = u * thetaLength + thetaStart;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      vertex.x = radius * sinTheta;
      vertex.y = -v * height + halfHeight;
      vertex.z = radius * cosTheta;
      vertices.push(vertex.x, vertex.y, vertex.z);
      normal.set(sinTheta, slope, cosTheta);
      Vec3Normalize(normal, normal);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(u, 1 - v);
      indexRow.push(index++);
    }
    indexArray.push(indexRow);
  }
  for (let x = 0; x < radialSegments; x++) {
    for (let y = 0; y < heightSegments; y++) {
      const a = indexArray[y][x];
      const b = indexArray[y + 1][x];
      const c = indexArray[y + 1][x + 1];
      const d = indexArray[y][x + 1];
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }
  if (!openEnded) {
    if (radiusTop > 0) {
      index = GenerateCap(true, data, index, halfHeight, radiusTop, radiusBottom, radialSegments, thetaStart, thetaLength);
    }
    if (radiusBottom > 0) {
      GenerateCap(false, data, index, halfHeight, radiusTop, radiusBottom, radialSegments, thetaStart, thetaLength);
    }
  }
  data.numberOfVertices = vertices.length;
  return data;
}

// src/geom3d/ConeGeometry.ts
function ConeGeometry(radius = 1, height = 1, radialSegments = 8, heightSegments = 1, openEnded = false, thetaStart = 0, thetaLength = Math.PI * 2) {
  return CylinderGeometry(0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
}

// src/gameobjects3d/cone/Cone.ts
var Cone = class extends Mesh {
  constructor(x = 0, y = 0, z = 0, radius = 1, height = 1, radialSegments = 8, heightSegments = 1, openEnded = false, thetaStart = 0, thetaLength = Math.PI * 2) {
    const data = ConeGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
    const geometry = new Geometry(data);
    super(x, y, z, geometry);
  }
};

// src/gameobjects3d/light/Light.ts
var Light = class {
  position;
  ambient;
  diffuse;
  specular;
  isDirty = false;
  constructor(config = {}) {
    const {
      x = 0,
      y = 0,
      z = 0.1,
      ambient = [1, 1, 1],
      diffuse = [1, 1, 1],
      specular = [1, 1, 1]
    } = config;
    const onChange = () => this.update();
    this.position = new Vec3Callback(onChange, x, y, z);
    this.ambient = new RGBCallback(onChange).fromArray(ambient);
    this.diffuse = new RGBCallback(onChange).fromArray(diffuse);
    this.specular = new RGBCallback(onChange).fromArray(specular);
  }
  setUniforms(shader) {
    shader.setUniform("uLightPosition", this.position.toArray());
    shader.setUniform("uLightAmbient", this.ambient.toArray());
    shader.setUniform("uLightDiffuse", this.diffuse.toArray());
    shader.setUniform("uLightSpecular", this.specular.toArray());
  }
  update() {
    this.isDirty = true;
  }
  destroy() {
    this.position.destroy();
    this.ambient.destroy();
    this.diffuse.destroy();
    this.specular.destroy();
  }
};

// src/gameobjects3d/plane/Plane.ts
var Plane = class extends Mesh {
  constructor(x = 0, y = 0, z = 0, width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
    const data = PlaneGeometry(null, 0, 0, 0, 0, 1, 2, 1, -1, width, height, 1, widthSegments, heightSegments);
    const geometry = new Geometry(data);
    super(x, y, z, geometry);
  }
};

// src/gameobjects3d/renderlayer3d/RenderLayer3D.ts
var RenderLayer3D = class extends Layer {
  texture;
  framebuffer;
  constructor() {
    super();
    this.willRender = true;
    this.willRenderChildren = true;
    this.willCacheChildren = true;
    this.setDirty(DIRTY_CONST.CHILD_CACHE);
    const width = GetWidth();
    const height = GetHeight();
    const resolution = GetResolution();
    const texture = new Texture(null, width * resolution, height * resolution);
    const binding = new GLTextureBinding(texture);
    texture.binding = binding;
    binding.framebuffer = CreateFramebuffer(binding.texture);
    binding.depthbuffer = CreateDepthBuffer(binding.framebuffer, texture.width, texture.height);
    this.texture = texture;
    this.framebuffer = binding.framebuffer;
  }
  renderGL(renderPass) {
    if (this.numChildren > 0) {
      Flush(renderPass);
      if (!this.willCacheChildren || this.isDirty(DIRTY_CONST.CHILD_CACHE)) {
        SetFramebuffer(renderPass, this.framebuffer, true);
        this.clearDirty(DIRTY_CONST.CHILD_CACHE);
      } else {
        SetFramebuffer(renderPass, this.framebuffer, false);
        this.postRenderGL(renderPass);
      }
    }
  }
  postRenderGL(renderPass) {
    Flush(renderPass);
    PopFramebuffer(renderPass);
    DrawTexturedQuad(renderPass, this.texture);
    this.clearDirty(DIRTY_CONST.TRANSFORM);
  }
};

// src/geom3d/SphereGeometry.ts
function SphereGeometry(radius = 1, widthSegments = 3, heightSegments = 3, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI) {
  widthSegments = Math.max(3, Math.floor(widthSegments) || 8);
  heightSegments = Math.max(2, Math.floor(heightSegments) || 6);
  const thetaEnd = Math.min(thetaStart + thetaLength, Math.PI);
  const data = CreateVertexSet();
  const {
    vertices,
    normals,
    uvs,
    indices
  } = data;
  let index = 0;
  const grid = [];
  const vertex = new Vec3();
  const normal = new Vec3();
  for (let iy = 0; iy <= heightSegments; iy++) {
    const verticesRow = [];
    const v = iy / heightSegments;
    let uOffset = 0;
    if (iy === 0 && thetaStart === 0) {
      uOffset = 0.5 / widthSegments;
    } else if (iy === heightSegments && thetaEnd == Math.PI) {
      uOffset = -0.5 / widthSegments;
    }
    for (let ix = 0; ix <= widthSegments; ix++) {
      const u = ix / widthSegments;
      vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
      vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
      vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
      vertices.push(vertex.x, vertex.y, vertex.z);
      Vec3Normalize(vertex, normal);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(u + uOffset, 1 - v);
      verticesRow.push(index++);
    }
    grid.push(verticesRow);
  }
  for (let iy = 0; iy < heightSegments; iy++) {
    for (let ix = 0; ix < widthSegments; ix++) {
      const a = grid[iy][ix + 1];
      const b = grid[iy][ix];
      const c = grid[iy + 1][ix];
      const d = grid[iy + 1][ix + 1];
      if (iy !== 0 || thetaStart > 0) {
        indices.push(a, b, d);
      }
      if (iy !== heightSegments - 1 || thetaEnd < Math.PI) {
        indices.push(b, c, d);
      }
    }
  }
  data.numberOfVertices = vertices.length;
  return data;
}

// src/gameobjects3d/sphere/Sphere.ts
var Sphere = class extends Mesh {
  constructor(x = 0, y = 0, z = 0, radius = 1, widthSegments = 3, heightSegments = 3, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI) {
    const data = SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
    const geometry = new Geometry(data);
    super(x, y, z, geometry);
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
  GetCircleRandomPoint: () => GetCircleRandomPoint,
  TranslateCircle: () => TranslateCircle,
  TranslateCirclePoint: () => TranslateCirclePoint
});

// src/geom/circle/CircleContains.ts
function CircleContains(circle, x, y) {
  if (circle.radius > 0 && x >= circle.left && x <= circle.right && y >= circle.top && y <= circle.bottom) {
    const dx = (circle.x - x) * (circle.x - x);
    const dy = (circle.y - y) * (circle.y - y);
    return dx + dy <= circle.radius * circle.radius;
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

// src/geom/circle/CircleContainsPoint.ts
function CircleContainsPoint(circle, point) {
  return CircleContains(circle, point.x, point.y);
}

// src/geom/circle/CircleContainsRect.ts
function CircleContainsRect(circle, rect) {
  return CircleContains(circle, rect.x, rect.y) && CircleContains(circle, rect.right, rect.y) && CircleContains(circle, rect.x, rect.bottom) && CircleContains(circle, rect.right, rect.bottom);
}

// src/geom/circle/CircleEquals.ts
function CircleEquals(circle, toCompare) {
  return circle.x === toCompare.x && circle.y === toCompare.y && circle.radius === toCompare.radius;
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
function GetCircleArea(circle) {
  return circle.radius > 0 ? Math.PI * circle.radius * circle.radius : 0;
}

// src/geom/circle/GetCircleBounds.ts
function GetCircleBounds(circle, out = new Rectangle()) {
  return out.set(circle.left, circle.top, circle.diameter, circle.diameter);
}

// src/geom/circle/GetCircleCircumference.ts
function GetCircleCircumference(circle) {
  return 2 * (Math.PI * circle.radius);
}

// src/geom/circle/GetCircleCircumferencePoint.ts
function GetCircleCircumferencePoint(circle, angle, out = new Vec2()) {
  return out.set(circle.x + circle.radius * Math.cos(angle), circle.y + circle.radius * Math.sin(angle));
}

// src/geom/circle/GetCirclePoint.ts
function GetCirclePoint(circle, position, out = new Vec2()) {
  const angle = FromPercent(position, 0, MATH_CONST.PI2);
  return GetCircleCircumferencePoint(circle, angle, out);
}

// src/geom/circle/GetCirclePoints.ts
function GetCirclePoints(circle, step, quantity = 0, out = []) {
  if (!quantity) {
    quantity = GetCircleCircumference(circle) / step;
  }
  for (let i = 0; i < quantity; i++) {
    const angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);
    out.push(GetCircleCircumferencePoint(circle, angle));
  }
  return out;
}

// src/geom/circle/GetCircleRandomPoint.ts
function GetCircleRandomPoint(circle, out = new Vec2()) {
  const t = 2 * Math.PI * Math.random();
  const u = Math.random() + Math.random();
  const r = u > 1 ? 2 - u : u;
  const x = r * Math.cos(t);
  const y = r * Math.sin(t);
  return out.set(circle.x + x * circle.radius, circle.y + y * circle.radius);
}

// src/geom/circle/TranslateCircle.ts
function TranslateCircle(circle, x, y) {
  circle.x += x;
  circle.y += y;
  return circle;
}

// src/geom/circle/TranslateCirclePoint.ts
function TranslateCirclePoint(circle, point) {
  circle.x += point.x;
  circle.y += point.y;
  return circle;
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
function CircleToRectangle(circle, rect) {
  const halfWidth = rect.width / 2;
  const halfHeight = rect.height / 2;
  const cx = Math.abs(circle.x - rect.x - halfWidth);
  const cy = Math.abs(circle.y - rect.y - halfHeight);
  const xDist = halfWidth + circle.radius;
  const yDist = halfHeight + circle.radius;
  if (cx > xDist || cy > yDist) {
    return false;
  } else if (cx <= halfWidth || cy <= halfHeight) {
    return true;
  } else {
    const xCornerDist = cx - halfWidth;
    const yCornerDist = cy - halfHeight;
    const xCornerDistSq = xCornerDist * xCornerDist;
    const yCornerDistSq = yCornerDist * yCornerDist;
    const maxCornerDistSq = circle.radius * circle.radius;
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
function LineToCircle(line, circle, nearest) {
  if (!nearest) {
    nearest = tmp;
  }
  const { x1, y1, x2, y2 } = line;
  if (CircleContains(circle, x1, y1)) {
    nearest.set(x1, y1);
    return true;
  }
  if (CircleContains(circle, x2, y2)) {
    nearest.set(x2, y2);
    return true;
  }
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lcx = circle.x - x1;
  const lcy = circle.y - y1;
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
  return pLen2 <= dLen2 && px * dx + py * dy >= 0 && CircleContains(circle, nearest.x, nearest.y);
}

// src/geom/intersects/GetLineToCircle.ts
function GetLineToCircle(line, circle, out = []) {
  if (LineToCircle(line, circle)) {
    const { x1, y1, x2, y2 } = line;
    const cr = circle.radius;
    const lDirX = x2 - x1;
    const lDirY = y2 - y1;
    const oDirX = x1 - circle.x;
    const oDirY = y1 - circle.y;
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
function GetCircleToRectangle(circle, rect, out = []) {
  if (CircleToRectangle(circle, rect)) {
    const [line1, line2, line3, line4] = GetRectangleEdges(rect);
    GetLineToCircle(line1, circle, out);
    GetLineToCircle(line2, circle, out);
    GetLineToCircle(line3, circle, out);
    GetLineToCircle(line4, circle, out);
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
function TriangleToCircle(triangle, circle) {
  if (triangle.left > circle.right || triangle.right < circle.left || triangle.top > circle.bottom || triangle.bottom < circle.top) {
    return false;
  }
  if (TriangleContains(triangle, circle.x, circle.y)) {
    return true;
  }
  const [line1, line2, line3] = GetTriangleEdges(triangle);
  return LineToCircle(line1, circle) || LineToCircle(line2, circle) || LineToCircle(line3, circle);
}

// src/geom/intersects/GetTriangleToCircle.ts
function GetTriangleToCircle(triangle, circle, out = []) {
  if (TriangleToCircle(triangle, circle)) {
    const [lineA, lineB, lineC] = GetTriangleEdges(triangle);
    GetLineToCircle(lineA, circle, out);
    GetLineToCircle(lineB, circle, out);
    GetLineToCircle(lineC, circle, out);
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
  LineSetToAngle: () => LineSetToAngle,
  RotateLine: () => RotateLine,
  RotateLineAround: () => RotateLineAround,
  RotateLineAroundPoint: () => RotateLineAroundPoint,
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

// src/geom/line/SetLineToAngle.ts
function LineSetToAngle(line, x, y, angle, length) {
  line.x1 = x;
  line.y1 = y;
  line.x2 = x + Math.cos(angle) * length;
  line.y2 = y + Math.sin(angle) * length;
  return line;
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

// src/geom/rectangle/RectangleEquals.ts
function RectangleEquals(rect, toCompare) {
  return rect.x === toCompare.x && rect.y === toCompare.y && rect.width === toCompare.width && rect.height === toCompare.height;
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

// src/geom3d/index.ts
var geom3d_exports = {};
__export(geom3d_exports, {
  BoxGeometry: () => BoxGeometry,
  ConeGeometry: () => ConeGeometry,
  CylinderGeometry: () => CylinderGeometry,
  PlaneGeometry: () => PlaneGeometry,
  SphereGeometry: () => SphereGeometry,
  TorusGeometry: () => TorusGeometry
});

// src/geom3d/TorusGeometry.ts
function TorusGeometry(radius = 1, tube = 0.4, radialSegments = 8, tubularSegments = 6, arc = Math.PI * 2) {
  const data = CreateVertexSet();
  const {
    vertices,
    normals,
    uvs,
    indices
  } = data;
  const center = new Vec3();
  const vertex = new Vec3();
  const normal = new Vec3();
  for (let j = 0; j <= radialSegments; j++) {
    for (let i = 0; i <= tubularSegments; i++) {
      const u = i / tubularSegments * arc;
      const v = j / radialSegments * Math.PI * 2;
      vertex.x = (radius + tube * Math.cos(v)) * Math.cos(u);
      vertex.y = (radius + tube * Math.cos(v)) * Math.sin(u);
      vertex.z = tube * Math.sin(v);
      vertices.push(vertex.x, vertex.y, vertex.z);
      center.x = radius * Math.cos(u);
      center.y = radius * Math.sin(u);
      Vec3Subtract(vertex, center, normal);
      Vec3Normalize(normal, normal);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(i / tubularSegments);
      uvs.push(j / radialSegments);
    }
  }
  for (let j = 1; j <= radialSegments; j++) {
    for (let i = 1; i <= tubularSegments; i++) {
      const a = (tubularSegments + 1) * j + i - 1;
      const b = (tubularSegments + 1) * (j - 1) + i - 1;
      const c = (tubularSegments + 1) * (j - 1) + i;
      const d = (tubularSegments + 1) * j + i;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }
  data.numberOfVertices = vertices.length;
  return data;
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
      target = GameInstance.get().renderer.canvas;
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
  getInteractiveChildren(parent, results) {
    const children = parent.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (!child.visible || !child.input.enabled) {
        continue;
      }
      results.push(child);
      if (child.input.enabledChildren && child.numChildren) {
        this.getInteractiveChildren(child, results);
      }
    }
  }
  checkHitArea(entity, px, py) {
    if (entity.input.hitArea) {
      if (entity.input.hitArea.contains(px, py)) {
        return true;
      }
    } else {
      return entity.transformExtent.contains(px, py);
    }
    return false;
  }
  hitTest(...entities3) {
    const localX = this.localPoint.x;
    const localY = this.localPoint.y;
    const point = this.transPoint;
    for (let i = 0; i < entities3.length; i++) {
      const entity = entities3[i];
      if (!entity.world) {
        continue;
      }
      const mat = Mat2dAppend(entity.world.camera.worldTransform, entity.worldTransform);
      Mat2dGlobalToLocal(mat, localX, localY, point);
      if (this.checkHitArea(entity, point.x, point.y)) {
        this.hitPoint.set(point.x, point.y);
        return true;
      }
    }
    return false;
  }
  hitTestChildren(parent, topOnly = true) {
    const output = [];
    if (!parent.visible) {
      return output;
    }
    const candidates = [];
    const parentInput = parent.input;
    if (parentInput && parentInput.enabled) {
      candidates.push(parent);
    }
    if (parentInput.enabledChildren && parent.numChildren) {
      this.getInteractiveChildren(parent, candidates);
    }
    for (let i = candidates.length - 1; i >= 0; i--) {
      const entity = candidates[i];
      if (this.hitTest(entity)) {
        output.push(entity);
        if (topOnly) {
          break;
        }
      }
    }
    return output;
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
    child.input.enabled = true;
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
  BitmapTextFile: () => BitmapTextFile,
  CSVFile: () => CSVFile,
  ImageFile: () => ImageFile,
  JSONFile: () => JSONFile,
  JSONGeometryFile: () => JSONGeometryFile,
  OBJFile: () => OBJFile,
  OBJGeometryFile: () => OBJGeometryFile,
  SpriteSheetFile: () => SpriteSheetFile,
  XMLFile: () => XMLFile
});

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

// src/loader/GetURL.ts
function GetURL(key, url, extension, loader) {
  if (!url) {
    url = key + extension;
  }
  if (/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/.exec(url)) {
    return url;
  } else if (loader) {
    return loader.baseURL + loader.path + url;
  } else {
    return url;
  }
}

// src/loader/ImageLoader.ts
function ImageTagLoader(file) {
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

// src/loader/files/ImageFile.ts
function ImageFile(key, url, glConfig) {
  const file = new File(key, url);
  file.load = () => {
    file.url = GetURL(file.key, file.url, ".png", file.loader);
    if (file.loader) {
      file.crossOrigin = file.loader.crossOrigin;
    }
    return new Promise((resolve, reject) => {
      const textureManager = TextureManagerInstance.get();
      if (textureManager.has(file.key)) {
        resolve(file);
      } else {
        ImageTagLoader(file).then((file2) => {
          textureManager.add(file2.key, file2.data, glConfig);
          resolve(file2);
        }).catch((file2) => {
          reject(file2);
        });
      }
    });
  };
  return file;
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

// src/loader/XHRLoader.ts
function XHRLoader(file) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", file.url, true);
  xhr.responseType = file.responseType;
  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      file.data = xhr.responseText;
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

// src/loader/files/JSONFile.ts
function JSONFile(key, url) {
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

// src/loader/files/AtlasFile.ts
function AtlasFile(key, textureURL, atlasURL, glConfig) {
  const json = JSONFile(key, atlasURL);
  const image = ImageFile(key, textureURL, glConfig);
  const file = new File(key, "");
  file.load = () => {
    json.url = GetURL(json.key, json.url, ".json", file.loader);
    image.url = GetURL(image.key, image.url, ".png", file.loader);
    return new Promise((resolve, reject) => {
      json.skipCache = true;
      json.load().then(() => {
        image.load().then(() => {
          AtlasParser(TextureManagerInstance.get().get(key), json.data);
          resolve(file);
        }).catch(() => {
          reject(file);
        });
      }).catch(() => {
        reject(file);
      });
    });
  };
  return file;
}

// src/loader/files/XMLFile.ts
function XMLFile(key, url) {
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

// src/loader/files/BitmapTextFile.ts
function BitmapTextFile(key, textureURL, fontDataURL, glConfig) {
  const xml = XMLFile(key, fontDataURL);
  const image = ImageFile(key, textureURL, glConfig);
  const file = new File(key, "");
  file.load = () => {
    xml.url = GetURL(xml.key, xml.url, ".xml", file.loader);
    image.url = GetURL(image.key, image.url, ".png", file.loader);
    return new Promise((resolve, reject) => {
      xml.skipCache = true;
      xml.load().then(() => {
        image.load().then(() => {
          const texture = TextureManagerInstance.get().get(key);
          const fontData = BitmapTextParser(texture, xml.data);
          texture.data = fontData;
          resolve(file);
        }).catch(() => {
          reject(file);
        });
      }).catch(() => {
        reject(file);
      });
    });
  };
  return file;
}

// src/loader/files/CSVFile.ts
function CSVFile(key, url) {
  const file = new File(key, url);
  file.load = () => {
    file.url = GetURL(file.key, file.url, ".csv", file.loader);
    return new Promise((resolve, reject) => {
      const cache = Cache.get("CSV");
      if (!file.skipCache && cache.has(file.key)) {
        resolve(file);
      } else {
        XHRLoader(file).then((file2) => {
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

// src/loader/files/JSONGeometryFile.ts
function JSONGeometryFile(key, url, mappingConfig) {
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

// src/loader/files/OBJFile.ts
function OBJFile(key, url) {
  const file = new File(key, url);
  file.load = () => {
    file.url = GetURL(file.key, file.url, ".obj", file.loader);
    return new Promise((resolve, reject) => {
      const cache = Cache.get("Obj");
      if (!file.skipCache && cache.has(file.key)) {
        resolve(file);
      } else {
        XHRLoader(file).then((file2) => {
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

// src/loader/files/OBJGeometryFile.ts
function OBJGeometryFile(key, url, flipUVs = true) {
  const file = new File(key, url);
  file.load = () => {
    file.url = GetURL(file.key, file.url, ".obj", file.loader);
    return new Promise((resolve, reject) => {
      const cache = Cache.get("Geometry");
      if (!file.skipCache && cache.has(file.key)) {
        resolve(file);
      } else {
        XHRLoader(file).then((file2) => {
          const models = GetBufferFromObj(file2.data, flipUVs);
          file2.data = models;
          if (!file2.skipCache) {
            let key2 = file2.key;
            models.forEach((model, index) => {
              if (index > 0) {
                key2 = file2.key + index.toString();
              }
              const geom = new Geometry(model.buffer);
              cache.set(key2, geom);
            });
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

// src/loader/files/SpriteSheetFile.ts
function SpriteSheetFile(key, url, frameConfig, glConfig) {
  const file = new File(key, url);
  file.load = () => {
    file.url = GetURL(file.key, file.url, ".png", file.loader);
    if (file.loader) {
      file.crossOrigin = file.loader.crossOrigin;
    }
    return new Promise((resolve, reject) => {
      const textureManager = TextureManagerInstance.get();
      if (textureManager.has(file.key)) {
        resolve(file);
      } else {
        ImageTagLoader(file).then((file2) => {
          const texture = textureManager.add(file2.key, file2.data, glConfig);
          if (texture) {
            SpriteSheetParser(texture, 0, 0, texture.width, texture.height, frameConfig);
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
};

// src/materials3d/index.ts
var materials3d_exports = {};
__export(materials3d_exports, {
  BlackPlastic: () => BlackPlastic,
  BlackRubber: () => BlackRubber,
  Brass: () => Brass,
  Bronze: () => Bronze,
  Chrome: () => Chrome,
  Copper: () => Copper,
  CyanPlastic: () => CyanPlastic,
  CyanRubber: () => CyanRubber,
  Emerald: () => Emerald,
  Gold: () => Gold,
  GreenPlastic: () => GreenPlastic,
  GreenRubber: () => GreenRubber,
  Jade: () => Jade,
  Obsidian: () => Obsidian,
  Pearl: () => Pearl,
  RedPlastic: () => RedPlastic,
  RedRubber: () => RedRubber,
  Ruby: () => Ruby,
  Silver: () => Silver,
  Turquoise: () => Turquoise,
  WhitePlastic: () => WhitePlastic,
  WhiteRubber: () => WhiteRubber,
  YellowPlastic: () => YellowPlastic,
  YellowRubber: () => YellowRubber
});

// src/materials3d/BlackPlastic.ts
var BlackPlastic = new Material({
  ambient: [0, 0, 0],
  diffuse: [0.01, 0.01, 0.01],
  specular: [0.5, 0.5, 0.5],
  shine: 0.25
});

// src/materials3d/BlackRubber.ts
var BlackRubber = new Material({
  ambient: [0.02, 0.02, 0.02],
  diffuse: [0.01, 0.01, 0.01],
  specular: [0.4, 0.4, 0.4],
  shine: 0.078125
});

// src/materials3d/Brass.ts
var Brass = new Material({
  ambient: [0.329412, 0.223529, 0.027451],
  diffuse: [0.780392, 0.568627, 0.113725],
  specular: [0.992157, 0.941176, 0.807843],
  shine: 0.21794872
});

// src/materials3d/Bronze.ts
var Bronze = new Material({
  ambient: [0.2125, 0.1275, 0.054],
  diffuse: [0.714, 0.4284, 0.18144],
  specular: [0.393548, 0.271906, 0.166721],
  shine: 0.2
});

// src/materials3d/Chrome.ts
var Chrome = new Material({
  ambient: [0.25, 0.25, 0.25],
  diffuse: [0.4, 0.4, 0.4],
  specular: [0.774597, 0.774597, 0.774597],
  shine: 0.6
});

// src/materials3d/Copper.ts
var Copper = new Material({
  ambient: [0.19125, 0.0735, 0.0225],
  diffuse: [0.7038, 0.27048, 0.0828],
  specular: [0.256777, 0.137622, 0.086014],
  shine: 0.1
});

// src/materials3d/CyanPlastic.ts
var CyanPlastic = new Material({
  ambient: [0, 0.1, 0.06],
  diffuse: [0, 0.50980392, 0.50980392],
  specular: [0.50196078, 0.50196078, 0.50196078],
  shine: 0.25
});

// src/materials3d/CyanRubber.ts
var CyanRubber = new Material({
  ambient: [0, 0.05, 0.05],
  diffuse: [0.4, 0.5, 0.5],
  specular: [0.04, 0.7, 0.7],
  shine: 0.078125
});

// src/materials3d/Emerald.ts
var Emerald = new Material({
  ambient: [0.0215, 0.1745, 0.0215],
  diffuse: [0.07568, 0.61424, 0.07568],
  specular: [0.633, 0.727811, 0.633],
  shine: 0.6
});

// src/materials3d/Gold.ts
var Gold = new Material({
  ambient: [0.24725, 0.1995, 0.0745],
  diffuse: [0.75164, 0.60648, 0.22648],
  specular: [0.628281, 0.555802, 0.366065],
  shine: 0.4
});

// src/materials3d/GreenPlastic.ts
var GreenPlastic = new Material({
  ambient: [0, 0, 0],
  diffuse: [0.1, 0.35, 0.1],
  specular: [0.45, 0.55, 0.45],
  shine: 0.25
});

// src/materials3d/GreenRubber.ts
var GreenRubber = new Material({
  ambient: [0, 0.05, 0],
  diffuse: [0.4, 0.5, 0.4],
  specular: [0.04, 0.7, 0.04],
  shine: 0.078125
});

// src/materials3d/Jade.ts
var Jade = new Material({
  ambient: [0.135, 0.2225, 0.1575],
  diffuse: [0.54, 0.89, 0.63],
  specular: [0.316228, 0.316228, 0.316228],
  shine: 0.1
});

// src/materials3d/Obsidian.ts
var Obsidian = new Material({
  ambient: [0.05375, 0.05, 0.06625],
  diffuse: [0.18275, 0.17, 0.22525],
  specular: [0.332741, 0.328634, 0.346435],
  shine: 0.3
});

// src/materials3d/Pearl.ts
var Pearl = new Material({
  ambient: [0.25, 0.20725, 0.20725],
  diffuse: [1, 0.829, 0.829],
  specular: [0.296648, 0.296648, 0.296648],
  shine: 0.088
});

// src/materials3d/RedPlastic.ts
var RedPlastic = new Material({
  ambient: [0, 0, 0],
  diffuse: [0.5, 0, 0],
  specular: [0.7, 0.6, 0.6],
  shine: 0.25
});

// src/materials3d/RedRubber.ts
var RedRubber = new Material({
  ambient: [0.05, 0, 0],
  diffuse: [0.5, 0.4, 0.4],
  specular: [0.7, 0.04, 0.04],
  shine: 0.078125
});

// src/materials3d/Ruby.ts
var Ruby = new Material({
  ambient: [0.1745, 0.01175, 0.01175],
  diffuse: [0.61424, 0.04136, 0.04136],
  specular: [0.727811, 0.626959, 0.626959],
  shine: 0.6
});

// src/materials3d/Silver.ts
var Silver = new Material({
  ambient: [0.19225, 0.19225, 0.19225],
  diffuse: [0.50754, 0.50754, 0.50754],
  specular: [0.508273, 0.508273, 0.508273],
  shine: 0.4
});

// src/materials3d/Turquoise.ts
var Turquoise = new Material({
  ambient: [0.1, 0.18725, 0.1745],
  diffuse: [0.396, 0.74151, 0.69102],
  specular: [0.297254, 0.30829, 0.306678],
  shine: 0.1
});

// src/materials3d/WhitePlastic.ts
var WhitePlastic = new Material({
  ambient: [0, 0, 0],
  diffuse: [0.55, 0.55, 0.55],
  specular: [0.7, 0.7, 0.7],
  shine: 0.25
});

// src/materials3d/WhiteRubber.ts
var WhiteRubber = new Material({
  ambient: [0.05, 0.05, 0.05],
  diffuse: [0.5, 0.5, 0.5],
  specular: [0.7, 0.7, 0.7],
  shine: 0.078125
});

// src/materials3d/YellowPlastic.ts
var YellowPlastic = new Material({
  ambient: [0, 0, 0],
  diffuse: [0.5, 0.5, 0],
  specular: [0.6, 0.6, 0.5],
  shine: 0.25
});

// src/materials3d/YellowRubber.ts
var YellowRubber = new Material({
  ambient: [0.05, 0.05, 0],
  diffuse: [0.5, 0.5, 0.4],
  specular: [0.7, 0.7, 0.04],
  shine: 0.078125
});

// src/scenes/index.ts
var scenes_exports = {};
__export(scenes_exports, {
  AddRenderStatsComponent: () => AddRenderStatsComponent,
  CreateSceneRenderData: () => CreateSceneRenderData,
  GameObjectRenderList: () => GameObjectRenderList,
  GetConfigValue: () => GetConfigValue,
  GetRenderStatsAsObject: () => GetRenderStatsAsObject,
  Install: () => Install,
  RenderStatsComponent: () => RenderStatsComponent,
  ResetRenderStats: () => ResetRenderStats,
  Scene: () => Scene,
  SceneManager: () => SceneManager,
  SceneManagerInstance: () => SceneManagerInstance
});

// src/scenes/RenderStatsComponent.ts
var RenderStats = defineComponent({
  gameFrame: Types.ui32,
  numScenes: Types.ui8,
  numWorlds: Types.ui8,
  numGameObjects: Types.ui32,
  numGameObjectsRendered: Types.ui32,
  numDirtyLocalTransforms: Types.ui32,
  numDirtyWorldTransforms: Types.ui32,
  numDirtyVertices: Types.ui32,
  numDirtyWorldLists: Types.ui8,
  numDirtyCameras: Types.ui32
});
var RenderStatsComponent = RenderStats;

// src/scenes/AddRenderStatsComponent.ts
function AddRenderStatsComponent(id) {
  addComponent(GameObjectWorld, RenderStatsComponent, id);
}

// src/scenes/CreateSceneRenderData.ts
function CreateSceneRenderData() {
  return {
    gameFrame: 0,
    numTotalFrames: 0,
    numDirtyFrames: 0,
    numDirtyCameras: 0,
    worldData: []
  };
}

// src/scenes/GameObjectRenderList.ts
var GameObjectRenderList = new Set();

// src/scenes/GetConfigValue.ts
function GetConfigValue(config, property, defaultValue) {
  if (Object.prototype.hasOwnProperty.call(config, property)) {
    return config[property];
  } else {
    return defaultValue;
  }
}

// src/scenes/SceneManagerInstance.ts
var instance4;
var SceneManagerInstance = {
  get: () => {
    return instance4;
  },
  set: (manager) => {
    if (instance4) {
      throw new Error("SceneManager should not be instantiated more than once");
    }
    instance4 = manager;
  }
};

// src/scenes/GetRenderStatsAsObject.ts
function GetRenderStatsAsObject(obj) {
  const id = SceneManagerInstance.get().id;
  if (!obj) {
    obj = { gameFrame: 0, numScenes: 0, numWorlds: 0, numGameObjects: 0, numGameObjectsRendered: 0, numDirtyLocalTransforms: 0, numDirtyWorldTransforms: 0, numDirtyVertices: 0, numDirtyWorldLists: 0, numDirtyCameras: 0 };
  }
  obj.gameFrame = RenderStatsComponent.gameFrame[id];
  obj.numScenes = RenderStatsComponent.numScenes[id];
  obj.numWorlds = RenderStatsComponent.numWorlds[id];
  obj.numGameObjects = RenderStatsComponent.numGameObjects[id];
  obj.numGameObjectsRendered = RenderStatsComponent.numGameObjectsRendered[id];
  obj.numDirtyLocalTransforms = RenderStatsComponent.numDirtyLocalTransforms[id];
  obj.numDirtyWorldTransforms = RenderStatsComponent.numDirtyWorldTransforms[id];
  obj.numDirtyVertices = RenderStatsComponent.numDirtyVertices[id];
  obj.numDirtyWorldLists = RenderStatsComponent.numDirtyWorldLists[id];
  obj.numDirtyCameras = RenderStatsComponent.numDirtyCameras[id];
  return obj;
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

// src/scenes/ResetRenderStats.ts
function ResetRenderStats(id, gameFrame, scenes, worlds2, transforms) {
  RenderStatsComponent.gameFrame[id] = gameFrame;
  RenderStatsComponent.numScenes[id] = scenes;
  RenderStatsComponent.numWorlds[id] = worlds2;
  RenderStatsComponent.numGameObjects[id] = 0;
  RenderStatsComponent.numGameObjectsRendered[id] = 0;
  RenderStatsComponent.numDirtyWorldLists[id] = 0;
  RenderStatsComponent.numDirtyVertices[id] = 0;
  RenderStatsComponent.numDirtyLocalTransforms[id] = transforms;
  RenderStatsComponent.numDirtyWorldTransforms[id] = 0;
  RenderStatsComponent.numDirtyCameras[id] = 0;
}

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

// src/config/scenes/GetScenes.ts
function GetScenes() {
  return ConfigStore.get(CONFIG_DEFAULTS.SCENES);
}

// src/scenes/SceneManager.ts
var SceneManager = class {
  id = addEntity(GameObjectWorld);
  game;
  scenes = new Map();
  sceneIndex = 0;
  flush;
  changedMatrixQuery = defineQuery([Changed(LocalMatrix2DComponent)]);
  constructor() {
    this.game = GameInstance.get();
    SceneManagerInstance.set(this);
    AddRenderStatsComponent(this.id);
    Once(this.game, "boot", () => this.boot());
  }
  boot() {
    GetScenes().forEach((scene) => new scene());
  }
  update(delta, time, gameFrame) {
    let sceneTotal = 0;
    let worldTotal = 0;
    for (const scene of this.scenes.values()) {
      const worlds2 = WorldList.get(scene);
      for (const world3 of worlds2) {
        world3.beforeUpdate(delta, time);
        world3.update(delta, time);
        world3.afterUpdate(delta, time);
        worldTotal++;
      }
      sceneTotal++;
    }
    const localTransforms = UpdateLocalTransform2DSystem(GameObjectWorld);
    ResetRenderStats(this.id, gameFrame, sceneTotal, worldTotal, localTransforms.length);
  }
  preRender(gameFrame) {
    const dirtyTransforms = this.changedMatrixQuery(GameObjectWorld);
    let dirtyWorld = false;
    for (const scene of this.scenes.values()) {
      const worlds2 = WorldList.get(scene);
      for (const world3 of worlds2) {
        if (world3.preRender(gameFrame, dirtyTransforms)) {
          dirtyWorld = true;
        }
      }
    }
    const verts = UpdateVertexPositionSystem(GameObjectWorld);
    RenderStatsComponent.numDirtyVertices[this.id] = verts.length;
    if (dirtyWorld) {
      this.flush = true;
    }
  }
  updateWorldStats(numGameObjects, numRendered, numDisplayLists, numWorldTransforms2) {
    const id = this.id;
    RenderStatsComponent.numGameObjects[id] += numGameObjects;
    RenderStatsComponent.numGameObjectsRendered[id] += numRendered;
    RenderStatsComponent.numDirtyWorldLists[id] += numDisplayLists;
    RenderStatsComponent.numDirtyWorldTransforms[id] += numWorldTransforms2;
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
  constructor(world3) {
    this.world = world3;
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
  BuildRenderList: () => BuildRenderList,
  CalculateTotalRenderable: () => CalculateTotalRenderable,
  CreateWorldRenderData: () => CreateWorldRenderData,
  Events: () => events_exports2,
  HasDirtyChildren: () => HasDirtyChildren,
  MergeRenderData: () => MergeRenderData,
  ResetWorldRenderData: () => ResetWorldRenderData,
  StaticWorld: () => StaticWorld,
  UpdateCachedLayers: () => UpdateCachedLayers,
  World: () => World,
  WorldDepthFirstSearch: () => WorldDepthFirstSearch
});

// src/world/events/index.ts
var events_exports2 = {};
__export(events_exports2, {
  WorldAfterUpdateEvent: () => WorldAfterUpdateEvent,
  WorldBeforeUpdateEvent: () => WorldBeforeUpdateEvent,
  WorldPostRenderEvent: () => WorldPostRenderEvent,
  WorldRenderEvent: () => WorldRenderEvent,
  WorldShutdownEvent: () => WorldShutdownEvent,
  WorldUpdateEvent: () => WorldUpdateEvent
});

// src/world/events/WorldAfterUpdateEvent.ts
var WorldAfterUpdateEvent = "afterupdate";

// src/world/events/WorldBeforeUpdateEvent.ts
var WorldBeforeUpdateEvent = "beforeupdate";

// src/world/events/WorldPostRenderEvent.ts
var WorldPostRenderEvent = "worldpostrender";

// src/world/events/WorldRenderEvent.ts
var WorldRenderEvent = "worldrender";

// src/world/events/WorldShutdownEvent.ts
var WorldShutdownEvent = "worldshutdown";

// src/world/events/WorldUpdateEvent.ts
var WorldUpdateEvent = "update";

// src/world/AddRenderDataComponent.ts
function AddRenderDataComponent(id) {
  addComponent(GameObjectWorld, RenderDataComponent, id);
}

// src/world/CheckDirtyTransforms.ts
function CheckDirtyTransforms(worldID, list) {
  for (let i = 0; i < list.length; i++) {
    if (GetWorldID(list[i]) === worldID) {
      return true;
    }
  }
  return false;
}

// src/config/worldsize/GetWorldSize.ts
function GetWorldSize() {
  return ConfigStore.get(CONFIG_DEFAULTS.WORLD_SIZE);
}

// src/world/RebuildWorldList.ts
function RebuildWorldList(world3, parent) {
  if (WillRender(parent)) {
    if (world3.id !== parent) {
      world3.addToRenderList(parent, 0);
    }
    const children = GameObjectTree.get(parent);
    for (let i = 0; i < children.length; i++) {
      const nodeID = children[i];
      if (WillRender(nodeID)) {
        if (GetNumChildren(nodeID) > 0 && WillRenderChildren(nodeID)) {
          RebuildWorldList(world3, nodeID);
        } else {
          world3.addToRenderList(nodeID, 0);
          world3.addToRenderList(nodeID, 1);
        }
      }
    }
    if (world3.id !== parent) {
      world3.addToRenderList(parent, 1);
    }
  }
}

// src/world/RebuildWorldTransforms.ts
function RebuildWorldTransforms(world3, parent, transformList, forceUpdate) {
  if (WillRender(parent)) {
    if (!forceUpdate && transformList.indexOf(parent) > -1) {
      forceUpdate = true;
    }
    if (forceUpdate) {
      UpdateWorldTransform(parent);
    }
    const children = GameObjectTree.get(parent);
    for (let i = 0; i < children.length; i++) {
      const nodeID = children[i];
      if (WillRender(nodeID)) {
        if (GetNumChildren(nodeID) > 0) {
          if (WillRenderChildren(nodeID) && WillTransformChildren(nodeID)) {
            RebuildWorldTransforms(world3, nodeID, transformList, forceUpdate);
          }
        } else if (forceUpdate || transformList.indexOf(nodeID) > -1) {
          UpdateWorldTransform(nodeID);
        }
      }
    }
  }
}

// src/scenes/events/SceneDestroyEvent.ts
var SceneDestroyEvent = "destroy";

// src/world/BaseWorld.ts
var BaseWorld = class extends GameObject {
  tag = defineComponent();
  scene;
  sceneManager;
  camera;
  forceRefresh = false;
  is3D = false;
  runRender = false;
  renderList;
  listLength;
  totalChildren;
  totalChildrenQuery;
  dirtyWorldQuery;
  constructor(scene) {
    super();
    this.scene = scene;
    this.sceneManager = SceneManagerInstance.get();
    this.totalChildren = 0;
    this.totalChildrenQuery = defineQuery([this.tag]);
    this.dirtyWorldQuery = defineQuery([this.tag, Changed(WorldMatrix2DComponent)]);
    this.renderList = new Uint32Array(GetWorldSize() * 4);
    this.listLength = 0;
    const id = this.id;
    AddRenderDataComponent(id);
    AddTransform2DComponent(id);
    SetWorldID(id, id);
    WorldList.get(scene).push(this);
    Once(scene, SceneDestroyEvent, () => this.destroy());
  }
  beforeUpdate(delta, time) {
    Emit(this, WorldBeforeUpdateEvent, delta, time, this);
  }
  update(delta, time) {
    if (!WillUpdate(this.id)) {
      return;
    }
    Emit(this, WorldUpdateEvent, delta, time, this);
    super.update(delta, time);
  }
  afterUpdate(delta, time) {
    Emit(this, WorldAfterUpdateEvent, delta, time, this);
  }
  addToRenderList(id, renderType) {
    let len = this.listLength;
    const list = this.renderList;
    list[len] = id;
    list[len + 1] = renderType;
    this.listLength += 2;
    len += 2;
    if (len === list.length) {
      const newList = new Uint32Array(len + GetWorldSize() * 4);
      newList.set(list, 0);
      this.renderList = newList;
    }
  }
  preRender(gameFrame, transformList) {
    const sceneManager = this.sceneManager;
    if (!this.isRenderable()) {
      this.runRender = false;
      sceneManager.updateWorldStats(this.totalChildren, 0, 0, 0);
      return false;
    }
    const id = this.id;
    const dirtyDisplayList = HasDirtyDisplayList(id);
    ResetWorldRenderData(id, gameFrame);
    let isDirty = false;
    if (dirtyDisplayList) {
      this.listLength = 0;
      RebuildWorldList(this, id);
      ClearDirtyDisplayList(id);
      isDirty = true;
      this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
    }
    if (dirtyDisplayList || CheckDirtyTransforms(id, transformList)) {
      RebuildWorldTransforms(this, id, transformList, false);
      isDirty = true;
    }
    this.camera.dirtyRender = false;
    this.runRender = this.listLength > 0;
    sceneManager.updateWorldStats(this.totalChildren, this.listLength / 4, Number(dirtyDisplayList), GetNumWorldTransforms());
    return isDirty;
  }
  getTotalChildren() {
    if (HasDirtyDisplayList(this.id)) {
      this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
    }
    return this.totalChildren;
  }
  renderGL(renderPass) {
    Emit(this, WorldRenderEvent, this);
    const currentCamera = renderPass.current2DCamera;
    const camera = this.camera;
    if (!currentCamera || !Mat2dEquals(camera.worldTransform, currentCamera.worldTransform)) {
      Flush(renderPass);
    }
    Begin(renderPass, camera);
    const list = this.renderList;
    for (let i = 0; i < this.listLength; i += 2) {
      const eid = list[i];
      const type = list[i + 1];
      const entry = GameObjectCache.get(eid);
      if (type === 1) {
        entry.postRenderGL(renderPass);
      } else {
        entry.renderGL(renderPass);
      }
    }
  }
  postRenderGL(renderPass) {
    Emit(this, WorldPostRenderEvent, renderPass, this);
  }
  shutdown() {
    RemoveChildren(this);
    Emit(this, WorldShutdownEvent, this);
    ResetWorldRenderData(this.id, 0);
    if (this.camera) {
      this.camera.reset();
    }
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

// src/world/CalculateTotalRenderable.ts
function CalculateTotalRenderable(entry, renderData) {
  renderData.numRendered++;
  renderData.numRenderable++;
  if (IsDirtyFrame(entry.node.id, renderData.gameFrame)) {
    renderData.dirtyFrame++;
  }
  entry.children.forEach((child) => {
    if (child.children.length > 0) {
      CalculateTotalRenderable(child, renderData);
    }
  });
}

// src/world/HasDirtyChildren.ts
function HasDirtyChildren(parent) {
  if (HasDirtyChildCache(parent.node.id)) {
    return true;
  }
  const stack = [parent];
  while (stack.length > 0) {
    const entry = stack.pop();
    if (HasDirtyTransform(entry.node.id)) {
      return true;
    }
    const numChildren = entry.children.length;
    if (numChildren > 0) {
      for (let i = 0; i < numChildren; i++) {
        stack.push(entry.children[i]);
      }
    }
  }
  stack.length = 0;
  return false;
}

// src/world/UpdateCachedLayers.ts
function UpdateCachedLayers(cachedLayers, dirtyCamera) {
  cachedLayers.forEach((layer) => {
    if (dirtyCamera || HasDirtyChildren(layer)) {
      SetDirtyChildCache(layer.node.id);
    } else {
      layer.children.length = 0;
    }
  });
}

// src/world/WorldDepthFirstSearch.ts
function WorldDepthFirstSearch(world3, parent, transformList, forceUpdate) {
  const renderList = world3.renderList;
  const renderType = world3.renderType;
  if (WillRender(parent)) {
    if (world3.id !== parent) {
      renderList.push(parent);
      renderType.push(0);
    }
    if (!forceUpdate && transformList.indexOf(parent) > -1) {
      forceUpdate = true;
    }
    if (forceUpdate) {
      UpdateWorldTransform(parent);
    }
    const children = GameObjectTree.get(parent);
    for (let i = 0; i < children.length; i++) {
      const nodeID = children[i];
      if (WillRender(nodeID)) {
        if (GetNumChildren(nodeID) > 0 && WillRenderChildren(nodeID)) {
          WorldDepthFirstSearch(world3, nodeID, transformList, forceUpdate);
        } else {
          renderList.push(nodeID);
          renderType.push(0);
          if (forceUpdate || transformList.indexOf(nodeID) > -1) {
            UpdateWorldTransform(nodeID);
          }
          renderList.push(nodeID);
          renderType.push(1);
        }
      }
    }
    if (world3.id !== parent) {
      renderList.push(parent);
      renderType.push(1);
    }
  }
}

// src/world/BuildRenderList.ts
function BuildRenderList(world3) {
  const worldID = world3.id;
  const cachedLayers = [];
  const stack = [];
  const entries = WorldDepthFirstSearch(cachedLayers, world3, stack);
  const renderData = world3.renderData;
  if (cachedLayers.length > 0) {
    UpdateCachedLayers(cachedLayers, world3.camera.dirtyRender);
  }
  const gameFrame = RenderDataComponent.gameFrame[worldID];
  entries.forEach((entry) => {
    if (entry.children.length > 0) {
      CalculateTotalRenderable(entry, renderData);
    } else {
      RenderDataComponent.numRendered[worldID]++;
      RenderDataComponent.numRenderable[worldID]++;
      if (IsDirtyFrame(entry.node.id, gameFrame)) {
        RenderDataComponent.dirtyFrame[worldID]++;
      }
    }
  });
  world3.renderList = entries;
  if (world3.forceRefresh) {
    RenderDataComponent.dirtyFrame[worldID]++;
    world3.forceRefresh = false;
  }
}

// src/world/CreateWorldRenderData.ts
function CreateWorldRenderData(world3, camera) {
  return {
    world: world3,
    camera,
    gameFrame: 0,
    dirtyFrame: 0,
    numRendered: 0,
    numRenderable: 0
  };
}

// src/world/MergeRenderData.ts
function MergeRenderData(sceneRenderData, worldRenderData) {
  sceneRenderData.numDirtyFrames += worldRenderData.dirtyFrame;
  sceneRenderData.numTotalFrames += worldRenderData.numRendered;
  if (worldRenderData.camera.dirtyRender) {
    sceneRenderData.numDirtyCameras++;
  }
  sceneRenderData.worldData.push(worldRenderData);
}

// src/world/StaticWorld.ts
var StaticWorld = class extends BaseWorld {
  camera;
  constructor(scene) {
    super(scene);
    this.camera = new StaticCamera();
    this.renderData = CreateWorldRenderData(this, this.camera);
  }
};

// src/world/World.ts
var World = class extends BaseWorld {
  camera;
  enableCameraCull = true;
  constructor(scene) {
    super(scene);
    this.camera = new Camera();
    this.renderData = CreateWorldRenderData(this, this.camera);
  }
};

// src/world3d/index.ts
var world3d_exports = {};
__export(world3d_exports, {
  BaseWorld3D: () => BaseWorld3D,
  BuildRenderList: () => BuildRenderList2,
  CalculateTotalRenderable: () => CalculateTotalRenderable2,
  CreateWorld3DRenderData: () => CreateWorld3DRenderData,
  Events: () => events_exports3,
  HasDirtyChildren: () => HasDirtyChildren2,
  MergeRenderData: () => MergeRenderData2,
  ResetWorld3DRenderData: () => ResetWorld3DRenderData,
  UpdateCachedLayers: () => UpdateCachedLayers2,
  World3D: () => World3D,
  WorldDepthFirstSearch: () => WorldDepthFirstSearch2
});

// src/world3d/events/index.ts
var events_exports3 = {};
__export(events_exports3, {
  World3DRenderEvent: () => World3DRenderEvent,
  World3DShutdownEvent: () => World3DShutdownEvent
});

// src/world3d/events/World3DRenderEvent.ts
var World3DRenderEvent = "worldrender";

// src/world3d/events/World3DShutdownEvent.ts
var World3DShutdownEvent = "worldshutdown";

// src/world3d/CalculateTotalRenderable.ts
function CalculateTotalRenderable2(entry, renderData) {
  renderData.numRendered++;
  renderData.numRenderable++;
  if (entry.node.dirtyFrame >= renderData.gameFrame) {
    renderData.dirtyFrame++;
  }
  entry.children.forEach((child) => {
    if (child.children.length > 0) {
      CalculateTotalRenderable2(child, renderData);
    }
  });
}

// src/world3d/HasDirtyChildren.ts
function HasDirtyChildren2(parent) {
  if (parent.node.isDirty(DIRTY_CONST.CHILD_CACHE)) {
    return true;
  }
  const stack = [parent];
  while (stack.length > 0) {
    const entry = stack.pop();
    if (entry.node.isDirty(DIRTY_CONST.TRANSFORM)) {
      return true;
    }
    const numChildren = entry.children.length;
    if (numChildren > 0) {
      for (let i = 0; i < numChildren; i++) {
        stack.push(entry.children[i]);
      }
    }
  }
  stack.length = 0;
  return false;
}

// src/world3d/UpdateCachedLayers.ts
function UpdateCachedLayers2(cachedLayers, dirtyCamera) {
  cachedLayers.forEach((layer) => {
    if (dirtyCamera || HasDirtyChildren2(layer)) {
      layer.node.setDirty(DIRTY_CONST.CHILD_CACHE);
    } else {
      layer.children.length = 0;
    }
  });
}

// src/world3d/WorldDepthFirstSearch.ts
function WorldDepthFirstSearch2(cachedLayers, parent, output = []) {
  for (let i = 0; i < parent.numChildren; i++) {
    const node = parent.children[i];
    if (node.isRenderable()) {
      const children = [];
      const entry = { node, children };
      output.push(entry);
      if (node.willRenderChildren && node.numChildren > 0) {
        if (node.willCacheChildren) {
          cachedLayers.push(entry);
        }
        WorldDepthFirstSearch2(cachedLayers, node, children);
      }
    }
  }
  return output;
}

// src/world3d/BuildRenderList.ts
function BuildRenderList2(world3) {
  const cachedLayers = [];
  const stack = [];
  const entries = WorldDepthFirstSearch2(cachedLayers, world3, stack);
  const renderData = world3.renderData;
  if (cachedLayers.length > 0) {
    UpdateCachedLayers2(cachedLayers, world3.camera.dirtyRender);
  }
  entries.forEach((entry) => {
    if (entry.children.length > 0) {
      CalculateTotalRenderable2(entry, renderData);
    } else {
      renderData.numRendered++;
      renderData.numRenderable++;
      if (entry.node.dirtyFrame >= renderData.gameFrame) {
        renderData.dirtyFrame++;
      }
    }
  });
  world3.renderList = entries;
  if (world3.forceRefresh) {
    renderData.dirtyFrame++;
    world3.forceRefresh = false;
  }
}

// src/world3d/MergeRenderData.ts
function MergeRenderData2(sceneRenderData, worldRenderData) {
  sceneRenderData.numDirtyFrames += worldRenderData.dirtyFrame;
  sceneRenderData.numTotalFrames += worldRenderData.numRendered;
  if (worldRenderData.camera.dirtyRender) {
    sceneRenderData.numDirtyCameras++;
  }
  sceneRenderData.worldData.push(worldRenderData);
}

// src/world3d/ResetWorld3DRenderData.ts
function ResetWorld3DRenderData(renderData, gameFrame) {
  renderData.gameFrame = gameFrame;
  renderData.dirtyFrame = 0;
  renderData.numRendered = 0;
  renderData.numRenderable = 0;
}

// src/world3d/BaseWorld3D.ts
var BaseWorld3D = class extends GameObject3D {
  scene;
  camera;
  renderData;
  forceRefresh = false;
  events;
  is3D = true;
  renderList;
  _updateListener;
  _renderListener;
  _shutdownListener;
  constructor(scene) {
    super();
    this.scene = scene;
    this.world = this;
    this.events = new Map();
    this.renderList = [];
    this._updateListener = On(scene, "update", (delta, time) => this.update(delta, time));
    this._renderListener = On(scene, "render", (renderData) => this.render(renderData));
    this._shutdownListener = On(scene, "shutdown", () => this.shutdown());
    Once(scene, "destroy", () => this.destroy());
  }
  update(delta, time) {
    if (!this.willUpdate) {
      return;
    }
    Emit(this, UpdateEvent, delta, time, this);
    super.update(delta, time);
  }
  postUpdate(delta, time) {
  }
  render(sceneRenderData) {
    const renderData = this.renderData;
    ResetWorld3DRenderData(renderData, sceneRenderData.gameFrame);
    if (!this.willRender || !this.visible) {
      return;
    }
    BuildRenderList2(this);
    Emit(this, World3DRenderEvent, renderData, this);
    MergeRenderData2(sceneRenderData, renderData);
  }
  renderNode(entry, renderPass) {
    entry.node.renderGL(renderPass);
    entry.children.forEach((child) => {
      if (child.children.length > 0) {
        this.renderNode(child, renderPass);
      } else {
        child.node.renderGL(renderPass);
      }
    });
    entry.node.postRenderGL(renderPass);
  }
  shutdown() {
    const scene = this.scene;
    Off(scene, "update", this._updateListener);
    Off(scene, "render", this._renderListener);
    Off(scene, "shutdown", this._shutdownListener);
    RemoveChildren3D(this);
    Emit(this, World3DShutdownEvent, this);
    ResetWorld3DRenderData(this.renderData, 0);
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    Emit(this, DestroyEvent, this);
    ResetWorld3DRenderData(this.renderData, 0);
    this.events.clear();
    this.camera = null;
    this.renderData = null;
    this.events = null;
  }
};

// src/world3d/CreateWorld3DRenderData.ts
function CreateWorld3DRenderData(world3, camera) {
  return {
    world: world3,
    camera,
    gameFrame: 0,
    dirtyFrame: 0,
    numRendered: 0,
    numRenderable: 0
  };
}

// src/renderer/webgl1/glsl/AMBIENT_LIGHT_FRAG.ts
var AMBIENT_LIGHT_FRAG = `#define SHADER_NAME AMBIENT_LIGHT_FRAG

precision highp float;

uniform vec3 uLightPosition;
uniform vec3 uLightAmbient;
uniform vec3 uLightDiffuse;
uniform vec3 uLightSpecular;

uniform vec3 uMaterialAmbient;
uniform vec3 uMaterialDiffuse;
uniform vec3 uMaterialSpecular;
uniform float uMaterialShine;

uniform vec3 uCameraPosition;

uniform sampler2D uTexture;

varying vec2 vTextureCoord;
varying vec3 vNormal;
varying vec3 vPosition;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    vec3 ambient = uLightAmbient * uMaterialAmbient;

    vec3 norm = normalize(vNormal);
    vec3 lightDir = normalize(uLightPosition - vPosition);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = uLightDiffuse * (diff * uMaterialDiffuse);

    vec3 viewDir = normalize(uCameraPosition - vPosition);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), uMaterialShine);
    vec3 specular = uLightSpecular * (spec * uMaterialSpecular);

    vec3 result = (ambient + diffuse + specular) * color.rgb;

    gl_FragColor = vec4(result, color.a);
}`;

// src/renderer/webgl1/glsl/AMBIENT_LIGHT_VERT.ts
var AMBIENT_LIGHT_VERT = `
#define SHADER_NAME AMBIENT_LIGHT_VERT

precision highp float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uViewProjectionMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uNormalMatrix;

varying vec2 vTextureCoord;
varying vec3 vNormal;
varying vec3 vPosition;

void main(void)
{
    vTextureCoord = aTextureCoord;

    vPosition = vec3(uModelMatrix * vec4(aVertexPosition, 1.0));

    vNormal = vec3(uNormalMatrix * vec4(aVertexNormal, 1.0));

    gl_Position = uViewProjectionMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
}
`;

// src/renderer/webgl1/shaders/AmbientLightShader.ts
var AmbientLightShader = class extends Shader {
  constructor() {
    super();
    const tempMat4 = new Float32Array(16).fill(0);
    const tempVec3 = [0, 0, 0];
    const config = {
      fragmentShader: AMBIENT_LIGHT_FRAG,
      vertexShader: AMBIENT_LIGHT_VERT,
      attributes: {
        aVertexPosition: { size: 3, type: FLOAT, normalized: false, offset: 0 },
        aVertexNormal: { size: 3, type: FLOAT, normalized: false, offset: 12 },
        aTextureCoord: { size: 2, type: FLOAT, normalized: false, offset: 24 }
      },
      uniforms: {
        uViewProjectionMatrix: tempMat4,
        uNormalMatrix: tempMat4,
        uModelMatrix: tempMat4,
        uCameraPosition: tempVec3,
        uTexture: 0,
        uLightPosition: tempVec3,
        uLightAmbient: tempVec3,
        uLightDiffuse: tempVec3,
        uLightSpecular: tempVec3,
        uMaterialAmbient: tempVec3,
        uMaterialDiffuse: tempVec3,
        uMaterialSpecular: tempVec3,
        uMaterialShine: 0
      }
    };
    this.fromConfig(config);
  }
};

// src/camera3d/NewCamera3D.ts
var NewCamera3D = class {
  type;
  renderer;
  position;
  rotation;
  matrix;
  viewMatrix;
  projectionMatrix;
  viewProjectionMatrix;
  forward;
  up;
  right;
  start;
  aspect;
  isOrbit = false;
  minDistance = 0;
  maxDistance = Infinity;
  minPolarAngle = 0;
  maxPolarAngle = Math.PI;
  minAzimuthAngle = -Infinity;
  maxAzimuthAngle = Infinity;
  dirtyRender = true;
  panRate = 5;
  zoomRate = 200;
  rotateRate = -3;
  viewport;
  _fov;
  _near;
  _far;
  _yaw = 0;
  _pitch = 0;
  _roll = 0;
  constructor(fov = 45, near = 0.1, far = 1e3) {
    this._fov = fov;
    this._near = near;
    this._far = far;
    this.matrix = new Matrix4();
    this.viewMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.viewProjectionMatrix = new Matrix4();
    this.position = new Vec3Callback(() => this.update());
    this.rotation = new Quaternion();
    const game = GameInstance.get();
    const renderer = game.renderer;
    this.viewport = new Rectangle(0, 0, renderer.width, renderer.height);
    this.renderer = renderer;
    this.forward = Vec3Forward();
    this.up = Vec3Up();
    this.right = Vec3Right();
    this.start = new Vec3();
    this.setAspectRatio();
  }
  update() {
    const matrix2 = this.matrix;
    const view = this.viewMatrix;
    Mat4FromRotationXYTranslation(this.rotation, this.position, !this.isOrbit, matrix2);
    Vec3TransformMat4Zero(FORWARD, matrix2, this.forward);
    Vec3TransformMat4Zero(UP, matrix2, this.up);
    Vec3TransformMat4Zero(RIGHT, matrix2, this.right);
    Mat4Invert(matrix2, view);
    Mat4Multiply(this.projectionMatrix, view, this.viewProjectionMatrix);
    return this;
  }
  panX(amount) {
    const pos = this.position;
    if (!this.isOrbit) {
      Vec3ScaleAndAdd(pos, this.right, amount, pos);
    }
    return this;
  }
  panY(amount) {
    const pos = this.position;
    const up = this.up;
    if (this.isOrbit) {
      pos.y += up.y * amount;
    } else {
      Vec3ScaleAndAdd(pos, up, amount, pos);
    }
    return this;
  }
  panZ(amount) {
    const pos = this.position;
    if (this.isOrbit) {
      pos.z += amount;
    } else {
      Vec3ScaleAndAdd(pos, this.forward, amount, pos);
    }
    return this;
  }
  begin(x, y) {
    this.start.set(x, y);
  }
  pan(x, y) {
    const dx = x - this.start.x;
    const dy = y - this.start.y;
    const viewport = this.viewport;
    this.panX(-dx * (this.panRate / viewport.width));
    this.panY(dy * (this.panRate / viewport.height));
    this.start.set(x, y);
  }
  rotate(x, y) {
    const dx = x - this.start.x;
    const dy = y - this.start.y;
    const viewport = this.viewport;
    this.rotation.x += dy * (this.rotateRate / viewport.height);
    this.rotation.y += dx * (this.rotateRate / viewport.width);
    this.start.set(x, y);
    this.update();
  }
  zoom(delta) {
    this.panZ(Clamp(delta, -1, 1) * (this.zoomRate / this.viewport.height));
  }
  setAspectRatio(value) {
    if (!value) {
      const renderer = this.renderer;
      value = renderer.width / renderer.height;
    }
    this.aspect = value;
    return this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    Mat4Perspective(DegToRad(this._fov), this.aspect, this._near, this._far, this.projectionMatrix);
    return this;
  }
  get fov() {
    return this._fov;
  }
  set fov(value) {
    this._fov = Clamp(value, 0, 180);
    this.updateProjectionMatrix();
  }
  get near() {
    return this._near;
  }
  set near(value) {
    if (value > 0) {
      this._near = value;
      this.updateProjectionMatrix();
    }
  }
  get far() {
    return this._far;
  }
  set far(value) {
    if (value > 0) {
      this._far = value;
      this.updateProjectionMatrix();
    }
  }
  get yaw() {
    return this._yaw;
  }
  set yaw(value) {
    this._yaw = value;
    QuatRotationYawPitchRoll(value, this._pitch, this._roll, this.rotation);
  }
  get pitch() {
    return this._pitch;
  }
  set pitch(value) {
    this._pitch = value;
    QuatRotationYawPitchRoll(this._yaw, value, this._roll, this.rotation);
  }
  get roll() {
    return this._roll;
  }
  set roll(value) {
    this._roll = value;
    QuatRotationYawPitchRoll(this._yaw, this._pitch, value, this.rotation);
  }
};

// src/world3d/World3D.ts
var World3D = class extends BaseWorld3D {
  camera;
  light;
  shader;
  enableCameraCull = true;
  constructor(scene, x = 0, y = 0, z = 0, lightConfig) {
    super(scene);
    this.camera = new NewCamera3D();
    this.camera.position.set(x, y, z);
    this.light = new Light(lightConfig);
    this.shader = new AmbientLightShader();
    this.renderData = CreateWorld3DRenderData(this, this.camera);
  }
  renderGL(renderPass) {
    Flush(renderPass);
    const shader = this.shader;
    const camera = this.camera;
    const gl2 = renderPass.renderer.gl;
    SetShader(renderPass, shader, 0);
    shader.setUniform("uViewProjectionMatrix", camera.viewProjectionMatrix.data);
    shader.setUniform("uCameraPosition", camera.position.toArray());
    this.light.setUniforms(shader);
    gl2.enable(gl2.DEPTH_TEST);
    this.renderList.forEach((entry) => {
      if (entry.children.length > 0) {
        this.renderNode(entry, renderPass);
      } else {
        entry.node.renderGL(renderPass);
      }
    });
  }
  postRenderGL(renderPass) {
    const gl2 = renderPass.renderer.gl;
    gl2.disable(gl2.DEPTH_TEST);
    gl2.disable(gl2.CULL_FACE);
    PopShader(renderPass);
  }
};

// src/config/banner/GetBanner.ts
function GetBanner() {
  const { title, version, url, color, background } = ConfigStore.get(CONFIG_DEFAULTS.BANNER);
  if (title !== "") {
    const str = version !== "" ? title + " " + version : title;
    console.log(`%c${str}%c ${url}`, `padding: 4px 16px; color: ${color}; background: ${background}`, "");
  }
}

// src/config/globalvar/GetGlobalVar.ts
function GetGlobalVar() {
  return ConfigStore.get(CONFIG_DEFAULTS.GLOBAL_VAR);
}

// src/config/parent/GetParent.ts
function GetParent() {
  return ConfigStore.get(CONFIG_DEFAULTS.PARENT);
}

// src/config/renderer/GetRenderer.ts
function GetRenderer() {
  return ConfigStore.get(CONFIG_DEFAULTS.RENDERER);
}

// src/config/SetConfigDefaults.ts
function SetConfigDefaults() {
  SetBackgroundColor(0);
  SetBatchSize(4096);
  SetBanner("Phaser", "4.0.0", "https://phaser4.io");
  SetMaxTextures(0);
  SetDefaultOrigin(0.5, 0.5);
  SetSize(800, 600, 1);
  SetWebGLContext({
    antialias: true,
    desynchronized: true,
    preserveDrawingBuffer: true
  });
  SetWorldSize(512);
}

// src/Game.ts
var Game = class extends EventEmitter {
  id = addEntity(GameObjectWorld);
  VERSION = "4.0.0-beta1";
  isBooted = false;
  isPaused = false;
  willUpdate = true;
  willRender = true;
  lastTick = 0;
  elapsed = 0;
  frame = 0;
  renderer;
  textureManager;
  sceneManager;
  constructor(...settings) {
    super();
    GameInstance.set(this);
    SetConfigDefaults();
    DOMContentLoaded(() => this.boot(settings));
  }
  boot(settings) {
    settings.forEach((setting) => setting());
    const renderer = GetRenderer();
    this.renderer = new renderer();
    this.textureManager = new TextureManager();
    this.sceneManager = new SceneManager();
    const parent = GetParent();
    if (parent) {
      AddToDOM(this.renderer.canvas, parent);
    }
    const globalVar = GetGlobalVar();
    if (globalVar && window) {
      window[globalVar] = this;
    }
    this.isBooted = true;
    GetBanner();
    Emit(this, "boot");
    this.lastTick = performance.now();
    this.step(this.lastTick);
  }
  pause() {
    this.isPaused = true;
  }
  resume() {
    this.isPaused = false;
    this.lastTick = performance.now();
  }
  step(time) {
    const delta = time - this.lastTick;
    this.lastTick = time;
    this.elapsed += delta;
    const renderer = this.renderer;
    const sceneManager = this.sceneManager;
    if (!this.isPaused) {
      if (this.willUpdate) {
        sceneManager.update(delta, time, this.frame);
      }
      if (this.willRender) {
        sceneManager.preRender(this.frame);
        renderer.render(sceneManager.flush, sceneManager.scenes);
        sceneManager.flush = false;
      }
    }
    Emit(this, "step");
    this.frame++;
    GameInstance.setFrame(this.frame);
    GameInstance.setElapsed(this.elapsed);
    requestAnimationFrame((now) => this.step(now));
  }
  destroy() {
  }
};
export {
  animation_exports as Animation,
  camera_exports as Camera,
  camera3d_exports as Camera3D,
  color_exports as Color,
  config_exports as Config,
  dom_exports as DOM,
  device_exports as Device,
  display_exports as Display,
  display3d_exports as Display3D,
  events_exports as Events,
  Game,
  gameobjects_exports as GameObjects,
  gameobjects3d_exports as GameObjects3D,
  geom_exports as Geom,
  geom3d_exports as Geom3D,
  input_exports2 as Input,
  loader_exports as Loader,
  materials3d_exports as Materials3D,
  math_exports as Math,
  Scene,
  scenes_exports as Scenes,
  textures_exports as Textures,
  time_exports as Time,
  webgl1_exports as WebGL1,
  world_exports as World,
  world3d_exports as World3D
};
/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
/**
 * @author       Niklas von Hertzen (https://github.com/niklasvh/base64-arraybuffer)
 * @author       Richard Davey <rich@photonstorm.com>
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
