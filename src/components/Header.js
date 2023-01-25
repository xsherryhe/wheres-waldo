import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

import GameContext from './contexts/GameContext';
import HighScoreButton from './HighScoreButton';

export default function Header() {
  const game = useContext(GameContext);
  return (
    <header>
      <Link className="logo" to="/">
        Where's Everything?
      </Link>
      {game && (
        <Link className="home" to="/">
          Home
        </Link>
      )}
      {game?.image && <HighScoreButton />}
    </header>
  );
}
