import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../styles/Square.css';

export default function Square({ active, setActive, correct, incorrect }) {
  return (
    <button className={`square ${active ? 'active' : ''}`} onClick={setActive}>
      {correct && (
        <div className="feedback correct">
          <div className="feedback-message">{correct}</div>
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
