import React from 'react'
import "./Home.css";
import About from './About';
import "./About.css";
import HeatmapGhost from "./HeatmapGhost";

const Home = () => {
  const scrollDown = () => {
    document
      .getElementById("about")
      .scrollIntoView({ behavior: "smooth" });
  };

 return (
    <div className="landing">

      {/* HERO */}
      <section className="hero">

        {/* BACKGROUND ANIMATION */}
        <HeatmapGhost />

        <h1>The Invisible Data</h1>

        <p>
          Mapping the Perimenopausal Data Gap<br />
          in Women’s Health
        </p>

        <div className="scroll-arrow" onClick={scrollDown}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 8l6 6 6-6" stroke="white" strokeWidth="2" />
            <path d="M6 14l6 6 6-6" stroke="white" strokeWidth="2" />
          </svg>
        </div>

      </section>

      {/* ABOUT */}
      <section className="content" id="about">
        <About />
      </section>

    </div>
  );
};
export default Home
