
export enum DataStateEnum{
    LOADING,
    LOADED,
    ERROR
}


export interface DataState<T>{
    dataState:DataStateEnum
    data?:T
    errMsg?:string
}