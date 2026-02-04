import React, { useEffect, useState } from "react";
import "./GhostChart.css";

export default function GhostChart() {
  const modes = ["scatter", "bar", "line", "bubble", "radial"];
  const [mode, setMode] = useState("scatter");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % modes.length;
      setMode(modes[i]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ghost-stage">

      {/* GRID */}
      <div className="grid" />

      {mode === "scatter" && <Scatter />}
      {mode === "bar" && <Bars />}
      {mode === "line" && <Line />}
      {mode === "bubble" && <Bubbles />}
      {mode === "radial" && <Radial />}

    </div>
  );
}

/* ===== MODES ===== */

const Scatter = () =>
  [...Array(40)].map((_, i) => (
    <div
      key={i}
      className="scatter"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
    />
  ));

const Bars = () =>
  [...Array(12)].map((_, i) => (
    <div
      key={i}
      className="bar"
      style={{
        left: `${i * 8 + 10}%`,
        height: `${Math.random() * 50 + 20}%`
      }}
    />
  ));

const Line = () => (
  <svg className="line" viewBox="0 0 100 100">
    <polyline
      points="0,60 20,40 40,50 60,30 80,45 100,25"
      fill="none"
      stroke="white"
    />
  </svg>
);

const Bubbles = () =>
  [...Array(10)].map((_, i) => (
    <div
      key={i}
      className="bubble"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 40 + 20}px`,
        height: `${Math.random() * 40 + 20}px`
      }}
    />
  ));

const Radial = () =>
  [...Array(6)].map((_, i) => (
    <div
      key={i}
      className="radial"
      style={{ transform: `rotate(${i * 60}deg)` }}
    />
  ));
