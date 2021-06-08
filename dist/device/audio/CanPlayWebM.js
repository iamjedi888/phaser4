import { CanPlayAudioType } from "./CanPlayAudioType";
export function CanPlayWebM(audioElement) {
  return CanPlayAudioType('audio/webm; codecs="vorbis"', audioElement);
}
