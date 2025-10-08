function indexPage(moments) {
  return `
    <a href="/moments/new">Add a New Moment</a>
    <h2>All Moments</h2>
    <ul>
      ${moments.map(m => `
        <li>
          <strong>${m.title}</strong> 
          <em>(${m.category} - ${m.mood})</em><br>
          ${m.reflection}<br>
          <small>${m.date}</small>
        </li>
      `).join('')}
    </ul>
  `;
}

module.exports = indexPage;
