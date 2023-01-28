import { useContext } from 'react';
import PopUpContext from './contexts/PopUpContext';
import HighScore from './HighScore';

export default function HighScoreButton({ text = 'See High Scores' }) {
  const popUp = useContext(PopUpContext);

  function handleClick() {
    popUp.set(<HighScore />);
  }

  return <button onClick={handleClick}>{text}</button>;
}
