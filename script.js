const list = document.getElementById('stars-list');

fetch('events.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  })
  .then(({ events }) => {
    if (!Array.isArray(events) || events.length === 0) {
      list.innerHTML = '<li class="empty-state">No starred repositories available yet.</li>';
      return;
    }

    const languageColors = {
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      CSS: '#563d7c'
    };

    list.innerHTML = events
      .map((repo) => {
        const color = languageColors[repo.language] || '#6e7781';

        return `
          <li class="star-card">
            <div class="repo-header">
              <a class="repo-name" href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a>
              <span class="star-badge">★ ${Number(repo.stargazers_count).toLocaleString()}</span>
            </div>
            <p class="description">${repo.description || 'No description provided.'}</p>
            <div class="meta">
              <span class="language"><span class="language-dot" style="background: ${color};"></span>${repo.language || 'Unknown'}</span>
              <time datetime="${repo.starred_at}">Starred ${new Date(repo.starred_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</time>
            </div>
          </li>
        `;
      })
      .join('');
  })
  .catch((error) => {
    console.error('Failed to load repository data:', error);
    list.innerHTML = '<li class="empty-state">Unable to load starred repositories right now.</li>';
  });
