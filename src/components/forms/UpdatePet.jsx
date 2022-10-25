import Modal from "./Modal";
import { useState } from "react";
import "./updatePet.css";
import { updatePet } from "../../firebase";

function UpdatePet({ onClose, pet }) {
  const [updatePetInfo, setUpdatePetInfo] = useState(pet);
  console.log(pet);

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await updatePet(updatePetInfo);
      onClose();
    } catch (err) {
      alert(err);
    }
  }

  function handleUpdateChange(e) {
    setUpdatePetInfo({ ...updatePetInfo, [e.target.name]: e.target.value });
  }

  return (
    <Modal
      modalLabel='Pet Information Update Form'
      onClose={onClose}
      open={true}
    >
      <form className='update-pet' onSubmit={handleUpdate}>
        <input
          type='text'
          name='name'
          placeholder='Pet Name'
          value={updatePetInfo.name}
          onChange={handleUpdateChange}
        />
        <input
          type='number'
          name='age'
          placeholder='Pet Age'
          value={updatePetInfo.age}
          onChange={handleUpdateChange}
        />
        <section>
          <label for='petType'>Select Pet Type</label>
          <select
            name='petType'
            value={updatePetInfo.petType}
            onChange={handleUpdateChange}
          >
            <option value='dog'>Dog</option>
            <option value='cat'>Cat</option>
            <option value='horse'>Horse</option>
            <option value='donkey'>Donkey</option>
            <option value='bird'>Bird</option>
            <option value='other'>Other</option>
          </select>
        </section>
        <section>
          <label for='expOwner'>Experienced Owner: </label>
          <select
            name='expOwner'
            value={updatePetInfo.expOwner}
            onChange={handleUpdateChange}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </section>
        <section>
          <label for='isKidFriendly'>Child Friendly: </label>
          <select
            name='isKidFriendly'
            value={updatePetInfo.isKidFriendly}
            onChange={handleUpdateChange}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </section>
        <textarea
          onChange={handleUpdateChange}
          name='description'
          placeholder='Enter Pet description'
          value={updatePetInfo.description}
        ></textarea>
        <section>
          <button type='submit'>Submit Update</button>
        </section>
      </form>
    </Modal>
  );
}

export default UpdatePet;
