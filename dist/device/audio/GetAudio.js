import {CanPlayM4A} from "./CanPlayM4A";
import {CanPlayMP3} from "./CanPlayMP3";
import {CanPlayOGG} from "./CanPlayOGG";
import {CanPlayOpus} from "./CanPlayOpus";
import {CanPlayWAV} from "./CanPlayWAV";
import {CanPlayWebM} from "./CanPlayWebM";
import {HasAudio} from "./HasAudio";
import {HasWebAudio} from "./HasWebAudio";
export function GetAudio() {
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
