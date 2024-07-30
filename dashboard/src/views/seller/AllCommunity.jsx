import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination";
import Search from "../components/Search";

import {
  get_communities,
  delete_community,
} from "../../store/Reducers/communityReducer";

const AllCommunity = () => {
  const dispatch = useDispatch();
  const { totalProduct } = useSelector((state) => state.product);
  const { communities, successMessage, errorMessage, loader } = useSelector(
    (state) => state.community
  );

  console.log("cooooooooooo", communities);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    if (successMessage || errorMessage) {
      dispatch(get_communities());
    }
  }, [successMessage, errorMessage, dispatch]);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_communities(obj));
  }, [searchValue, currentPage, parPage, dispatch]);

  const handleDelete = (id) => {
    dispatch(delete_community(id));
  };

  return (
    <div>
      <div className="px-2 lg:px-7 pt-5 ">
        <div className="w-full p-4 bg-[#283046] rounded-md">
          <Search
            setParPage={setParPage}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
          <div className="relative overflow-x-auto mt-5">
            <table className="w-full text-sm text-left text-[#d0d2d6]">
              <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                <tr>
                  <th scope="col" className="py-3 px-4">
                    No
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Image
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {communities.map((d, i) => (
                  <tr key={i}>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {i + 1}
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <img className="w-[45px] h-[45px]" src={d.image} alt="" />
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <span>{d?.name?.slice(0, 16)}...</span>
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <div className="flex justify-start items-center gap-4">
                        <Link className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                          <FaEdit />
                        </Link>
                        <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                          <FaEye />
                        </Link>
                        <button
                          className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                          onClick={() => handleDelete(d._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalProduct <= parPage ? (
            ""
          ) : (
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                parPage={parPage}
                showItem={4}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCommunity;
