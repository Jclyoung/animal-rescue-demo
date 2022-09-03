import { Link } from "react-router-dom";
import routes from "../routes"
import "./Header.css";

function Header(){
  return (
    <>
      <div className="header">
        <img src="icon.png" alt="horse dog cat" className="logo" />
        <div className="header-right nav">
          {routes.filter(r => r.isNav).map(r => 
            <Link className="routes" key={r.title} to={r.path}>{r.title}</Link>)
          }
        </div>
      </div>
    </>
  )
}
export default Header;

















// import { useState, useEffect } from "react"
// // import ReactPaginate from 'react-paginate';
// import card from '../components/card'
// import './Home.css'

// const Home = () =>
// {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [data, setData] = useState([]);

//   const PER_PAGE = 3;
//   const offset = currentPage * PER_PAGE;
//   const currentPageData = data
//     .slice(offset, offset + PER_PAGE)
//   const pageCount = Math.ceil(data.length / PER_PAGE);

//   function handlePageClick({ selected: selectedPage })
//   {
//     setCurrentPage(selectedPage);
//   }
//   //TODO REFACTOR
//   return (<>

//     <div className="container">
//       <div className="row">
//         {currentPageData.map(p =>
//           <div className='col-md-4 py-3' key={product.id}>
//             HOME HOME HOME HOME
//           </div>
//         )}
//       </div>
//     </div>

//     <ReactPaginate
//       previousLabel={"previous"}
//       nextLabel={"next"}
//       breakLabel={"..."}
//       breakClassName={"break-me"}
//       pageCount={pageCount}
//       onPageChange={handlePageClick}
//       containerClassName={"pagination"}
//       subContainerClassName={"pages pagination"}
//       activeClassName={"active"}
//     />

//   </>)
// }
// export default Home