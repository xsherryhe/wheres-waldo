import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faHouse,
  faTableList,
} from '@fortawesome/free-solid-svg-icons';

import GameContext from './contexts/GameContext';
import HighScoreButton from './HighScoreButton';

export default function Header() {
  const game = useContext(GameContext);
  return (
    <header>
      <Link className="logo" to="/">
        <FontAwesomeIcon icon={faLocationDot} />
        <h1>Where’s Everything?</h1>
      </Link>
      {game && (
        <Link className="home" to="/">
          <FontAwesomeIcon icon={faHouse} alt="home" />
        </Link>
      )}
      {game?.image && (
        <HighScoreButton
          className="icon"
          text={<FontAwesomeIcon icon={faTableList} alt="high scores" />}
        />
      )}
    </header>
  );
}
