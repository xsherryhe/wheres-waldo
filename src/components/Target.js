import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import '../styles/Target.css';

import ServerContext from './ServerContext';
export default function Target({ name, file, found }) {
  const server = useContext(ServerContext);

  return (
    <div className="target">
      <img src={`${server}/image_files/${file}`} alt="" />
      {found && <FontAwesomeIcon className="check" icon={faCircleCheck} />}
      <div>{name}</div>
    </div>
  );
}
