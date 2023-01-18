import '../styles/Square.css';

export default function Square({ active, setActive }) {
  return (
    <button
      className={`square ${active ? 'active' : ''}`}
      onClick={setActive}
    ></button>
  );
}
