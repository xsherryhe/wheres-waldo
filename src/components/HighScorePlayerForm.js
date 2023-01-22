import { useState } from 'react';

export default function HighScorePlayerForm({ player, setPlayer, token }) {
  const [playerInput, setPlayerInput] = useState(player);

  function handleChange(e) {
    setPlayerInput(e.target.value);
  }

  function handleSubmit() {
    // Constraint API Form validation
    // then fetcher to back end
    // response will send updated game, take player name and call setPlayer on it
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="game_player">Enter your name:</label>
      <input
        type="text"
        name="game[player]"
        id="game_player"
        value={playerInput}
        onChange={handleChange}
      />
      <input type="hidden" name="high_score_token" value={token} />
      <button type="submit">Submit</button>
    </form>
  );
}
