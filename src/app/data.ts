"use client";

import useSWR from "swr";
import {FeinstaubDataEntry, GreenHouseGasEntry, SensorDataEntryJSON} from "@/app/api/models";

const fetcher = (
    input: URL | RequestInfo,
    init?: RequestInit | undefined,
) => fetch(input, init).then((res) => res.json());

export function useData1(): {
    data: { data: SensorDataEntryJSON[] },
    isLoading: boolean,
    isError: boolean,
} {
    const {data, error, isLoading} = useSWR(`/api/test-data`, fetcher);
    return {data, isLoading, isError: error};
}

export function useData3(): {
    data: { data: FeinstaubDataEntry[] },
    isLoading: boolean,
    isError: boolean,
} {
    const {data, error, isLoading} = useSWR(`/api/test-data3`, fetcher);
    return {data, isLoading, isError: error};
}

export function useData4(): {
    data: { data: GreenHouseGasEntry[] },
    isLoading: boolean,
    isError: boolean,
} {
    const {data, error, isLoading} = useSWR(`/api/test-data4`, fetcher);
    return {data, isLoading, isError: error};
}

