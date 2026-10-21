(() => {
  const form = document.querySelector('#archive-filters');
  const fields = ['search','purpose','theme','medium'].map(id => document.getElementById('filter-' + id));
  const cards = [...document.querySelectorAll('.archive-card')];
  function filter() {
    const [query,purpose,theme,medium] = fields.map(el => el.value.toLowerCase().trim());
    let visible = 0;
    for (const card of cards) {
      const show = (!query || card.textContent.toLowerCase().includes(query)) &&
        (!purpose || card.dataset.purpose.split('|').includes(purpose)) &&
        (!theme || card.dataset.theme.split('|').includes(theme)) &&
        (!medium || card.dataset.medium.split('|').includes(medium));
      card.hidden = !show;
      if (show) visible++;
    }
    document.getElementById('archive-count').textContent = `${visible} of ${cards.length} projects`;
    document.getElementById('no-results').hidden = visible > 0;
  }
  form.addEventListener('submit', e => e.preventDefault());
  form.addEventListener('input', filter);
  form.addEventListener('change', filter);
  document.getElementById('reset-filters').addEventListener('click', () => {form.reset();filter();});
  document.querySelectorAll('[data-filter-purpose],[data-filter-theme]').forEach(link => link.addEventListener('click', () => {
    form.reset();
    if (link.dataset.filterPurpose) fields[1].value = link.dataset.filterPurpose;
    if (link.dataset.filterTheme) fields[2].value = link.dataset.filterTheme;
    filter();
  }));
  filter();
})();
