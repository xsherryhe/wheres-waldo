import { useState, useContext, useEffect } from 'react';
import '../styles/HighScore.css';
import fetcher from '../fetcher';
import { secondsToHMS } from '../utilities';

import GameContext from './contexts/GameContext';
import PopUp from './PopUp';
import HighScorePlayer from './HighScorePlayer';

export default function HighScore({ footer }) {
  const [scores, setScores] = useState(null);
  const image = useContext(GameContext).image;

  useEffect(() => {
    async function getHighScores() {
      const response = await fetcher(`images/${image}/games`);
      const data = await response.json();
      const scores = data.map(({ id, player, completion_time }) => ({
        id,
        player,
        time: completion_time,
      }));
      setScores(scores);
    }
    getHighScores();
  }, [image]);

  let content = 'Loading...';
  if (scores)
    content = (
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, i) => (
            <tr key={score.id}>
              <td className="rank">{i + 1}</td>
              <td>
                <HighScorePlayer score={score} />
              </td>
              <td>{secondsToHMS(score.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <PopUp contentClassName="high-score">
      <h2>High Scores</h2>
      <div className="content">{content}</div>
      <footer>{footer}</footer>
    </PopUp>
  );
}
