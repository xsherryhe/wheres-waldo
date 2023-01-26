import { useState, useEffect, useRef } from 'react';
import '../styles/GameImage.css';

import Square from './Square';
import SelectForm from './SelectForm';

export default function GameImage({
  file,
  grid,
  targets,
  showFeedback,
  updateGame,
}) {
  const [active, setActive] = useState(null);
  const [newCorrect, setNewCorrect] = useState(null);
  const [incorrect, setIncorrect] = useState(null);
  const gameImageRef = useRef();

  useEffect(() => {
    function handleClickAway(e) {
      if (!gameImageRef.current.contains(e.target)) setActive(null);
    }
    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, [gameImageRef]);

  function displayCorrect(data, squareId) {
    setActive(null);
    updateGame(data);
    setNewCorrect(squareId);
    setTimeout(() => setNewCorrect(null), 750);
  }

  function displayIncorrect(squareId) {
    setActive(null);
    setIncorrect(squareId);
    setTimeout(() => setIncorrect(null), 500);
  }

  function correct(gameSquareId) {
    if (showFeedback || newCorrect === gameSquareId)
      return targets.find(({ squareId }) => squareId === gameSquareId);
  }

  if (!file) return <div className="game-image"></div>;

  return (
    <div className="game-image">
      <div className="image" style={{ backgroundImage: `url(${file})` }}></div>
      <div
        className="grid"
        style={{
          gridTemplate: `repeat(${grid.length}, 1fr) / repeat(${grid[0].length}, 1fr)`,
        }}
        ref={gameImageRef}
      >
        {grid.map((row) =>
          row.map((id, col) => (
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
                  offset={{ 0: 'start', [row.length - 1]: 'end' }[col] || ''}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
