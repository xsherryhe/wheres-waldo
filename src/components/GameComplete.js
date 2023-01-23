import { useContext } from 'react';
import fireworks from '../images/fireworks.gif';

import GameContext from './contexts/GameContext';
import PopUpContext from './contexts/PopUpContext';
import PopUp from './PopUp';
import HighScoreButton from './HighScoreButton';

export default function GameComplete() {
  const popUp = useContext(PopUpContext);
  const complete = useContext(GameContext).complete;

  return (
    <PopUp>
      <h1>You win!</h1>
      <img src={fireworks} alt="" />
      <p>You completed the map in {complete.time}.</p>
      {complete.highScore && <p>Your time made the High Scores!</p>}
      <HighScoreButton
        text={
          complete.highScore
            ? 'Add Your Name to High Scores'
            : 'See High Scores'
        }
      />
      <button onClick={popUp.close}>Admire Completed Map</button>
    </PopUp>
  );
}
