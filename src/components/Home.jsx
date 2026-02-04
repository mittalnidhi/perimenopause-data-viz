import React from 'react'
import "./Home.css";

const Home = () => {
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <h1>The Invisible Data</h1>

        <p>
          Mapping the Perimenopausal Data Gap<br />
          in Women’s Health
        </p>

        <div className="scroll-arrow" onClick={scrollDown}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 8l6 6 6-6" stroke="white" strokeWidth="2" />
            <path d="M6 15l6 6 6-6" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </section>

      {/* NEXT SECTION (placeholder) */}
      <section className="content">
        <h2>Your visualizations start here</h2>
      </section>
    </>
  );
};


export default Home
