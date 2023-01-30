import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameResetConfirm.css';

import PopUpContext from './contexts/PopUpContext';
import PopUp from './PopUp';

export default function GameResetConfirm() {
  const navigate = useNavigate();
  const close = useContext(PopUpContext).close;

  function resetGame() {
    navigate(0);
  }

  return (
    <PopUp contentClassName="game-reset-confirm">
      <h1>Reset your game?</h1>
      <div className="buttons">
        <button onClick={resetGame}>Yes</button>
        <button onClick={close}>No</button>
      </div>
    </PopUp>
  );
}
