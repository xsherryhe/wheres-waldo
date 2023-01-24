import { useContext } from 'react';
import '../styles/GameComplete.css';
import fireworks from '../images/fireworks.gif';

import GameContext from './contexts/GameContext';
import PopUpContext from './contexts/PopUpContext';
import PopUp from './PopUp';
import HighScoreButton from './HighScoreButton';

export default function GameComplete() {
  const popUp = useContext(PopUpContext);
  const complete = useContext(GameContext).complete;

  const closeButton = (
    <button onClick={popUp.close}>Admire Completed Map</button>
  );
  return (
    <PopUp contentClassName="game-complete">
      <h1>You win!</h1>
      <img src={fireworks} alt="" />
      <div className="message">
        <p>You completed the map in {complete.time}.</p>
        {complete.highScore && (
          <p className="high-score-message">
            <span>Your time made the High Scores!</span>
          </p>
        )}
      </div>
      {complete.highScore ? (
        <HighScoreButton
          text="Add Your Name to High Scores"
          footer={closeButton}
        />
      ) : (
        { closeButton }
      )}
    </PopUp>
  );
}
