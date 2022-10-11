import "./petCard.css";

function PetCard({ pet }) {
  if (pet.img === "") pet.img = "horse-dog-cat.png";
  const {
    id,
    name,
    description,
    age,
    petType,
    created,
    donationAmt,
    expOwner,
    img,
    isKidFriendly,
  } = pet;

  return (
    <button className='card' onClick={() => {}}>
      <div className='card-inner'>
        <div className='card-front'>
          <img src={img} alt='Pet Avatar' className='front-img' />
          <h1>{name}</h1>
          <p>Description</p>
          <p>{description}</p>
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
  );
}

export default PetCard;
