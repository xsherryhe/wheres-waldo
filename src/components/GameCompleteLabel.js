import { useContext } from 'react';
import '../styles/GameCompleteLabel.css';

import GameContext from './contexts/GameContext';

export default function GameCompleteLabel() {
  const complete = useContext(GameContext).complete;
  return (
    complete && (
      <div className="game-complete-label">
        Completed in <span className="time">{complete.time}</span>
      </div>
    )
  );
}
