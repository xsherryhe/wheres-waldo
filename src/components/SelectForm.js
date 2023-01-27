import { useContext, useState } from 'react';
import fetcher from '../fetcher';
import '../styles/SelectForm.css';
import { tryAction } from '../utilities';

import GameContext from './contexts/GameContext';

export default function SelectForm({
  options,
  squareId,
  displayCorrect,
  displayIncorrect,
  offset,
}) {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);
  const gameId = useContext(GameContext).id;

  function handleError(error) {
    setError(error);
    setDisabled(false);
  }

  function handleChange(e) {
    setDisabled(true);
    async function submitResponse() {
      const targetId = Number(e.target.value);
      const response = await fetcher(
        `games/${gameId}?selection=${squareId}&target=${targetId}`,
        { method: 'PATCH' }
      );
      const data = await response.json();
      if (data) displayCorrect(data, squareId);
      else displayIncorrect(squareId);
    }
    tryAction(submitResponse, handleError);
  }

  return (
    <form className={`select ${offset}`} action="">
      <select
        name="selection"
        id="selection"
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="">Who or what is here?</option>
        {options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
