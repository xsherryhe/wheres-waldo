import { useState, useEffect, useContext } from 'react';
import fetcher from '../fetcher';
import { secondsToHMS } from '../utilities';
import '../styles/Game.css';

import Panel from './Panel';
import GameImage from './GameImage';
import GameComplete from './GameComplete';
import ServerContext from './contexts/ServerContext';
import GameContext from './contexts/GameContext';
import PopUpContext from './contexts/PopUpContext';

export default function Game() {
  const [ids, setIds] = useState(null);
  const [image, setImage] = useState(null);
  const [grid, setGrid] = useState(null);
  const [targets, setTargets] = useState(null);
  const [complete, setComplete] = useState(false);

  const server = useContext(ServerContext);
  const popUp = useContext(PopUpContext);

  function updateTarget({ target, square }) {
    setTargets((targets) => {
      const targetIndex = targets.findIndex(({ id }) => id === target.id);
      return [
        ...targets.slice(0, targetIndex),
        { ...targets[targetIndex], squareId: square.join(',') },
        ...targets.slice(targetIndex + 1),
      ];
    });
  }

  function updateGame(data) {
    updateTarget(data.target);
    if (data.completion_time) {
      setComplete({
        time: secondsToHMS(data.completion_time),
        highScore: data.high_score,
      });
      popUp.set(<GameComplete />);
    }
  }

  useEffect(() => {
    async function startGame() {
      await fetcher(server);
      const response = await fetcher(`${server}/games?image=4`, {
        method: 'POST',
      });
      const data = await response.json();
      setIds({ game: data.id, image: data.image.id });
      setImage(`${server}/image_files/${data.image.file}`);
      setGrid(
        [...new Array(data.image.height)].map((_, i) =>
          [...new Array(data.image.width)].map((_, j) => `${i},${j}`)
        )
      );
      setTargets(data.targets.map(({ target }) => target));
    }
    startGame();

    // TO DO: Code unmount delete request
  }, [server]);

  if (!ids) return <div>Loading...</div>;

  return (
    <div className="game">
      <GameContext.Provider
        value={{ id: ids.game, complete, image: ids.image }}
      >
        <Panel targets={targets} />
        <GameImage
          image={image}
          grid={grid}
          targets={targets}
          updateGame={updateGame}
        />
        {popUp.content}
      </GameContext.Provider>
    </div>
  );
}
