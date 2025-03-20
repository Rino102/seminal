import React, { useState, useEffect } from "react";
import Button from "./ui/Button";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import World from "@/assets/svg/World.jsx";


const CharacterCard = ({ character }) => {

    const router = useRouter();

    const characterId = character.id;

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some((fav) => fav.id === characterId));
    }, [characterId]);

    const toggleFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
        if (isFavorite) {
          favorites = favorites.filter((fav) => fav.id !== characterId);
          toast.error(`${character.name} removed from favorites`);
        } else {
          favorites.push({ 
            id: characterId, 
            name: character.name, 
            gender: character.gender, 
            homeworld: character.homeworld, 
            hair_color: character.hair_color,
            birth_year: character.birth_year,
            height: character.height,
            mass: character.mass
        });
          toast.success(`${character.name} added to favorites`);
        }
    
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
      };


  return (
    <motion.div
      className="bg-white shadow-md rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
     <h2 className="text-2xl font-bold mb-4">{character.name}</h2>
      <p className="text-gray-600 flex justify-between w-80 mb-1"> <span className="flex gap-1"><World /> Homeworld:</span>   {character.homeworld}</p>
      <p className="text-gray-600 flex justify-between w-80 mb-1"> <span className="flex gap-1"><World />Birth Year: </span>{character.birth_year}</p>
      <p className="text-gray-600 flex justify-between w-80 mb-1"> <span className="flex gap-1"><World />Gender: </span>{character.gender}</p>
      <p className="text-gray-600 flex justify-between w-80 mb-1"> <span className="flex gap-1"><World />Hair Color: </span>{character.hair_color}</p>
      <p className="text-gray-600 flex justify-between w-80 mb-1"> <span className="flex gap-1"><World />Height: </span>{character.height}</p>
      <p className="text-gray-600 flex justify-between w-80 mb-1"> <span className="flex gap-1"><World />Mass: </span>{character.mass}</p>

      <div className="flex gap-4 mt-4">
      <Button variant={`primary  ${router.pathname === '/favorites' && 'hidden' } ` } onClick={()=>router.push(`/character/${character.id}`)} >
      View Detail
      </Button>
      

      <Button variant={`Teritary  ${router.pathname === '/favorites' && 'hidden' } `} onClick={()=>toggleFavorite()}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
        
      </div>
    </motion.div>
  );
};

export default CharacterCard;
