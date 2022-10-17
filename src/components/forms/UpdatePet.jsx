import Modal from "./Modal"
import {useState} from 'react'
import './updatePet.css'
import {updatePet} from '../../firebase'

function UpdatePet({open, onClose, pet}) {
  const [updatePetInfo, setUpdatePetInfo] = useState(pet);
  console.log(pet)

  async function handleUpdate() {
    try{
      await updatePet(pet.id);
      onClose();
    } catch (err) {
      alert(err)
    };
  };


  function handleUpdateChange(e){
    setUpdatePetInfo({ ...updatePetInfo, [e.target.name]: e.target.value });
  };

  return (
    <Modal modalLabel='Pet Information Update Form' onClose={onClose} open={open}>
      <form className="updatePet" onSubmit={handleUpdate}> 
          <input
            type="text"
            name="name"
            placeholder="Pet Name"
            value={updatePetInfo.name}
            onChange={handleUpdateChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Pet Age"
            value={updatePetInfo.age}
            onChange={handleUpdateChange}
          />
        <section>
        <label for="petType">Select Pet Type</label>
        <select
          name="petType"
          value={updatePetInfo.petType}
          onChange={handleUpdateChange}
        >
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="horse">Horse</option>
          <option value="donkey">Donkey</option>
          <option value="bird">Bird</option>
          <option value="other">Other</option>
        </select>
        </section>
        <section>
          <span>Experienced Owner:    </span>
          <input className="update-pet-radio" type="radio" id="expTrue" name="expOwner" value={updatePetInfo.expOwner}/>
          <label for="expTrue">True</label>
          <input className="update-pet-radio" type="radio" id="expFalse" name="expOwner" value={updatePetInfo.expOwner}/>
          <label for="expFalse">False</label>
        </section>
        <section>
          <span>Good With Kids:    </span>
          <input className="update-pet-radio" type="radio" id="kidTrue" name="isKidFriendly" value={updatePetInfo.isKidFriendly}/>
          <label for="expTrue">True</label>
          <input className="update-pet-radio" type="radio" id="kidFalse" name="isKidFriendly" value={updatePetInfo.isKidFriendly}/>
          <label for="expFalse">False</label>
        </section>
        <textarea 
          onChange={handleUpdateChange}
          name="description"
          placeholder='Enter Pet description'
          value={updatePetInfo.description}></textarea>
        <section>
          <button type='submit'>Submit Update</button>
        </section>
      </form> 
    </Modal>
  )
}

export default UpdatePet;
