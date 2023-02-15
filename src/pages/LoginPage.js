import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./Global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formValidationSchema = yup.object({
  email: yup
    .string()
    .min(5, "Provide a valid mail id!")
    .required("Please provide a email address")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email"),

  password: yup
    .string()
    .min(8, "Password must be above 8 chars!")
    .required("Password required!")
    .matches(/\d/, "must contain a number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "must include a special character"),
});

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (user) => {
      loginUser(user);
    },
  });
  const loginUser = (newUser) => {
    const id = toast.loading("Please wait...");
    fetch(`${API}/auth/login`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.update(id, {
          render: data.message,
          type: data.message === "Login successful" ? "success" : "error",
          isLoading: false,
          autoClose: 5000,
        });
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

                  <Button
                    type="submit"
                    className="login-btn btn btn-lg w-100 mt-4 mb-4"
                  >
                    Login
                  </Button>
                </Form>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Link
                    to="/forgotpassword"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Forgot Password ?
                  </Link>
                </Row>
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

export default Login;
