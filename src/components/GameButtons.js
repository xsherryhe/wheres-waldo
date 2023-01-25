import '../styles/GameButtons.css';

import HighScoreButton from './HighScoreButton';
import ToggleFeedbackButton from './ToggleFeedbackButton';

export default function GameButtons({ feedbackOn, setFeedbackOn }) {
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
