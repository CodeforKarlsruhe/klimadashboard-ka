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

  return NextResponse.json({
    data: data,
  });
}
