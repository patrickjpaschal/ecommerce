import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA5Qx_HHuQCYq1gsdIQyl9pndGJ3Ravtwg",
  authDomain: "project-3-47646.firebaseapp.com",
  databaseURL: "https://project-3-47646.firebaseio.com",
  projectId: "project-3-47646",
  storageBucket: "project-3-47646.appspot.com",
  messagingSenderId: "485064614366",
  appId: "1:485064614366:web:6963a4efbfb2aaf9d23d4f",
  measurementId: "G-DBL17M2VGL"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Get a reference to the place in the database where the user is stored
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("error creating user", error.message);
    }
  }

  return getUserDocumentRef(userAuth.uid);
};

export const getUserDocumentRef = async uid => {
  if (!uid) return null;

  try {
    return firestore.doc(`users/${uid}`);
  } catch (error) {
    console.error("error fetching user", error.message);
  }
};

export default firebase;
