import Image from "next/image";
import CharacterCard from "@/components/CharacterCard";
import Button from "@/components/ui/Button";
//import Input from "@/components/ui/Input";
import { useState } from "react";
import useCharacterFetch from "@/hooks/useCharacterFetch";
import SkeletonCard from "@/components/CardSkelton";
import { useRouter } from "next/router";


export default function Home() {

    const [page, setPage] = useState(1);
    const router = useRouter();
    const { data, loading, error, total } = useCharacterFetch("/api/characters", page); 
    
    if (error) return <p className="text-center text-lg text-red-500">{error}</p>;
    
  return (
    <>
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-bold text-center mb-6">Star Wars Characters</h1>
                <Button variant="primary" onClick={()=>router.push('/favorites')}>Favorites</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
                {loading ? Array.from( { length: 12 } ).map( (_, index) => <SkeletonCard key= {index} /> ): 

                    data?.map((character, index) => (
                    <CharacterCard
                        key={character.id}
                        character={character}
                    />
                    ))
                }
            </div>

            {/* Pagination */}
                {!loading &&
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <Button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        variant={`primary ${
                            page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"
                        }`}
                        >
                        Previous
                        </Button>

                        <span className="text-lg font-semibold">
                        Page {page} of {total}
                        </span>

                        <Button
                        onClick={() => setPage((prev) => (prev < total ? prev + 1 : prev))}
                        disabled={page === total}
                        variant={`primary ${
                            page === total ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"
                        }`}
                        >
                        Next
                        </Button>
                    </div>
                }
        </div>
    </>
  );
}
