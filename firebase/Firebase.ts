import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyADwc1hU_Y02Z5RqbUfiCYBZXH4Djy838c",
  authDomain: "goat-test-c1aac.firebaseapp.com",
  projectId: "goat-test-c1aac",
  storageBucket: "goat-test-c1aac.appspot.com",
  messagingSenderId: "1070464133362",
  appId: "1:1070464133362:web:36e5ecb9bc609b69b2486b",
};

// const app = initializeApp(firebaseConfig)

const fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();
