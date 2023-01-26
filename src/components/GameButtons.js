import { useContext } from 'react';
import '../styles/GameButtons.css';
import GameContext from './contexts/GameContext';

import HighScoreButton from './HighScoreButton';
import ToggleFeedbackButton from './ToggleFeedbackButton';

export default function GameButtons({ feedbackOn, setFeedbackOn }) {
  const gameLoaded = useContext(GameContext)?.id;
  if (!gameLoaded)
    return (
      <div className="game-buttons">
        <button />
        <button />
      </div>
    );

  return (
    <div className="game-buttons">
      <HighScoreButton />
      <ToggleFeedbackButton
        feedbackOn={feedbackOn}
        setFeedbackOn={setFeedbackOn}
      />
    </div>
  );
}
