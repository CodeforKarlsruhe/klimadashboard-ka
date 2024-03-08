"use client";
import Card from "@/components/Card";
import * as Plot from "@observablehq/plot";
import {ElementRef, useEffect, useMemo, useRef} from "react";
import useSWR from "swr";
import {returnEntryType} from "@/app/api/test-data2/route";
import {yearValuePair} from "@/components/models";

const fetcher = (input: URL | RequestInfo, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

const CarsharingChart = () => {
    const containerRef = useRef<ElementRef<"div">>(null);

    const {data} = useSWR("api/test-data2", fetcher);

    const data2 = useMemo(
        () => {
            const testData2: returnEntryType[] | undefined = data?.data;
            const carsharingEntries = testData2?.filter(entry => entry[1] === "Angemeldete Carsharing-Nutzer*");
            const carsharingData: yearValuePair[] | undefined = carsharingEntries?.map(entry => ({
                year: entry[2],
                value: entry[3]
            }))
            return carsharingData
        },
        [data]
    );

    useEffect(() => {
        if (data2) {
            const plot = Plot.plot({
                color: {legend: true, scheme: "BuYlRd"},
                marks: [Plot.lineY(data2, {x: "year", y: "value"})],
            });
            containerRef.current?.append(plot);
            return () => plot.remove();
        }
    }, [data2]);

    return (
        <Card title="Angemeldete Carsharing-Nutzer" description="Teilnehmende an Carsharing-Angeboten">
            <div ref={containerRef}/>
        </Card>
    );
};

export default CarsharingChart;
