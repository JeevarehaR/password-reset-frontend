import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/LoginPage";
import Signup from "../pages/SignupPage";
import { Container, Row, Col } from "react-bootstrap";

export const AuthCard = () => {
  const [register, setRegister] = useState(false);

  return (
    <Container fluid className="container-fluid">
      <Row className="main-row m-0">
        <Col md={8} className="left-col">
          <Row md={6}>
            <Col md={12} className="form">
              <Col md={6}>
                {register ? <Signup /> : <Login />}
                <h6>
                  <Link className="link" onClick={() => setRegister(!register)}>
                    {register
                      ? "Already an user? Login Here👆 "
                      : "Create an account"}
                  </Link>
                </h6>
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
};
