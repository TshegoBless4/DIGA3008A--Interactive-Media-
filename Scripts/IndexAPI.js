

document.addEventListener('DOMContentLoaded', function() {
  const quoteText = document.getElementById('cyber-quote-text');
  const quoteAuthor = document.getElementById('cyber-quote-author');
  const newQuoteBtn = document.getElementById('new-quote-btn');

  // Fallback quotes if API fails
  const fallbackQuotes = [
    {
      text: "The future is already here — it's just not evenly distributed.",
      author: "William Gibson"
    },
    {
      text: "The sky above the port was the color of television, tuned to a dead channel.",
      author: "William Gibson"
    },
    {
      text: "You can't stop the signal, Mal.",
      author: "Mr. Universe, Firefly"
    }
  ];

  // Fetch a random cyberpunk/sci-fi quote
  async function fetchQuote() {
    try {
      const response = await fetch('https://programming-quotes-api.herokuapp.com/quotes/random');
      const data = await response.json();
      quoteText.textContent = `"${data.content}"`;
      quoteAuthor.textContent = `- ${data.author}`;
    } catch (error) {
      // Use fallback if API fails
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      quoteText.textContent = `"${randomQuote.text}"`;
      quoteAuthor.textContent = `- ${randomQuote.author}`;
      console.log("Using fallback quotes:", error);
    }
  }

  // Get first quote on load
  fetchQuote();

  // Button click handler
  newQuoteBtn.addEventListener('click', fetchQuote);
});