"use server";

import { CandyData } from "./interfaces";

const API_ENDPOINT = "https://majazocom.github.io/Data/candyshop.json";

export async function fetchCandy(): Promise<CandyData[]> {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
        throw new Error(`Error HTTP status ${response.status}: ${response.statusText}`);
    } 
    const data: CandyData[] = await response.json();

    if (!Array.isArray(data)) {
        throw new Error ("Invalid data format received");
    }
    
    return data;
}