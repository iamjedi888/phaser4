import { SetBackgroundColor } from "./backgroundcolor/SetBackgroundColor";
import { SetBanner } from "./banner/SetBanner";
import { SetBatchSize } from "./batchsize/SetBatchSize";
import { SetDefaultOrigin } from "./defaultorigin/SetDefaultOrigin";
import { SetMaxTextures } from "./maxtextures/SetMaxTextures";
import { SetSize } from "./size/SetSize";
import { SetWebGLContext } from "./webglcontext/SetWebGLContext";
export function SetConfigDefaults() {
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
