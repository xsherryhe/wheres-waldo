import { useContext, useState } from 'react';
import fetcher from '../fetcher';
import '../styles/SelectForm.css';

import GameContext from './contexts/GameContext';

export default function SelectForm({
  options,
  squareId,
  displayCorrect,
  displayIncorrect,
}) {
  const [disabled, setDisabled] = useState(false);
  const gameId = useContext(GameContext).id;

  async function handleChange(e) {
    setDisabled(true);
    const targetId = Number(e.target.value);
    const response = await fetcher(
      `games/${gameId}?selection=${squareId}&target=${targetId}`,
      { method: 'PATCH' }
    );
    const data = await response.json();
    if (data) displayCorrect(data);
    else displayIncorrect(squareId);
  }

  return (
    <form className="select" action="">
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
    </form>
  );
}
