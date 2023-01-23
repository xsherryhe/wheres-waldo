import { useContext } from 'react';
import '../styles/PopUp.css';

import CloseButton from './CloseButton';
import PopUpContext from './contexts/PopUpContext';

export default function PopUp({ children }) {
  const close = useContext(PopUpContext).close;
  
  return (
    <div className="pop-up">
      <div className="container">
        <CloseButton onClick={close} />
        {children}
      </div>
    </div>
  );
}
