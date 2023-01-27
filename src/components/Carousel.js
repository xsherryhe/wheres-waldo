import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Carousel.css';
import { parameterize } from '../utilities';

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
    setToRight(current);
    setFromLeft(getNewCurrent(current, -1));
    setCurrent((current) => getNewCurrent(current, -1));
    disableForAnimation();
  }

  function handleNext() {
    setToLeft(current);
    setFromRight(getNewCurrent(current, 1));
    setCurrent((current) => getNewCurrent(current, 1));
    disableForAnimation();
  }

  if (!images)
    return (
      <div className="carousel">
        <button className="icon"></button>
        <div className="display">
          <div className="name"></div>
          <div className="images"></div>
        </div>
        <button className="icon"></button>
        <button className="select"></button>
      </div>
    );

  const imageDisplays = images.map(({ id, file }, i) => {
    let className =
      {
        [toLeft]: 'to-left',
        [toRight]: 'to-right',
        [fromLeft]: 'from-left',
        [fromRight]: 'from-right',
      }[i] || '';
    if (i === current) className += ' current';
    return (
      <div key={id} className={className}>
        <img src={`${server}/image_files/${file}`} alt="" />
      </div>
    );
  });

  return (
    <div className="carousel">
      <button className="icon" onClick={handlePrevious} disabled={disabled}>
        {'<'}
      </button>
      <div className="display">
        <h2 className="name">{images[current].name}</h2>
        <div className="images">{imageDisplays}</div>
      </div>
      <button className="icon" onClick={handleNext} disabled={disabled}>
        {'>'}
      </button>
      <Link className="select" to={parameterize(images[current].name)}>
        Play Game
      </Link>
    </div>
  );
}
