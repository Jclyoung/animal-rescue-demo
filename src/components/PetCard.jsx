import React, { useState } from "react";
import "./PetCard.css";
import ViewPet from "./forms/ViewPet";

function PetCard({ pet }) {
  pet.img = pet.img ? pet.img : "horse-dog-cat.png";
  const {
    id,
    name,
    breed,
    description,
    age,
    petType,
    created,
    donationAmt,
    expOwner,
    img,
    isKidFriendly,
  } = pet;
  const [open, setOpen] = useState({ edit: false, view: false });

  function viewOnClick() {
    setOpen({ ...open, view: true });
  }

  const handleClose = () => {
    setOpen({ update: false, view: false });
  };

  return (
    <>
      <button className='card' onClick={viewOnClick}>
        <div className='card-inner'>
          <div className='card-front'>
            <img src={img} alt='Pet Avatar' className='front-img' />
            <h1>{name}</h1>
            <h2>Description</h2>
            <p className="front-description">{description}</p>
          </div>
          <div className='card-back'>
            <img src={img} alt='Avatar' className='back-img' />
            <h1>{name}</h1>
            <p>age: {age}</p>
            <p>Experienced Owner: {expOwner}</p>
            Description
            <p>{description}</p>
          </div>
        </div>
      </button>

      {open.view && <ViewPet onClose={handleClose} pet={pet} open={open} />}
    </>
  );
}

export default PetCard;
