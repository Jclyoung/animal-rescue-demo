import Modal from "./Modal"
import {useState} from 'react'
import './AddPet.css'
import {addPet} from '../../firebase'

function AddPet({onClose, open}) {

  const [petInfo, setPetInfo] = useState({
    img: '',
    name: '',
    age: '',
    petType: '',
    isKidFriendly: '',
    expOwner: '',
    description: '',
    donationAmt: '',
    breed: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPet(petInfo)
      onClose()
    } catch (err) {
      alert(err)
    };
  };

  function handleChange(e){
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  };

  return (
    <Modal modalLabel='Pet Information Form' onClose={onClose} open={open}>
        <form className="addPet" onSubmit={handleSubmit}> 
          <input
            type="text"
            name="name"
            placeholder="Pet Name"
            value={petInfo.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Pet Age"
            value={petInfo.age}
            onChange={handleChange}
          />
        <section>
        <label for="petType">Select Pet Type</label>
        <select
          name="petType"
          value={petInfo.petType}
          onChange={handleChange}
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
          <input className="add-pet-radio" type="radio" id="expTrue" name="expOwner" value={true}/>
          <label for="expTrue">True</label>
          <input className="add-pet-radio" type="radio" id="expFalse" name="expOwner" value={false}/>
          <label for="expFalse">False</label>
        </section>
        <section>
          <span>Good With Kids:    </span>
          <input className="add-pet-radio" type="radio" id="kidTrue" name="isKidFriendly" value={true}/>
          <label for="expTrue">True</label>
          <input className="add-pet-radio" type="radio" id="kidFalse" name="isKidFriendly" value={false}/>
          <label for="expFalse">False</label>
        </section>
        <textarea 
          onChange={handleChange}
          name="description"
          placeholder='Enter Pet description'
          value={petInfo.description}></textarea>
        <section>
          <button type='submit'>Submit Pet</button>
        </section>
      </form>
    </Modal>
  )
}

export default AddPet
