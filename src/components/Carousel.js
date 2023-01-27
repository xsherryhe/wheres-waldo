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

  function handlePrevious() {
    const newCurrent = (current - 1 + images.length) % images.length;
    setToRight(current);
    setFromLeft(newCurrent);
    setCurrent(newCurrent);
    disableForAnimation();
  }

  function handleNext() {
    const newCurrent = (current + 1) % images.length;
    setToLeft(current);
    setFromRight(newCurrent);
    setCurrent(newCurrent);
    disableForAnimation();
  }

  if (!images)
    return (
      <div className="carousel">
        <div className="images"></div>
      </div>
    );

  const imageDivs = images.map(({ id, file }, i) => {
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
        <div className="images">{imageDivs}</div>
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
