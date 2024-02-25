// import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyBIEvyizyyY46yhWg9UUJweqNM37Nv3JfI",
//   authDomain: "quiz-nextjs-6cf08.firebaseapp.com",
//   databaseURL: "https://quiz-nextjs-6cf08-default-rtdb.firebaseio.com",
//   projectId: "quiz-nextjs-6cf08",
//   storageBucket: "quiz-nextjs-6cf08.appspot.com",
//   messagingSenderId: "71412361004",
//   appId: "1:71412361004:web:91c0d363126220a83b2e89",
//   measurementId: "G-TY8J089JTP"
// };

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA00QHh-m7KoN3ZVy7X_h-NogZ28oVhILk",
  authDomain: "quiz-app-a812c.firebaseapp.com",
  projectId: "quiz-app-a812c",
  storageBucket: "quiz-app-a812c.appspot.com",
  messagingSenderId: "1061073762577",
  appId: "1:1061073762577:web:caf0685403a33667f0f4b0",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
