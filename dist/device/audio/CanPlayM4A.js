import {CanPlayAudioType} from "./CanPlayAudioType";
export function CanPlayM4A(audioElement) {
  return CanPlayAudioType("audio/x-m4a", audioElement) || CanPlayAudioType("audio/aac", audioElement);
}
