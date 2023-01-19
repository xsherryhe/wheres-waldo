import { useContext } from 'react';
import '../styles/SelectForm.css';

import ServerContext from './ServerContext';

export default function SelectForm({
  options,
  squareId,
  displayCorrect,
  displayIncorrect,
}) {
  const server = useContext(ServerContext);

  async function handleChange(e) {
    const targetId = Number(e.target.value);
    const response = await fetch(
      `${server}/targets/${targetId}?selection=${squareId}`,
      { mode: 'cors' }
    );
    const data = await response.json();
    if (data.correct) displayCorrect(targetId, squareId);
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
