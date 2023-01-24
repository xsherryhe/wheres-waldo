import { useEffect, useState } from 'react';
import '../styles/Home.css';
import fetcher from '../fetcher';
import server from '../server';

export default function Home() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    async function getGames() {
      const response = await fetcher('images');
      const data = await response.json();
      setGames(data);
    }
    getGames();
  }, []);

  if (!games) return <div>Loading...</div>;
  return (
    <div className="home">
      {games.map(({ id, name, file }) => (
        <div key={id}>
          <img src={`${server}/image_files/${file}`} alt="" />
          <div className="name">{name}</div>
        </div>
      ))}
    </div>
  );
}
