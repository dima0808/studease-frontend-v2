import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.scss";

const BackButton = ({ text = "Back" }) => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      ← {text}
    </button>
  );
};

export default BackButton;
