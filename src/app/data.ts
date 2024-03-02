"use client";

import useSWR from "swr";

const fetcher = (
  input: URL | RequestInfo,
  init?: RequestInit | undefined,
) => fetch(input, init).then((res) => res.json());

export function useData1() {
  const { data, error, isLoading } = useSWR(`/api/test-data`, fetcher);

  return {
    data: data,
    isLoading,
    isError: error,
  };
}

export function useData4() {
  const { data, error, isLoading } = useSWR(`/api/test-data4`, fetcher);

  return {
    data: data,
    isLoading,
    isError: error,
  };
}
