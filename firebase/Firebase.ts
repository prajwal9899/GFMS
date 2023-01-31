import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDirwgyIiweBSBMDCTzrA4gHfpr0xfexxU",
  authDomain: "goat-test-c849d.firebaseapp.com",
  projectId: "goat-test-c849d",
  storageBucket: "goat-test-c849d.appspot.com",
  messagingSenderId: "183005596852",
  appId: "1:183005596852:web:7e327e15b82717ceeb5be1"
};

// const app = initializeApp(firebaseConfig)

const fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();
