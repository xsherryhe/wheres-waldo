import { useContext } from 'react';
import PopUpContext from './contexts/PopUpContext';
import HighScore from './HighScore';

export default function HighScoreButton({
  text = 'See High Scores',
  className = '',
}) {
  const popUp = useContext(PopUpContext);

  function handleClick() {
    popUp.set(<HighScore />);
  }

  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
}
