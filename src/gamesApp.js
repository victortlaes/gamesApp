import { useState, useEffect } from "react";
import axios from "axios";
import controleImg from './utils/CONTROLE.png'

export default function GamesApp() {
  const [games, setGames] = useState([]);
  const GAMES_URL = "http://localhost:3005/games";

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
      {/* <ul>
        {games && games.map((game) => (
          <li key={game.id}>
            <h2>{game.name}</h2>
            {game.cover && game.cover.url ? (
              <img src={game.cover.url} alt={game.name} />
            ) : (
                <img src={controleImg} alt=""/>
            )}
          </li>
        ))}
      </ul> */}
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lista de jogos</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {games && games.map((game) => (
            <div key={game.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={game.cover && game.cover.url}
                  alt={game && game.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">:
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
