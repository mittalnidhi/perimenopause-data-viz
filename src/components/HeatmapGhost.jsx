import React, { useEffect, useRef, useState } from "react";
import "./HeatmapGhost.css";

export default function HeatmapGhost() {
  const [cells, setCells] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // generate ONCE
    const initial = [];

    for (let i = 0; i < 40; i++) {
      initial.push({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.35 + 0.15,
        size: Math.random() * 18 + 12
      });
    }

    setCells(initial);

    // appear after 5 seconds
    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`heatmap-container ${visible ? "show" : ""}`}>
      {cells.map(cell => (
        <div
          key={cell.id}
          className="heat-cell"
          style={{
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            opacity: cell.opacity,
            width: cell.size,
            height: cell.size
          }}
        />
      ))}
    </div>
  );
}
