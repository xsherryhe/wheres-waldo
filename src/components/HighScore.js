import { useState, useContext, useEffect } from 'react';
import '../styles/HighScore.css';
import fetcher from '../fetcher';
import { secondsToHMS, tryAction } from '../utilities';
import loadingDots from '../images/loading-dots.gif';

import GameContext from './contexts/GameContext';
import PopUp from './PopUp';
import HighScorePlayer from './HighScorePlayer';

export default function HighScore({ footer }) {
  const [scores, setScores] = useState(null);
  const [error, setError] = useState(null);
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
    tryAction(getHighScores, setError);
  }, [image]);

  /* For skeleton table instead of loading GIF:
  let body = [...new Array(10)].map((_) => (
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  ));
  */

  let message = <img className="loading" src={loadingDots} alt="loading" />;
  if (scores) message = 'No high scores yet!';
  if (error) message = <span className="error">{error}</span>;

  let body = (
    <tr>
      <td colspan="3">
        <div className="centered">{message}</div>
      </td>
    </tr>
  );

  if (scores?.length)
    body = scores.map((score, i) => (
      <tr key={score.id}>
        <td className="rank">{i + 1}</td>
        <td>
          <HighScorePlayer score={score} />
        </td>
        <td>{secondsToHMS(score.time)}</td>
      </tr>
    ));

  return (
    <PopUp contentClassName="high-score">
      <h2>High Scores</h2>
      <main>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{body}</tbody>
        </table>
      </main>
      <footer>{footer}</footer>
    </PopUp>
  );
}
