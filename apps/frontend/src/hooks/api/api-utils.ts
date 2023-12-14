import {UseQueryResult} from "react-query";

export type QueryResult<TData, TError = unknown> = Pick<
    UseQueryResult<TData, TError>,
    "isLoading" | "data" | "isError" | "error"
>;