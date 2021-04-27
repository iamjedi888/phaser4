import {CanPlayAudioType} from "./CanPlayAudioType";
export function CanPlayWAV(audioElement) {
  return CanPlayAudioType('audio/wav; codecs="1"', audioElement);
}
