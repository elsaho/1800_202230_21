//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCZnEp9OBoOvKLwH47LlRS7hCprrmG5r7Y",
    authDomain: "connectride-fe3ee.firebaseapp.com",
    projectId: "connectride-fe3ee",
    storageBucket: "connectride-fe3ee.appspot.com",
    messagingSenderId: "358086991102",
    appId: "1:358086991102:web:cc63b9f44dea78041359af"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();