import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./HormoneGraph.css";

export default function HormoneGraph() {
  const svgRef = useRef();
  const [active, setActive] = useState(null);

  const hormones = [
    {
      name: "Estrogen",
      color: "#E07A7A",
      relation:
        "Estrogen fluctuates widely in perimenopause. Drops in estrogen trigger rising FSH levels as the body attempts to stimulate the ovaries. Estrogen instability also disrupts progesterone balance.",
      values: [
        { age: 35, value: 80 },
        { age: 38, value: 65 },
        { age: 41, value: 90 },
        { age: 44, value: 55 },
        { age: 47, value: 40 },
        { age: 50, value: 25 }
      ]
    },
    {
      name: "Progesterone",
      color: "#9C89B8",
      relation:
        "Progesterone often declines earlier than estrogen due to irregular ovulation. Lower progesterone reduces estrogen stability and contributes to sleep disruption and anxiety.",
      values: [
        { age: 35, value: 70 },
        { age: 38, value: 55 },
        { age: 41, value: 45 },
        { age: 44, value: 30 },
        { age: 47, value: 20 },
        { age: 50, value: 10 }
      ]
    },
    {
      name: "FSH",
      color: "#6FA8DC",
      relation:
        "FSH increases as estrogen declines. Rising FSH is not a cause of symptoms but a response to reduced ovarian sensitivity — a core hormonal signal of perimenopause.",
      values: [
        { age: 35, value: 20 },
        { age: 38, value: 30 },
        { age: 41, value: 45 },
        { age: 44, value: 70 },
        { age: 47, value: 85 },
        { age: 50, value: 95 }
      ]
    },
    {
      name: "LH",
      color: "#88B7A5",
      relation:
        "LH becomes irregular as ovulation timing changes. Disrupted LH signaling reflects hormonal communication breakdown rather than absolute deficiency.",
      values: [
        { age: 35, value: 30 },
        { age: 38, value: 40 },
        { age: 41, value: 45 },
        { age: 44, value: 55 },
        { age: 47, value: 65 },
        { age: 50, value: 75 }
      ]
    },
    {
      name: "Testosterone",
      color: "#F2B880",
      relation:
        "Testosterone gradually declines with age. While subtler than estrogen shifts, its reduction contributes to fatigue, reduced libido, and muscle changes.",
      values: [
        { age: 35, value: 60 },
        { age: 38, value: 55 },
        { age: 41, value: 50 },
        { age: 44, value: 45 },
        { age: 47, value: 40 },
        { age: 50, value: 35 }
      ]
    }
  ];

  useEffect(() => {
    const width = 820;
    const height = 400;
    const margin = { top: 40, right: 120, bottom: 40, left: 60 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleLinear()
      .domain([35, 50])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    const area = d3
      .area()
      .x(d => x(d.age))
      .y0(height - margin.bottom)
      .y1(d => y(d.value))
      .curve(d3.curveCatmullRom);

    const line = d3
      .line()
      .x(d => x(d.age))
      .y(d => y(d.value))
      .curve(d3.curveCatmullRom);

    hormones.forEach(h => {
      svg
        .append("path")
        .datum(h.values)
        .attr("fill", h.color)
        .attr("opacity", 0.2)
        .attr("d", area);

      const path = svg
        .append("path")
        .datum(h.values)
        .attr("class", "hormone-line")
        .attr("stroke", h.color)
        .attr("data-name", h.name)
        .attr("d", line);

      const length = path.node().getTotalLength();

      path
        .attr("stroke-dasharray", length)
        .attr("stroke-dashoffset", length)
        .transition()
        .duration(1600)
        .ease(d3.easeCubicOut)
        .attr("stroke-dashoffset", 0);

      path
        .on("mouseenter", () => setActive(h))
        .on("mouseleave", () => setActive(null));
    });

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, []);

  return (
    <div className="hormone-wrapper">
      <svg ref={svgRef} width={820} height={400} />

      {active && (
        <div className="info-panel">
          <h4 style={{ color: active.color }}>{active.name}</h4>
          <p>{active.relation}</p>
        </div>
      )}
    </div>
  );
}
