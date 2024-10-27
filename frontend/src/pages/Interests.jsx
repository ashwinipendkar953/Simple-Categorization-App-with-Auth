import React from "react";
import CategorySelector from "../components/CategorySelector";

const Interests = () => {
  return (
    <div className="container w-100 my-3 d-flex flex-column justify-content-center align-items-center">
      <div
        className="card w-100 my-3"
        style={{ maxWidth: "576px", borderRadius: "20px" }}
      >
        <div className="card-body py-4">
          <div className="text-center">
            <h3 className="fw-bold">Please mark your interests!</h3>
            <p className="mt-3 mb-0 pb-0 mx-auto">We will keep you noticed.</p>
          </div>
          <hr className="pt-0 mt-0" />

          <CategorySelector />
        </div>
      </div>
    </div>
  );
};

export default Interests;
