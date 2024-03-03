"use client";
import Card from "@/components/Card";
import * as Plot from "@observablehq/plot";
import {ElementRef, useEffect, useMemo, useRef} from "react";
import useSWR from "swr";
import {returnEntryType} from "@/app/api/test-data2/route";
import {yearSourceValue} from "@/components/models";

const fetcher = (input: URL | RequestInfo, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

const EnergySectorChart = () => {
    const containerRef = useRef<ElementRef<"div">>(null);

    const {data} = useSWR("api/test-data2", fetcher);

    const data2 = useMemo(
        () => {
            const testData2: returnEntryType[] | undefined = data?.data;
            const energySectorEntries = testData2?.filter(entry => entry[0] === "Energieverbrauch nach Sektoren");
            const energySectorData: yearSourceValue[] | undefined = energySectorEntries?.map(entry => ({
                year: entry[2],
                source: entry[1],
                value: entry[3]
            }))
            return energySectorData
        },
        [data]
    );

    useEffect(() => {
        if (data2) {
            const plot = Plot.plot({
                color: {legend: true, scheme: "BuYlRd"},
                marks: [
                    Plot.barY(data2, {x: "year", y: "value", fill: "source"}),
                    Plot.crosshair(data2, {x: "year", y: "value"}),
                ],
            });
            containerRef.current!.append(plot);
            return () => plot.remove();
        }
    }, [data2]);

    return (
        <Card title="Energieverbrauch nach Sektoren" description="Einheit GWh">
            <div ref={containerRef}/>
        </Card>
    );
};

export default EnergySectorChart;
