import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./main.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Heders from "../components/Headers";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import ProductImg from "../assets/product-img.webp";
import Footer from "../components/Footer";
import secondbanner1 from "../assets/secondbanner1.png";
import secondbanner2 from "../assets/secondbanner2.png";
import FarmingImg from "../assets/farming.png";
import ChemicalImg from "../assets/chemical.png";
import GmoImg from "../assets/gmo.png";
import LocallyImg from "../assets/locally.png";
import GlobalImg from "../assets/global.png";
import Brother from "../assets/Brothers.png";
import video from "../assets/videos.mp4";
import Swimming from "../assets/Swimming.png";
import Cow_Image from "../assets/Cow_Image.png"
import { get_category, get_products } from "../store/reducers/homeReducer";
import Marquee from "../components/Marquee";
import triune from "../assets/triune.png";
import wood from "../assets/wood.png";
import multitex from "../assets/multitex.png";
import llyod from "../assets/llyod.png";
import micr from "../assets/micr.webp";
import triveni from "../assets/triveni-engineering.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, latest_product, topRated_product, discount_product } =
    useSelector((state) => state.home);
  useEffect(() => {
    dispatch(get_products());
  }, []);

  var setting5 = {
    // dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  const row2 = [triune, wood, multitex, llyod, micr, triveni];
  const row1 = [triune, wood, multitex, llyod, micr, triveni];

  return (
    <div className="w-full">
      <Heders />
      <Banner />
      <div className="seconBanner">
        <div className="w-full h-[25rem] bg-[#d9d9d9] relative">
          <div className="pt-[80px] grid grid-cols-12 gap-5 ">
            <div className="col-span-3 relative">
              <img
                className="w-[80%] absolute top-20 left-0 z-10"
                src={secondbanner1}
                alt=""
              />
            </div>
            <div className="col-span-3">
              <h2 className="text-[67px] leading-[83px] text-[#244316] font-[600]">
                WE ARE 4TH GEN FARMERS
              </h2>
            </div>
            <div className="col-span-3 ml-5 font-[600]">
              <p>
                Our Farm is a Bio-diverse, Organic ecosystem, certified by
                ECOCERT and located in the beautiful village of Bhodani in
                Maharashtra. Our work is inspired by ancient wisdom and
                sustainability. Every time you buy from us, you help pull back
                carbon from the atmosphere into the soil, secure rural
                livelihoods and empower women in our villages.
              </p>
            </div>
            <div className="col-span-3 relative">
              <img
                className="w-[80%] absolute top-24 right-0 z-10"
                src={secondbanner2}
                alt=""
              />
            </div>
          </div>
          <div className="w-full bg-[#91C72E] absolute bottom-0 h-8"></div>
        </div>
      </div>
      <div className="my-4">
        <Categorys />
      </div>
      <div className="py-[45px]">
        <FeatureProducts products={products} />
      </div>

      <div className="py-10">
        <div className="w-[95%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title="Latest Product" products={latest_product} />
            </div>
            <div className="overflow-hidden">
              <Products title="Top Rated Product" products={topRated_product} />
            </div>
            <div className="overflow-hidden">
              <Products title="Discount Product" products={discount_product} />
            </div>
          </div>
        </div>
      </div>

      {/* third banner type */}

      <div className="w-[95%] mx-auto">
        <div className="organic-choose-feats mat-50">
          <div className="feat-content">
            <ul>
              <li>
                <img src={FarmingImg} alt="" />
                <p>Sustainable Farming Techniques</p>
              </li>
              <li>
                <img src={ChemicalImg} alt="" />
                <p>Chemical Pesticide-free</p>
              </li>
              <li>
                <img src={GmoImg} alt="" />
                <p>Non-GMO Produce</p>
              </li>
              <li>
                <img src={LocallyImg} alt="" />
                <p>Locally Ethically Sourced</p>
              </li>
              <li>
                <img src={GlobalImg} alt="" />
                <p>189 Global Testing Standards</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* video section */}

      <div className="video w-[100%]">
        <div className="w-[100] mx-auto h-[30rem] overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            src={video}
          ></video>
        </div>
      </div>

      {/* YOUR FARM CREATIONS */}

      <div className="creation-bg h-full">
        <h2 className="text-4xl font-bold my-5 text-[#91C72E]">
          YOUR FARM CREATIONS
        </h2>
        <div className="grid grid-cols-10 gap-10 mt-5 py-5 mx-10">
          <div className="md-lg:col-span-2 lg:col-span-2 xl:col-span-2 md:col-span-6 sm:col-span-12 ">
            <div className="creation-section">
              <img
                className="h-[15rem]"
                src="https://twobrothersindiashop.com/cdn/shop/files/Image_1_600x.png?v=1680183127"
                alt=""
              />
              <p className="text-lg font-[400] py-2"> Bilona A2 ghee</p>
            </div>
          </div>
          <div className="md-lg:col-span-2 lg:col-span-2 xl:col-span-2 md:col-span-6 sm:col-span-12 ">
            <div className="creation-section">
              <img
                className="h-[15rem]"
                src="https://twobrothersindiashop.com/cdn/shop/files/0Y6A0445_copy_1-1-1_700x.jpg?v=1681394783"
                alt=""
              />
              <p className="text-lg font-[400] py-2"> Bilona A2 ghee</p>
            </div>
          </div>
          <div className="md-lg:col-span-2 lg:col-span-2 xl:col-span-2 md:col-span-6 sm:col-span-12 ">
            <div className="creation-section">
              <img
                className="h-[15rem]"
                src="https://twobrothersindiashop.com/cdn/shop/files/Image_1_600x.png?v=1680183127"
                alt=""
              />
              <p className="text-lg font-[400] py-2"> Bilona A2 ghee</p>
            </div>
          </div>
          <div className="md-lg:col-span-2 lg:col-span-2 xl:col-span-2 md:col-span-6 sm:col-span-12 ">
            <div className="creation-section">
              <img
                className="h-[15rem]"
                src="https://twobrothersindiashop.com/cdn/shop/files/Image_3_700x.png?v=1680183210"
                alt=""
              />
              <p className="text-lg font-[400] py-2"> Bilona A2 ghee</p>
            </div>
          </div>
          <div className="md-lg:col-span-2 lg:col-span-2 xl:col-span-2 md:col-span-6 sm:col-span-12 ">
            <div className="creation-section">
              <img
                className="h-[15rem]"
                src="https://twobrothersindiashop.com/cdn/shop/files/Image_1_600x.png?v=1680183127"
                alt=""
              />
              <p className="text-lg font-[400] py-2"> Bilona A2 ghee</p>
            </div>
          </div>
        </div>
      </div>

      {/* product video */}

      <div className="container-section1 bg-slate-100 ">
        <div>
          <img src={Swimming} alt="" />
        </div>
        <div className="most-legens-section1 py-20 w-[95%] mx-auto">
          <div className="slider-container1 mat-25">
            <Slider {...setting5}>
              <div className="element-box border-[1px] rounded-lg shadow-box bg-white overflow-hidden object-cover">
                {/* <img className="h-[15rem]" src={ProductImg} alt="" /> */}
                <div className="w-full h-[19rem] overflow-hidden">
                  <video
                    className=""
                    src="https://twobrothersindiashop.com/cdn/shop/files/quinn_j7px6mza7qodsyeb8cbky56j.mp4"
                    autoPlay
                    muted
                    loop
                  ></video>
                </div>
                <div className="elemt-content text-center py-5 px-3 text-md font-semibold">
                  <h6 className="mb-2 heading-h6 text-sm">
                    <Link>A2 Cow Cultured Ghee,</Link>
                  </h6>

                  <p className="p-small font-bold text-lg">
                    <span>Rs.</span> <span>200</span>
                  </p>
                </div>
              </div>
              <div className="element-box border-[1px] rounded-lg  shadow-box bg-white overflow-hidden object-cover">
                {/* <img className="h-[15rem]" src={ProductImg} alt="" /> */}
                <div className="w-full h-[19rem] overflow-hidden">
                  <video
                    className=""
                    src="https://twobrothersindiashop.com/cdn/shop/files/quinn_n43wevd110kc1crglryr9k22.mp4"
                    autoPlay
                    muted
                    loop
                  ></video>
                </div>
                <div className="elemt-content text-center py-5 px-3 text-md font-semibold">
                  <h6 className="mb-2 heading-h6 text-sm">
                    <Link>A2 Cow Cultured Ghee,</Link>
                  </h6>

                  <p className="p-small font-bold text-lg">
                    <span>Rs.</span> <span>200</span>
                  </p>
                </div>
              </div>
              <div className="element-box border-[1px] rounded-lg  shadow-box bg-white overflow-hidden object-cover">
                {/* <img className="h-[15rem]" src={ProductImg} alt="" /> */}
                <div className="w-full h-[19rem] overflow-hidden">
                  <video
                    className=""
                    src="https://twobrothersindiashop.com/cdn/shop/files/quinn_rno4980d6cncv6q6ubhm1qt4.mp4"
                    autoPlay
                    muted
                    loop
                  ></video>
                </div>
                <div className="elemt-content text-center py-5 px-3 text-md font-semibold">
                  <h6 className="mb-2 heading-h6 text-sm">
                    <Link>A2 Cow Cultured Ghee,</Link>
                  </h6>

                  <p className="p-small font-bold text-lg">
                    <span>Rs.</span> <span>200</span>
                  </p>
                </div>
              </div>
              <div className="element-box border-[1px] rounded-lg  shadow-box bg-white overflow-hidden object-cover">
                {/* <img className="h-[15rem]" src={ProductImg} alt="" /> */}
                <div className="w-full h-[19rem] overflow-hidden">
                  <video
                    className=""
                    src="https://twobrothersindiashop.com/cdn/shop/files/quinn_ar0ogyx4wgeok9o45k3iggap.mp4"
                    autoPlay
                    muted
                    loop
                  ></video>
                </div>
                <div className="elemt-content text-center py-5 px-3 text-md font-semibold">
                  <h6 className="mb-2 heading-h6 text-sm">
                    <Link>A2 Cow Cultured Ghee,</Link>
                  </h6>

                  <p className="p-small font-bold text-lg">
                    <span>Rs.</span> <span>200</span>
                  </p>
                </div>
              </div>
              <div className="element-box border-[1px] rounded-lg  shadow-box bg-white overflow-hidden object-cover">
                {/* <img className="h-[15rem]" src={ProductImg} alt="" /> */}
                <div className="w-full h-[19rem] overflow-hidden">
                  <video
                    className=""
                    src="https://twobrothersindiashop.com/cdn/shop/files/quinn_h7hrv5q488mhqdtv5egpel7e.mp4"
                    autoPlay
                    muted
                    loop
                  ></video>
                </div>
                <div className="elemt-content text-center py-5 px-3 text-md font-semibold">
                  <h6 className="mb-2 heading-h6 text-sm">
                    <Link>A2 Cow Cultured Ghee,</Link>
                  </h6>

                  <p className="p-small font-bold text-lg">
                    <span>Rs.</span> <span>200</span>
                  </p>
                </div>
              </div>
              <div className="element-box border-[1px] rounded-lg  shadow-box bg-white overflow-hidden object-cover">
                {/* <img className="h-[15rem]" src={ProductImg} alt="" /> */}
                <div className="w-full h-[19rem] overflow-hidden">
                  <video
                    className=""
                    src="https://twobrothersindiashop.com/cdn/shop/files/quinn_fr0v22l6u5umsi0upgzbtzl4.mp4"
                    autoPlay
                    muted
                    loop
                  ></video>
                </div>
                <div className="elemt-content text-center py-5 px-3 text-md font-semibold">
                  <h6 className="mb-2 heading-h6 text-sm">
                    <Link>A2 Cow Cultured Ghee,</Link>
                  </h6>

                  <p className="p-small font-bold text-lg">
                    <span>Rs.</span> <span>200</span>
                  </p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      {/* OUR WAY OF LIFE */}
      <div className="flex flex-col items-center justify-center py-10 gap-4 md:gap-6 xl:gap-8 w-[85%] mx-auto">
        <div className="md:flex lg:w-full flex-col gap-4 md:gap-6 lg:gap-8 lg:mx-10 sm:mx-5">
          <div className="text-center mb-10 w-[80%] mx-auto">
            <h2 className="xl:text-5xl sm:text-3xl font-semibold text-[#243945]">
              OUR WAY OF LIFE
            </h2>
            <p className="py-5 text-[20px] text-center text-gray-500 sm:mx-0 ">
              Our production group is a team of professionals who have multiyear
              experience in fabrication and erection of structural steel in
              Various industries as follows:
            </p>
          </div>
          {/*  Cements Plants: */}
          <div className="lg:grid lg:grid-cols-12 xl:grid xl:grid-cols-12  items-start sm:gap-6 md:gap-5 lg:gap-10 xl:gap-14 md:px-5 lg:mx-20 sm:mx-0">
            <div className="lg:col-span-6 xl:col-span-6 sm:col-span-12">
              <img
                className="lg:w-[30rem] lg:h-[30rem]  xl:h-[30rem] sm:h-[20rem] rounded-full"
                src={Brother}
                alt=""
              />
            </div>
            <div className="lg:col-span-6 xl:col-span-6 sm:col-span-12 sm:mt-10 lg:mt-16 align-middle h-full">
              <div className=" w-full h-full flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-[#243945]">
                  FARMERS ARE PROFESSIONAL PROBLEM SOLVERS:
                </h2>
                <hr className="h-2 w-10 my-3 rounded-full bg-yellow-400" />

                <ol class="list-decimal space-y-1 text-gray-500 list-inside dark:text-gray-400 mb-10">
                  <li>
                    Organic Farming isn't a type of farming but a way of life.
                    Besides being workers of the soil, farmers believe in
                    community strength and rely on the natural interconnection
                    of species!
                  </li>
                </ol>
                <div className="w-[50%]">
                  <button className="animated-button">
                    <svg
                      viewBox="0 0 24 24"
                      className="arr-2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                    <span className="text">Modern Button</span>
                    <span className="circle" />
                    <svg
                      viewBox="0 0 24 24"
                      className="arr-1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Building The Soil, And Our Future! */}
        <div className="w-full my-10">
          <img src={Cow_Image} alt="" />
        </div>


{/* client review */}
<div className="bg-slate-500">
<div className="py-10 text-center w-[80%] m-auto">
      <div className="w-full">
        <Carousel showThumbs={false} showArrows={true} showStatus={false} className="dark:bg-gray-800">
          <div className="flex flex-col items-center">
            

<div class="flex items-center">
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
 
</div>

            <p className="lead font-italic mx-4 md:mx-5 text-[20px] text-white">
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
              error amet numquam iure provident voluptate esse quasi, voluptas
              nostrum quisquam!"
            </p>
            <div className="mt-5 mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                className="rounded-full shadow-md"
                alt="sample image"
                width="100"
                height="100"
              />
            </div>
            <p className="text-slate-100 mb-0">- Anna Morian</p>
          </div>
          <div className="flex flex-col items-center">
          <div class="flex items-center">
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
 
</div>
            <p className="lead font-italic mx-4 md:mx-5 text-[20px] text-white">
              "Neque cupiditate assumenda in maiores repudiandae mollitia
              adipisci maiores repudiandae mollitia consectetur adipisicing
              architecto elit sed adipiscing elit."
            </p>
            <div className="mt-5 mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
                className="rounded-full shadow-md"
                alt="sample image"
                width="100"
                height="100"
              />
            </div>
            <p className="text-slate-100 mb-0">- Teresa May</p>
          </div>
          <div className="flex flex-col items-center">
          <div class="flex items-center">
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
 
</div>
            <p className="lead font-italic mx-4 md:mx-5 text-[20px] text-white">
              "Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur est laborum neque
              cupiditate assumenda in maiores."
            </p>
            <div className="mt-5 mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                className="rounded-full shadow-md"
                alt="sample image"
                width="100"
                height="100"
              />
            </div>
            <p className="text-slate-100 mb-0">- Kate Allise</p>
          </div>
        </Carousel>
      </div>
    </div>
</div>

           {/* marquee */}

           <div className="sm:hidden lg:block my-10">
            <Marquee row1={row1} row2={row2} />
          </div>
      
      <Footer />
    </div>
  );
};

export default Home;
