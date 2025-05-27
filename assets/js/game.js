const messages = [
  "🎉 You snagged the 'Introduction to AI' badge!",
  "🐍 Oops, you missed the Python badge—try again!",
  "🤖 Nice! You grabbed the 'AI Apps with Flask' token!",
  "✨ Almost—just missed the 'Generative AI' ribbon!",
  "📊 Level up! Found the 'Excel Data Analysis' badge!"
];
let idx = 0;
document.getElementById('game-btn').addEventListener('click', () => {
  alert(messages[idx % messages.length]);
  idx++;
});
