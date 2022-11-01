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
