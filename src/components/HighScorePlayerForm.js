import { useContext, useRef, useState } from 'react';
import '../styles/HighScorePlayerForm.css';
import fetcher from '../fetcher';
import loading from '../images/loading.gif';

import GameContext from './contexts/GameContext';
import { tryAction } from '../utilities';

export default function HighScorePlayerForm({
  player,
  setPlayer,
  token,
  close,
}) {
  const [disabled, setDisabled] = useState(false);
  const [playerInput, setPlayerInput] = useState(player);
  const [playerError, setPlayerError] = useState(null);
  const playerInputRef = useRef();
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

  function handleError(error) {
    setPlayerError(error);
    setDisabled(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setDisabled(true);

    async function submitResponse() {
      const response = await fetcher(`games/${gameId}`, {
        method: 'PATCH',
        body: new FormData(e.target),
      });
      const data = await response.json();
      setPlayer(data.player);
      close();
    }
    tryAction(submitResponse, handleError);
  }

  return (
    <form className="high-score-player-form" noValidate onSubmit={handleSubmit}>
      <label htmlFor="game_player">Enter your name:</label>
      <input
        type="text"
        name="game[player]"
        id="game_player"
        value={playerInput}
        disabled={disabled}
        onChange={handleChange}
        ref={playerInputRef}
      />
      {playerError && <div className="error">{playerError}</div>}
      <input type="hidden" name="high_score_token" value={token} />
      {disabled && !playerError ? (
        <button className="icon" disabled={true}>
          <img className="loading" src={loading} alt="loading" />
        </button>
      ) : (
        <button className="submit" type="submit">
          Submit
        </button>
      )}
    </form>
  );
}
