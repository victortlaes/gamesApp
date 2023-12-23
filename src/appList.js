import axios from 'axios';

const gameListContainer = document.getElementById('gameList');

function fetchGameData() {
  const igdbUrl = "http://localhost:3005/games";

  axios.get(igdbUrl)
    .then(response => {
      const games = response.data;

      // Renderiza os nomes e as imagens dos jogos no contêiner
      const gameListHTML = `<h1>Lista de Jogos:</h1><ul>${games.map(game => `
        <li>
          <h2>${game.name}</h2>

          ${game.cover && game.cover.url ? `<img src="${game.cover.url}" alt="${game.name}>"` : 'Imagem não disponível'}
        </li>`).join('')}</ul>`;

      gameListContainer.innerHTML = gameListHTML;
    })
    .catch(error => {
      console.error('Erro:', error);
      gameListContainer.innerHTML = 'Erro ao carregar dados.';
    });
}

// Chama a função para buscar os dados quando a página carrega
fetchGameData();
