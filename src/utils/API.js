export async function getTopAnime() {
    try{
  const topAnime = await fetch("https://api.jikan.moe/v4/top/anime?limit=20");
  if(!topAnime.ok) throw new Error(`Error: ${topAnime.status}`)
  const results = await topAnime.json();
  console.log(results);
  const res = results.data.map((anime) => {
    return {
      title: anime.title,
      titleEng: anime.title_english,
      img: anime.images.jpg.image_url.replace(
        "https://myanimelist.net",
        "https://cdn.myanimelist.net",
      ),
      episode: anime.episodes,
      duration: anime.duration,
      id: anime.mal_id,
      year: anime.year,
      genre: anime.genres,
    };
  });
  console.log(res);
  return res;
} catch(err){
   throw err
}
}

export async function searchAnime(search) {
  try {
    const searchres = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&limit=20`,
    );
    if(!searchres.ok) throw new Error(`Error: ${searchres.status}`)
    const results = await searchres.json();
    console.log(results);
    const res = results.data.map((anime) => {
      return {
        title: anime.title || "N/A",
        titleEng: anime.title_english || "N/A",
        img: anime.images.jpg.image_url.replace(
          "https://myanimelist.net",
          "https://cdn.myanimelist.net",
        ),
        episode: anime.episodes || "N/A",
        duration: anime.duration || "N/A",
        id: anime.mal_id || "N/A",
        year: anime.year,
        genre: anime.genres || "N/A",
      };
    });
    return res;
  } catch (err) {
    throw err
  }
}

export async function getAnimeById(id) {
    try{
  const anime = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  if(!anime.ok) throw new Error(`Error: ${anime.status}`);
  const result = await anime.json();
  const res = result.data;
  return {
    title: res.title,
    titleEng: res.title_english,
    img: res.images.jpg.image_url.replace(
      "https://myanimelist.net",
      "https://cdn.myanimelist.net",
    ),
    episode: res.episodes || "N/A",
    duration: res.duration || "N/A",
    id: res.mal_id || "N/A",
    year: res.year || "N/A",
    genre: res.genres || "N/A",
    synopsis: res.synopsis || "N/A",
    rank: res.rank || "N/A",
    season: res.season || "N/A",
    status: res.status || "N/A",
    type: res.type || "N/A",
    members: res.members || "N/A",
    year: res.year || "N/A",
  };
}
catch(err){
  throw err
}
}

export async function getanimeEpisode(id) {
    try {
        let page = 1;
        let allEpisodes = [];
        let hasNextPage = true;

        while (hasNextPage) {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes?page=${page}`);
            await new Promise(resolve => setTimeout(resolve, 400)); 
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const results = await response.json();
            console.log(results)

            const episodes = results.data.map(episode => ({
                id: episode.mal_id,
                title: episode.title ?? episode.title_romanji,
            }));

            allEpisodes = [...allEpisodes, ...episodes];
            hasNextPage = results.pagination.has_next_page;
            page++;
        }

        return allEpisodes;
    } catch(err) {
        throw err;
    }
}