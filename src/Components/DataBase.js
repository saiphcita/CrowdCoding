import firebase  from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAYStRsZqUp9u5d6uJE2qXEa1A_0QsilWk",
    authDomain: "crowd-codding.firebaseapp.com",
    databaseURL: "https://crowd-codding.firebaseio.com",
    projectId: "crowd-codding",
    storageBucket: "crowd-codding.appspot.com",
    messagingSenderId: "852929625643"
};
const app = firebase.initializeApp(config);
const db = app.database()

var refGeneralCategory = db.ref("CategoryAndPost/Category");
var refGeneralPosts = db.ref("CategoryAndPost/Post");
var refAllUsers = db.ref("Users");

//example user
var dbUser = db

export { refGeneralCategory, refGeneralPosts, refAllUsers, dbUser}