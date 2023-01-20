import { useState, useEffect, useContext } from 'react';
import '../styles/Game.css';

import fireworks from '../images/fireworks.gif';

import Panel from './Panel';
import GameImage from './GameImage';
import PopUp from './PopUp';
import ServerContext from './contexts/ServerContext';
import DisabledContext from './contexts/DisabledContext';

export default function Game() {
  const [image, setImage] = useState(null);
  const [grid, setGrid] = useState(null);
  const [targets, setTargets] = useState(null);

  const server = useContext(ServerContext);

  useEffect(() => {
    async function setGame() {
      const response = await fetch(`${server}/images/4`, {
        mode: 'cors',
      });
      const data = await response.json();
      setImage(`${server}/image_files/${data.file}`);
      setGrid(
        [...new Array(data.height)].map((_, i) =>
          [...new Array(data.width)].map((_, j) => `${i},${j}`)
        )
      );
      setTargets(data.targets.map((target) => ({ ...target, found: false })));
    }
    setGame();
  }, [server]);

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
  }

  if (!image) return <div>Loading...</div>;

  const win = targets.every(({ found }) => found);
  return (
    <div className="game">
      <DisabledContext.Provider value={win}>
        <Panel targets={targets} />
        <GameImage
          image={image}
          grid={grid}
          targets={targets}
          setFound={setFound}
        />
        {win && (
          <PopUp closeText="Admire Completed Map">
            <h1>You win!</h1>
            <img src={fireworks} alt="" />
          </PopUp>
        )}
      </DisabledContext.Provider>
    </div>
  );
}
