"use client";

import {ElementRef, useEffect, useRef} from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {useData1} from "@/app/data";
import Card from "./Card";
import {SensorDataEntry} from "@/app/api/models";

interface aggregationEntry {
    time: Date;
    v: number;
    c: "Maximaltemperatur" | "Mindesttemperatur" | "Durchschnittstemperatur"
}

const ExampleChart: React.FC = () => {
    const {data, isError, isLoading} = useData1();

    const containerRef = useRef<ElementRef<"div">>(null);


    useEffect(() => {
        const dataFactory = () =>
            d3.map(data.data, (entry) => ({...entry, time: new Date(entry.time)}))
                .flatMap(
                    (x: SensorDataEntry) => {
                        const aggregationEntries: aggregationEntry[] = [
                            {time: x.time, v: x.min, c: "Mindesttemperatur"},
                            {time: x.time, v: x.max, c: "Maximaltemperatur"},
                            {time: x.time, v: x.mean, c: "Durchschnittstemperatur"}
                        ];
                        return aggregationEntries;
                    }
                );

        if (isLoading || !data) return;
        const plot = Plot.plot({
            color: {legend: true},
            marks: [
                Plot.line(dataFactory(), {x: "time", y: "v", stroke: "c",}),
                Plot.ruleY([0]),
                Plot.crosshair(dataFactory(), {x: "time", y: "v"}),
            ],
        });
        containerRef.current!.append(plot);
        return () => plot.remove();
    }, [isLoading, data]);

    return (
        <Card
            title="Temperaturverlauf"
            description="Mindest-, Durchschnitts- und Maximaltemperatur am Friedrichsplatz"
        >
            <div ref={containerRef}/>
        </Card>
    );
};

export default ExampleChart;
