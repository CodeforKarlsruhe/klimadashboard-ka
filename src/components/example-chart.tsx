import { ElementRef, useEffect, useRef, useState } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useData1 } from "@/app/data";

const ExampleChart: React.FC = () => {
  const chartRef = useRef<ElementRef<"div">>(null);

  const { data, isError, isLoading } = useData1();

  useEffect(() => {}, []);

  useEffect(() => {
    if (isLoading || isError || !data) {
      return;
    }

    const chart = Plot.plot({});

    chartRef.current?.append(chart);
    return () => chart.remove();
  }, [data]);

  return <div ref={chartRef}>Chart</div>;
};

export default ExampleChart;
