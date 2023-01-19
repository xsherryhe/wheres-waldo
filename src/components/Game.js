import { useState, useEffect, useRef } from 'react';
import '../styles/Game.css';

import Square from './Square';
import SelectForm from './SelectForm';

export default function Game() {
  const [image, setImage] = useState(null);
  const [grid, setGrid] = useState(null);
  const [targets, setTargets] = useState(null);
  const [active, setActive] = useState(null);

  const serverDomainRef = useRef('http://localhost:3000');
  const gameRef = useRef();

  useEffect(() => {
    function handleClickAway(e) {
      if (!gameRef.current.contains(e.target)) setActive(null);
    }
    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, [gameRef]);

  useEffect(() => {
    async function setGame() {
      const response = await fetch(`${serverDomainRef.current}/images/3`, {
        mode: 'cors',
      });
      const data = await response.json();
      console.log(data);
      setImage(`${serverDomainRef.current}/image_files/${data.file}`);
      setGrid(
        [...new Array(10)].map((_, i) =>
          [...new Array(21)].map((_, j) => `${i},${j}`)
        )
      );
      setTargets(data.targets);
    }
    setGame();
  }, []);

  if (!image) return <div>Loading...</div>;

  return (
    <div className="game">
      <div className="game-panel">
        <h2 className="instructions">Where are they?</h2>
        <div className="game-targets">
          {targets.map(({ id, name, file }) => (
            <div key={id}>
              <img
                src={`${serverDomainRef.current}/image_files/${file}`}
                alt=""
              />
              {name}
            </div>
          ))}
        </div>
      </div>
      <div
        className="game-image"
        style={{
          backgroundImage: `url(${image})`,
          gridTemplate: `repeat(${grid.length}, 1fr) / repeat(${grid[0].length}, 1fr)`,
        }}
        ref={gameRef}
      >
        {grid.map((row) =>
          row.map((id) => (
            <div key={id}>
              <Square active={active === id} setActive={() => setActive(id)} />
              {active === id && <SelectForm options={targets} squareId={id} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
