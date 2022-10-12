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
  doc,
  addDoc,
  getDocs,
  updateDoc,
  setDoc,
  query,
  collection,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-zhnAaBmMCrbLxNW0kIU7_9vxz7O5YMQ",
  authDomain: "animal-rescue-demo.firebaseapp.com",
  projectId: "animal-rescue-demo",
  storageBucket: "animal-rescue-demo.appspot.com",
  messagingSenderId: "512803051694",
  appId: "1:512803051694:web:65d94fae2be7688dbff53f",
  measurementId: "G-HKW8Q9DNP6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

async function fetchFirebaseUsers(uid) {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const data = await getDocs(q).docs[0].data();
    return data.displayName;
  } catch (err) {
    console.error(err);
    alert("An error occurred while fetching user data");
  }
}

async function signInWithGoogle() {
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
}

async function logInWithEmailAndPassword(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

async function registerWithEmailAndPassword(name, email, password) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      name,
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

async function sendPasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

async function logout() {
  await signOut(auth);
}

async function addPet(p) {
  const {
    name,
    img,
    petType,
    breed,
    age,
    expOwner,
    description,
    isKidFriendly,
    donationAmt,
  } = p;
  try {
    await addDoc(collection(db, "pets"), {
      name,
      img,
      age,
      petType,
      breed,
      isKidFriendly,
      expOwner,
      description,
      donationAmt,
      created: Date.now(),
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

async function updatePet(p) {
  const {
    name,
    img,
    petType,
    breed,
    age,
    expOwner,
    description,
    isKidFriendly,
    donationAmt,
  } = p;
  try {
    const petDocRef = doc(db, "pets", p.id);
    await updateDoc(petDocRef, {
      name,
      img,
      petType,
      breed,
      age,
      expOwner,
      donationAmt,
      description,
      isKidFriendly,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
}

export {
  auth,
  db,
  fetchFirebaseUsers,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  addPet,
  updatePet,
};
