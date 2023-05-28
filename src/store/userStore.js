import { makeAutoObservable } from "mobx";

class UserStore {
    userData = {};
    tracksData = [];
    isAuth = false;

    constructor(){
        makeAutoObservable(this)
    }

    setUser (userData){
        this.userData = userData
        this.isAuth = true;
    }
    logout (){
        this.userData = []
        this.isAuth = false;
    }
    setTracks (tracksData){
        this.tracksData = tracksData
    }
    
}

export default new UserStore;