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
  console.log(result);
  const res = result.data;
  return {
    title: res.title,
    titleEng: res.title_english,
    img: res.images.jpg.image_url.replace(
      "https://myanimelist.net",
      "https://cdn.myanimelist.net",
    ),
    episode: res.episodes,
    duration: res.duration,
    id: res.mal_id,
    year: res.year,
    genre: res.genres,
    synopsis: res.synopsis,
    rank: res.rank,
    season: res.season,
    status: res.status,
    type: res.type,
    members: res.members,
  };
}
catch(err){
  throw err
}
}