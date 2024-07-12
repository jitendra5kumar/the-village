import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { get_category } from "../../store/Reducers/categoryReducer";
import { add_product, messageClear } from "../../store/Reducers/productReducer";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.category);
  const { successMessage, errorMessage, loader } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );
  }, [dispatch]);

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
    weight: "",
    unit: "GM",
    ingredients: "",
    storageinfo: "",
    ingrediennts: "",
    benefits: [""],
    questions: [{ question: "", answer: "" }],
  });

  const inputHandle = (e, index, field, type) => {
    const { name, value } = e.target;
    if (type === "benefits") {
      const updatedBenefits = [...state.benefits];
      updatedBenefits[index] = value;
      setState({ ...state, benefits: updatedBenefits });
    } else if (type === "questions") {
      const updatedQuestions = [...state.questions];
      updatedQuestions[index][name] = value;
      setState({ ...state, questions: updatedQuestions });
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

  const addQuestionAnswerPair = () => {
    setState((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, { question: "", answer: "" }],
    }));
  };

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categorys);
    }
  };

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoShow, setVideoShow] = useState(null);

  const inmageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];

      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  const videoHandle = (e) => {
    const file = e.target.files[0];

    if (file) {
      setVideo(file);
      setVideoShow({ url: URL.createObjectURL(file) });
    }
  };

  const changeVideo = (vid) => {
    if (vid) {
      setVideo(vid);
      setVideoShow({ url: URL.createObjectURL(vid) });
    }
  };

  const removeVideo = () => {
    setVideo(null);
    setVideoShow(null);
  };

  useEffect(() => {
    setAllCategory(categorys);
  }, [categorys]);

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append basic product details
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("storageinfo", state.storageinfo);
    formData.append("ingrediennts", state.ingrediennts);
    formData.append("price", state.price);
    formData.append("stock", state.stock);
    formData.append("category", category);
    formData.append("discount", state.discount);
    formData.append("shopName", "Farid Fashion");
    formData.append("brand", state.brand);
    formData.append("weight", state.weight);
    formData.append("unit", state.unit);

    // Append benefits
    state.benefits.forEach((benefit, index) => {
      formData.append(`benefits[${index}]`, benefit);
    });

    // Append questions and answers
    state.questions.forEach((qa, index) => {
      formData.append(`questions[${index}][question]`, qa.question);
      formData.append(`questions[${index}][answer]`, qa.answer);
    });

    // Append ingredients (if you have it in state)
    if (state.ingredients) {
      formData.append("ingredients", state.ingredients);
    }

    // Append images
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    // Append video (if available)
    if (video) {
      formData.append("video", video);
    }

    // Dispatch action to add product
    dispatch(add_product(formData));
  };

  console.log("benefit", state.benefits);
  console.log("quetions", state.questions);

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
        description: "",
        storageinfo: "",
        ingrediennts: "",
        discount: "",
        price: "",
        brand: "",
        stock: "",
      });
      setImageShow([]);
      setImages([]);
      setCategory("");
      setVideoShow(null);
      setVideo(null);
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Add Product</h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
            to="/seller/dashboard/products"
          >
            Products
          </Link>
        </div>
        <div>
          <form onSubmit={add}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  placeholder="product name"
                  name="name"
                  id="name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Product brand</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  placeholder="product brand"
                  name="brand"
                  id="brand"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={category}
                  type="text"
                  placeholder="--select category--"
                  id="category"
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                    {allCategory.map((c, i) => (
                      <span
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          category === c.name && "bg-indigo-500"
                        }`}
                        onClick={() => {
                          setCateShow(false);
                          setCategory(c.name);
                          setSearchValue("");
                          setAllCategory(categorys);
                        }}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Stock</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.stock}
                  type="number"
                  min="0"
                  placeholder="product stock"
                  name="stock"
                  id="stock"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  placeholder="price"
                  name="price"
                  id="price"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="weight">Weight (Gm, KG)</label>
                <div className="flex">
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-l-md text-[#d0d2d6] flex-1"
                    onChange={inputHandle}
                    value={state.weight}
                    type="number"
                    placeholder="Weight"
                    name="weight"
                    id="weight"
                  />
                  <select
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-r-md text-[#d0d2d6]"
                    onChange={inputHandle}
                    value={state.unit}
                    name="unit"
                    id="unit"
                  >
                    <option value="GM">GM</option>
                    <option value="KG">KG</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  min="0"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  placeholder="%discount%"
                  name="discount"
                  id="discount"
                />
              </div>
            </div>
            {/* Benefits Section */}
            <div className="flex flex-col mb-3 w-full text-[#d0d2d6]">
              <label htmlFor="benefits">Product Benefits</label>
              {state.benefits &&
                state.benefits.map((be, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      onChange={(e) =>
                        inputHandle(e, index, "benefits", "benefits")
                      }
                      value={be.benefit}
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
                Add Benefit
              </button>
            </div>

            {/* Questions Section */}
            <div className="flex flex-col mb-3 w-full text-[#d0d2d6]">
              <label htmlFor="questions">Product Questions</label>
              {state.questions &&
                state.questions.map((qa, index) => (
                  <div key={index} className="flex flex-col gap-2 mb-2">
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      onChange={(e) =>
                        inputHandle(e, index, "questions", "questions")
                      }
                      value={qa.question}
                      type="text"
                      placeholder={`Question ${index + 1}`}
                      name="question"
                    />
                    <textarea
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] w-full"
                      onChange={(e) =>
                        inputHandle(e, index, "questions", "questions")
                      }
                      value={qa.answer}
                      placeholder={`Answer ${index + 1}`}
                      name="answer"
                      rows="3"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="text-red-500 self-end"
                        onClick={() => {
                          const updatedQuestions = [...state.questions];
                          updatedQuestions.splice(index, 1);
                          setState({ ...state, questions: updatedQuestions });
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
                onClick={addQuestionAnswerPair}
              >
                Add Question
              </button>
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="ingrediennts">INGREDIENTS</label>
              <textarea
                rows={4}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.ingrediennts}
                placeholder="Ingredients"
                name="ingrediennts"
                id="ingrediennts"
              ></textarea>
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="storageinfo">Storage Information</label>
              <textarea
                rows={4}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.storageinfo}
                placeholder="Storage Info"
                name="storageinfo"
                id="storageinfo"
              ></textarea>
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                rows={4}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.description}
                placeholder="description"
                name="description"
                id="description"
              ></textarea>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShow.map((img, i) => (
                <div className="h-[180px] relative">
                  <label htmlFor={i}>
                    <img
                      className="w-full h-full rounded-sm"
                      src={img.url}
                      alt=""
                    />
                  </label>
                  <input
                    onChange={(e) => changeImage(e.target.files[0], i)}
                    type="file"
                    id={i}
                    className="hidden"
                  />
                  <span
                    onClick={() => removeImage(i)}
                    className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
              ))}
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]"
                htmlFor="image"
              >
                <span>
                  <BsImages />
                </span>
                <span>select image</span>
              </label>
              <input
                multiple
                onChange={inmageHandle}
                className="hidden"
                type="file"
                id="image"
              />
            </div>
            <div className="flex flex-col mb-3 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="video">Product video</label>
                <div className="overflow-hidden w-full flex flex-wrap border border-slate-600 gap-2 rounded-md p-4">
                  {videoShow ? (
                    <div className="relative w-[100px] h-[100px]">
                      <video
                        className="w-full h-full object-cover"
                        src={videoShow.url}
                        controls
                      />
                      <span
                        onClick={removeVideo}
                        className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex justify-center items-center cursor-pointer"
                      >
                        <IoCloseSharp />
                      </span>
                      <input
                        onChange={(e) => changeVideo(e.target.files[0])}
                        type="file"
                        id="video"
                        className="hidden"
                      />
                      <label
                        className="absolute top-0 left-0 bg-indigo-500 text-white w-5 h-5 flex justify-center items-center cursor-pointer"
                        htmlFor="video"
                      >
                        <MdOutlineVideoLibrary />
                      </label>
                    </div>
                  ) : (
                    <div>
                      <input
                        onChange={videoHandle}
                        className="hidden"
                        type="file"
                        id="video"
                        accept="video/*"
                      />
                      <label
                        className="w-[100px] h-[100px] border border-slate-600 cursor-pointer flex justify-center items-center"
                        htmlFor="video"
                      >
                        <MdOutlineVideoLibrary />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Add product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
