"use client";
import PlotFigure from "@/components/PlotFigure";
import Card from "@/components/card";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

const EnergyMixChart = () => {
  const containerRef = useRef();

  useEffect(() => {
    const plot = Plot.plot({
      color: { legend: true, scheme: "BuRd" },
      marks: [
        Plot.barY(
          [
            {
              year: 2020,
              source: "Erdgas",
              value: 1563.0,
            },
            {
              year: 2020,
              source: "Fernwärme",
              value: 905.0,
            },
            {
              year: 2020,
              source: "Heizöl",
              value: 542.0,
            },
            {
              year: 2020,
              source: "Kohle",
              value: 42.0,
            },
            {
              year: 2020,
              source: "Sonstige",
              value: 1495.0,
            },
            {
              year: 2020,
              source: "Strom",
              value: 1501.0,
            },
            {
              year: 2020,
              source: "Kraftstoffe",
              value: 1954.0,
            },
          ],
          { x: "year", y: "value", fill: "source" }
        ),
      ],
    });
    containerRef.current.append(plot);
    return () => plot.remove();
  }, []);

  return (
    <Card title="Energieträger" description="Einheit GWh">
      <div ref={containerRef} />
    </Card>
  );
};

export default EnergyMixChart;
