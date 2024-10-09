/* eslint-disable @next/next/no-img-element */
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

// Define the User type
interface Flags {
  png: string;
}
interface Currencies {
  name: string;
}
interface Languages {
  name: string;
}
interface User {
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isNaN(area)) {
      // Ensure 'area' is a valid number
      axios
        .get("/data.json")
        .then((response) => {
          const users: User[] = response.data;
          const selectedUser = users.find((user) => user.area === area);
          if (selectedUser) {
            setUser(selectedUser);
          } else {
            setError("User not found");
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
    <main className="bg-very-light-grey dark:bg-dark-mode-background h-[100vh]">
      <Header />
      <div className="w-[90%] m-auto">
        <Link
          href="/"
          className="my-8 lg:mt-6 lg:mb-14 shadow text-dark-grey dark:text-very-light-grey dark:bg-dark-mode-element bg-white flex gap-2 text-[12px] rounded w-fit items-center py-1 px-5"
        >
          <FaArrowLeft /> Back
        </Link>
        {user && (
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
            <img
              src={user.flags.png}
              alt={`Flag of ${user.name}`}
              className="w-full lg:w-2/5"
            />
            <div className="flex flex-col gap-10 lg:gap-12">
              <p className="font-bold text-[26px] leading-[23px] text-very-dark-blue dark:text-white">
                {user.name}
              </p>
              <div className="flex flex-col lg:flex-row gap-8  lg:gap-24 items-start">
                <div className="grid gap-2 text-very-dark-blue dark:text-very-light-grey">
                  <p className="font-bold text-[13px] leading-[17px]">
                    Native Name:{" "}
                    <span className="font-semibold text-dark-grey">
                      {user.nativeName}
                    </span>
                  </p>
                  <p className="font-bold text-[13px] leading-[17px]">
                    Population:{" "}
                    <span className="font-semibold text-dark-grey">
                      {user.population}
                    </span>
                  </p>
                  <p className="font-bold text-[13px] leading-[17px]">
                    Region:{" "}
                    <span className="font-semibold text-dark-grey">
                      {user.region}
                    </span>
                  </p>
                  <p className="font-bold text-[13px] leading-[17px]">
                    Sub region:{" "}
                    <span className="font-semibold text-dark-grey">
                      {user.subregion}
                    </span>
                  </p>
                  <p className="font-bold text-[13px] leading-[17px]">
                    Capital:{" "}
                    <span className="font-semibold text-dark-grey">
                      {user.capital}
                    </span>
                  </p>
                </div>
                <div className="grid gap-2 text-very-dark-blue dark:text-very-light-grey">
                  <p className="font-bold text-[13px] leading-[17px]">
                    Top Level Domain:{" "}
                    <span className="font-semibold text-dark-grey">
                      {user.topLevelDomain}
                    </span>
                  </p>
                  <div className="flex gap-1 font-bold text-[13px] leading-[17px] text-very-dark-blue dark:text-very-light-grey">
                    Currencies:
                    {user.currencies.map((currency, index) => (
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
                    {user.languages.map((language, index) => (
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
              <div className="lg:mt-6 flex flex-wrap justify-center items-center gap-3 font-bold text-[13px] leading-[17px] text-very-dark-blue dark:text-very-light-grey">
                Border Countries:
                {user.borders.map((border, index) => (
                  <div key={index} className="">
                    <h3 className="font-semibold shadow bg-white rounded text-dark-grey dark:text-very-light-grey dark:bg-dark-mode-element w-fit py-1 px-5">{border}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
