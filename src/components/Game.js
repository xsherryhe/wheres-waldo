import { useState, useEffect, useContext } from 'react';
import { CSRFToken } from '../cookies';
import '../styles/Game.css';
import fireworks from '../images/fireworks.gif';

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

  useEffect(() => {
    async function startGame() {
      const response = await fetch(`${server}/games?image=4`, {
        mode: 'cors',
        method: 'post',
        credentials: 'include',
        headers: { 'X-CSRF-Token': CSRFToken(document.cookie) },
      });
      const data = await response.json();
      setId(data.id);
      setImage(`${server}/image_files/${data.image.file}`);
      setGrid(
        [...new Array(data.image.height)].map((_, i) =>
          [...new Array(data.image.width)].map((_, j) => `${i},${j}`)
        )
      );
      setTargets(
        data.game_targets.map(({ target, square }) => ({
          ...target,
          squareId: square?.join(','),
        }))
      );
    }
    startGame();
  }, [server]);

  //updateGame
  function setFound(foundId, squareId) {
    setTargets((targets) => {
      const targetIndex = targets.findIndex(({ id }) => id === foundId);
      const target = targets[targetIndex];
      return [
        ...targets.slice(0, targetIndex),
        { ...target, found: squareId },
        ...targets.slice(targetIndex + 1),
      ];
    });
    //setTargets
    //setComplete(
    //data.completionTime
    //? { time: data.completionTime, highScore: data.highScore }
    //: false
    //);
  }

  if (!id) return <div>Loading...</div>;

  return (
    <div className="game">
      <GameContext.Provider value={{ id, complete: Boolean(complete) }}>
        <Panel targets={targets} />
        <GameImage
          image={image}
          grid={grid}
          targets={targets}
          setFound={setFound}
        />
        {complete && (
          <PopUp closeText="Admire Completed Map">
            <h1>You win!</h1>
            <img src={fireworks} alt="" />
          </PopUp>
        )}
      </GameContext.Provider>
    </div>
  );
}
