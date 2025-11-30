import { CATEGORY_LABELS } from './data';

export function renderCards(courses) {
  const container = document.getElementById('cards-container');
  const noResults = document.querySelector('.no-results');

  if (!courses || courses.length === 0) {
    container.innerHTML = '';
    noResults.hidden = false;
    return;
  }

  noResults.hidden = true;

  container.innerHTML = courses
    .map((course) => {
      const niceLabel = CATEGORY_LABELS[course.category] || course.category;
      return `
    <div class="card" data-category="${course.category}">
        <img 
            src="/assets/img/${course.author.replaceAll(' ', '')}.jpg" 
            alt="${course.author}" 
            class="card__image"
            loading="lazy"
        >
      <div class="card__content">
        <p class="card__tag">${niceLabel}</p>
        <h3 class="card__title">${course.title}</h3>
        <div class="card__footer">
            <p class="card__price">$${course.price}</p>
            <p class="card__author">by ${course.author}</p>
        </div>
      </div>
    </div>
    `;
    })
    .join('');
}
