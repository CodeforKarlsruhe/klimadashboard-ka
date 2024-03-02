import * as d3 from "d3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
): Promise<NextResponse> {
  const data = await d3.csv(
    "https://transparenz.karlsruhe.de/dataset/ad0659b0-9e4b-408a-8840-3f19d5ec743d/resource/df843a83-b3f6-4929-b6a8-96471508f6f2/download/sensordaten_karlsruhe_bodentemperatur_bodenfeuchte_oct_2023.csv",
  );

  console.log(data);

  return NextResponse.json({
    data: [[Date.now() - 10000, 10], [Date.now(), 1]],
  });
}
