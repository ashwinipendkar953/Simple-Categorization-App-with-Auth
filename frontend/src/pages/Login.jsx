import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetState } from "../features/user/userSlice";
import { login } from "../features/user/thunks";

const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, { toastId: "success" });
      setFormData(INITIAL_FORM_DATA);
      navigate("/interests");
    } else if (isError) {
      toast.error(message, { toastId: "error" });
    }
    dispatch(resetState());
  }, [dispatch, isSuccess, isError, message, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="container w-100 my-3 d-flex flex-column justify-content-center align-items-center">
      <div
        className="card w-100 my-3"
        style={{ maxWidth: "576px", borderRadius: "20px" }}
      >
        <div className="card-body p-5">
          <div className="text-center">
            <h2 className=" fw-bold">Login</h2>
            <h5 className="fw-semibold">
              Welcome back to <span className="text-uppercase">Ecommerce</span>
            </h5>
            <p>The next gen business marketplace</p>
          </div>
          <form className="px-md-5 px-sm-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control py-2"
                placeholder="Enter"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="d-flex position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control py-2"
                  placeholder="Enter"
                  value={formData.password || ""}
                  onChange={handleChange}
                  autoComplete="password"
                  required
                />
                <button
                  type="button"
                  className="btn position-absolute end-0 text-decoration-underline"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button className="btn btn-dark text-uppercase w-100 fw-semibold py-2 my-2">
              Login
            </button>
            <hr />

            <div className="d-flex justify-content-center align-items-center gap-2">
              <span>Don't have an Account?</span>
              <Link
                to="/signup"
                className="d-block text-center text-uppercase text-black text-decoration-none"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
