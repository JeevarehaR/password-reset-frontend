import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./Global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const formValidationSchema = yup.object({
  username: yup
    .string()
    .min(4, "Username too short!")
    .required("Username required!"),

  email: yup
    .string()
    .min(4, "Provide a valid mail id")
    .required("Email required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email"),

  password: yup
    .string()
    .min(8, "Password must be above 8 chars!")
    .max(15, "Password too long!")
    .required("Password required!")
    .matches(/\d/, "must contain a number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "must include special character"),

  confirmPassword: yup
    .string()
    .required("Re-enter your password")
    .oneOf([yup.ref("password"), null], "Passwords mismatch!"),
});

function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (newUser) => {
      console.log("onsubmit", newUser);
      createUser(newUser);
    },
  });
  const createUser = (newUser) => {
    const id = toast.loading("Please wait...");
    fetch(`${API}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.update(id, {
          render: data.message,
          type: data.message === "Great! You Signed up!" ? "success" : "error",
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
    <Container fluid className="container-fluid">
      <Row className="main-row m-0">
        <Col md={8} className="left-col">
          <Row md={6}>
            <Col md={12} className="form">
              <Col md={6}>
                <ToastContainer />
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="form-group mt-2">
                    <Form.Label className="label-style mb-0">Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Example : johndoe"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="error">
                      {formik.touched.username && formik.errors.username
                        ? formik.errors.username
                        : ""}
                    </p>
                  </Form.Group>
                  <Form.Group className="form-group mt-2">
                    <Form.Label className="label-style mb-0">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Example : johndoe@mail.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="error">
                      {formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : ""}
                    </p>
                  </Form.Group>

                  <Form.Group className="form-group mt-1">
                    <Form.Label className="label-style mb-0">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Your password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="error">
                      {formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : ""}
                    </p>
                  </Form.Group>
                  <Form.Group className="form-group mt-1">
                    <Form.Label className="label-style mb-0">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Your password"
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
                  </Form.Group>
                  <Button
                    type="submit"
                    className="login-btn btn btn-lg w-100 mt-4 mb-4"
                  >
                    Signup
                  </Button>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <p style={{ marginRight: "5px" }}>Already an user?</p>
                    <Link
                      to="/login"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      Login
                    </Link>
                  </div>
                </Form>
              </Col>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="right-col">
          <img
            src="https://www.zenclass.in/static/media/login_img.cbed4040.png"
            className="img-class"
            alt="zenclass img"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
