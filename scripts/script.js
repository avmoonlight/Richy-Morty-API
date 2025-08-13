const apiURL = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;
let totalPages = 1;

const characterList = document.getElementById('characterList');
const searchInput = document.getElementById('searchInput');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

async function fetchCharacters(page = 1, name = '') {
  const res = await fetch(`${apiURL}?page=${page}&name=${name}`);
  if (!res.ok) {
    characterList.innerHTML = `<p>Nenhum personagem encontrado.</p>`;
    totalPages = 1;
    pageInfo.textContent = "";
    return;
  }

  const data = await res.json();
  totalPages = data.info.pages;
  displayCharacters(data.results);
  pageInfo.textContent = `Página ${page} de ${totalPages}`;
}

function displayCharacters(characters) {
  characterList.innerHTML = characters.map(char => `
    <div class="card">
      <img src="${char.image}" alt="${char.name}">
      <h3>${char.name}</h3>
      <p>${char.species} - ${char.status}</p>
    </div>
  `).join('');
}

searchInput.addEventListener('input', () => {
  currentPage = 1;
  fetchCharacters(currentPage, searchInput.value);
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage, searchInput.value);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchCharacters(currentPage, searchInput.value);
  }
});

// Inicial
fetchCharacters()
