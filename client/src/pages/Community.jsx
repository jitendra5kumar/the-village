import React, { useEffect } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Brother from "../assets/Brothers.png";
import { get_communities } from "../store/reducers/communityReducre";
import { useDispatch, useSelector } from "react-redux";

const Community = () => {
  const dispatch = useDispatch();
  const { communities, loader } = useSelector((state) => state.community);

  useEffect(() => {
    dispatch(get_communities());
  }, [dispatch]);

  console.log("communities", communities);

  return (
    <div>
      <Headers />
      <div>
        <section className='bg-[url("http://localhost:3000/images/comminity-post.jpg")] h-[30rem] mt-6 bg-cover bg-no-repeat relative bg-left'>
          <div className="absolute left-0 top-0 w-full h-full bg-[#4746468a]">
            <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
              <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
                <h2 className="text-3xl font-bold">The Village Zone</h2>
                <div className="flex justify-center items-center gap-2 text-2xl w-full">
                  <Link to="/">Home</Link>
                  <span className="pt-1">
                    <MdOutlineKeyboardArrowRight />
                  </span>
                  <span>Community Post</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* communty section  */}

        <section>
          <div>
            <div className="flex flex-col items-center justify-center py-10 gap-4 md:gap-6 xl:gap-8 xl:w-[85%] mx-auto">
              <div className="md:flex lg:w-full flex-col gap-4 md:gap-6 lg:gap-8 lg:mx-10 sm:mx-5">
                <div className="text-center mb-10 xl:w-[80%] md-lg:w-full mx-auto">
                  <h2 className="xl:text-5xl sm:text-3xl font-semibold text-[#243945]">
                    OUR WAY OF LIFE
                  </h2>
                  <p className="py-5 text-[20px] text-center text-gray-500 sm:mx-0 ">
                    Our production group is a team of professionals who have
                    multiyear experience in fabrication and erection of
                    structural steel in Various industries as follows:
                  </p>
                </div>
                {/*  Cements Plants: */}

                {communities.map((c, i) => (
                  <div
                    className={`${
                      i % 2 == 0 ? "flex flex-row" : "flex flex-row-reverse"
                    } w-[95%] mx-auto gap-5 mt-10`}
                  >
                    <div className=" xl:w-[50%] md-lg:w-full ">
                      <img
                        className="xl:w-[80%] md:w-full rounded-full"
                        src={c.image}
                        alt=""
                      />
                    </div>
                    <div className="w-[50%] md:mt-5 md-lg:w-full align-middle h-full flex flex-col gap-10 justify-center items-center mt-10">
                      <div className=" w-full h-full flex flex-col justify-center">
                        <h2 className="xl:text-3xl md:text-2xl font-semibold text-[#243945] uppercase">
                          {c.name}
                        </h2>
                        <hr className="h-2 w-10 my-3 rounded-full bg-yellow-400" />

                        <ol class="list-decimal space-y-1 text-gray-500 list-inside dark:text-gray-400 mb-10 text-[17px]">
                          {c.benefits.map((p, i) => (
                            <li>{p}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Community;
