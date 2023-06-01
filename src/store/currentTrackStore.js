import { makeAutoObservable } from "mobx";

class TrackStore {
  currentTrack = {};
  isPlaying = false;
  repeat = false;
  currentTime = 0;
  playerActive = false;

  constructor() {
    makeAutoObservable(this);
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
  }

  toggleRepeat() {
    this.repeat = !this.repeat;
  }

  setCurrentTrack(currentTrack) {
    this.currentTrack = currentTrack;
    this.playerActive = true;
    this.isPlaying = true;
  }
  setCurrentTime(time) {
    this.currentTime = time;
  }
}

export default new TrackStore();
