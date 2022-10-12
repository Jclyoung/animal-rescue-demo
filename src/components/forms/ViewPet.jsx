import Modal from "./Modal"
import React, {useState} from 'react' 
import {db} from "../../firebase"
import { deleteDoc, doc } from "firebase/firestore"
import UpdatePet from "./UpdatePet"
import './viewPet.css'

function ViewPet({onClose, pet}) {
  const [open, setOpen] = useState({update:false})
  const handleClose = () => {
    setOpen({update:false})
  }
  const handleDelete = async () => {
    const petDocRef = doc(db, 'pets', pet.id)
    try{
      await deleteDoc(petDocRef)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal modalLabel='Pet Information' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{pet.name}</h2>
        <p>{pet.description}</p>
        <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, update : true})}>
              Edit
            </button>
            <button className='task__deleteButton' onClick={handleDelete}>Delete</button>
          </div>
          {open.update &&
        <UpdatePet 
          onClose={handleClose} 
          toEditTitle={pet.name} 
          toEditDescription={pet.description} 
          open={open.update}
          pet={pet} />
      }
      </div>
    </Modal>
  )
}

export default ViewPet
