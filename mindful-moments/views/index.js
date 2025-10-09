//.map() method loops through the moments array and returns a new array. each element in that array is an HTML string representing one <li> list item.
//.join('') joins all those strings together into one long HTML string.

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
