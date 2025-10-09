//plain JavaScript function that returns the HTML code as a string

function addMomentPage() {
  return `
    <h2>Add a New Mindful Moment</h2>
    <form action="/moments" method="POST">
      <label>Title: <input type="text" name="title" required></label><br>
      <label>Category: <input type="text" name="category" placeholder="e.g., Gratitude, Reflection"></label><br>
      <label>Mood:
        <select name="mood">
          <option>Calm</option>
          <option>Happy</option>
          <option>Content</option>
          <option>Stressed</option>
          <option>Neutral</option>
        </select>
      </label><br>
      <label>Reflection:<br>
        <textarea name="reflection" rows="4" required></textarea>
      </label><br>
      <button type="submit">Save Moment</button>
    </form>
  `;
}

module.exports = addMomentPage;

