import Image from "next/image";
import CharacterCard from "@/components/CharacterCard";
//import Button from "@/components/ui/Button";
//import Input from "@/components/ui/Input";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";


export default function Home() {

   // const [text, setText] = useState('');

  

      const { data, loading, error } = useFetch("/api/characters"); // Fetch from our secure API route
    

      if (loading) return <p className="text-center text-lg">Loading...</p>;
      if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    
        <>
        {/*<Button variant="primary" onClick={() => console.log("Primary Clicked")}>
        Primary Button
      </Button>

      <Button variant="Teritary" onClick={() => console.log("Primary Clicked")}>
        Teritery
      </Button>

      <Button variant="ghost" onClick={() => console.log("Primary Clicked")}>
        Ghost
      </Button>


        <Input label="Enabled" placeholder="Enter text" />
        <Input label="Number Input" placeholder="Enter a number" type="number" />
        <Input label="Error Validation" placeholder="Min 3 characters" type="text" />
        <Input label="Disabled Input" disabled />*/}


<div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Star Wars Characters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {data?.results?.map((character, index) => (
          <CharacterCard
            key={index}
            character={{
              name: character.name,
              gender: character.gender,
              homePlanet: character.homeworld || "Unknown",
              birthYear: character.birth_year,
              hairColor: character.hair_color,
              height: character.height,
              mass: character.mass,
            }}
            onViewDetail={() => console.log("View Detail clicked for", character.name)}
            onAddToFavorites={() => console.log("Added to Favourites:", character.name)}
          />
        ))}
      </div>
    </div>

      </>
      
  );
}
