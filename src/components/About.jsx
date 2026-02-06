import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

export default function About() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-page" ref={ref}>
      <h2 className="about-title">Choose your path</h2>

      <div className={`triangle-wrapper ${visible ? "zoom" : ""}`}>

        <svg viewBox="0 0 400 600" className="triangle">

          {/* Left top */}
          <polygon
            className="tri symptom"
            points="0,0 200,250 200,0"
            onClick={() => navigate("/symptomgalaxy")}
          />

          {/* Right top */}
          <polygon
            className="tri diy"
            points="200,0 400,0 200,250"
            onClick={() => navigate("/diydata")}
          />

          {/* Left bottom */}
          <polygon
            className="tri slice"
            points="0,0 200,600 200,250"
            onClick={() => navigate("/sliceoflife")}
          />

          {/* Right bottom */}
          <polygon
            className="tri approaches"
            points="200,250 400,0 200,600"
            onClick={() => navigate("/approaches")}
          />

          {/* Labels */}

          <text x="30" y="60" className="label">Symptom Galaxy</text>
          <text x="260" y="60" className="label">DIY Data</text>
          <text x="60" y="360" className="label">Slice of Life</text>
          <text x="250" y="360" className="label">Approaches</text>

        </svg>
      </div>
    </section>
  );
}
