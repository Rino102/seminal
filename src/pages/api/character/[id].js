export default async function handler(req, res) {
    try {
      const { id } = req.query;
      const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/people/${id}/`;
  
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Character not found");
  
      const character = await response.json();
  
      // Fetch homeworld
      const homeworldRes = await fetch(character.homeworld);
      const homeworldData = await homeworldRes.json();
  
      // Fetch films
      const filmPromises = character.films.map((film) => fetch(film).then((res) => res.json()));
      const filmData = await Promise.all(filmPromises);
  
      // Fetch starships
      const starshipPromises = character.starships.map((ship) => fetch(ship).then((res) => res.json()));
      const starshipData = await Promise.all(starshipPromises);
  
      res.status(200).json({
        name: character.name,
        gender: character.gender,
        birth_year: character.birth_year,
        eye_color: character.eye_color,
        hair_color: character.hair_color,
        height: character.height,
        skin_color: character.skin_color,
        mass: character.mass,
        homeworld: homeworldData.name,
        films: filmData.map((film) => film.title),
        starships: starshipData.map((ship) => ship.name),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  