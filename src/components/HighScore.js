import { useState, useContext } from 'react';
import fetcher from '../fetcher';

import ServerContext from './contexts/ServerContext';
import PopUp from './PopUp';
import HighScoreEntry from './HighScoreEntry';

export default function HighScore({ text = 'See High Scores' }) {
  const [open, setOpen] = useState(false);
  const [scores, setScores] = useState(null);

  const server = useContext(ServerContext);

  async function handleClick() {
    setOpen(true);
    const response = await fetcher(`${server}/games`);
    const data = await response.json();
    const scores = data.map(({ id, player, completion_time }) => ({
      id,
      player,
      time: completion_time,
    }));
    setScores(scores);
  }

  return (
    <div>
      <button onClick={handleClick}>{text}</button>
      {open && (
        <PopUp setOpen={setOpen}>
          {scores
            ? scores.map((score, i) => (
                <div key={score.id}>
                  {i}. <HighScoreEntry score={score} />
                </div>
              ))
            : 'Loading...'}
        </PopUp>
      )}
    </div>
  );
}
