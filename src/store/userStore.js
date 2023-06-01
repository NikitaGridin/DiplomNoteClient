import { makeAutoObservable } from "mobx";

class UserStore {
  userData = {};
  tracksData = [];
  albumsData = [];
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(userData) {
    this.userData = userData;
    this.isAuth = true;
  }
  logout() {
    this.userData = [];
    this.isAuth = false;
  }
  setTracks(tracksData) {
    this.tracksData = tracksData;
  }
  setAlbums(albumsData) {
    this.albumsData = albumsData;
  }
}

export default new UserStore();
