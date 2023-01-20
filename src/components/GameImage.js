import { useState, useEffect, useRef } from 'react';
import '../styles/GameImage.css';

import Square from './Square';
import SelectForm from './SelectForm';

export default function GameImage({ image, grid, targets, setFound }) {
  const [active, setActive] = useState(null);
  const [incorrect, setIncorrect] = useState(null);
  const gameImageRef = useRef();

  useEffect(() => {
    function handleClickAway(e) {
      if (!gameImageRef.current.contains(e.target)) setActive(null);
    }
    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, [gameImageRef]);

  function displayCorrect(targetId, squareId) {
    setActive(null);
    setFound(targetId, squareId);
  }

  function displayIncorrect(squareId) {
    setActive(null);
    setIncorrect(squareId);
    setTimeout(() => setIncorrect(null), 500);
  }

  function correct(squareId) {
    return targets.find(({ found }) => found === squareId);
  }

  return (
    <div
      className="game-image"
      style={{
        backgroundImage: `url(${image})`,
        gridTemplate: `repeat(${grid.length}, 1fr) / repeat(${grid[0].length}, 1fr)`,
      }}
      ref={gameImageRef}
    >
      {grid.map((row) =>
        row.map((id) => (
          <div key={id}>
            <Square
              active={active === id}
              setActive={() => setActive(id)}
              correct={correct(id)}
              incorrect={incorrect === id}
            />
            {active === id && (
              <SelectForm
                options={targets}
                squareId={id}
                displayCorrect={displayCorrect}
                displayIncorrect={displayIncorrect}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}
