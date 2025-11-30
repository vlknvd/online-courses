import { CATEGORY_LABELS } from './data';

export function initFilters(courses, onCategoryChange) {
  const container = document.getElementById('categories-list');
  let currentCategory = 'all';

  const order = [
    'all',
    'marketing',
    'management',
    'hr',
    'design',
    'development',
  ];

  const totalCounts = {};
  courses.forEach((c) => {
    totalCounts[c.category] = (totalCounts[c.category] || 0) + 1;
  });
  totalCounts.all = courses.length;

  function render(activeCat) {
    container.innerHTML = order
      .map((cat) => {
        const count = totalCounts[cat] ?? 0;
        const active = cat === activeCat ? 'filters__category_active' : '';
        const zero = count === 0 ? 'filters__category_zero' : '';

        return `
        <button class="filters__category ${active} ${zero}" data-category="${cat}">
          ${CATEGORY_LABELS[cat]} <sup>${count}</sup>
        </button>
      `;
      })
      .join('');
  }

  render(currentCategory);

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filters__category');
    if (!btn) return;
    const cat = btn.dataset.category;

    if (cat === currentCategory) return;

    currentCategory = cat;
    render(currentCategory);
    onCategoryChange(cat);
  });

  return {
    setActiveCategory: (cat) => {
      if (cat !== currentCategory) {
        currentCategory = cat;
        render(currentCategory);
      }
    },
  };
}
