import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../features/user/thunks";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState(Array(8).fill(""));
  const inputRefs = useRef([]);
  const { email } = location.state || {};

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Email verified successfully!", { toastId: "success" });
      navigate("/login");
    } else if (isError) {
      toast.error(message, { toastId: "error" });
      setCode(Array(8).fill("")); // Reset the input fields
    }
  }, [navigate, isSuccess, isError, message]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.match(/^[0-9]$/)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input box
      if (index < 7) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Move focus to the previous input if the current one is empty
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.some((digit) => digit === "")) {
      toast.error("Please fill all 8 digits.");
    } else {
      const otp = code.join("");
      dispatch(verifyOtp({ email, otp }));
    }
  };

  return (
    <div className="container w-100 my-3 d-flex flex-column justify-content-center align-items-center">
      <div
        className="card w-100 my-3"
        style={{ maxWidth: "576px", maxHeight: "445px", borderRadius: "20px" }}
      >
        <div className="card-body py-5">
          <div className="text-center">
            <h3 className="fw-bold">Verify Your Email</h3>
            <p className="mt-3 mb-0 pb-0 mx-auto" style={{ maxWidth: "334px" }}>
              Enter the 8-digit code you have received on {email}
            </p>
          </div>

          <form className="px-md-5 px-sm-3" onSubmit={handleSubmit}>
            <div className="py-5">
              <label className="form-label ms-1">Code</label>
              <div className="d-flex justify-content-center mb-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control text-center mx-1"
                    style={{ width: "46px", height: "48px" }}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 fw-semibold py-2 text-uppercase"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
