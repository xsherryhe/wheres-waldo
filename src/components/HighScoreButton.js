import { useContext } from 'react';
import PopUpContext from './contexts/PopUpContext';
import HighScore from './HighScore';

export default function HighScoreButton({ text = 'See High Scores', footer }) {
  const popUp = useContext(PopUpContext);

  function handleClick() {
    popUp.set(<HighScore footer={footer} />);
  }

  return <button onClick={handleClick}>{text}</button>;
}
