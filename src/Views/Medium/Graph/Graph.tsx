import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "./Graph.module.css";

interface GraphProps {
  data: { week: number; score: number }[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.week) as [number, number])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.score) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll("*").remove();

    const line = d3
      .line<{ week: number; score: number }>()
      .x(d => x(d.week))
      .y(d => y(d.score));

    svg
      .append("path")
      .datum(data)
      .attr('class', styles.line) 
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr('class', styles.dot) 
      .attr("cx", d => x(d.week))
      .attr("cy", d => y(d.score))
      .attr("r", 5)
      .attr("fill", "red");
  }, [data]);

  return <svg ref={svgRef} className={styles.svg}></svg>;
};

export default Graph;