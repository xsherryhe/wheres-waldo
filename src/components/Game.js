import { useState, useEffect, useRef } from 'react';
import '../styles/Game.css';
import dummy from '../images/dummy.jpg';

import Square from './Square';
import SelectForm from './SelectForm';

export default function Game() {
  const [image, setImage] = useState(null);
  const [grid, setGrid] = useState(null);
  const [targets, setTargets] = useState(null);
  const [active, setActive] = useState(null);

  const gameRef = useRef();

  useEffect(() => {
    function handleClickAway(e) {
      if (!gameRef.current.contains(e.target)) setActive(null);
    }
    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, [gameRef]);

  useEffect(() => {
    setImage(dummy);
    setGrid(
      [...new Array(10)].map((_, i) =>
        [...new Array(9)].map((_, j) => `${i},${j}`)
      )
    );
    setTargets(['Waiter', 'Solid brown lollipop', 'Glittery lollipop']);
  }, []);

  if (!image) return <div>Loading...</div>;

  return (
    <div
      className="game"
      style={{
        backgroundImage: `url(${image})`,
        gridTemplate: `repeat(${grid.length}, 1fr) / repeat(${grid[0].length}, 1fr)`,
      }}
      ref={gameRef}
    >
      {grid.map((row) =>
        row.map((id) => (
          <div key={id}>
            <Square
              active={active === id}
              setActive={() => setActive(id)}
            />
            {active === id && <SelectForm options={targets} />}
          </div>
        ))
      )}
    </div>
  );
}
