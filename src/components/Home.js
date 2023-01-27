import '../styles/Home.css';

import Header from './Header';
import Carousel from './Carousel';

export default function Home({ images }) {
  return (
    <div className="home">
      <Header />
      <h1>Select a game to start!</h1>
      <main>
        <Carousel images={images} />
      </main>
    </div>
  );
}
