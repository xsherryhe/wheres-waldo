import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import fetcher from './fetcher';
import { parameterize } from './utilities';

import PopUpContext from './components/contexts/PopUpContext';
import Home from './components/Home';
import Game from './components/Game';

function App() {
  const [popUp, setPopUp] = useState(null);
  const [games, setGames] = useState(null);

  function closePopUp() {
    setPopUp(null);
  }

  useEffect(() => {
    async function getGames() {
      const response = await fetcher('images');
      const data = await response.json();
      setGames(data);
    }
    getGames();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <PopUpContext.Provider
          value={{ content: popUp, set: setPopUp, close: closePopUp }}
        >
          <Routes>
            <Route path="/" element={<Home games={games} />} />
            {games?.map(({ id, name }) => (
              <Route
                key={id}
                path={parameterize(name)}
                element={<Game image={id} />}
              />
            ))}
          </Routes>
        </PopUpContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
