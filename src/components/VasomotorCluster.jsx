import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./vasomotorCluster.css";

const WIDTH = 520;
const HEIGHT = 420;

const symptoms = [
  { name: "Hot flashes", color: "#ff6b6b", x: 150, y: 140 },
  { name: "Night sweats", color: "#f7c948", x: 380, y: 130 },
  { name: "Sleep disturbance", color: "#6ed3b0", x: 220, y: 320 },
  { name: "Anxiety", color: "#5f9cff", x: 360, y: 300 }
];

export default function VasomotorCluster() {
  const svgRef = useRef();
  const [value, setValue] = useState(0);

  // create points
  const nodes = useRef(
    symptoms.flatMap((s) =>
      d3.range(60).map(() => ({
        symptom: s.name,
        color: s.color,
        x: s.x + Math.random() * 30,
        y: s.y + Math.random() * 30
      }))
    )
  );

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    const circles = svg
      .selectAll("circle")
      .data(nodes.current)
      .join("circle")
      .attr("r", 4)
      .attr("fill", (d) => d.color)
      .attr("opacity", 0.85);

    const simulation = d3
      .forceSimulation(nodes.current)
      .force(
        "x",
        d3.forceX((d) =>
          d3.interpolateNumber(
            symptoms.find((s) => s.name === d.symptom).x,
            WIDTH / 2
          )(value)
        ).strength(0.08)
      )
      .force(
        "y",
        d3.forceY((d) =>
          d3.interpolateNumber(
            symptoms.find((s) => s.name === d.symptom).y,
            HEIGHT / 2
          )(value)
        ).strength(0.08)
      )
      .force("collide", d3.forceCollide(5))
      .on("tick", () => {
        circles
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y);
      });

    return () => simulation.stop();
  }, [value]);

  return (
    <div className="cluster-card">
      <h2>Vasomotor Symptom Co-occurrence</h2>

      <svg
        ref={svgRef}
        width={WIDTH}
        height={HEIGHT}
        className="cluster-svg"
      />

      <div className="slider-row">
        <span>Separate</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <span>Co-occurring</span>
      </div>
    </div>
  );
}

