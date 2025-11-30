import '../scss/main.scss';
import { courses } from './data.js';
import { renderCards } from './cards.js';
import { initFilters } from './filters.js';

let currentCategory = 'all';
let searchQuery = '';
let displayedCount = 9;

const { setActiveCategory } = initFilters(courses, (cat) => {
  currentCategory = cat;
  displayedCount = 9;
  applyFilters();
});

const loadMoreBtn = document.getElementById('load-more-btn');

loadMoreBtn.addEventListener('click', () => {
  displayedCount += 9;
  applyFilters();
});

function applyFilters() {
  const filtered = courses.filter((c) => {
    const byCat = currentCategory === 'all' || c.category === currentCategory;
    const bySearch =
      searchQuery === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.author.toLowerCase().includes(searchQuery.toLowerCase());
    return byCat && bySearch;
  });

  const toDisplay = filtered.slice(0, displayedCount);

  renderCards(toDisplay);

  const noResults = document.querySelector('.no-results');
  if (noResults) noResults.hidden = toDisplay.length > 0;
  if (displayedCount >= filtered.length || filtered.length === 0) {
    loadMoreBtn.hidden = true;
  } else {
    loadMoreBtn.hidden = false;
  }
}

let timeout = null;

document.querySelector('.search__input').addEventListener('input', (e) => {
  searchQuery = e.target.value.trim();
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    displayedCount = 9;
    applyFilters();
  }, 300);
});

applyFilters();
