import firebase from "firebase";

export const FirebaseConfig = {
  apiKey: "AIzaSyAADy6SGLVKwImqYFgLOdXw1Ys7Sl8dUE0",
  authDomain: "rvrott-9225b.firebaseapp.com",
  projectId: "rvrott-9225b",
  storageBucket: "rvrott-9225b.appspot.com",
  messagingSenderId: "377175475913",
  appId: "1:377175475913:web:f033f379441e4ec4602f18",
  measurementId: "G-YGZ2XZS8WT",
};


export const firebase_app = firebase.initializeApp(FirebaseConfig);

export const recaptcha = (id) => {
  return new firebase.auth.RecaptchaVerifier(id, {
    size: "invisible",
  });
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const currentUser = firebase.auth().currentUser;

export const isSignEmailLink = (context) => {
  return firebase.auth().isSignInWithEmailLink(context);
};