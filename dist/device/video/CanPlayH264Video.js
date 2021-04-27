import {CanPlayVideoType} from "./CanPlayVideoType";
export function CanPlayH264Video(videoElement) {
  return CanPlayVideoType('video/mp4; codecs="avc1.42E01E"', videoElement);
}
