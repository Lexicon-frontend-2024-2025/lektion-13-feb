"use client";

import { fetchCandy } from "@/actions";
import { CandyData } from "@/interfaces";
import { useEffect, useState } from "react";

export default function Home() {
  const [candies, setCandies] = useState<CandyData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    console.log("Fetching candy data...");
    
    const loadData = async () => {
      try {
        const data = await fetchCandy();
        setCandies(data);
      } catch (err) {
        setError("Kunde inte ladda godisdata. Försök igen senare.");
        console.error("Fetch error:", err);
      }
    };
    loadData();
  }, []);

  if (error) {
    return <p style={{color: "red"}}>{error}</p>; // visar felmeddelandet i UI
  };

  return (
    <main>
      <p>{inputValue}</p>
      <input onChange={(e) => setInputValue(e.target.value)} type="text"></input>
      <ul>
        {
          candies.map((candy) => (
            <li key={candy.id}>
              {candy.name} - {candy.price} SEK
            </li>
          ))
        }
      </ul>
    </main>
  );
}
