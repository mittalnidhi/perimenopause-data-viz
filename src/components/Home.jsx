// home.jsx
import React, { useMemo, useState } from "react";
import "./home.css";

export default function Home() {
  const [active, setActive] = useState("home");

  const content = useMemo(() => {
    switch (active) {
      case "about":
        return {
          title: "About",
          subtitle: "Context + goals for mapping the perimenopausal data gap.",
        };
      case "path":
        return {
          title: "Path",
          subtitle: "How we move from missing data → better outcomes.",
        };
      default:
        return {
          title: "The Invisible Data",
          subtitle: "Mapping the Perimenopausal Data Gap\nin Women’s Health",
        };
    }
  }, [active]);

  const scrollToExplore = () => {
    const el = document.getElementById("explore");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page">
      {/* Top-right mini path nav */}
      <div className="topNav" aria-label="Home / About / Path navigation">
        <svg
          className="topNavSvg"
          viewBox="0 0 260 70"
          role="img"
          aria-label="Progress path with three nodes: Home, About, Path"
        >
          <path d="M30 25 L125 45 L230 35" className="topNavLine" fill="none" />

          <g className="topNavNodeGroup">
            {/* HOME */}
            <circle
              className={`topNavDot ${active === "home" ? "isActive" : ""}`}
              cx="30"
              cy="25"
              r="5"
              onClick={() => setActive("home")}
            />
            <text
              className={`topNavLabel ${active === "home" ? "isActive" : ""}`}
              x="30"
              y="14"
              textAnchor="middle"
              onClick={() => setActive("home")}
            >
              Home
            </text>

            {/* ABOUT */}
            <circle
              className={`topNavDot ${active === "about" ? "isActive" : ""}`}
              cx="125"
              cy="45"
              r="5"
              onClick={() => setActive("about")}
            />
            <text
              className={`topNavLabel ${active === "about" ? "isActive" : ""}`}
              x="125"
              y="66"
              textAnchor="middle"
              onClick={() => setActive("about")}
            >
              About
            </text>

            {/* PATH */}
            <circle
              className={`topNavDot ${active === "path" ? "isActive" : ""}`}
              cx="230"
              cy="35"
              r="5"
              onClick={() => setActive("path")}
            />
            <text
              className={`topNavLabel ${active === "path" ? "isActive" : ""}`}
              x="230"
              y="56"
              textAnchor="middle"
              onClick={() => setActive("path")}
            >
              Path
            </text>
          </g>
        </svg>
      </div>

      {/* Center stack */}
      <div className="frame">
        {/* Left vertical dots */}
        <div className="sideDots" aria-hidden="true">
          <span className="sideDot isOn" />
          <span className="sideDot" />
          <span className="sideDot" />
        </div>

        {/* Main hero card */}
        <div className="card" role="region" aria-label="Hero content">
          <h1 className="title">{content.title}</h1>

          <p className="subtitle">
            {content.subtitle.split("\n").map((line, i) => (
              <span key={i} className="subtitleLine">
                {line}
              </span>
            ))}
          </p>

          {/* Double chevron INSIDE the card (clickable) */}
          <div
            className="scrollIcon"
            onClick={scrollToExplore}
            role="button"
            tabIndex={0}
            aria-label="Scroll to see next"
            title="Scroll to see next"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") scrollToExplore();
            }}
          >
            <span className="chev chev1" aria-hidden="true" />
            <span className="chev chev2" aria-hidden="true" />
          </div>
        </div>

        {/* Text OUTSIDE the card at the bottom */}
        <div className="bottomHint">Scroll down to explore</div>
      </div>

      {/* Scroll target */}
      <div id="explore" className="exploreAnchor" aria-hidden="true" />
    </div>
  );
}
