import "./PetCard.css";

function PetCard({ pet }) {
  if (pet.img === "") pet.img = "horse-dog-cat.png";
  const {
    id,
    name,
    description,
    age,
    type,
    created,
    donationAmt,
    expOwner,
    img,
    isKidFriendly,
  } = pet;
  console.log("PETCARD", pet);
  return (
    <>
    <button className='card' onClick={() => {}}>
      <div className='card-inner'>
        <section className='card-front'>
      <button className='add-button' onClick={() => console.log(`Added donation for ${name} to cart`)}>
        <p>Donate</p>
      </button>
          <img src={img} alt='Pet Avatar' className='front-img' />
          <h1>{name}</h1>
          <p>Description</p>
          <p>{description}</p>
        </section>
        <div className='card-back'>
          <img src={img} alt='Avatar' className='back-img' />
          <button className='add-button' onClick={() => console.log(`Added donation for ${name} to cart`)}>
            <p>Donate</p>
          </button>
          <h1>{name}</h1>
          <p>age: {age}</p>
          <p>Experienced Owner: {expOwner}</p>
          Description
          <p>{description}</p>
        </div>
      </div>
    </button>
    </>
  );
}

export default PetCard;
