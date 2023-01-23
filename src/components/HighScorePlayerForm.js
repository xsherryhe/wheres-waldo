import { useContext, useRef, useState } from 'react';
import fetcher from '../fetcher';

import ServerContext from './contexts/ServerContext';
import GameContext from './contexts/GameContext';

export default function HighScorePlayerForm({
  player,
  setPlayer,
  token,
  close,
}) {
  const [playerInput, setPlayerInput] = useState(player);
  const [playerError, setPlayerError] = useState(null);
  const playerInputRef = useRef();

  const server = useContext(ServerContext);
  const gameId = useContext(GameContext).id;

  function handleChange(e) {
    setPlayerInput(e.target.value);
  }

  function validate() {
    const fields = [[playerInputRef, setPlayerError]];
    return fields.every(([ref, setError]) => {
      const input = ref.current;
      input.checkValidity();
      setError(input.validationMessage);
      return input.validity.valid;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const response = await fetcher(`${server}/games/${gameId}`, {
      method: 'PATCH',
      body: new FormData(e.target),
    });
    const data = await response.json();
    setPlayer(data.player);
    close();
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <label htmlFor="game_player">Enter your name:</label>
      <input
        type="text"
        name="game[player]"
        id="game_player"
        value={playerInput}
        onChange={handleChange}
        ref={playerInputRef}
      />
      {playerError && <div className="error">{playerError}</div>}
      <input type="hidden" name="high_score_token" value={token} />
      <button type="submit">Submit</button>
    </form>
  );
}
