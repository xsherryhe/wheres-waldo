import { useState } from 'react';
import '../styles/PopUp.css';

import CloseButton from './CloseButton';

export default function PopUp({ children, closeText }) {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  function close() {
    setClosed(true);
  }

  return (
    <div className="pop-up">
      <div className="container">
        <CloseButton onClick={close} />
        {children}
        {closeText && <button onClick={close}>{closeText}</button>}
      </div>
    </div>
  );
}
