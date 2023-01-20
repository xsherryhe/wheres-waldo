import '../styles/CloseButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function CloseButton({ onClick }) {
  return (
    <button className="icon close" onClick={onClick}>
      <FontAwesomeIcon icon={faXmark} />
    </button>
  );
}
