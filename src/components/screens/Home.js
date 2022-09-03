import {useState, useEffect} from "react";
import { collection, getDocs, query } from "firebase/firestore";
import ReactPaginate from 'react-paginate';
import PetCard from '../PetCard';
import { db } from "../../firebase";
// import fetchPets from "../../fakeDb/testingDb";
import "./Home.css";
import fetchPets from "../../fakeDb/testingDb";

function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const perPage = 3;
  const offset = currentPage * perPage;
  const currentPageData = data.slice(
    offset, 
    offset + perPage
    );
    const pageCount = Math.ceil(data.length / perPage);
    useEffect(() => {
      const fetchPets = async () => {
        try {
          const q = query(collection(db, "pets"));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setData(data)
        } catch (err) {
          console.error(err);
          alert("An error occurred while fetching user data");
        }
      };
      fetchPets()
    }, []);

  function handlePageClick({ selected: selectedPage }){
    setCurrentPage(selectedPage);
  }

  return (
    <div className="home">
      <img src="src/screens/bg.png" alt="horse dog cat" className="bg" />
      {currentPageData.map((x, i )=> 
        <PetCard key={i} props={x} ></PetCard>)}
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
  )
}
export default Home;