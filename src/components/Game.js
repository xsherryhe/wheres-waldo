import { useState, useEffect, useContext } from 'react';
import fetcher from '../fetcher';
import server from '../server';
import { secondsToHMS } from '../utilities';
import '../styles/Game.css';

import Header from './Header';
import Panel from './Panel';
import GameImage from './GameImage';
import GameComplete from './GameComplete';
import GameContext from './contexts/GameContext';
import PopUpContext from './contexts/PopUpContext';

export default function Game({ image }) {
  const [ids, setIds] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [grid, setGrid] = useState(null);
  const [targets, setTargets] = useState(null);
  const [complete, setComplete] = useState(false);

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
      await fetcher();
      const response = await fetcher(`images/${image}/games`, {
        method: 'POST',
      });
      const data = await response.json();
      setIds({ game: data.id, image: data.image.id });
      setImageFile(`${server}/image_files/${data.image.file}`);
      setGrid(
        [...new Array(data.image.height)].map((_, i) =>
          [...new Array(data.image.width)].map((_, j) => `${i},${j}`)
        )
      );
      setTargets(data.targets.map(({ target }) => target));
    }
    startGame();

    // TO DO: Code unmount delete request
  }, [image]);

  if (!ids) return <div>Loading...</div>;

  return (
    <div className="game">
      <GameContext.Provider
        value={{ id: ids.game, complete, image: ids.image }}
      >
        <Header />
        <main>
          <Panel targets={targets} />
          <GameImage
            file={imageFile}
            grid={grid}
            targets={targets}
            updateGame={updateGame}
          />
        </main>
        {popUp.content}
      </GameContext.Provider>
    </div>
  );
}
