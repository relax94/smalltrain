import * as firebase from 'firebase'
import 'firebase/database';



let FirebaseSingleton = null;
export default class FirebaseService {
    constructor(config = this.getDefaultConfig()) {
        if (!FirebaseSingleton) {
            this.setConfig(config);
            this.init();
        }
        FirebaseSingleton = this;
        return FirebaseSingleton;
    }

    init() {
        firebase.initializeApp(this._config);
        this.db = firebase.database();
    }

    writeData(record) {
        this.db.ref('users/' + record.id).set(record);
    }

    subscribe(channelName, fn) {
        firebase.database().ref(channelName).on('value', function (snapshot) {
            fn(snapshot.val());
        });
    }

    setConfig(config) {
        this._config = config;
    }

    getDefaultConfig() {
        return {
            apiKey: 'AIzaSyB-c3IXwK6943BMNs4rQ1QSmewEiN5sY_k',
            authDomain: 'citytracker-26373.firebaseapp.com',
            databaseURL: 'https://citytracker-26373.firebaseio.com',
            storageBucket: 'citytracker-26373.appspot.com',
            messagingSenderId: '699029039624'
        }
    }
}