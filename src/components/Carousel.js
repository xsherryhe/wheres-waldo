import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Carousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { parameterize } from '../utilities';
import loadingDots from '../images/loading-dots.gif';

import ServerContext from './contexts/ServerContext';

export default function Carousel({ images }) {
  const [toLeft, setToLeft] = useState(null);
  const [toRight, setToRight] = useState(null);
  const [fromLeft, setFromLeft] = useState(null);
  const [fromRight, setFromRight] = useState(null);
  const [current, setCurrent] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const server = useContext(ServerContext);

  function disableForAnimation() {
    setDisabled(true);
    setTimeout(() => setDisabled(false), 250);
  }

  function getNewCurrent(current, direction) {
    return (current + direction + images.length) % images.length;
  }

  function handlePrevious() {
    setToLeft(null);
    setToRight(current);
    setFromLeft(getNewCurrent(current, -1));
    setFromRight(null);
    setCurrent((current) => getNewCurrent(current, -1));
    disableForAnimation();
  }

  function handleNext() {
    setToLeft(current);
    setToRight(null);
    setFromLeft(null);
    setFromRight(getNewCurrent(current, 1));
    setCurrent((current) => getNewCurrent(current, 1));
    disableForAnimation();
  }

  if (!images)
    return (
      <div className="carousel">
        <button className="icon arrow">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="display">
          <div className="name"></div>
          <div className="images">
            <div className="loading">
              <img src={loadingDots} alt="loading" />
            </div>
          </div>
        </div>
        <button className="icon arrow">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button className="select">Play Game</button>
      </div>
    );

  const imageDisplays = images.map(({ id, name, file }, i) => {
    let className =
      {
        [toLeft]: 'to-left',
        [toRight]: 'to-right',
        [fromLeft]: 'from-left',
        [fromRight]: 'from-right',
      }[i] || '';
    if (i === current) className += ' current';
    return (
      <Link key={id} to={parameterize(name)} className={className}>
        <img src={`${server}/image_files/${file}`} alt="" />
      </Link>
    );
  });

  return (
    <div className="carousel">
      <button
        className="icon arrow"
        onClick={handlePrevious}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="display">
        <h2 className="name">{images[current].name}</h2>
        <div className="images">{imageDisplays}</div>
      </div>
      <button className="icon arrow" onClick={handleNext} disabled={disabled}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <Link className="select" to={parameterize(images[current].name)}>
        <button>Play Game</button>
      </Link>
    </div>
  );
}
