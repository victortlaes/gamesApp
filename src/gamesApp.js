import { useState, useEffect } from "react";
import axios from "axios";
import controleImg from './utils/CONTROLE.png'

import 'material-icons/iconfont/material-icons.css';



export default function GamesApp() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const GAMES_URL = "http://localhost:3005/games";

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(GAMES_URL, { search });

      setGames(response.data);
    } catch (error) {
      console.error('Erro na pesquisa:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GAMES_URL);
        setGames(response.data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchData();
    }, []);

  return (
    !games ? 
    <div>
      <p>Nao funfou</p>
    </div> :
    <div>
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lista de jogos</h2>
        <form className="bg-zinc-300 rounded-lg" onSubmit={handleSearch}> 
                <input className="bg-zinc-300 rounded-lg" id="gameInsert" type="search" placeholder=" Insira o jogo:" value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit"><span className="material-icons">search</span></button>
              </form>
           
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
                    <a href={games.cover && game.cover.url}>
                      <span className="absolute inset-0" />
                      {game.genres && game.genres[0].name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{game.id}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{game && game.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
