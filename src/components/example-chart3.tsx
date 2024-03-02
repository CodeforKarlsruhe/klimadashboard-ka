"use client";

import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useData3 } from "@/app/data";
import Card from "./Card";

const ExampleChart: React.FC = () => {
  const { data, isError, isLoading } = useData3();

  const containerRef = useRef();

  const d = () =>
    d3.map(data.data, (x) => ({ ...x, time: new Date(x.combinedTime) }));

  useEffect(() => {
    if (isLoading || !data) return;
    const plot = Plot.plot({
      marks: [
        Plot.line(d(), {
          x: "time",
          y: "PM10",
        }),
        Plot.ruleY([0]),
      ],
    });
    containerRef.current.append(plot);
    return () => plot.remove();
  }, [isLoading, data]);

  return (
    <Card title="Example chart 3" description="Description of example chart 3">
      <div ref={containerRef} />
    </Card>
  );
};

export default ExampleChart;
