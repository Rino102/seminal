export default async function handler(req, res) {
    try {
        const { page = 1 } = req.query;
        const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/people/?page=${page}`;

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");

        let result = await response.json();


        const characterPromises = result.results.map(async(character) => {
            if (!character.homeworld) return character;

            const homeworldRes = await fetch(character.homeworld);
            const homeworldData = await homeworldRes.json();
            return {...character, homeworld: homeworldData.name, id: character.url.split("/").filter(Boolean).pop() };
        });

        const charactersWithHomeworlds = await Promise.all(characterPromises);

        // Send the final response
        res.status(200).json({
            count: result.count,
            next: result.next,
            previous: result.previous,
            results: charactersWithHomeworlds,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}