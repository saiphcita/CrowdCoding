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
var refJsonNorma = db.ref("JsonNorma");
refAllUsers.on("value", (snapshot) => {
    let users = snapshot.val();
    var infoCosole = [];
    for (let i = 0; i < users.length; i++) {
        var postArray = [];
        var seleccted = [];
        for (let j = 0; j < users[i].PostAndCategory.Post.length; j++) {
            var infoPost = {
                "1-post": users[i].PostAndCategory.Post[j].post, 
                "2-category":  users[i].PostAndCategory.Category[users[i].PostAndCategory.Post[j].category]
            };
            postArray.push(infoPost);
            if(Number(users[i].PostAndCategory.Post[j].category) !== 0){
                seleccted.push(users[i].PostAndCategory.Post[j].category)
            };
        };
        var infoArray = {
            "1-Trabajador": users[i].UserInfo.Username,
            "2-Post": postArray,
            "3-Seleccionados": seleccted.length+ " de 185",
            "4-Estado": users[i].UserState
        };
        infoCosole.push(infoArray);
    };
    refJsonNorma.set(infoCosole)
});