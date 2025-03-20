import { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import Modal from "react-modal";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { useRouter } from "next/router";

// Set modal root (important for accessibility)
Modal.setAppElement("#__next");

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [editedValues, setEditedValues] = useState({ gender: "", height: "" });

  const router = useRouter();

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Open modal & set selected character
  const openModal = (character) => {
    setEditingCharacter(character);
    console.log(character);
    setEditedValues({ gender: character.gender, height: character.height || "" });
    setIsModalOpen(true);
  };

  // Save changes to localStorage
  const saveChanges = () => {

    const updatedFavorites = favorites.map((char) =>
      char.id === editingCharacter.id ? { ...char, ...editedValues } : char
    );
    debugger;
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    toast.success("Character updated successfully!");
    setIsModalOpen(false);
  };

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((char) => char.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    toast.success("Character removed from favorites!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-center mb-6">Favorites</h1>
            <Button variant="primary" onClick={()=> router.push('/')}>Back</Button>
        </div>

      {favorites.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((character) => (
            <div key={character.id}>
              <CharacterCard character={character} />
              <Button variant="primary" onClick={() => openModal(character)}>
                Edit
              </Button>
              <Button variant="bg-red" onClick={() => removeFromFavorites(character.id)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Edit Character"
          className="bg-white p-6 rounded-md shadow-lg w-96 mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl font-bold mb-4">Edit {editingCharacter?.name}</h2>

          
          <Select
            label="Gender"
            value={editedValues.gender}
            onChange={(e) => setEditedValues({ ...editedValues, gender: e.target.value })}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "n/a", label: "N/A" },
            ]}
          />

          
          <Input
            label="Height"
            type="number"
            value={editedValues.height}
            onChange={(e) => setEditedValues({ ...editedValues, height: e.target.value })}
            hints={'Height Measured as Centimeters'}
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="tertiary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={saveChanges}>
              Save
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
