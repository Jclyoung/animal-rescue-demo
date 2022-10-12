// import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";
// import { auth, db, logout } from "../services/firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";

// function Dashboard() {
//   const [user, loading] = useAuthState(auth);
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   const fetchUserName = async () => {
//     try {
//       const q = query(collection(db, "users"), where("uid", "==", user?.uid));
//       const doc = await getDocs(q);
//       const data = doc.docs[0].data();

//       setName(data.name);
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred while fetching user data");
//     }
//   };

//   useEffect(() => {
//     if (loading) return;
//     if (!user) return navigate("/");

//     fetchUserName();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user, loading]);

//   return (
//     <div className="dashboard">
//       <div className="dashboard-container">
//         Logged in as
//         <div>{name}</div>
//         <div>{user?.email}</div>
//         <button className="dashboard-btn" onClick={logout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import "firebase/firestore";
import firebase from "./firebase";

const db = firebase.firestore();
const itemsCollection = db.collection("pets");

export const bulkUpdate = async () => {
  const limit = 50;
  let allItemsResult = await itemsCollection.limit(limit).get();
  let read = allItemsResult.docs.length;

  while (read > 0) {
    const batch = db.batch();
    let updated = 0;

    allItemsResult.docs.forEach((queryResult) => {
      const doc = queryResult.data();

      if (!doc.img) {
        updated++;

        batch.update(queryResult.ref, {
          // getTime() returns milliseconds
          // We convert to seconds and remove any fractional part
          img: "",
        });
      }
    });

    await batch.commit();
    console.log(`Updated ${updated} of ${read} items!`);

    const lastVisible = allItemsResult.docs[read - 1];
    allItemsResult = await itemsCollection
      .startAfter(lastVisible)
      .limit(limit)
      .get();
    read = allItemsResult.docs.length;
  }
};
