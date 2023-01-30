import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

import PopUpContext from './contexts/PopUpContext';
import GameResetConfirm from './GameResetConfirm';

export default function GameResetButton() {
  const popUp = useContext(PopUpContext);

  function handleClick() {
    popUp.set(<GameResetConfirm />);
  }

  return (
    <button className="reset-game icon" onClick={handleClick}>
      <FontAwesomeIcon icon={faRotate} />
    </button>
  );
}
