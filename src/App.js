import { useState } from 'react';
import './styles/App.css';

import PopUpContext from './components/contexts/PopUpContext';
import Home from './components/Home';

function App() {
  const [popUp, setPopUp] = useState(null);

  function closePopUp() {
    setPopUp(null);
  }

  return (
    <div className="App">
      <PopUpContext.Provider
        value={{ content: popUp, set: setPopUp, close: closePopUp }}
      >
        <Home />
      </PopUpContext.Provider>
    </div>
  );
}

export default App;
