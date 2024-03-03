import * as d3 from "d3";
import {NextRequest, NextResponse} from "next/server";
import csvInput from './data';
import {GreenHouseGasEntry} from "@/app/api/models";

export async function GET(req: NextRequest,): Promise<NextResponse> {
    const data: GreenHouseGasEntry[] = d3.csvParse(csvInput);
    return NextResponse.json({data: data,});
}