import { useState, useContext, useEffect } from 'react';
import fetcher from '../fetcher';

import ServerContext from './contexts/ServerContext';
import GameContext from './contexts/GameContext';
import PopUp from './PopUp';
import HighScoreEntry from './HighScoreEntry';

export default function HighScore() {
  const [scores, setScores] = useState(null);

  const server = useContext(ServerContext);
  const image = useContext(GameContext).image;

  useEffect(() => {
    async function getHighScores() {
      const response = await fetcher(`${server}/images/${image}/games`);
      const data = await response.json();
      const scores = data.map(({ id, player, completion_time }) => ({
        id,
        player,
        time: completion_time,
      }));
      setScores(scores);
    }
    getHighScores();
  }, [server, image]);

  return (
    <PopUp>
      <h2>High Scores</h2>
      {scores
        ? scores.map((score, i) => (
            <div key={score.id}>
              {i + 1}. <HighScoreEntry score={score} />
            </div>
          ))
        : 'Loading...'}
    </PopUp>
  );
}
