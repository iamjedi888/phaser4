import {CanPlayAudioType} from "./CanPlayAudioType";
export function CanPlayMP3(audioElement) {
  return CanPlayAudioType('audio/mpeg; codecs="mp3"', audioElement);
}
