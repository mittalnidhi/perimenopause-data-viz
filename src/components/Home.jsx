// Home.jsx
import React, { useEffect, useState, useCallback } from "react";
import "./home.css";
import About from "./About";

const SECTIONS = [
  { id: "home", label: "Home", cx: 30, cy: 25, textY: 14 },
  { id: "about", label: "About", cx: 125, cy: 45, textY: 66 },
  { id: "path", label: "Path", cx: 230, cy: 35, textY: 56 },
];

const content = {
  title: "The Invisible Data",
  subtitle: "Mapping the Perimenopausal Data Gap\nin Women's Health",
};

//active basically stores which section is currently dominant on screen- used to highlight nav dots and labels
export default function Home() {
  const [active, setActive] = useState("home");

  // finds an element by id
  //useCallback ensures the function reference stays stable

  const scrollToId = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // converts section IDs to DOM elements
  // filter Boolean will remove any null value
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return;  // if nothing exists, it will stop

    // this will create a browser observer which will watch when elemnts enter/leave the viewport

    const io = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible?.target?.id) setActive(mostVisible.target.id);
      },
      { threshold: [0.55, 0.65, 0.75] } //observer will fire when 55%, 65%, or 75% of a section is visible. will prevent rapid toggling near edges.
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* home */}
      <div className="page" id="home">
        {/* Top-right mini path nav */} {/*viewbox has drawing coordinates for nav */}
        <div className="topNav" aria-label="Home / About / Path navigation">
          <svg className="topNavSvg" viewBox="0 0 260 70" role="img"> 
            <path d="M30 25 L125 45 L230 35" className="topNavLine" fill="none" />

            {/* label under/above the dot, its clickable, uses same active logic as the dot */}

            <g className="topNavNodeGroup">
              {SECTIONS.map((s) => {
                const isActive = active === s.id;
                return (
                  <g key={s.id}>
                    <circle
                      className={`topNavDot ${isActive ? "isActive" : ""}`}
                      cx={s.cx}
                      cy={s.cy}
                      r="5"
                      onClick={() => scrollToId(s.id)}
                    />
                    <text
                      className={`topNavLabel ${isActive ? "isActive" : ""}`}
                      x={s.cx}
                      y={s.textY}
                      textAnchor="middle"
                      onClick={() => scrollToId(s.id)}
                    >
                      {s.label}
                    </text>
                  </g>
                );
              })}
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

          {/* Main hero card, role makes it accessible*/}
          <div className="card" role="region" aria-label="Hero content">
            <h1 className="title">{content.title}</h1>

            <p className="subtitle">
              {content.subtitle.split("\n").map((line, i) => (
                <span key={i} className="subtitleLine">
                  {line}
                </span>
              ))}
            </p>

            {/* double arrow */}
            <div
              className="scrollIcon"
              onClick={() => scrollToId("about")}
              role="button"
              tabIndex={0}
              aria-label="Scroll to see next"
              title="Scroll to see next"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") scrollToId("about");
              }}
            >
              <span className="chev chev1" aria-hidden="true" />
              <span className="chev chev2" aria-hidden="true" />
            </div>
          </div>

          <div className="bottomHint">Scroll down to explore</div>
        </div>
      </div>

      {/* about- GSAP pinned section */}
      <section id="about">
        <About />
      </section>

      {/* path placeholder */}
      <section id="path" className="pathPlaceholder">
        <div className="pathCopy">Path page placeholder</div>
      </section>
    </>
  );
}
