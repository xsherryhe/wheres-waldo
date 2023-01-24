import '../styles/Panel.css';

import Target from './Target';
import HighScoreButton from './HighScoreButton';

export default function Panel({ targets }) {
  return (
    <div className="panel">
      <h2 className="instructions">Where are they?</h2>
      <div className="targets">
        {targets.map(({ id, name, file, squareId }) => (
          <Target key={id} name={name} file={file} found={Boolean(squareId)} />
        ))}
      </div>
      <HighScoreButton />
    </div>
  );
}
