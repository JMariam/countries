"use client"

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the User type
interface User {
  area: number;
  name: string;
  population: number;
  flags: object;
}

export default function Details() {
  const router = useRouter();
  const { area } = router.query; // Get the user ID from the URL
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (area) {
      // Fetch the specific user based on the ID
      axios
        .get(`/data.json`) // Path to your local JSON file
        .then((response) => {
          const users: User[] = response.data; // Cast response data as an array of users
          const selectedUser = users.find((user) => user.area === Number(area)); // Find user by ID
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
    }
  }, [area]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      {user && (
        <>
          <p className="font-bold text-[16px] leading-[20px]">
            Population: <span className="font-semibold">{user.population}</span>
          </p>
        </>
      )}
    </div>
  );
}
