import { useState, useContext } from 'react';
import '../styles/HighScorePlayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import GameContext from './contexts/GameContext';
import HighScorePlayerForm from './HighScorePlayerForm';

export default function HighScorePlayer({ score }) {
  const [formOn, setFormOn] = useState(false);
  const [player, setPlayer] = useState(score.player);

  const game = useContext(GameContext);
  const currentGame = score.id === game.id && game.complete?.highScore;

  if (formOn || (currentGame && player === null))
    return (
      <HighScorePlayerForm
        player={player || ''}
        setPlayer={setPlayer}
        token={game.complete.highScore}
        close={() => setFormOn(false)}
      />
    );

  return (
    <span className="high-score-player">
      {player || `Player ${score.id}`}
      {currentGame && (
        <button onClick={() => setFormOn(true)} className="edit icon">
          <FontAwesomeIcon icon={faPenToSquare} alt="edit" />
        </button>
      )}
    </span>
  );
}
