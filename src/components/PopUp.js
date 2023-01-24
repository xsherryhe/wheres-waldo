import { useContext } from 'react';
import '../styles/PopUp.css';

import CloseButton from './CloseButton';
import PopUpContext from './contexts/PopUpContext';

export default function PopUp({ children, contentClassName = '' }) {
  const close = useContext(PopUpContext).close;

  return (
    <div className="pop-up">
      <div className="container">
        <CloseButton onClick={close} />
        <div className={`content ${contentClassName}`}>{children}</div>
      </div>
    </div>
  );
}
