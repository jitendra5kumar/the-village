import React, { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import Stripe from "../components/Stripe";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaAngleDown, FaAngleRight, FaList } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import upi from "../assets/upi.svg";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const Payment = () => {
  const [categoryShow, setCategoryShow] = useState(true);
  const [open, setOpen] = React.useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const {
    state: { price, items, orderId },
  } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  return (
    <div>
      <Headers />
      <section className="bg-white">
        <div className="xl:w-[90%] lg:w-[90%] md:w-[90%] sm:w-full mx-auto py-5 mt-4">
          <div className="flex flex-wrap md:flex-col-reverse">
            {/* <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap">
                  <div
                    onClick={() => setPaymentMethod("stripe")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "stripe" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:3000/images/payment/stripe.png"
                        alt="stripe"
                      />
                      <span className="text-slate-600">Stripe</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("bkash")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "bkash" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:3000/images/payment/bkash.png"
                        alt="bkash"
                      />
                      <span className="text-slate-600">Bkash</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("nogot")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "nogot" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:3000/images/payment/nogot.png"
                        alt="nogot"
                      />
                      <span className="text-slate-600">Nogot</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("roket")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "roket" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:3000/images/payment/roket.png"
                        alt="roket"
                      />
                      <span className="text-slate-600">Roket</span>
                    </div>
                  </div>
                </div>
                {paymentMethod === "stripe" && (
                  <div>
                    <Stripe orderId={orderId} price={price} />
                  </div>
                )}
                {paymentMethod === "bkash" && (
                  <div className="w-full px-4 py-8 bg-white shadow-sm">
                    <button className="px-10 py-[6px] rounded-sm hover:shadow-wrange-500/20 hover:shadow-lg bg-orange-500 text-white">
                      Pay Now
                    </button>
                  </div>
                )}
                {paymentMethod === "nogot" && (
                  <div className="w-full px-4 py-8 bg-white shadow-sm">
                    <button className="px-10 py-[6px] rounded-sm hover:shadow-wrange-500/20 hover:shadow-lg bg-orange-500 text-white">
                      Pay Now
                    </button>
                  </div>
                )}
                {paymentMethod === "roket" && (
                  <div className="w-full px-4 py-8 bg-white shadow-sm">
                    <button className="px-10 py-[6px] rounded-sm hover:shadow-wrange-500/20 hover:shadow-lg bg-orange-500 text-white">
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            </div> */}
            <div className="w-full md:w-full">
              <div className="xl:px-10 md:px-5 md:mb-0">
                <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
                  <h2>Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>{items} items and shipping fee included</span>
                    <span>₹{price}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount</span>
                    <span className="text-lg text-orange-500">₹{price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* all payments methods */}
        <div className="w-full h-16 bg-green-400">
          <div className="px-10 py-5 text-white text-lg font-semibold uppercase">
            <span className="px-2 py-1 bg-white text-black rounded-sm">4</span>{" "}
            <span className="ml-5">Payment Options</span>
          </div>
        </div>
        <div className="mb-5">
          <div>
            <Accordion
              className="border-none xl:px-10 sm:px-5 bg-gray-200"
              open={open === 1}
              icon={<Icon id={1} open={open} />}
            >
              <AccordionHeader onClick={() => handleOpen(1)}>
                <div>
                  <div className="flex gap-4">
                    <img src={upi} alt="" />
                    <p>UPI</p>
                  </div>
                  <div className="ml-10 text-sm text-[#44B88C] mt-2">
                    <p>Pay by any UPI app</p>
                  </div>
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="xl:w-[95%] sm:w-full mx-auto shadow-lg bg-white rounded-xl">
                  <div className="xl:px-10 sm:px-5 py-5">
                    <p className="text-lg font-semibold text-gray-700">
                      Choose an Option
                    </p>
                    <div className="my-4">
                      <input
                        type="radio"
                        name="paymentOption"
                        id="phonePe"
                        value="phonePe"
                        checked={selectedOption === "phonePe"}
                        onChange={handleOptionChange}
                        className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none"
                      />
                      <label
                        htmlFor="phonePe"
                        className="text-gray-700 text-base roboto-medium ml-5"
                      >
                        PhonePe
                      </label>
                      {selectedOption === "phonePe" && (
                        <div className="mt-4 xl:ml-20 sm:ml-5">
                          <button className="bg-orange-500 text-white py-3 px-8 text-base font-semibold rounded">
                            Continue
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="my-4 mt-10">
                      <input
                        type="radio"
                        name="paymentOption"
                        id="upiId"
                        value="upiId"
                        checked={selectedOption === "upiId"}
                        onChange={handleOptionChange}
                        className="mr-2"
                      />
                      <label
                        htmlFor="upiId"
                        className="text-gray-700 text-base roboto-medium ml-5"
                      >
                        Your UPI ID
                      </label>
                      {selectedOption === "upiId" && (
                        <div className="mt-4 xl:ml-20 sm:ml-5">
                          <button className="bg-orange-500 text-white py-3 px-8 text-base font-semibold rounded">
                            Continue
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>

            <Accordion
              className="border-none px-10 bg-gray-200"
              open={open === 2}
              icon={<Icon id={2} open={open} />}
              onClick={() => setPaymentMethod("stripe")}
            >
              <AccordionHeader onClick={() => handleOpen(2)}>
                <div>
                  <div className="flex gap-4">
                    <img src={upi} alt="" />
                    <p>Card Payment</p>
                  </div>
                  <div className="ml-10 text-sm text-[#44B88C] mt-2">
                    <div>
                      <span>Credit / Debit / ATM Card</span>
                    </div>
                  </div>
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="w-[95%] mx-auto shadow-lg bg-white rounded-xl">
                  <div className="px-10 py-5">
                    {paymentMethod === "stripe" && (
                      <div>
                        <Stripe orderId={orderId} price={price} />
                      </div>
                    )}
                  </div>
                </div>
              </AccordionBody>
            </Accordion>

            <Accordion
              className="border-none px-10 bg-gray-200"
              open={open === 3}
              icon={<Icon id={3} open={open} />}
            >
              <AccordionHeader onClick={() => handleOpen(3)}>
                <div>
                  <div className="flex gap-4">
                    <img src={upi} alt="" />
                    <p> Cash on Delivery</p>
                  </div>
                  <div className="ml-10 text-sm text-[#44B88C] mt-2">
                    <div>
                      <span> Cash on Delivery</span>
                    </div>
                  </div>
                </div>
              </AccordionHeader>
              <AccordionBody>
                <div className="w-[95%] mx-auto shadow-lg bg-white rounded-xl">
                  <div className="px-10 py-5">
                    <div className="my-4">
                      <input
                        type="radio"
                        name="paymentOption"
                        id="cashOn"
                        value="cashOn"
                        checked={selectedOption === "cashOn"}
                        onChange={handleOptionChange}
                        className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none"
                      />
                      <label
                        htmlFor=""
                        className="text-gray-700 text-base roboto-medium ml-5"
                      >
                        Cash on Delivery
                      </label>
                      {selectedOption === "cashOn" && (
                        <div className="mt-4 ml-20">
                          <button className="bg-orange-500 text-white py-3 px-8 text-base font-semibold rounded">
                            Continue
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payment;
