import { useEffect, useState } from 'react';
import './App.scss'
import Color from './Color';

function App() {
  const [inputHex, setInputHex] = useState("#");
  const [colors, setColors] = useState((): Array<string> => {
    let localColors = localStorage.getItem("colors") || "[]";
    return JSON.parse(localColors);
  });
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
  const [filteredColors, setFiltertedColors] = useState(Array<string>);
  const [redFilter, setRedFilter] = useState(false);
  const [greenFilter, setGreenFilter] = useState(false);
  const [blueFilter, setBlueFilter] = useState(false);
  const [satFilter, setSatFilter] = useState(false);

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors])

  const onHexAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value: string = e.currentTarget.hex.value.toUpperCase();
    // not valid hex
    if (value.length !== 4 && value.length !== 7) return;
    const color = new Color(value);
    // hex exists in array
    if ([...predefinedColors, ...colors].includes(color.fullHex)) return;
    setColors(c => [...c, color.fullHex]);
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

  const removeColor = (value: string) => {
    setColors(colors.filter(color => color !== value));
  }

  const sortColors = (a: string, b: string): number => {
    const colorA = new Color(a);
    const colorB = new Color(b);

    if (colorA.red < colorB.red) return 1;
    if (colorA.red > colorB.red) return -1;
    if (colorA.green < colorB.green) return 1;
    if (colorA.green > colorB.green) return -1;
    if (colorA.blue < colorB.blue) return 1;
    if (colorA.blue > colorB.blue) return -1;
    return 0;
  }

  useEffect(() => {
    setFiltertedColors([...predefinedColors, ...colors].sort(sortColors).filter(value => {
      const color = new Color(value);
      if (redFilter && color.red <= 127) return false;
      if (greenFilter && color.green <= 127) return false;
      if (blueFilter && color.blue <= 127) return false;
      if (satFilter && color.getSaturationPercent() <= 50) return false;
      return true;
    }))
  }, [predefinedColors, colors, redFilter, greenFilter, blueFilter, satFilter])

  const colorItem = (value: string): JSX.Element => {
    return (
      <div className="item" key={value}>
        <div className="item-color" style={{ backgroundColor: value }}>
          {!predefinedColors.includes(value) &&
            <div onClick={() => removeColor(value)} className="remove-color" >
              X
            </div>
          }
        </div>
        {value}
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={onHexAdd} className="input-form" >
        <label className="hex-input-container">
          <span>HEX RGB</span>
          <input type="text" id="hex" onChange={onHexChange} value={inputHex} />
        </label>
        <button type="submit" >Add</button>
      </form>
      <div className="filter-container">
        Select filters:
        <div>
          <label className="filter">
            <input type="checkbox" onChange={() => setRedFilter(!redFilter)} checked={redFilter} />
            Red &gt; 50%
          </label>
          <label className="filter">
            <input type="checkbox" onChange={() => setGreenFilter(!greenFilter)} checked={greenFilter} />
            Green &gt; 50%
          </label>
          <label className="filter">
            <input type="checkbox" onChange={() => setBlueFilter(!blueFilter)} checked={blueFilter} />
            Blue &gt; 50%
          </label>
          <label className="filter">
            <input type="checkbox" onChange={() => setSatFilter(!satFilter)} checked={satFilter} />
            Saturation &gt; 50%
          </label>
        </div>
      </div>
      <div className="item-container">
        {filteredColors.map(value => colorItem(value))}
      </div>
    </div>
  );
}

export default App;
