import { useState, useEffect } from 'react';
import axios from 'axios';

interface Language {
  name: string;
}

interface Flags {
  png: string;
}

interface User {
  area: number;
  name?: string;
  flags: Flags;
  languages: Language[];
  region: string;
  population?: number;
  capital?: string;
}

export default function Search(){
  const [countries, setCountries] = useState<User[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Fetch countries data
    axios
      .get('/data.json')
      .then((response) => {
        const data: User[] = response.data;
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    // Filter countries based on the search query
    if (searchQuery) {
      const filtered = countries.filter((country) => {
        return (
          (country.name && country.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      });
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchQuery, countries]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <ul>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <li key={country.area} className="mb-4">
              <h2>{country.name}</h2>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              <h3>Languages:</h3>
            </li>
          ))
        ) : (
          <p>No countries match your search.</p>
        )}
      </ul>
    </div>
  );
};




