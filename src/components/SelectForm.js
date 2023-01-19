import '../styles/SelectForm.css';

export default function SelectForm({ options, squareId }) {
  // onChange of select -- if select has value, then
  // send select value with squareId and display checking... message
  return (
    <form className="select" action="">
      <select name="selection" id="selection">
        <option value="">-- Who or what is here? --</option>
        {options.map(({ id, name }) => (
          <option key={id} id={id}>
            {name}
          </option>
        ))}
      </select>
    </form>
  );
}
