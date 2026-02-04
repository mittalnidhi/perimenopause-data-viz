import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./FactorsNetwork.css";

export default function FactorsNetwork() {
  const svgRef = useRef();
  const [active, setActive] = useState(null);

  // this is comma seperated list. which means whenever this list updates, the side effect function also updates
  const factors = [
    {
      id: "Lifestyle",
      details: [
        "Stress levels",
        "Sleep quality",
        "Physical activity",
        "Diet and nutrition",
        "Smoking and alcohol use"
      ]
    },
    {
      id: "Biological",
      details: [
        "Hormonal fluctuations",
        "Age",
        "Genetics",
        "Ovarian function"
      ]
    },
    {
      id: "Medical",
      details: [
        "Chronic illness",
        "Medications",
        "Surgery history",
        "Cancer treatment"
      ]
    },
    {
      id: "Psychological",
      details: [
        "Anxiety",
        "Depression",
        "Emotional stress",
        "Mental health history"
      ]
    },
    {
      id: "Social",
      details: [
        "Ethnicity",
        "Healthcare access"
      ]
    }
  ];
// this is the first side effect function of useEffect which means it'll contain sth
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 500;
    const height = 420;

    const center = { id: "Perimenopause" };

    const nodes = [center, ...factors.map(f => ({ id: f.id }))];

    const links = factors.map(f => ({
      source: "Perimenopause",
      target: f.id
    }));

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-220))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link");

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", d => (d.id === "Perimenopause" ? 28 : 18))
      .attr("class", d =>
        d.id === "Perimenopause" ? "node-center" : "node-factor"
      )
      .on("mouseenter", (e, d) => {
        if (d.id !== "Perimenopause") setActive(d.id);
      })
      .on("mouseActive", () => setActive(null)); //mouseLeave changed to mouseActive to prevent crash

    const labels = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "label")
      .text(d => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      labels
        .attr("x", d => d.x)
        .attr("y", d => d.y + 4);
    });
  }, []);

  const selectedFactor = factors.find(f => f.id === active);

  // second- this return is use effect's clean up function
  return (
    <div className="network-wrapper">
      <svg ref={svgRef} width={500} height={420} />

      {selectedFactor && (
        <div className="factor-details">
          <h4>{selectedFactor.id}</h4>
          <ul>
            {selectedFactor.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}