import React, { useEffect, useState } from "react";
import "./HeatmapGhost.css";

export default function HeatmapGhost() {
  const [cells, setCells] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    generate();

    setTimeout(() => setShow(true), 5000);

    const interval = setInterval(generate, 3500);
    return () => clearInterval(interval);
  }, []);

  const clusters = [
    { x: 15, y: 20 },
    { x: 80, y: 15 },
    { x: 70, y: 60 },
    { x: 20, y: 65 },
    { x: 50, y: 85 }
  ];

  const generate = () => {
    const newCells = [];

    clusters.forEach(cluster => {
      const count = Math.floor(Math.random() * 6) + 4;

      for (let i = 0; i < count; i++) {
        newCells.push({
          id: Math.random(),
          x: cluster.x + (Math.random() * 20 - 10),
          y: cluster.y + (Math.random() * 20 - 10),
          opacity: Math.random() * 0.6 + 0.15,
          size: Math.random() * 14 + 10
        });
      }
    });

    setCells(newCells);
  };

  return (
    <div className={`heatmap-container ${show ? "show" : ""}`}>
      {cells.map(cell => (
        <div
          key={cell.id}
          className="heat-cell"
          style={{
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            width: cell.size,
            height: cell.size,
            opacity: cell.opacity
          }}
        />
      ))}
    </div>
  );
}
