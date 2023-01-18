import '../styles/SelectForm.css';

export default function SelectForm({ options }) {
  return (
    <form className="select" action="">
      <select name="selection" id="selection">
        <option value="">-- Who or what is here? --</option>
        {options.map((option) => (
          <option key={option} id={option}>
            {option}
          </option>
        ))}
      </select>
    </form>
  );
}
