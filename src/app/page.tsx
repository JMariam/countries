/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Link from "next/link";

interface Flags {
  png: string;
}
interface Country {
  name: string;
  population: number;
  capital: string;
  region: string;
  area: string;
  flags: Flags;
}
export default function Home() {
  const [data, setData] = useState<Country[]>([]); // Type the state as an array of country
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the data from the JSON file
    axios
      .get("/data.json") // Ensure the path is correct
      .then((response) => {
        setData(response.data); // Set the data as an array
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // Set the error message if something goes wrong
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="h-[100vh] bg-very-light-grey dark:bg-dark-mode-background text-[20px] text-very-dark-blue dark:text-white">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="bg-very-light-grey dark:bg-dark-mode-background">
      <Header />
      <div className="w-[90%] m-auto  p-3 lg:p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-16">
          {data.map((country, index) => (
            <Link href={`/details/${country.area}`} key={index}>
              <div
                
                className="bg-white dark:bg-dark-mode-element rounded-sm"
              >
                <img src={country.flags.png} alt="" className="h-56 lg:h-44 w-full" />
                <div className="p-6">
                  <p className="font-bold text-[20px] leading-[23px] text-very-dark-blue dark:text-white">
                    {country.name}
                  </p>
                  <div className="mt-3 grid gap-1 text-very-dark-blue dark:text-white">
                    <p className="font-bold text-[16px] leading-[20px]">
                      Population:{" "}
                      <span className="font-semibold">{country.population}</span>
                    </p>
                    <p className="font-bold text-[16px] leading-[20px]">
                      Region:{" "}
                      <span className="font-semibold">{country.region}</span>
                    </p>
                    <p className="font-bold text-[16px] leading-[20px]">
                      Capital:{" "}
                      <span className="font-semibold">{country.capital}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
