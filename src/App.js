import { useState } from 'react';
import './styles/App.css';

import PopUpContext from './components/contexts/PopUpContext';
import Game from './components/Game';

function App() {
  const [popUp, setPopUp] = useState(null);

  function closePopUp() {
    setPopUp(null);
  }

  return (
    <div className="App">
      <PopUpContext.Provider value={{ content: popUp, set: setPopUp, close: closePopUp }}>
        <Game />
      </PopUpContext.Provider>
    </div>
  );
}

export default App;
