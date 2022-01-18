import * as d3 from "d3";
import { useRef, useEffect } from "react";

import { Box } from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";
import { Bid } from "@/tokens/types/token";

interface IProps {
  bids?: Bid[];
}

export default function BidsGraph({ bids }: IProps): JSX.Element {
  const chartRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function renderChart(
    containerRef: HTMLDivElement,
    chartRef: SVGSVGElement,
    data: Bid[]
  ): void {
    const width = containerRef.getBoundingClientRect().width;
    const height = containerRef.getBoundingClientRect().height;
    const svg = d3.select(chartRef).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const maxBid = d3.max(data, ({ bid_price }) => bid_price);
    const xDomain = d3.extent(data, ({ bid_time }) =>
      DateTime.parse(bid_time).toJSDate()
    );

    const yAxis = d3
      .scaleLinear()
      .domain([0, maxBid as number])
      .range([height - 30, 0]);

    // @ts-expect-error: d3 error
    const xAxis = d3.scaleTime().domain(xDomain).range([0, width]);

    svg
      .append("g")
      .attr("transform", "translate(32, -20)")

      .call(d3.axisLeft(yAxis));

    const xAxisTranslate = height - 50;
    svg
      .append("g")
      .attr("transform", `translate(32, ${xAxisTranslate})`)
      .call(
        d3
          .axisBottom(xAxis)
          .tickFormat(d3.timeFormat("%Y-%m-%d"))
          .ticks(d3.timeDay.every(1))
      );

    svg
      .append("path")
      .datum(data)
      .attr(
        "d",
        d3
          .line<Bid>()
          .x(({ bid_time }) => xAxis(DateTime.parse(bid_time).toJSDate()))
          .y(({ bid_price }) => yAxis(bid_price))
      )
      .style("fill", "none")
      .style("stroke", "#fff")
      .style("stroke-width", "2");

    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", ({ bid_time }) => xAxis(DateTime.parse(bid_time).toJSDate()))
      .attr("cy", ({ bid_price }) => yAxis(bid_price))
      .attr("r", 4)
      .style("fill", "red");
  }

  useEffect(() => {
    if (bids && chartRef.current && containerRef.current) {
      renderChart(containerRef.current, chartRef.current, bids);
    }
  }, [bids, chartRef, containerRef]);

  return (
    <Box ref={containerRef} w="100%" h={360}>
      <svg ref={chartRef} />
    </Box>
  );
}
