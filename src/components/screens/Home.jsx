import { useState } from "react";
import AddPet from "../forms/AddPet";
import { db } from "../../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import ReactPaginate from "react-paginate";
import PetCard from "../PetCard";
import "./Home.css";

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [petType, setPetType] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const perPage = 9;
  const offset = currentPage * perPage;
  const pageCount = Math.ceil(data.length / perPage);

  const filteredPets =
    petType !== "" ? data.filter((d) => d.petType === petType) : data;

  const currentPageData = filteredPets.slice(offset, offset + perPage);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  function renderPets(p) {
    return p.map((x, i) => <PetCard key={i} pet={x} />);
  }

  function getPets() {
    if (loading === true) {
      const q = query(collection(db, "pets"));
      try {
        onSnapshot(q, (snapshot) => {
          setData(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name,
              img: doc.data().img,
              petType: doc.data().petType,
              breed: doc.data().breed,
              age: doc.data().age,
              expOwner: doc.data().expOwner,
              donationAmt: doc.data().donationAmt,
              description: doc.data().description,
              isKidFriendly: doc.data().isKidFriendly,
            }))
          );
        });
        console.log(data);
        setLoading(false);
      } catch (err) {
        alert(err);
      }
    }
  }

  getPets();

  // if (!isLoading && data.length === 0) return <PageNotFound />;

  return (
    <>
      {console.log(data)}
      <label className='filter-pets' for='petType'>
        Filter by Type:
      </label>
      <select
        className='filter-pets'
        id='petType'
        value={petType}
        onChange={(e) => setPetType(e.target.value)}
      >
        <option>All Pet Types</option>
        <option value='dog'>Dog</option>
        <option value='cat'>Cat</option>
        <option value='horse'>Horse</option>
        <option value='donkey'>Donkey</option>
        <option value='bird'>Bird</option>
        <option value='other'>Other</option>
      </select>
      <button className='add-pet' onClick={() => setOpenAddModal(true)}>
        Add Pet +
      </button>
      <div className='home-container'>
        {petType && <h2>Found {filteredPets.length} items</h2>}
        {renderPets(currentPageData)}
        {openAddModal && (
          <AddPet onClose={() => setOpenAddModal(false)} open={openAddModal} />
        )}
        <div className='home'>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </>
  );
}
export default Home;
