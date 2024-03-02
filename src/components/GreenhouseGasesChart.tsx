"use client";

import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useData4 } from "@/app/data";
import Card from "./Card";

const GreenhouseGasesChart: React.FC = () => {
  const { data, isError, isLoading } = useData4();

  const containerRef = useRef();

  useEffect(() => {
    if (isLoading || !data) return;

    const betterData = data.data.map(({ co2, ...x }) => ({
      co2: parseInt(co2),
      ...x,
    }));

    const plot = Plot.plot({
      color: { legend: true },
      marks: [
        Plot.dot(betterData, {
          x: "year",
          y: "co2",
          stroke: "category",
        }),
      ],
    });

    containerRef.current.append(plot);
    return () => plot.remove();
  }, [isLoading, data]);

  return (
    <Card title="Greenhouse Gases" description="Description of example chart">
      <div ref={containerRef} />
    </Card>
  );
};

export default GreenhouseGasesChart;
