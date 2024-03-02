"use client";

import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useData1 } from "@/app/data";
import Card from "./card";

const ExampleChart: React.FC = () => {
  const { data, isError, isLoading } = useData1();

  const containerRef = useRef();

  const d = () => d3.map(data.data, (x) => ({ ...x, time: new Date(x.time) }));
  console.log(d);

  useEffect(() => {
    if (isLoading || !data) return;
    const plot = Plot.plot({
      color: { legend: true, scheme: "BuRd" },
      marks: [
        Plot.cellX(d(), {
          x: (d) => d.time.getUTCDate(),
          y: (d) => d.time.getUTCMonth(),
          fill: "max",
        }),
      ],
    });
    containerRef.current.append(plot);
    return () => plot.remove();
  }, [isLoading, data]);

  return (
    <Card title="Example chart 2" description="Description of example chart 2">
      <div ref={containerRef} />
    </Card>
  );
};

export default ExampleChart;
