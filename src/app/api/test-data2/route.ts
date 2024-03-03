import * as dsv from "d3-dsv";
import {NextRequest, NextResponse} from "next/server";
import {STR} from "./ODD24_Monitoring_Klimaschutz_KA2022";

const fmt = dsv.dsvFormat(";");

export type returnEntryType = [string, string, string, number];

interface dataRowType {
    Maßnahme: string;
    Jahr: string;

    [year: string]: string;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    const dataRows = fmt.parse(STR);

    const trimmedDataRows: dataRowType[] = dataRows.map((dataRow) => {
        const trimmedKeyValuePairs = Object.entries(dataRow).map(([key, value]) => [key.trim(), value.trim()]);
        return Object.fromEntries(trimmedKeyValuePairs)
    });

    const returnData: returnEntryType[] = trimmedDataRows.flatMap((dataRow: dataRowType) => {
            const yearKeys = Object.keys(dataRow).filter(key => key.startsWith("20"))
            return yearKeys.map(yearKey => {
                const yearValue = dataRow[yearKey];
                const yearValueCleaned = yearValue.replace(".", "").replace(",", ".");
                const yearValueNumber = Number.parseFloat(yearValueCleaned)
                const returnEntry: returnEntryType = [dataRow.Maßnahme, dataRow.Jahr, yearKey, yearValueNumber]
                return returnEntry
            });
        }
    );

    return NextResponse.json({
        data: returnData,
    });
}
