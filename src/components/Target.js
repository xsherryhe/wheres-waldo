import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import server from '../server';
import '../styles/Target.css';

export default function Target({ name, file, found }) {
  return (
    <div className="target">
      <img src={`${server}/image_files/${file}`} alt="" />
      {found && <FontAwesomeIcon className="check" icon={faCircleCheck} />}
      <div className="name">{name}</div>
    </div>
  );
}
