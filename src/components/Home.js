import { Link } from 'react-router-dom';
import '../styles/Home.css';
import server from '../server';
import { parameterize } from '../utilities';
import Header from './Header';

export default function Home({ images }) {
  let main = 'Loading...';
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
}
