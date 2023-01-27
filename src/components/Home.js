import '../styles/Home.css';

import Header from './Header';
import Carousel from './Carousel';

export default function Home({ images }) {
  /*
  let main = [...new Array(3)].map((_, i) => <div key={i}></div>);
  if (images)
    main = images.map(({ id, name, file }) => (
      <Link key={id} to={parameterize(name)}>
        <img src={`${server}/image_files/${file}`} alt="" />
        <div className="name">{name}</div>
      </Link>
    ));

  return (
    <div className="home">
      <Header />
      <main>{main}</main>
    </div>
  );
  */

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
