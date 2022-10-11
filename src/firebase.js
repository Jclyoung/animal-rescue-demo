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
  query,
  collection,
  onSnapshot,
  orderBy,
  where,
  Timestamp,
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

const fetchFirebaseUsers = async (uid) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    return data.displayName;
  } catch (err) {
    console.error(err);
    alert("An error occurred while fetching user data");
  }
};

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
      authProvider: "local",
      name,
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

// var tutorialsRef = firebase.firestore().collection("/tutorials");
// tutorialsRef.get().then(function(snapshot) {
//   vat tutorials = [];

//   snapshot.forEach(function(childSnapshot) {
//     var id = childSnapshot.id;
//     var data = childSnapshot.val();
//     // ...

//     tutorials.push({ id: id, title: data.title, description: data.description});
//   });
// });
const getPets = async () => {
  const q = query(collection(db, "pets"), orderBy("created", "desc"));
  onSnapshot(q, (querySnapshot) => {
    return querySnapshot.docs;
  });
};

const addPet = async (p) => {
  const {
    name,
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
      age,
      petType,
      breed,
      isKidFriendly,
      expOwner,
      description,
      donationAmt,
      created: Timestamp.now(),
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const updatePet = async (p) => {
  const {
    name,
    petType,
    breed,
    age,
    expOwner,
    description,
    isKidFriendly,
    donationAmt,
  } = p;
  const petDocRef = doc(db, "pets", p.id);
  try {
    await updateDoc(petDocRef, {
      name,
      petType,
      breed,
      age,
      expOwner,
      description,
      isKidFriendly,
      donationAmt,
    });
  } catch (err) {
    alert(err);
  }
};

export {
  auth,
  db,
  fetchFirebaseUsers,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getPets,
  addPet,
  updatePet,
};
