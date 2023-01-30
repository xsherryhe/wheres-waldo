import { useState, useEffect, useContext, useRef } from 'react';
import fetcher from '../fetcher';
import server from '../server';
import { secondsToHMS, tryAction } from '../utilities';
import '../styles/Game.css';

import Header from './Header';
import Panel from './Panel';
import GameButtons from './GameButtons';
import GameImage from './GameImage';
import GameComplete from './GameComplete';
import ErrorMain from './ErrorMain';
import GameContext from './contexts/GameContext';
import PopUpContext from './contexts/PopUpContext';
import GameCompleteLabel from './GameCompleteLabel';

export default function Game({ image }) {
  const [ids, setIds] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [grid, setGrid] = useState(null);
  const [targets, setTargets] = useState(null);
  const [complete, setComplete] = useState(false);
  const [feedbackOn, setFeedbackOn] = useState(true);
  const [error, setError] = useState(null);

  const open = useRef(true);
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
      setFeedbackOn(true);
      popUp.set(<GameComplete />);
    }
  }

  useEffect(() => {
    async function startGame() {
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
    tryAction(startGame, setError);
  }, [image]);

  open.current = !complete;
  useEffect(() => {
    return () => {
      if (ids && open.current)
        tryAction(
          async () => await fetcher(`games/${ids.game}`, { method: 'DELETE' }),
          () => {}
        );
    };
  }, [ids]);

  let main = (
    <main>
      <Panel targets={targets} />
      <GameButtons feedbackOn={feedbackOn} setFeedbackOn={setFeedbackOn} />
      <GameImage
        file={imageFile}
        grid={grid}
        targets={targets}
        showFeedback={feedbackOn}
        updateGame={updateGame}
      />
      <GameCompleteLabel />
    </main>
  );

  if (error) main = <ErrorMain error={error} />;

  return (
    <div className="game">
      <GameContext.Provider
        value={{ id: ids?.game, complete, image: ids?.image }}
      >
        <Header />
        {main}
        {popUp.content}
      </GameContext.Provider>
    </div>
  );
}
