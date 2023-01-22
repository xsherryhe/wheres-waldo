import { useState } from 'react';
import '../styles/PopUp.css';

import CloseButton from './CloseButton';

export default function PopUp({ children, closeText, setOpen = () => {} }) {
  const [closed, setClosed] = useState(false);

  function close() {
    setOpen(false);
    setClosed(true);
  }

  if (closed) return null;
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
