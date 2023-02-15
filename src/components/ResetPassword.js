import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "./Global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be above 8 chars!")
    .required("Password required!")
    .matches(/\d/, "must contain a number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "must include a special character"),
  confirmPassword: yup
    .string()
    .required("Re-enter your password")
    .oneOf([yup.ref("password"), null], "Password mismatch!"),
});

const ResetPassword = () => {
  const { _id, token } = useParams();
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const getInfo = () => {
    fetch(`${API}/auth/reset-password/${_id}/${token}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    getInfo();
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (reset) => {
      console.log("onsubmit", reset);
      resetpassword(reset);
    },
  });

  const resetpassword = (reset) => {
    const id = toast.loading("Please wait...");
    console.log("resetpassword", reset);
    fetch(`${API}/auth/reset-password/${_id}/${token}`, {
      method: "POST",
      body: JSON.stringify(reset),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.update(id, {
          render: data.message,
          type:
            data.message === "Reset Successful... Back to Login!"
              ? "success"
              : "error",
          isLoading: false,
          autoClose: 5000,
        });
      })
      .then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 6000);
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  return (
    <div className="ResetPassword container-lg">
      <div className="forgotPassword container-lg">
        <ToastContainer />
        <div className="container-lg">
          <div className="Auth mx-auto col">
            <div className="card">
              <div className="card-heading">Greetings!!!</div>
              <img className="logo" src="" alt="applogo" />
              <div className="cardbody">
                <div className="form-wrapper col">
                  <form onSubmit={formik.handleSubmit} className="form">
                    <p>Password Reset on {data.email}</p>
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="error">
                        {formik.touched.password && formik.errors.password
                          ? formik.errors.password
                          : ""}
                      </p>
                      <label>Password</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="confirmPassword"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="error">
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? formik.errors.confirmPassword
                          : ""}
                      </p>
                      <label>Confirm Password</label>
                    </div>
                    <button type="submit" className="button1">
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
