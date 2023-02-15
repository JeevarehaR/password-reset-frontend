import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="error d-flex flex-column justify-content-lg-center align-items-center">
          <img
            src="https://blog.stackfindover.com/wp-content/uploads/2022/05/404-svg-animated-page-concept.jpg"
            alt="error"
            className="errorimg"
          />
          <h4>401 Error ! Page Not Found</h4>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Rediect Login Page
          </button>
        </div>
      </div>
    </>
  );
};

export default Error;
