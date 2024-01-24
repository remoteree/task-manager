import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const ref = useRef();
  const svgRef = useRef(); // Ref for the SVG element

  useEffect(() => {
    const width = 450, height = 450, margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    if (!svgRef.current) {
      // Append SVG only if it doesn't already exist
      svgRef.current = d3.select(ref.current)
        .append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", `translate(${width / 2}, ${height / 2})`);
    }

    const svg = svgRef.current;

    // Clear any existing elements inside the SVG
    svg.selectAll("*").remove();

    // Create data map
    const pieData = data.categories.map(cat => ({
      name: cat.category,
      value: cat.min_taken,
      min: cat.min_taken // Storing min for label
    }));

    // Calculate total min for percentage calculation
    const totalMin = pieData.reduce((acc, curr) => acc + curr.value, 0);

    // Set the color scale
    const color = d3.scaleOrdinal()
      .domain(pieData.map(d => d.name))
      .range(d3.schemeCategory10);

    // Compute the position of each group on the pie
    const pie = d3.pie().value(d => d.value);
    const data_ready = pie(pieData);

    // Shape helper to build arcs
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    // Build the pie chart
    svg.selectAll('slices')
      .data(data_ready)
      .enter()
      .append('path')
        .attr('d', arcGenerator)
        .attr('fill', d => color(d.data.name))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    // Add labels
    svg.selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
        .text(d => `${d.data.name}: ${d.data.min} min (${((d.data.min / totalMin) * 100).toFixed(1)}%)`)
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 14);

  }, [data]); // Redraw chart when data changes

  return <div ref={ref}></div>;
};

export default PieChart;
