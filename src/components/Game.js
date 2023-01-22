import { useState, useEffect, useContext } from 'react';
import fetcher from '../fetcher';
import '../styles/Game.css';
import fireworks from '../images/fireworks.gif';
import { secondsToHMS } from '../utilities';

import Panel from './Panel';
import GameImage from './GameImage';
import PopUp from './PopUp';
import ServerContext from './contexts/ServerContext';
import GameContext from './contexts/GameContext';

export default function Game() {
  const [id, setId] = useState(null);
  const [image, setImage] = useState(null);
  const [grid, setGrid] = useState(null);
  const [targets, setTargets] = useState(null);
  const [complete, setComplete] = useState(false);

  const server = useContext(ServerContext);

  function updateTargets(data) {
    setTargets(
      data.targets.map(({ target, square }) => ({
        ...target,
        squareId: square?.join(','),
      }))
    );
  }

  function updateGame(data) {
    updateTargets(data);
    setComplete(
      data.completion_time
        ? { time: data.completion_time, highScore: data.high_score }
        : false
    );
  }

  useEffect(() => {
    async function startGame() {
      await fetcher(server);
      const response = await fetcher(`${server}/games?image=4`, {
        method: 'POST',
      });
      const data = await response.json();
      setId(data.id);
      setImage(`${server}/image_files/${data.image.file}`);
      setGrid(
        [...new Array(data.image.height)].map((_, i) =>
          [...new Array(data.image.width)].map((_, j) => `${i},${j}`)
        )
      );
      updateTargets(data);
    }
    startGame();

    // TO DO: Code unmount delete request
  }, [server]);

  if (!id) return <div>Loading...</div>;

  // TO DO: Move win pop up into separate component and pass in GameContext
  return (
    <div className="game">
      <GameContext.Provider value={{ id, complete }}>
        <Panel targets={targets} />
        <GameImage
          image={image}
          grid={grid}
          targets={targets}
          updateGame={updateGame}
        />
        {complete && (
          <PopUp closeText="Admire Completed Map">
            <h1>You win!</h1>
            <img src={fireworks} alt="" />
            <p>You completed the map in {secondsToHMS(complete.time)}.</p>
            {complete.highScore && <p>Your time made the High Scores!</p>}
            <button>
              {complete.highScore
                ? 'See High Scores'
                : 'Add Your Name to High Scores'}
            </button>
          </PopUp>
        )}
      </GameContext.Provider>
    </div>
  );
}
