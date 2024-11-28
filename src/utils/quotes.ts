export const eyeHealthQuotes = [
  "Your eyes deserve a break! Look outside and enjoy the view.",
  "Rest your eyes to see the world better tomorrow!",
  "A short break now means better vision later.",
  "Take care of your eyes, they're the only pair you've got!",
  "Remember the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds.",
];

export const getRandomQuote = (): string => {
  return eyeHealthQuotes[Math.floor(Math.random() * eyeHealthQuotes.length)];
};