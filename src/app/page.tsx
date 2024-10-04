/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Link from "next/link";

interface User {
  name: string;
  population: number;
  capital: string;
  region: string;
  area: string;
  flags: object;
  png: string;
}
export default function Home() {
  const [data, setData] = useState<User[]>([]); // Type the state as an array of User
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
      <div className="w-[90%] m-auto p-6">
        <div className="grid grid-cols-4 gap-16">
          {data.map((user, index) => (
            <Link href={`/details/${user.area}`} key={index}>
              <div
                
                className="bg-white dark:bg-dark-mode-element rounded-sm"
              >
                <img src={user.flags.png} alt="" className="h-44 w-full" />
                <div className="p-6">
                  <p className="font-bold text-[20px] leading-[23px] text-very-dark-blue dark:text-white">
                    {user.name}
                  </p>
                  <div className="mt-3 grid gap-1 text-very-dark-blue dark:text-white">
                    <p className="font-bold text-[16px] leading-[20px]">
                      Population:{" "}
                      <span className="font-semibold">{user.population}</span>
                    </p>
                    <p className="font-bold text-[16px] leading-[20px]">
                      Region:{" "}
                      <span className="font-semibold">{user.region}</span>
                    </p>
                    <p className="font-bold text-[16px] leading-[20px]">
                      Capital:{" "}
                      <span className="font-semibold">{user.capital}</span>
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
