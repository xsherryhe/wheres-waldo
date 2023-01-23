import { secondsToHMS } from '../utilities';
import HighScorePlayer from './HighScorePlayer';

export default function HighScoreEntry({ score }) {
  return (
    <span>
      <HighScorePlayer score={score} /> - {secondsToHMS(score.time)}
    </span>
  );
}
