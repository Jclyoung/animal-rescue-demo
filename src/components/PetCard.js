import "./PetCard.css";

function PetCard(p) {
  return (
    <button class="card" onClick={(() => {})}>
    <div class="card-inner">
      <div class="card-front">
        <img src={p.img} alt="Pet Avatar" style={{width: "300px", height: "auto"}} />
        <h1>{p.name}</h1>
        <p class="title">{p.breed}</p>
        <p>Description</p>
        <p>{p.description}</p>
      </div>
      <div class="card-back">
      <img src={p.img} alt="Avatar" style={{width: "150px", height: "auto"}} />
        <h1>{p.name}</h1>
        <p>{p.age}</p>
        <p>{p.expOwner}</p>
        <p>{p.description}</p>
      </div>
    </div>
  </button>
  );
}

export default PetCard;