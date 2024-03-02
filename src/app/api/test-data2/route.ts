import * as d3 from "d3";
import * as geo from "d3-geo";
import * as dsv from "d3-dsv";
import { NextRequest, NextResponse } from "next/server";
import { STR } from "./ODD24_Monitoring_Klimaschutz_KA2022";

const fmt = dsv.dsvFormat(";");

export async function GET(
  req: NextRequest,
): Promise<NextResponse> {
  let agg: {
    time: string;
    min: number;
    max: number;
    mean: number;
  }[] = [];

  const data = fmt.parse(STR);

  const data2 = data.map((x) =>
    Object.fromEntries(Object.entries(x).map((x) => [x[0].trim(), x[1].trim()]))
  );

  const data3 = data2.flatMap((x) =>
    Object.keys(x).filter((x) => x.startsWith("20"))
      .map(
        (
          y,
        ) => [
          x["Maßnahme"],
          x["Jahr"],
          y,
          Number.parseFloat(x[y].replace(".", "").replace(",", ".")),
        ],
      )
  );

  return NextResponse.json({
    data: data3,
  });
}
