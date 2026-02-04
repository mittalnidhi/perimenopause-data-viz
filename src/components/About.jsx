import React from 'react'
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-wrapper">

      <div className="triangle">

        <Link to="/Symptomgalaxy" className="about-item top">
          Symptom Galaxy
        </Link>

        <div className="about-item left">
          Approaches
        </div>

        <Link to="/diydata" className="about-item right">
          DIY Data
        </Link>

        <div className="about-item bottom">
          Slice of Life
        </div>

      </div>

    </div>
  );
};

export default About
