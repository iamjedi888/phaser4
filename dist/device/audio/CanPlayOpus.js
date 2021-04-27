import {CanPlayAudioType} from "./CanPlayAudioType";
export function CanPlayOpus(audioElement) {
  return CanPlayAudioType('audio/ogg; codecs="opus"', audioElement) || CanPlayAudioType('audio/webm; codecs="opus"', audioElement);
}
