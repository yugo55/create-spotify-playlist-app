import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFp9fguv6rVy4Z8arGsipEC0KhFs1kAlw",
  authDomain: "spotify-create-playlist-app.firebaseapp.com",
  projectId: "spotify-create-playlist-app",
  storageBucket: "spotify-create-playlist-app.appspot.com",
  messagingSenderId: "277752625450",
  appId: "1:277752625450:web:9cc72d8aeee4c791e14653",
  measurementId: "G-0JM8H8PRML"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };