"use client";

import { ElementRef, useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useData1 } from "@/app/data";

const ExampleChart: React.FC = () => {
  const chartRef = useRef<ElementRef<"div">>(null);

  const { data, isError, isLoading } = useData1();

  useEffect(() => {
    if (isLoading || isError || !data) {
      return;
    }

    const mappedData = Object.values(data).map((d: any) => ({
      a: d[0],
      b: d[1],
    }));

    const chart = Plot.plot({
      x: { padding: 0.4 },
      marks: [Plot.barY(mappedData, { x: "a", y: "b", fill: "green" })],
    });

    chartRef.current?.append(chart);
    return () => chart.remove();
  }, [data, isError, isLoading]);

  return (
    <div className="bg-white text-black" ref={chartRef}>
      Data: {JSON.stringify(data)}
    </div>
  );
};

export default ExampleChart;
