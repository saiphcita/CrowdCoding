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

//extrallendo la informacion para Norma.
var refReport = db.ref("Report");
refAllUsers.on("value", (snapshot) => {
    let users = snapshot.val();
    var infoCosole = [];
    for (let i = 0; i < users.length; i++) {
        var seleccted = [];
        for (let j = 0; j < users[i].PostAndCategory.Post.length; j++) {
            if(users[i].PostAndCategory.Post[j].category !== "Select Category"){
                seleccted.push(users[i].PostAndCategory.Post[j].category)
            };
        };
        var infoArray = {
            "1-Worker": users[i].UserInfo.Username,
            "2-Post": users[i].PostAndCategory.Post,
            "3-Selected": seleccted.length+ " of "+users[i].PostAndCategory.Post.length,
            "4-State": users[i].UserState
        };
        infoCosole.push(infoArray);
    };
    refReport.set(infoCosole)
});