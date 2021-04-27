import {CanPlayAudioType} from "./CanPlayAudioType";
export function CanPlayOGG(audioElement) {
  return CanPlayAudioType('audio/ogg; codecs="vorbis"', audioElement);
}
