import '../styles/Panel.css';

import Target from './Target';

export default function Panel({ targets }) {
  let main = [...new Array(8)].map((_, i) => (
    <div className="skeleton" key={i}></div>
  ));

  if (targets)
    main = targets.map(({ id, name, file, squareId }) => (
      <Target key={id} name={name} file={file} found={Boolean(squareId)} />
    ));

  return (
    <div className="panel">
      <h2 className="instructions">Where are they?</h2>
      <div className="targets">{main}</div>
    </div>
  );
}
