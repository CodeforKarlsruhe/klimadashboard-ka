"use client";
import PlotFigure from "@/components/PlotFigure";
import Card from "@/components/Card";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";
import useSWR from "swr";

const fetcher = (input: URL | RequestInfo, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

const EnergyMixChart = () => {
  const containerRef = useRef();

  const { data } = useSWR("api/test-data2", fetcher);

  const data2 = useMemo(
    () =>
      data?.data
        ?.filter((d) => d[0] === "Energieverbrauch nach Energieträgern")
        .map((d) => ({
          year: d[2],
          source: d[1],
          value: d[3],
        })),
    [data]
  );
  console.log("xxx", data2);

  useEffect(() => {
    if (data2) {
      const plot = Plot.plot({
        color: { legend: true, scheme: "BuRd" },
        marks: [Plot.barY(data2, { x: "year", y: "value", fill: "source" })],
      });
      containerRef.current.append(plot);
      return () => plot.remove();
    }
  }, [data2]);

  return (
    <Card
      title="Energieverbrauch nach Energieträgern"
      description="Einheit GWh"
    >
      <div ref={containerRef} />
    </Card>
  );
};

export default EnergyMixChart;
