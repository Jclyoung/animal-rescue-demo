import {useState, useEffect} from "react";
// import { collection, getDocs, query } from "firebase/firestore";
// import { db } from "../../firebase";
import ReactPaginate from 'react-paginate';
import PetCard from '../PetCard';
import "./Home.css";
import fetchPets from "../../fakeDb/testingDb";
import PageNotFound from "./PageNotFound";

function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const perPage = 9;
  const offset = currentPage * perPage;
  const pageCount = Math.ceil(data.length / perPage);
  const [type, setType] = useState("");
  
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
  
  useEffect(() => {
    setData(fetchPets);
  },[]);

  function renderPets(p) {
    return (
      p.map((x, i )=> 
        <PetCard key={i} pet={x} ></PetCard>
      ) 
    )
  };

  if (data.length === 0) return <PageNotFound />;


  return (
    <>
      <label htmlFor="Type">Filter by Type:</label>{" "}
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Pet Types</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="horse">Horse</option>
        </select>
    <div className="home-container">
        {type && <h2>Found {filteredPets.length} items</h2>}
       {renderPets(currentPageData)}
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