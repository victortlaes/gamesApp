import { useState, useEffect } from "react";
import axios from "axios";
import 'material-icons/iconfont/material-icons.css';
import SearchInput from "../components/searchInput";
import { Flowbite } from 'flowbite-react';
import mainTheme from '../themes/mainTheme';
import SpinnerComponent from "../components/spinner";
import Dropdown from "../components/dropdown";

export default function GamesApp() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  const GAMES_URL = "http://localhost:3005/games";
  const GENRES_URL = "http://localhost:3005/genres";
  const PLATFORMS_URL = "http://localhost:3005/platforms";

  const handleSearch = async (search) => {
    if (search.length === 1) {
      const response = await axios.get(GAMES_URL);
      setGames(response.data);
      return;
    }
    try {
      const response = await axios.post(GAMES_URL, { search });
      setGames(response.data);
    } catch (error) {
      console.error('Erro na pesquisa:', error);
    }
  };  

  useEffect(() => {
  const fetchGames = async () => {
    try {
      const response = await axios.get(GAMES_URL);
      setGames(response.data);
    } catch (error) {
      console.error('Erro ao obter dados de jogos:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(GENRES_URL);
      setGenres(response.data);
    } catch (error) {
      console.error('Erro ao obter dados de gêneros:', error);
    }
  };

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get(PLATFORMS_URL);
      setPlatforms(response.data);
    } catch (error) {
      console.error('Erro ao obter dados de plataformas:', error);
    }
  };

  fetchGames();
  fetchGenres();
  fetchPlatforms();
}, []);


  return (
    !games ? 
    <div>
      <p>Nao funfou</p>
    </div> :
    <Flowbite theme={{ theme: mainTheme }}>
      <div>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="w-full flex justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">Lista de jogos</h2>
              <SearchInput function={handleSearch}/>
              <Dropdown title = "Genres"
                        items = {genres}/>

              <Dropdown title = "Platforms"
                        items = {platforms}/>
            </div>
            {games.length > 0 ? <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {games && games.map((game) => (
                <div key={game.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={game.cover && game.cover.url.replace("thumb", "1080p")}
                      alt={game && game.name}
                      
                      className="h-40 w-40 object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <p className="text-sm font-medium text-gray-900">{game && game.name}</p>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{game.id}</p>
                    </div>
                    <a href={games.cover && game.cover.url}>
                      <span className="absolute inset-0" />
                      {game.genres && game.genres[0].name}
                    </a>
                  </div>
                </div>
              ))}
            </div> : <div className="w-full min-h-[600px] flex justify-center items-center"><SpinnerComponent/></div>}
          </div>
        </div>
      </div>
    </Flowbite>
  );
}
