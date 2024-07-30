import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import {
  add_community,
  delete_community,
  get_communities,
  messageClear,
} from "../../store/Reducers/communityReducer";

// ggggggggggggg

//

import Pagination from "../Pagination";
import Search from "../components/Search";
import { get_products } from "../../store/Reducers/productReducer";

const AddCommunity = () => {
  const dispatch = useDispatch();
  const { communities, successMessage, errorMessage, loader } = useSelector(
    (state) => state.community
  );

  const [state, setState] = useState({
    name: "",
    benefits: [""],
  });

  useEffect(() => {
    dispatch(get_communities());
  }, [dispatch]);

  console.log("addddddd", communities);

  const inputHandle = (e, index, field, type) => {
    const { name, value } = e.target;
    if (type === "benefits") {
      const updatedBenefits = [...state.benefits];
      updatedBenefits[index] = value;
      setState({ ...state, benefits: updatedBenefits });
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addBenefitPoint = () => {
    setState((prevState) => ({
      ...prevState,
      benefits: [...prevState.benefits, ""],
    }));
  };

  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [imageShow, setImageShow] = useState(null);

  const imageHandle = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setImageShow({ url: URL.createObjectURL(file) });
    }
  };

  const changeImage = (file) => {
    if (file) {
      setImage(file);
      setImageShow({ url: URL.createObjectURL(file) });
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageShow(null);
  };

  const addCommunity = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append community details
    formData.append("name", state.name);

    // Append benefits
    state.benefits.forEach((benefit, index) => {
      formData.append(`benefits[${index}]`, benefit);
    });

    // Append the single image
    if (image) {
      formData.append("image", image);
    }

    // Dispatch action to add community
    dispatch(add_community(formData));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        benefits: [""],
      });
      setImageShow([]);
      setImage("");
    }
  }, [successMessage, errorMessage, dispatch]);

  // ggggggggggggggg

  // const { products, totalProduct } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">
            Add Community
          </h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
            to="/seller/dashboard/communities"
          >
            Communities
          </Link>
        </div>
        <div>
          <form onSubmit={addCommunity}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Community Name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) => inputHandle(e, null, null, null)}
                  value={state.name}
                  type="text"
                  placeholder="Community name"
                  name="name"
                  id="name"
                />
              </div>
            </div>

            {/* Benefits Section */}
            <div className="flex flex-col mb-3 w-full text-[#d0d2d6]">
              <label htmlFor="benefits" className="my-5">
                Community Points
              </label>
              {state.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                    onChange={(e) =>
                      inputHandle(e, index, "benefits", "benefits")
                    }
                    value={benefit}
                    type="text"
                    placeholder={`Benefit ${index + 1}`}
                    name={`benefits-${index}`}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => {
                        const updatedBenefits = [...state.benefits];
                        updatedBenefits.splice(index, 1);
                        setState({ ...state, benefits: updatedBenefits });
                      }}
                    >
                      <IoCloseSharp />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="bg-green-500 text-white rounded-sm px-4 py-2 mt-2"
                onClick={addBenefitPoint}
              >
                Add Community Points
              </button>
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShow ? (
                <div className="h-[180px] relative">
                  <label htmlFor="image">
                    <img
                      className="w-full h-full rounded-sm"
                      src={imageShow.url}
                      alt=""
                    />
                  </label>
                  <input
                    onChange={(e) => changeImage(e.target.files[0])}
                    type="file"
                    id="image"
                    className="hidden"
                  />
                  <span
                    onClick={removeImage}
                    className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]"
                  htmlFor="image"
                >
                  <span>
                    <BsImages />
                  </span>
                  <span>Select Image</span>
                </label>
              )}
              <input
                onChange={imageHandle}
                className="hidden"
                type="file"
                id="image"
              />
            </div>

            <div className="flex">
              <button
                disabled={loader}
                className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Add Community"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* <div className="px-2 lg:px-7 pt-5 ">
          <div className="w-full p-4  bg-[#283046] rounded-md">
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
                        <img
                          className="w-[45px] h-[45px]"
                          src={d.image}
                          alt=""
                        />
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <span>{d?.name?.slice(0, 25)}...</span>
                      </td>

                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <div
                            className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                            onClick={dispatch(add_community(d._id))}
                          >
                            <FaEdit />
                          </div>
                          <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                            <FaEye />
                          </Link>
                          <button className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
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
        </div> */}
      </div>
    </div>
  );
};

export default AddCommunity;
