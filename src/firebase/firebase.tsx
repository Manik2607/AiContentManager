import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBporJm3rgHN-X8sSItpx-F3vU5zuFITCo",
  authDomain: "cms-neo-hackathon.firebaseapp.com",
  projectId: "cms-neo-hackathon",
  storageBucket: "cms-neo-hackathon.appspot.com",
  messagingSenderId: "480654025672",
  appId: "1:480654025672:web:a8ef678c84719aa15756fd",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
