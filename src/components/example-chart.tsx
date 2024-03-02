import { ElementRef, useEffect, useRef, useState } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

const ExampleChart: React.FC = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!data) {
      return;
    }
  }, [data]);

  return <div ref={chartRef}>Chart</div>;
};

export default ExampleChart;
