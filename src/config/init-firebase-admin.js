/**
 * Created by Mb
 */

var admin = require("firebase-admin");

var serviceAccount = require("./efs-app-37e70-firebase-adminsdk-2nea9-aae7bc0b6a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: "https://efs-app-37e70.firebaseio.com"
});
