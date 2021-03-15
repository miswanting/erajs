<template lang="pug">
.graph
</template>
<script>
import * as d3 from "d3";
export default {
  props: { data: Object },
  mounted() {
    const mode = this.data.data.mode;
    const rawData = this.data.data.data;
    // 常量定义
    const size = { width: 400, height: 300 };
    const margin = { top: 30, bottom: 30, left: 30, right: 30 };
    if (mode === "line") {
      // 数据处理
      const data = [];
      for (const key in rawData) {
        if (Object.hasOwnProperty.call(rawData, key)) {
          data.push({
            name: key,
            data: rawData[key],
          });
        }
      }
      const svg = d3
        .select(".graph")
        .append("svg")
        .attr("viewBox", [0, 0, size.width, size.height])
        .style("overflow", "visible");
      // 转换关系()
      const x = d3
        .scaleLinear()
        .domain([0, 100])
        .range([margin.left, size.width - margin.right]);
      const y = d3
        .scaleLinear()
        .domain([0, 50])
        .range([size.height - margin.bottom, margin.top]);
      // 坐标轴
      svg
        .append("g")
        .attr("transform", `translate(0,${size.height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(1));
      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(1));
      // 划线
      let line = d3
        .line()
        .x((d, i) => x(d[0]))
        .y((d, i) => y(d[1]));
      const path = svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .selectAll("path")
        .data(data)
        .join("path")
        .attr("d", (d) => line(d.data));
      function hover(svg, path) {
        const dot = svg.append("g").attr("display", "none");

        dot.append("circle").attr("r", 2.5);

        dot
          .append("text")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("text-anchor", "middle")
          .attr("y", -8);

        function moved(e) {
          e.preventDefault();
          const pointer = d3.pointer(e, this);
          const xm = x.invert(pointer[0]);
          const ym = x.invert(pointer[1]);
          const i = d3.bisectCenter(data.dates, xm);
          const s = d3.least(data, (d) => Math.abs(d.data[1] - ym));
          path
            .attr("stroke", (d) => (d === s ? null : "#fff"))
            .filter((d) => d === s)
            .raise();
          // dot.attr(
          //   "transform",
          //   `translate(${x(data.dates[i])},${y(s.values[i])})`
          // );
          console.log(s);
          dot.select("text").text(s.name);
        }

        function entered() {
          path.style("mix-blend-mode", null).attr("stroke", "#ddd");
          dot.attr("display", null);
        }

        function left() {
          path.style("mix-blend-mode", "multiply").attr("stroke", null);
          dot.attr("display", "none");
        }
        svg
          .on("mousemove", moved)
          .on("mouseenter", entered)
          .on("mouseleave", left);
      }
      svg.call(hover, path);
    }
  },
};
</script>