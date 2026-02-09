// Home.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./home.css";
import About from "./About";

export default function Home() {
  const [active, setActive] = useState("home");

  const content = useMemo(() => {
    return {
      title: "The Invisible Data",
      subtitle: "Mapping the Perimenopausal Data Gap\nin Women’s Health",
    };
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const homeEl = document.getElementById("home");
    const aboutEl = document.getElementById("about");
    const pathEl = document.getElementById("path");

    const targets = [homeEl, aboutEl, pathEl].filter(Boolean);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (!mostVisible) return;

        if (mostVisible.target.id === "home") setActive("home");
        if (mostVisible.target.id === "about") setActive("about");
        if (mostVisible.target.id === "path") setActive("path");
      },
      { threshold: [0.55, 0.65, 0.75] }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* HOME */}
      <div className="page" id="home">
        {/* Top-right mini path nav */}
        <div className="topNav" aria-label="Home / About / Path navigation">
          <svg className="topNavSvg" viewBox="0 0 260 70" role="img">
            <path d="M30 25 L125 45 L230 35" className="topNavLine" fill="none" />
            <g className="topNavNodeGroup">
              {/* HOME */}
              <circle
                className={`topNavDot ${active === "home" ? "isActive" : ""}`}
                cx="30"
                cy="25"
                r="5"
                onClick={() => scrollToId("home")}
              />
              <text
                className={`topNavLabel ${active === "home" ? "isActive" : ""}`}
                x="30"
                y="14"
                textAnchor="middle"
                onClick={() => scrollToId("home")}
              >
                Home
              </text>

              {/* about */}
              <circle
                className={`topNavDot ${active === "about" ? "isActive" : ""}`}
                cx="125"
                cy="45"
                r="5"
                onClick={() => scrollToId("about")}
              />
              <text
                className={`topNavLabel ${active === "about" ? "isActive" : ""}`}
                x="125"
                y="66"
                textAnchor="middle"
                onClick={() => scrollToId("about")}
              >
                About
              </text>

              {/* path */}
              <circle
                className={`topNavDot ${active === "path" ? "isActive" : ""}`}
                cx="230"
                cy="35"
                r="5"
                onClick={() => scrollToId("path")}
              />
              <text
                className={`topNavLabel ${active === "path" ? "isActive" : ""}`}
                x="230"
                y="56"
                textAnchor="middle"
                onClick={() => scrollToId("path")}
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
