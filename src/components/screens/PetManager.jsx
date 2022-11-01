import "./petManager.css";
import Task from "./Task";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import AddPet from "./AddPet";
import PetCard from "../PetCard";

function PetManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [pets, setPets] = useState([]);

  /* function to get all pets from firestore in realtime */
  useEffect(() => {
    const petColRef = query(collection(db, "pets"), orderBy("created", "desc"));
    onSnapshot(petColRef, (snapshot) => {
      setPets(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className='petManager'>
      <header>Pet Manager</header>
      <div className='petManager_container'>
        <button onClick={() => setOpenAddModal(true)}>Add pet +</button>
        <div className='petManager_pets'>
          {pets.map((pet) => (
            <PetCard
              id={pet.id}
              key={pet.id}
              completed={pet.data.completed}
              title={pet.data.title}
              description={pet.data.description}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddPet onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
  );
}

export default PetManager;
