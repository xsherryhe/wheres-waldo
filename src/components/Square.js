import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../styles/Square.css';

import GameContext from './contexts/GameContext';

export default function Square({ active, setActive, correct, incorrect }) {
  const disabled = Boolean(useContext(GameContext).complete);

  return (
    <button
      className={`square ${active ? 'active' : ''}`}
      onClick={setActive}
      disabled={disabled}
    >
      {correct && (
        <div className="feedback correct">
          <div className="feedback-message">{correct.name}</div>
          <FontAwesomeIcon
            className="feedback-icon"
            alt="correct"
            icon={faLocationDot}
          />
        </div>
      )}
      {incorrect && (
        <FontAwesomeIcon
          className="feedback incorrect feedback-icon"
          alt="incorrect"
          icon={faXmark}
        />
      )}
    </button>
  );
}
