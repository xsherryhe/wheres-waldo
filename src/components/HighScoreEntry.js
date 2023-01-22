import HighScorePlayer from './HighScorePlayer';

export default function HighScoreEntry({ score }) {
  return (
    <div>
      <HighScorePlayer score={score} /> - {score.time}
    </div>
  );
}
