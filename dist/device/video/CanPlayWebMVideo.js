import { CanPlayVideoType } from "./CanPlayVideoType";
export function CanPlayWebMVideo(videoElement) {
  return CanPlayVideoType('video/webm; codecs="vp8, vorbis"', videoElement);
}
