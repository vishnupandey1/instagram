import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDWVQJxnLXBrklifbtXXpSHmmlCAv3WXcs",
    authDomain: "instagram-44c54.firebaseapp.com",
    databaseURL: "https://instagram-44c54.firebaseio.com",
    projectId: "instagram-44c54",
    storageBucket: "instagram-44c54.appspot.com",
    messagingSenderId: "664357736161"
};

export const firebaseApp = firebase.initializeApp(config);

export const tasksRef = firebase.database().ref('tasks');

export const userProfileRef = firebase.database();

export const storageRef =  firebase.storage().ref();