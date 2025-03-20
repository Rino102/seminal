import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function CharacterDetails() {
  const router = useRouter();
  const { id } = router.query; // Get character ID from URL
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/character/${id}`); // Fetch from API
        if (!response.ok) throw new Error("Failed to fetch character");
        const data = await response.json();
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6">
      <div class="flex justify-between items-center mb-4 space-y-2"><h1 className="text-2xl font-bold text-blue-700">{character.name}</h1><button class=" py-btnVertical whitespace-nowrap px-btnHorizontal text-sm font-medium focus:outline-none transition duration-200 ease-in-out w-auto 
      text-white 
      bg-primary 
      focus:ring-2 
      hover:bg-primary-hover 
      active:bg-primary-active 
      focus:ring-primary-focus 
      disabled:cursor-not-allowed
      disabled:bg-primary-disabledBg 
      disabled:text-primary-disabledText 
      border-2 border-primary ">Add to Favorites</button></div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2">
            <div className="text-lg space-y-3">
        
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Hair Color:</strong> {character.hair_color}</p>
        <p><strong>Eye Color:</strong> {character.eye_color}</p>
        <p><strong>Height:</strong> {character.height} cm</p>
        </div>
        <div className="text-lg space-y-3">
        <p><strong>Birth Year:</strong> {character.birth_year}</p>
        <p><strong>Home World:</strong> {character.homeworld}</p>
        <p><strong>Skin Color:</strong> {character.skin_color}</p>
        <p><strong>Mass:</strong> {character.mass} kg</p>
        </div>
        </div>

        <div class="flex justify-between items-center mt-4 mb-4 space-y-2"><h1 className="text-2xl font-bold text-blue-700">Character Films and Starships</h1>
        
</div>
        <h2 className="text-xl font-bold mt-4">Films</h2>
        <ul className="list-disc pl-6">
          {character.films.map((film, index) => (
            <li key={index}>{film}</li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mt-4">Starships</h2>
        <ul className="list-disc pl-6">
          {character.starships.length > 0 ? (
            character.starships.map((ship, index) => <li key={index}>{ship}</li>)
          ) : (
            <p>No starships piloted.</p>
          )}
        </ul>

        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
