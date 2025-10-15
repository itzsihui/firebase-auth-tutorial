import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDIXJ5YT7hoNbBFqK3TBcV41-TzIO-7n7w",
//   authDomain: "fir-auth-6edd8.firebaseapp.com",
//   projectId: "fir-auth-6edd8",
//   storageBucket: "fir-auth-6edd8.appspot.com",
//   messagingSenderId: "904760319835",
//   appId: "1:904760319835:web:44fd0d957f114b4e51447e",
//   measurementId: "G-Q4TYKH9GG7",
// };

const firebaseConfig = {
  apiKey: "AIzaSyA7up677ZI2u3z7qVwaI4bfHg86qIEmnTg",
  authDomain: "tutorial6-9e3d1.firebaseapp.com",
  projectId: "tutorial6-9e3d1",
  storageBucket: "tutorial6-9e3d1.firebasestorage.app",
  messagingSenderId: "748340777225",
  appId: "1:748340777225:web:27be53c0a85efa9b5003d8",
  measurementId: "G-5LN1E7S55L"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCfDyRlVfD4LXDiEAhqRdmnO4uHQDh6HSE",
//   authDomain: "sample-47bf7.firebaseapp.com",
//   projectId: "sample-47bf7",
//   storageBucket: "sample-47bf7.appspot.com",
//   messagingSenderId: "677920709463",
//   appId: "1:677920709463:web:b8b1cff8f134c6c6c2fc12"
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
