import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import fetcher from './fetcher';
import { parameterize, tryAction } from './utilities';

import PopUpContext from './components/contexts/PopUpContext';
import Home from './components/Home';
import Game from './components/Game';
import Header from './components/Header';
import ErrorMain from './components/ErrorMain';

function App() {
  const [popUp, setPopUp] = useState(null);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);

  function closePopUp() {
    setPopUp(null);
  }

  useEffect(() => {
    async function getImages() {
      const response = await fetcher('images', { timeoutError: false });
      const data = await response.json();
      setImages(data);
    }
    tryAction(getImages, setError);
  }, []);

  let content = (
    <Routes>
      <Route path="/" element={<Home images={images} />} />
      {images?.map(({ id, name }) => (
        <Route
          key={id}
          path={parameterize(name)}
          element={<Game image={id} />}
        />
      ))}
    </Routes>
  );

  if (error)
    content = (
      <div>
        <Header />
        <ErrorMain error={error} />
      </div>
    );

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <PopUpContext.Provider
          value={{ content: popUp, set: setPopUp, close: closePopUp }}
        >
          {content}
        </PopUpContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
