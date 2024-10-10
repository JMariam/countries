/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import CustomDropdown from "@/components/Filter";

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

const regions = ['Filter by Region', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]); // Type the state as an array of country
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("Filter by Region");

  useEffect(() => {
    // Fetch the data from the JSON file
    axios
      .get("/data.json") // Ensure the path is correct
      .then((response) => {
        setCountries(response.data); // Set the data as an array
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // Set the error message if something goes wrong
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter countries based on the search query and selected region
    const filtered = countries.filter((country) => {
      const matchesSearchQuery =
        (country.name &&
          country.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (country.capital &&
          country.capital.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (country.population &&
          country.population.toString().includes(searchQuery));

      const matchesRegion =
        selectedRegion === "Filter by Region" || country.region === selectedRegion;

      return matchesSearchQuery && matchesRegion;
    });

    setFilteredCountries(filtered);
  }, [searchQuery, selectedRegion, countries]);

  if (loading)
    return (
      <p className="text-[20px] text-very-dark-blue dark:text-white">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="bg-very-light-grey dark:bg-dark-mode-background">
      <Header />
      <div className="mt-10 mb-14 w-[90%] m-auto p-6 flex justify-between items-center">
        <div className="text-dark-grey dark:text-very-light-grey flex items-center gap-4 bg-white dark:bg-dark-mode-element w-[30rem] rounded shadow p-3">
          <IoIosSearch className="text" />{" "}
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent placeholder:text-dark-grey outline-none w-[26rem]"
          />
        </div>
        {/* <div className="text-dark-grey dark:text-very-light-grey flex items-center gap-4 bg-white dark:bg-dark-mode-element  rounded shadow p-3">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="outline-none bg-white dark:bg-dark-mode-element  cursor-pointer"
          >
            <option value="All">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div> */}
        <CustomDropdown
        options={regions}
        selected={selectedRegion}
        onSelect={(value) => setSelectedRegion(value)}
      />
      </div>
      <div className="w-[90%] m-auto  p-3 lg:p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-16">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              // {data.map((country, index) => (
              <Link href={`/details/${country.area}`} key={index}>
                <div className="bg-white dark:bg-dark-mode-element rounded-sm">
                  <img
                    src={country.flags.png}
                    alt=""
                    className="h-60 lg:h-44 w-full"
                  />
                  <div className="p-6">
                    <p className="font-bold text-[20px] leading-[23px] text-very-dark-blue dark:text-white">
                      {country.name}
                    </p>
                    <div className="mt-3 grid gap-1 text-very-dark-blue dark:text-white">
                      <p className="font-bold text-[16px] leading-[20px]">
                        Population:{" "}
                        <span className="font-semibold">
                          {country.population}
                        </span>
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
            ))
          ) : (
            <p className="font-bold text-[20px] leading-[23px] text-very-dark-blue dark:text-white">
              No countries match your search.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
