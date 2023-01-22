import { useContext } from 'react';
import fetcher from '../fetcher';
import '../styles/SelectForm.css';

import ServerContext from './contexts/ServerContext';
import GameContext from './contexts/GameContext';

export default function SelectForm({
  options,
  squareId,
  displayCorrect,
  displayIncorrect,
}) {
  const server = useContext(ServerContext);
  const gameId = useContext(GameContext).id;

  async function handleChange(e) {
    const targetId = Number(e.target.value);
    const response = await fetcher(
      `${server}/games/${gameId}?selection=${squareId}&target=${targetId}`,
      { method: 'PATCH' }
    );
    const data = await response.json();
    if (data) displayCorrect(data);
    else displayIncorrect(squareId);
  }

  return (
    <form className="select" action="">
      <select name="selection" id="selection" onChange={handleChange}>
        <option value="">-- Who or what is here? --</option>
        {options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </form>
  );
}
