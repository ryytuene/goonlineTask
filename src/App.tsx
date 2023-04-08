import { useState } from 'react';
import './App.scss'

function App() {
  const [inputHex, setInputHex] = useState("#");
  const [colors, setColors] = useState(Array<string>);
  const [predefinedColors] = useState([
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFFFFF"
  ])
  
  const onHexAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value: string = e.currentTarget.hex.value.toUpperCase();
    // not valid hex
    if (value.length !== 4 && value.length !== 7) return;
    // hex exists in array
    if ([...predefinedColors, ...colors].includes(value)) return;
    setColors(c => [...c, value]);
    setInputHex("#");
  }

  const onHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value;
    // bad characters
    if (!/^[#A-Fa-f0-9]*$/.test(value)) return;
    // too long
    if (value.length > 7) return;
    // add # if doesnt exist
    if (value.length > 0 && value[0] !== "#") value = "#" + value;
    // # not at index 0
    if (value.lastIndexOf("#") > 0) return;
    setInputHex(value);
  }

  return (
    <div>
      <form onSubmit={onHexAdd} >
        <label>
          <span>HEX RGB</span>
          <input type="text" id="hex" onChange={onHexChange} value={inputHex} />
        </label>
        <button type="submit" >Add</button>
      </form>
      {/* form 2 */}
      {[...predefinedColors, ...colors].map(value => <p key={value}>{value}</p>)}
    </div>
  );
}

export default App;
