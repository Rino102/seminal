import React from "react";
import Button from "./ui/Button";

const CharacterCard = ({ character, onViewDetail, onAddToFavorites }) => {
  const { name, gender, homePlanet, birthYear, hairColor, height, mass } = character;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-80">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-sm"><strong>Gender:</strong> {gender}</p>
      <p className="text-sm"><strong>Home Planet:</strong> {homePlanet}</p>
      <p className="text-sm"><strong>Birth Year:</strong> {birthYear}</p>
      <p className="text-sm"><strong>Hair Color:</strong> {hairColor}</p>
      <p className="text-sm"><strong>Height:</strong> {height} cm</p>
      <p className="text-sm"><strong>Mass:</strong> {mass} kg</p>

      <div className="flex gap-4 mt-4">
      <Button variant="primary" onClick={onViewDetail}>
      View Detail
      </Button>

      <Button variant="Teritary" onClick={onAddToFavorites}>
      Add to Favourites
      </Button>
      
      </div>
    </div>
  );
};

export default CharacterCard;
