import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const PromoText = () => {
  return (
    <div className="promo-div w-100 mx-auto d-flex gap-2 justify-content-center align-items-center">
      <button className="btn">
        <FaAngleLeft />
      </button>
      <p className="mb-0 pb-0">Get 10% off on business sign up</p>
      <button className="btn">
        <FaAngleRight />
      </button>
    </div>
  );
};

export default PromoText;
