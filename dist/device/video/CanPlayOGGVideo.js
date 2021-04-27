import {CanPlayVideoType} from "./CanPlayVideoType";
export function CanPlayOGGVideo(videoElement) {
  return CanPlayVideoType('video/ogg; codecs="theora"', videoElement);
}
