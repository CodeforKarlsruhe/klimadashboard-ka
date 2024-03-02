import { ElementRef, useEffect, useRef, useState } from "react";

const ExampleChart: React.FC = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {}, []);

  useEffect(() => {}, [data]);

  return <div ref={chartRef}>Chart</div>;
};

export default ExampleChart;
