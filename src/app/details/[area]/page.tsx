/* eslint-disable @next/next/no-img-element */
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

// Define the country type
interface Flags {
  png: string;
}
interface Currencies {
  name: string;
}
interface Languages {
  name: string;
}
interface Country {
  capital: string;
  area: number;
  name: string;
  population: number;
  flags: Flags;
  region: string;
  subregion: string;
  topLevelDomain: string;
  nativeName: string;
  currencies: Currencies[];
  languages: Languages[];
  borders: string[];
}

export default function Details() {
  const pathname = usePathname();
  const area = Number(pathname.split("/").pop()); // Convert 'area' from the path to a number
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isNaN(area)) {
      // Ensure 'area' is a valid number
      axios
        .get("/data.json")
        .then((response) => {
          const countries: Country[] = response.data;
          const selectedcountry = countries.find(
            (country) => country.area === area
          );
          if (selectedcountry) {
            setCountry(selectedcountry);
          } else {
            setError("country not found");
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setError("Invalid Country");
      setLoading(false);
    }
  }, [area]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="bg-very-light-grey dark:bg-dark-mode-background min-h-screen">
      <Header />
      <div className="w-[90%] m-auto">
        <Link
          href="/"
          className="my-8 lg:mt-6 lg:mb-14 shadow text-dark-grey dark:text-very-light-grey dark:bg-dark-mode-element bg-white flex gap-2 text-[12px] rounded w-fit items-center py-1 px-5"
        >
          <FaArrowLeft /> Back
        </Link>
        {country && (
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-32">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name}`}
              className="w-full lg:w-2/5"
            />
            <div className="flex flex-col gap-10 lg:gap-12">
              <p className="font-bold text-[26px] leading-[23px] text-very-dark-blue dark:text-white">
                {country.name}
              </p>
              <div className="flex flex-col lg:flex-row gap-8  lg:gap-24 items-start">
                <div className="grid gap-2 text-very-dark-blue dark:text-very-light-grey">
                  <p className="font-bold text-[13px] leading-[17px]">
                    Native Name:{" "}
                    <span className="font-semibold text-dark-grey">
                      {country.nativeName}
                    </span>
                  </p>
                  <p className="font-bold text-[13px] leading-[17px]">
                    Population:{" "}
                    <span className="font-semibold text-dark-grey">
                      {country.population}
                    </span>
                  </p>
                  <p className="font-bold text-[13px] leading-[17px]">
                    Region:{" "}
                    <span className="font-semibold text-dark-grey">
                      {country.region}
                    </span>
                  </p>
                  <p className="font-bold text-[13px] leading-[17px]">
                    Sub region:{" "}
                    <span className="font-semibold text-dark-grey">
                      {country.subregion}
                    </span>
                  </p>
                  <p className="font-bold text-[13px] leading-[17px]">
                    Capital:{" "}
                    <span className="font-semibold text-dark-grey">
                      {country.capital}
                    </span>
                  </p>
                </div>
                <div className="grid gap-2 text-very-dark-blue dark:text-very-light-grey">
                  <p className="font-bold text-[13px] leading-[17px]">
                    Top Level Domain:{" "}
                    <span className="font-semibold text-dark-grey">
                      {country.topLevelDomain}
                    </span>
                  </p>
                  <div className="flex gap-1 font-bold text-[13px] leading-[17px] text-very-dark-blue dark:text-very-light-grey">
                    Currencies:
                    {country.currencies.map((currency, index) => (
                      <div
                        key={index}
                        className="font-bold text-[13px] leading-[17px]"
                      >
                        <h3 className="font-semibold text-dark-grey">
                          {currency.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1 font-bold text-[13px] leading-[17px] text-very-dark-blue dark:text-very-light-grey">
                    Languages:
                    {country.languages.map((language, index) => (
                      <div
                        key={index}
                        className="font-bold text-[13px] leading-[17px]"
                      >
                        <h3 className="font-semibold text-dark-grey">
                          {language.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {country.borders && country.borders.length > 0 ? (
                <div className="lg:mt-6 flex flex-wrap justify-center items-center gap-3 font-bold text-[13px] leading-[17px] text-very-dark-blue dark:text-very-light-grey">
                  Border Countries:
                  {country.borders.map((border, index) => (
                    <div key={index} className="">
                      <h3 className="font-semibold shadow bg-white rounded text-dark-grey dark:text-very-light-grey dark:bg-dark-mode-element w-fit py-1 px-5">
                        {border}
                      </h3>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-bold text-[20px] text-very-dark-blue dark:text-very-light-grey">
                  There is no borders!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
