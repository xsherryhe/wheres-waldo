import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Carousel.css';
import { parameterize } from '../utilities';

import ServerContext from './contexts/ServerContext';

export default function Carousel({ images }) {
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [current, setCurrent] = useState(0);
  const [slide, setSlide] = useState(null);

  const server = useContext(ServerContext);
  const imgTags = images?.map(({ file }) => (
    <img src={`${server}/image_files/${file}`} alt="" />
  ));

  function handlePrevious() {
    setLeft((current - 1 + images.length) % images.length);
    setSlide('right');
  }

  function handleNext() {
    setRight((current + 1) % images.length);
    setSlide('left');
  }

  useEffect(() => {
    const newCurrent = { left: right, right: left }[slide] ?? null;
    if (newCurrent !== null) {
      const update = setTimeout(() => {
        setCurrent(newCurrent);
        setLeft(null);
        setRight(null);
        setSlide(null);
      }, 250);
      return () => clearTimeout(update);
    }
  }, [slide, left, right]);

  if (!images)
    return (
      <div className="carousel">
        <div className="images"></div>
      </div>
    );

  return (
    <div className={`carousel ${slide ? `sliding-${slide}` : ''}`}>
      <button
        className="icon"
        onClick={handlePrevious}
        disabled={Boolean(slide)}
      >
        {'<'}
      </button>
      <div className="images">
        <div className="left">
          <h2 className="name">{images[left]?.name}</h2>
          {imgTags[left]}
        </div>
        <div className="current">
          <h2 className="name">{images[current].name}</h2>
          {imgTags[current]}
        </div>
        <div className="right">
          <h2 className="name">{images[right]?.name}</h2>
          {imgTags[right]}
        </div>
      </div>
      <button className="icon" onClick={handleNext} disabled={Boolean(slide)}>
        {'>'}
      </button>
      <Link className="select" to={parameterize(images[current].name)}>
        Play Game
      </Link>
    </div>
  );
}
