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
        <svg
          className="triangle"
          viewBox="0 0 400 520"
          preserveAspectRatio="xMidYMid meet"
        >

          {/* Symptom Galaxy */}
          <polygon
            className="tri"
            points="0,0 200,260 200,0"
            onClick={() => navigate("/symptomgalaxy")}
          />

          {/* DIY Data */}
          <polygon
            className="tri"
            points="200,0 400,0 200,260"
            onClick={() => navigate("/diydata")}
          />

          {/* Slice of Life */}
          <polygon
            className="tri"
            points="0,0 200,520 200,260"
            onClick={() => navigate("/sliceoflife")}
          />

          {/* Approaches */}
          <polygon
            className="tri"
            points="200,260 400,0 200,520"
            onClick={() => navigate("/approaches")}
          />

          {/* Labels */}

          <text x="40" y="50" className="label">Symptom Galaxy</text>
          <text x="270" y="50" className="label">DIY Data</text>
          <text x="70" y="300" className="label">Slice of Life</text>
          <text x="250" y="300" className="label">Approaches</text>

        </svg>
      </div>
    </section>
  );
}
