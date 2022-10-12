import {useState, useEffect} from "react";
import AddPet from "../forms/AddPet";
import { db } from "../../firebase";
import {collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ReactPaginate from 'react-paginate';
import PetCard from '../PetCard';
import "./Home.css";
import PageNotFound from "./PageNotFound";

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [open, setOpen] = useState({edit: false, view: false})
  const [type, setType] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false)
  const perPage = 9;
  const offset = currentPage * perPage;
  const pageCount = Math.ceil(data.length / perPage);
  
  const filteredPets = type
  ? data.filter((d) => d.type === type)
  : data;

  const currentPageData = filteredPets.slice(
    offset, 
    offset + perPage
  );
  
  function handlePageClick({ selected: selectedPage }){
    setCurrentPage(selectedPage);
  };
  
  function renderPets(p) {
    return (
      p.map((x, i )=> 
      <PetCard key={i} pet={x} />
      ) 
    )
  };
    
    useEffect(() => {
      function getPets() {
        const q = query(collection(db, "pets"), orderBy("created", "desc"));
        onSnapshot(q, (snapshot) => {
         let d = snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
          console.log(d)
        })
      }
      getPets();
    },[data]);
    
  if (data.length === 0) return <PageNotFound/>;


  return (
    <>
      <label className="filter-pets" htmlFor="Type">Filter by Type:</label>{" "}
        <select
          className="filter-pets"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>All Pet Types</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="horse">Horse</option>
          <option value="donkey">Donkey</option>
          <option value="bird">Bird</option>
          <option value="other">Other</option>
        </select>
        <button  className="add-pet"
          onClick={() => setOpenAddModal(true)} >
          Add Pet +
        </button>
    <div className="home-container">
        {type && <h2>Found {filteredPets.length} items</h2>}
       {renderPets(currentPageData)}
       {openAddModal &&
        <AddPet onClose={() => setOpenAddModal(false)} onClick={() => setOpen({...open, view: true})} />
      }
      <div className="home">
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
  )
};
export default Home;